$(function(){
  // 点击登录按钮发送ajax请求
  $('.btn_login').on('click',function(){
    var username = $('[name=username]').val();
    var password = $('[name=password]').val();
    if(!username){
      mui.toast('请输入用户名');
      return;
    }
    if(!password){
      mui.toast('请输入密码')
      return;
    }
    $.ajax({
      type:'post',
      url:'/user/login',
      data:{
        username:username,
        password:password
      },
      success:function(info){
        // console.log(info);
        if(info.error){
          mui.toast(info.message);
        }
        if(info.success){
          // 如果登录成功了，跳到哪去了
          // 判断是否有回跳，判断是否有回跳的地址
          // 判断地址栏是否有backUrl参数
          var search = location.search;
          if(search.indexOf('backUrl') === -1){
            //如果没有回跳就直接回个人中心
            location.href = 'user.html';
          }else{
            // 如果有回跳，就调回之前的页面
            location.href = search.replace('?backUrl=','');
          }
          
        }
      }
  
    })
  })
})