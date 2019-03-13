layui.use(['form', 'layer', 'laydate'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var laydate = layui.laydate;
    var ctx = $("meta[name='ctx']").attr("content");
    laydate.render({
        elem: '#timeAt',
        type: 'datetime',
        format: 'yyyy-MM-dd HH:mm:ss'
    });


    /*$.getJSON(ctx + "dataManage/windField", function (res) {
        if (res.code == 0) {
            var selectCom = $("[name='windField']");
            for (var i = 0; i < res.data.length; i++) {
                selectCom.append("<option value='" + res.data[i].id + "'>" + res.data[i].name + "</option>");
            }
            layui.form.render();
        } else {
            layer.msg("风场数据获取失败", {icon: 5});
        }
    });*/

    var windFieldValue = $("[name='windFanId']").val();
    form.on('select(windField)', function (option) {
        if (option.value != windFieldValue) {
            var selectCom = $("[name='windFanId']");
            selectCom.empty();
            selectCom.append("<option value='-1'>选风机</option>");
            windFieldValue = option.value;
            selectCom.val('-1');
            layui.form.render();
            if (option.value != -1) {
                $.getJSON(ctx + "dataManage/windFan/byField/" + option.value, function (res) {
                    if (res.code == 0) {
                        for (var i = 0; i < res.data.length; i++) {
                            selectCom.append("<option value='" + res.data[i].id + "'>" + res.data[i].code + "</option>");
                        }
                        layui.form.render();
                    } else {
                        layer.msg(res.msg, {icon: 5});
                    }
                })
            }
        }
    });
    form.on("submit(add)", function (data) {
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        // 实际使用时的提交信息

        $.ajax({
            type: "put",
            url: ctx + "dataManage/scadaData/" + $("#id").val(),
            data: JSON.stringify(data.field),
            contentType: "application/json",
            success: function (res) {
                if (res.code == 0) {
                    top.layer.close(index);
                    top.layer.msg("scada 数据修改成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    top.layer.close(index);
                    layer.msg("scada数据修改失败:" + res.msg, {icon: 5});
                }
            }
        });
        return false;
    })

})