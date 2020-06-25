$(function() {
    $('#link_reg').on('click',function() {
        $('.reg-box').show();
        $('.login-box').hide();
    })
    $('#link_login').on('click',function() {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //自定义校验
    var form = layui.form;

    form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位,且不能出现空格'],
    repwd: function(value) {
        var pwd = $('.reg-box [name=password]').val()
        if(pwd !== value) {
            return '两次密码不一致'
        }
    }
    })
    
    // console.log(1)
    //设置注册表单提交监听
    var layer = layui.layer
    $('#form_reg').on('submit', function(e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        // 2. 发起Ajax的POST请求
        var data = {
          username: $('#form_reg [name=username]').val(),
          password: $('#form_reg [name=password]').val()
        }
        $.post('/api/reguser', data, function(res) {
          if (res.status !== 0) {
            return layer.msg(res.message)
          }
          layer.msg('注册成功，请登录！')
          // 模拟人的点击行为
          $('#link_login').click()
        })
    })

    //监听登录表单提交事件
    $('#form_login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            type:'POST',
            data:$(this).serialize(),
            success:function(res) {
                // console.log(res.token);
                if(res.status !== 0) {
                    return layer.msg('登录失败')
                }
                localStorage.setItem('token',res.token)
                layer.msg('登录成功')
                location.href ='/index.html'
            }
        })
    })
})