
$(function(){
  $.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    success:function(info){
      // console.log(info);
      if(info.error){
        location.href = 'login.html';
      }
      $('.userinfo').html(template('tmp',info));
    }
  })

  // 退出功能
  $('.btn_logout').on('click',function(){
    $.ajax({
      type:'get',
      url:'/user/logout',
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href = 'login.html';
        }
        
      }
    })
  })
})