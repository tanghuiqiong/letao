
// 发送ajax请求，获取用户列表信息
$(function(){
  var page = 1;
  var pageSize = 5;
  render();
  // 启用禁用功能
  var id,isDelete;
  $('tbody').on('click','button',function(){
    $('#userModal').modal('show');
    id = $(this).parent().data('id');
   isDelete = $(this).hasClass('btn-success')? 0 :1;    
    // console.log(isDelete);
  })
  $('.confirm').on('click',function(){
    $.ajax({
      url:'/user/updateUser',
      type:'post',
      data:{
        id:id,
        isDelete:isDelete
      },
      success:function(info){
        // console.log(info);
        $('#userModal').modal('hide');
        render()
      }
    })
  })
 function render(){
  $.ajax({
    url:'/user/queryUser',
    type:'get',
    data:{
      page:page,
      pageSize:pageSize,
    },
    success:function(info){
      console.log(info);
      $('tbody').html(template('tmp',info))
      $('#paginator').bootstrapPaginator({
        bootstrapMajorVersion:3,
        currentPage:page,
        // numberOfPages:10,
        totalPages:Math.ceil(info.total/info.size),
        onPageClicked:function(a,b,c,p){
          page = p;
          render();
        }
      })
    }

  })
 }
})