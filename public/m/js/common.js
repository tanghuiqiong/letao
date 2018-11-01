// 初始化滚动区域
mui('.mui-scroll-wrapper').scroll({
  indicators: false,
});

// 初始化轮播图
mui('.mui-slider').slider({
  interval:2000
})


//去地址栏中获取到关键字
function getSearch(){
  //通过location.search获取到所有的参数
  var search = location.search;
  // 对字符串进行解码得到中文
  search = decodeURI(search);
  // 去取？从1开始截取全部
  search = search.slice(1);
  // 根据&符切换成数组
  var arr = search.split('&');
  var obj = {};
  for(var i = 0;i< arr.length;i++){
    // 对arr[i]=进行切割
    var key = arr[i].split('=')[0];
    var value = arr[i].split('=')[1];
    obj[key] = value;
  }
  return obj;
}