$(function(){
    getUserinfo()

    var layer = layui.layer

    //退出功能实现
    $('#btnlogout').on('click',function() {
      layer.confirm('确定退出登录?',{icon:3,titl:'提示'},function(index) {
          localStorage.removeItem('token')
          location.href = '/login.html'
          layer.close(index)
      })  
    })

})
//获取用户信息
function getUserinfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            // console.log(res);
            if(res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    });
}

//渲染用户图像
function renderAvatar(user) {
    var name = user.nickname ||user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' +name)
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}