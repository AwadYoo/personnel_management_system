layui.use(['jquery','layer'],function(){
    $ = layui.$;
    var layer = parent.layer === undefined ? layui.layer : top.layer;
    $.ajaxSetup({
        complete:function (xhr,status) {
            if(xhr.responseJSON){
                if(xhr.responseJSON.code == 601 ||xhr.responseJSON.code == 600){
                    loginWindow();
                }else if(xhr.responseJSON.error){
                    layer.msg(xhr.responseJSON.message, {icon:5});
                }
            }
        }
    });

//弹出登录窗口
    function loginWindow() {
        layer.open({
            title: false,
            type: 1,
            content: '<div class="admin-header-lock" id="lock-box">' +
            '<div class="input_btn">' +
            '登录信息已失效 请重新登录'+
            '</div>' +
            '<div class="input_btn">' +
            '<input type="text" class="layui-input" autocomplete="off" placeholder="请输入登录名.." name="loginName" id="loginName" />' +
            '</div>' +
            '<div class="input_btn">' +
            '<input type="password" class="layui-input" autocomplete="off" placeholder="请输入密码.." name="password" id="password" />' +
            '</div>' +
            '<div class="input_btn">' +
            '<button class="layui-btn" id="doLogin">登录</button>' +
            '</div>' +
            '</div>',
            closeBtn: 0,
            shade: 0.97,
            success: function () {

            }
        })
        $("#loginName").focus();
    }

//ajax 登录
    $("body").on("click", "#doLogin", function () {
        if ($(this).siblings("#loginName").val() == '') {
            layer.msg("请输入登录名！");
            $(this).siblings("#loginName").focus();
        } else if ($(this).siblings("#password").val() == '') {
            layer.msg("请输入密码！");
            $(this).siblings("#password").focus();
        } else {
            $.post(ctx + "login", {"password": $("#password").val(),"username":$("#loginName").val()}, function (result) {
                    if(result.code && result.code == 200) {
                        layer.closeAll("page");
                        layer.msg("登录成功");
                    }else{
                        layer.msg("用户名或密码错误！");
                    }
                }
            )
        }
    });

    $(document).on('keydown', function (event) {
        var event = event || window.event;
        if (event.keyCode == 13) {
            $("#doLogin").click();
        }
    });

});