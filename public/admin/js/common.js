$(document).ajaxStart(function(){
    NProgress.start();
  })
  $(document).ajaxStop(function(){
    setTimeout(function(){
      NProgress.done();

    },500)
  })

// 二级分类显示和隐藏
$('.category > a').on('click',function(){
  $(this).next().slideToggle();
})

//给侧边栏切换按钮注册点击事件
$('.icon_menu').on('click',function(){
  $('body').toggleClass('active');
  $('.lt_aside').toggleClass('active');
})
//给退出按钮注册点击事件
$('.icon_logout').on('click',function(){
  $('#logoutModal').modal('show');
})
$('.logout').on('click',function(){
  $.ajax({
    url:'/employee/employeeLogout',
    type:'get',
    success:function(info){
      // console.log(info);
      if(info.success){
        location.href = 'login.html';
      }
      
    }
  })
})