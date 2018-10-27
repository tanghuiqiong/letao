

$(function(){
  var page = 1;
  var pageSize = 2;
  var imgs = [];
  function render(){
    $.ajax({
      type:'get',
      url:'/product/queryProductDetailList',
      data:{
        page:page,
        pageSize:pageSize
      },
      success:function(info){
        // console.log(info);
        $('tbody').html(template('tmp',info));
        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,p){
            page = p;
            render();
          },
          size:'normal',
          itemTexts:function(type,page){
            switch(type){
              case 'first':
                return '首页'
              case 'prev':
                return '上一页'
              case 'page':
                return page
              case 'next':
                return '下一页'
              case 'last':
                return '尾页'
            }
          },
          tooltipTitles:function(type,page){
            switch(type){
              case 'first':
                return '首页'
              case 'prev':
                return '上一页'
              case 'page':
                return '第'+page+'页'
              case 'next':
                return '下一页'
              case 'last':
                return '尾页'
            }
          },
          useBootstrapTooltip: true
        })
      }
    })
  }
  render();
  // 给添加商品注册事件
  $('.add_category').on('click',function(){
    $('#addModal').modal('show');
    $.ajax({
      url:'/category/querySecondCategoryPaging',
      type:'get',
      data:{
        page:1,
        pageSize:100
      },
      success:function(info){
        // console.log(info);
        $('.dropdown-menu').html(template('tmp2',info));
      }
    })
  })

  $('.dropdown-menu').on('click','a',function(){

    $('.dropdown-text').html($(this).html());

    $('[name=brandId]').val($(this).data('id'));
    
   //让brandId校验成功
   $('form')
    .data('bootstrapValidator')
    .updateStatus('brandId','VALID')
  })

  // 商品图片上传功能
  $('#file').fileupload({
    done:function(e,data){
      console.log(data);
      if(imgs.length >= 3){
        alert('不要再上传了哟');
        return;
      }
      // 把要上传成功后的图片显示出来
      $('.img_box').append('<img src="'+data.result.picAddr+'" width="100" height="100">')
      // $('<img src="' + data.result.picAddr + '" width="100" height="100">' ).appendTo('.img_box')
      // 把商品上传成功的图片保存起来
      imgs.push(data.result);
      if(imgs.length === 3){
        $('form')
          .data('bootstrapValidator')
          .updateStatus('picStatus','VALID')
      }else{
        $('form')
        .data('bootstrapValidator')
        .updateStatus('picStatus','INVALID')
      }
    }
  })

  // 表单校验
  $('form').bootstrapValidator({
    excluded:[],
    // 配置的校验的小图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-thumbs-up',
      invalid: 'glyphicon glyphicon-thumbs-down',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      brandId:{
        validators:{
          notEmpty:{
            message:'请选择二级分类'
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:'商品名称不能为空'
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:'商品描述不能为空'
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:'商品描述不能为空'
          },
          regexp:{
            regexp:/^[1-9]\d{0,4}$/,
            message:'请输入有效的库存（1-99999）'
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:'商品尺码不能为空'
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:'请输入有效的库存（xx-xx）'
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:'商品原价不能为空'
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:'商品价格不能为空'
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:'请上传3张商品图片'
          }
        }
      }
    }
  })

  // 注册表单校验成功事件
  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    var param = $('form').serialize();
    param += '&picName1=' + imgs[0].picName + '$picAdd1=' + imgs[0].picAddr
    param += '&picName2=' + imgs[1].picName + '$picAdd2=' + imgs[1].picAddr
    param += '&picName3=' + imgs[2].picName + '$picAdd3=' + imgs[2].picAddr
    // console.log(param);
    $.ajax({
      url:'/product/addProduct',
      type:'post',
      data:param,
      success:function(info){
        // console.log(info);
        if(info.success){
          $('#addModal').modal('hide');
          page = 1;
          render();

          // 重置表单样式
          $('form')
            .data('bootstrapValidator')
            .resetForm(true)

          // 手动清除
          $('.dropdown-text').html('请输入二级分类');
          $('.img_box img').remove();
          imgs = [];
        }
        
      }
    })
    
  })
})