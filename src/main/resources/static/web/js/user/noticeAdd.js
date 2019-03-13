layui.use(['form', 'layer'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var ctx = $("meta[name='ctx']").attr("content");
    form.on("submit(addNotice)", function (data) {
        //弹出loading
        alert($(".action").val())
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        // 实际使用时的提交信息
        if ($(".action").val() == "create") {
            $.post(ctx + "notice/notices", {
                title: $(".title").val(),
                content: $(".content").val(),
                memo: $(".memo").val()
            }, function (res) {
                if (res.code == 0) {
                    top.layer.close(index);
                    top.layer.msg("公告添加成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    layer.msg(res.msg, {icon: 5});
                }
            });
        } else if ($(".action").val() == "update") {
            $.ajax({
                type: "put",
                url: ctx + "notice/notices/" + $(".id").val(),
                data: {
                    title: $(".title").val(),
                    content: $(".content").val(),
                    memo: $(".memo").val()
                },
                success: function (res) {
                    if (res.code == 0) {
                        top.layer.close(index);
                        top.layer.msg("公告修改成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    } else {
                        layer.msg(res.msg, {icon: 5});
                    }
                }
            });
        }
        // setTimeout(function(){
        //
        // },2000);
        return false;
    })

})