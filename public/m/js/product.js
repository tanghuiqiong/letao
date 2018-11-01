
$(function(){
  // 根据地址栏的id发送ajax请求
  var id = getSearch().id;
  // console.log(id);
  $.ajax({
    type:'get',
    url:'/product/queryProductDetail',
    data:{
      id:id
    },
    success:function(info){
      // console.log(info);
      $('.mui-scroll').html(template('tmp2',info));
      // 初始化轮播图
      mui('.mui-slider').slider({
      interval:2000
      })
      $('.size span').on('click',function(){
        // console.log(111);
        
        $(this).addClass('active').siblings().removeClass('active');
      })
      // 重新初始化输入框
      mui('.mui-numbox').numbox();
    }
  })

  // 加入购物车功能
  // 给加入购物车注册点击事件
  $('.btn_addCart').on('click',function(){
    // 获取库存和尺码
    // var size = $('.size span.active').text();
    // var num = $('.mui-numbox-input').val();
    var size = $('.size span.active').text()
    var num = $('.mui-numbox-input').val()
    // console.log(size,num);
    if(!size){
      mui.toast('请选择商品尺寸');
      return;
    }
    // 发送ajax请求
    $.ajax({
      type:'post',
      url:'/cart/addCart',
      data:{
        productId:id,
        num:num,
        size:size
      },
      success:function(info){
        console.log(info);
        if(info.success){
          mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
            if(e.index === 0){
              location.href = 'cart.html';
            }
          })
        }
        if(info.error === 400){
          mui.confirm('添加失败,请先登录','温馨提示',['继续浏览','去登录'],function(e){
            if(e.index === 1){
              location.href = 'login.html?backUrl=' + location.href;
            }
          })
        }
        
      }
    })
  })
})