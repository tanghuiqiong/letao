
$(function(){
  function render(){
   
    $('.lt_product').html(' <div class="loading"></div>');
      // 发送ajax请求，根据关键字获取到对应商品的列表数据
    
      // 1.如何确定是否传递排序参数？？只要找到lt_sort下的类active
      // 2.如何确定传price还是num？？给库存和价格添加一个自定义属性
      // 3.如何确定传1还是传2的问题？？判断span是否有fa-angle-down:2  1
     var param = {
          proName:key,
          page:1,
          pageSize:100
     }
    //  确定是否需要传排序参数
    var $active = $('.lt_sort a.active');
    if($active.length === 1){
      var type = $active.data('type');
      var value = $active.children().hasClass('fa-angle-down')?2:1;
      // console.log(type,value);
      param[type] = value;

    }
    
    
  $.ajax({
    type:'get',
    url:'/product/queryProduct',
    data:param,
    success:function(info){
      // console.log(info);
      setTimeout(function(){
      $('.lt_product').html(template('tmp2',info));
        
      },1000)
    }
  })
 }

 var key = getSearch().key;
$('.lt_search input').val(key);
 render();
  // 商品搜索功能
  // 给按钮注册点击事件
  $('.lt_search button').on('click',function(){
    // 获取文本框的值
    var key = $('.lt_search input').val().trim();
    // console.log(value);
    if(!key){
      mui.toast('请输入关键字');
      return;
    }
    // 跳转页面key改成对应的value值
    window.location.href = 'searchList.html?key='+key;
    
  })

  // 商品排序功能-样式处理
  // 给lt_sort的里a注册点击事件
  // 判断当前a是否有active类，
    // 如果有，找到当前a下的span，改变箭头的方向
    // 如果没有，给当前a添加active类，并且移除其他a的active，让所有箭头都向下
    $('.lt_sort a[data-type]').on('click',function(){
      var $this = $(this);
      if($this.hasClass('active')){
        $this
          .children()
          .toggleClass('fa-angle-down')
          .toggleClass('fa-angle-up');
      }else{
        $this
          .addClass('active')
          .siblings()
          .removeClass('active');
        // 让所有箭头往下
        $('.lt_sort span')
          .removeClass('fa-angle-up')
          .addClass('fa-angle-down')
      }
     
      render();
    })

})