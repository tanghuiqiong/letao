
$(function(){
  var page = 1;
  var pageSize = 2;
  function render(){
    $.ajax({
      type:'get',
      url:'/category/queryTopCategoryPaging',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        // console.log(info);
        $('tbody').html(template('tmp',info))
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

  // 给添加分类注册点击事件
  $('.add_category').on('click',function(){
    $('#addModal').modal('show');
  })
  // 表单校验
  $('form').bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:'一级分类的名称不能为空'
          }
        }
      }
    }
  })
  // 注册表单验证成功事件
  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      url:'/category/addTopCategory',
      type:'post',
      data:$('form').serialize(),
      success:function(info){
        console.log(info);
        if(info.success){
          page = 1;
          render();
          $('#addModal').modal('hide');
          // 重置表单
          $('form')
              .data('bootstrapValidator')
              .resetForm(true)
        }
      }
    })
    
  })
})