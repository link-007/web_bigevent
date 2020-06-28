$(function() {
    var form = layui.form
    form.verify({
        nickname:function(value) {
            if(value.length > 6) {
                return '昵称长度1~6之间'
            }
        }
    })
    initUserInfo()

    //初始化同户信息
    function initUserInfo() {
        $.ajax({
            type:'GET',
            url:'/my/userinfo',
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户信息失败')
                }
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单数据
    $('#btnReset').on('click',function(e) {
        e.preventDefault()
        initUserInfo()
    })

    //监听表单的提交事件
    $('.layui-form').on('submit',function(e) {
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg('更新用户信息失败! ')
                }
                layer.msg('更新用户信息成功! ')
                window.parent.getUserinfo()
            }
        })
    })
})