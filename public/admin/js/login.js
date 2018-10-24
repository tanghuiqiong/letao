$(function(){
  $('form').bootstrapValidator({
    fields:{
      username:{
        validators:{
          noEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:2,
            max:6,
            message:'用户名长度必须是2-6位'
          },
          callback:{
            message:'用户名不存在'
          }
        }
      },
      password:{
        validators:{
          noEmpty:{
            message:'用户名不能为空'
          },
          stringLength:{
            min:6,
            max:12,
            message:'用户密码的长度必须是6-12位'
          },
          callback:{
            message:'密码错误'
          }
        }
      },
      
    },
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
  });
  $('form').on('success.form.bv',function(e){
    e.preventDefault();
    $.ajax({
      url:"/employee/employeeLogin",
      type:'post',
      data:$('form').serialize(),
      success:function(info){
        // console.log(info);
        if(info.success){
          location.href = 'index.html'
        }
        if(info.error === 1000){
          // alert('用户名不存在');
          $('form')
            .data('bootstrapValidator')
            .updateStatus('username','INVALID','callback')
        } 
        if(info.error === 1001){
         $('form')
            .data('bootstrapValidator')
            .updateStatus('password','INVALID','callback')
        }
      }
    })
  })

  //重置表单功能
  $('[type=reset]').on('click',function(){
    $('form')
        .data('bootstrapValidator')
        .resetForm(true)
  })
})