$.ajaxPrefilter(function(options){ 
    //修改选项，控制originalOptions，存储jqXHR等 
    options.url = 'http://ajax.frontend.itheima.net' +options.url
    console.log(options.url)
  })