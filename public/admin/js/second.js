$(function(){
  var page = 1;
  var pageSize = 5;
  function render(){
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        console.log(info);
        $('tbody').html(template('tmp',info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          }
        })
        
      }
    })
  }
  render();

  // 添加分类注册点击事件
  $('.add_category').on('click',function(){
    $('#addModal').modal('show');
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:1,
        pageSize:10
      },
      success:function(info){
        // console.log(info);
        $('.dropdown-menu').html(template('tmp2',info));
      }
    })
  })
  // 选择一级分类的功能
  $('.dropdown-menu').on('click','li',function(){
    var content = $(this).children().html();
    console.log(content);
    $('.dropdown-text').html(content);
    $('[name=categoryId]').val($(this).data('id'));

    $('form')
      .data('bootstrapValidator')
      .updateStatus('categoryId','VALID')
  })
  // 二级分类图片上传功能
  $('#file').fileupload({
    done:function(e,data){
      // console.log(data.result.picAddr);
      //显示图片
      $('.img_box img').attr('src',data.result.picAddr);
      // 把id值设置给隐藏表单
      $('[name="brandLogo"]').val(data.result.picAddr);
      $('form')
      .data('bootstrapValidator')
      .updateStatus('brandLogo','VALID')
    }
  })
  // 表单校验
  $('form').bootstrapValidator({
    excluded:[],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryId:{
        validators:{
          notEmpty:{
            message:'请选择一个一级功能'
          }
        }
      },
      brandName:{
        validators:{
          notEmpty:{
            message:'二级分类不能为空'
          }
        }
      },
      brandLogo:{
        validators:{
          notEmpty:{
            message:'请上传二级分类的图片'
          }
        }
      },
    }
  })
 // 注册表单验证成功事件
 $('form').on('success.form.bv',function(e){
  e.preventDefault();
  $.ajax({
    url:'/category/addSecondCategory',
    type:'post',
    data:$('form').serialize(),
    success:function(info){
      console.log(info);
      if(info.success){
        page = 1;
        render();
        $('#addModal').modal('hide');
        $('form')
          .data('bootstrapValidator')
          .resetForm(true);
      // 手动重置按钮的值和图片
      $('.dropdown-text').html('请选择一级分类');
      $('.img_box img').attr('src','images/none.png');
      }
      
    }
  })
 })
})