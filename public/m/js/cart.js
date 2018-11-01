

$(function(){
  // 列表渲染
  
  // 下拉刷新功能
  mui.init({
    pullRefresh : {
      container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
      down : {
        auto:true,
        callback :function(){
          $.ajax({
            type:'get',
            url:'/cart/queryCart',
            success:function(info){
              // console.log(info);
              
              setTimeout(function(){
                if(info.error){
                  location.href = 'login.html?backUrl=' + location.href;
                }
                $('.mui-table-view').html(template('tmp',{list:info}));
                // 结束下拉刷新
                mui('.mui-scroll-wrapper')
                  .pullRefresh()
                  .endPulldownToRefresh();
              },1000)
            }
          })
        } 
      }
    }
  });

  // 删除功能
  $('#OA_task_2').on('tap','.btn_delete',function(){
    var id = $(this).data('id');
    mui.confirm('你确定要删除商品？','温馨提示',['取消','确定'],function(e){
      if(e.index === 1){
        // 发送ajax请求
        $.ajax({
          type:'get',
          url:'/cart/deleteCart',
          data:{
            id:id
          },
          success:function(info){
            // console.log(info);
            // 重新下拉刷新一次
            mui('.mui-scroll-wrapper')
              .pullRefresh()
              .pulldownLoading()
            
          }
        })

      }
    })
    
  })

  // 修改功能
  $('#OA_task_2').on('tap','.btn_edit',function(){
   var obj = this.dataset;
   console.log(obj);
   
  var html = template('tmp2',obj);
    html = html.replace(/\n/g,'');
   mui.confirm(html,'编辑商品',['取消','确定'],function(e){
     if(e.index === 1){
      // 发送ajax请求去修改购物车信息
      var id = obj.id;
      var num = $('.mui-numbox-input').val();
      var size = $('.size span.active').text();
      $.ajax({
        type:'post',
        url:'/cart/updateCart',
        data:{
          id:id,
          num:num,
          size:size
        },
        success:function(info){
          console.log(info);
          if(info.success){
            // 重新刷新页面
            // 重新下拉刷新一次
            mui('.mui-scroll-wrapper')
              .pullRefresh()
              .pulldownLoading()
          }
          
        }
      })
     }
   })
   
  //  让尺寸能够选择
   $('.size span').on('click',function(){
    //  console.log('哈哈');
    $(this).addClass('active').siblings().removeClass('active');
     
   })
  //  初始化numbox
    mui('.mui-numbox').numbox();
  })

  // 计算总金额功能
  $('#OA_task_2').on('change','.ck',function(){
    var total = 0;
    var $checked = $('.ck:checked');
    $checked.each(function(i,e){
      total += $(this).data('num')*$(this).data('price');
      
    })
    // console.log(total);
    total = total.toFixed(2);
    // console.log(total);
    $('.total span').html(total);
    
    
  })
})