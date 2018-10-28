
$(function(){
  $.ajax({
    type:'get',
    url:'/category/queryTopCategory',
    success:function(info){
      console.log(info);
      $('.cart_left ul').html(template('tmp',info));
      renderSecond(info.rows[0].id)
    }
  });
  $('.cart_left ul').on('click','li',function(){
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
    var id = $(this).data('id');
    // console.log(id);
      renderSecond(id)
  })
  function renderSecond(id){
    $.ajax({
      type:'get',
      url:'/category/querySecondCategory',
      data:{
        id:id
      },
      success:function(info){
        console.log(info);
        $('.cart_right ul').html(template('tmp2',info))
      }
    })
  }
})