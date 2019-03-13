layui.use(['form', 'layer', 'laydate'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var laydate = layui.laydate;
    var ctx = $("meta[name='ctx']").attr("content");
    laydate.render({
        elem: '#timeAt',
        type: 'datetime'
    });

    form.on("submit(add)", function (data) {
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        // 实际使用时的提交信息
        $.ajax({
            type: "post",
            url: ctx + "dataManage/metrics/data/add",
            data: data.field,
            //contentType: "application/json",
            success: function (res) {
                top.layer.close(index);
                layer.closeAll("iframe");
                if (res.code == 0) {
                    top.layer.msg("数据添加成功！");
                    layer.closeAll("iframe");
                } else {
                    layer.msg(res.msg, {icon: 5});
                }
            },
            error: function (res) {
                layer.msg(res, {icon: 5});
                top.layer.close(index);
            }
        });
        return false;
    });

})