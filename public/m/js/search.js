
$(function(){
  //从localStorage中获取数据
  function getHistory(){
    var history = localStorage.getItem('history');
     history = JSON.parse(history) || [];
      return history;
  }
  //  渲染
  function render(){
    var history = getHistory();
    $('.lt_history').html(template('tmp2',{list:history}));
  }
  render();

  // 删除某条历史记录的功能
  // 给删除的按钮注册点击事件
  $('.lt_history').on('click','.btn_delete',function(){
    // 获取到删除的下标
    var idx = $(this).data('index');
    mui.confirm('确定要删除这条记录吗','温馨提示',['否','是'],function(e){
      if(e.index === 1){
        // console.log(idx);
        // 获取localStorage中的数据
        var history = getHistory();
        // 根据数组下标删除数组对应的元素
        history.splice(idx,1);
        // 把修改后的数组存回localStorage中
        localStorage.setItem('history',JSON.stringify(history));
    
        // 重新渲染
        render();

      }
    })

    
  })

  // 清空历史记录的功能
  // 给清空按钮注册点击事件
  $('.lt_history').on('click','.btn_empty',function(){
    mui.confirm('确定要清除历史记录吗','提示',['确定','取消'],function(e){
      if(e.index == 0){

        localStorage.removeItem('history');
        render();
      }
    })
  })

  // 搜索功能
  // 给搜索按钮注册点击事件
  $('.lt_search button').on('click',function(){
    // 获取到文本框的值,搜索关键字
    var value = $('.lt_search input').val().trim();
    // console.log(value);
    if(!value){
      // alert('不能为空哦！');
      mui.toast('请输入关键字');
      return;
    }
    // 获取到历史记录
    var history = getHistory();
    //判断如果这个关键字在数组中已经存在了，先删除这个关键字
    var idx = history.indexOf(value);
    if(idx >= 0){
      history.splice(idx,1);//如果value在数组中存在了重复了，就删除
    }
    if(history.length >= 10){
      history.pop()//历史记录最多只能保存十条，如果超过了10条，删除最老的
    }
    // 把搜索关键字加到数组最前面
    history.unshift(value);
    // 重新重回数组
    localStorage.setItem('history',JSON.stringify(history));
    render();

    // 跳转到商品列表页面
    location.href = "searchList.html?key=" + value;
  })

 
})