$.ajaxPrefilter(function(options){ 
    //修改选项，控制originalOptions，存储jqXHR等 
    options.url = 'http://ajax.frontend.itheima.net' +options.url
    // console.log(options)

    // 为有权限的接口添加headers请求头
    if(options.url.search('/my/') !== -1){
      options.headers={
        Authorization:localStorage.getItem('token') ||''
      }
    }

    options.complete = function(res) {
      console.log(res.responseJSON);
      if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }
}) 
