layui.use(['form','layer'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var ctx = $("meta[name='ctx']").attr("content");

    $.getJSON(ctx + "dataManage/windField", function (res) {
        if (res.code == 0) {
            var selectCom = $("[name='windField']");
            for (var i = 0; i < res.data.length; i++) {
                selectCom.append("<option value='" + res.data[i].id + "'>" + res.data[i].name + "</option>");
            }
            form.render();
        } else {
            layer.msg("风场数据获取失败", {icon: 5});
        }
    });

    var windFieldValue = -1;
    form.on('select(windField)', function (option) {
        if (option.value != windFieldValue) {
            var selectCom = $("[name='windFan']");
            selectCom.empty();
            selectCom.append("<option value='-1'>选择风机</option>");
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

    $(".export_btn").click(function () {
        var fieldId = $("[name='windField']").val();
        var fanId = $("[name='windFan']").val();
        if(fieldId == -1 && fanId == -1){
            layer.confirm('没有选择风场和风机，将下载全部数据',{btn:['继续','取消']}, function () {
                var form = $('<form></form>').attr('action', ctx + 'dataManage/scadaData/export').attr('method','post');
                form.append($('<input></input>').attr('type','hidden').attr('name','id').attr('value',fieldId + ":" + fanId));
                form.appendTo('body').submit().remove();
                layer.msg("开始下载");

            },function () {
                layer.msg("您已取消下载");
            });
        }else {
            var form = $('<form></form>').attr('action', ctx + 'dataManage/scadaData/export').attr('method','post');
            form.append($('<input></input>').attr('type','hidden').attr('name','id').attr('value',fieldId + ":" + fanId));
            form.appendTo('body').submit().remove();
            layer.msg("开始下载");
        }
    });


})