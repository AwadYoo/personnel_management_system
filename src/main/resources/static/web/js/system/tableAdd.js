layui.use(['form','layer'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var ctx = $("meta[name='ctx']").attr("content");
    form.on("submit(add)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息
        if($(".action").val() == "create") {
            $.post(ctx + "sysManage/tableConf", {
                nameCN: $(".nameCN").val(),//
                nameEN: $(".nameEN").val(),//
                note: $(".note").val()  //
            }, function (res) {
                if (res.code == 0) {
                    top.layer.close(index);
                    top.layer.msg("表结构创建成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    layer.msg(res.msg, {icon: 5});
                }
            });
        }else if($(".action").val() == "update"){
            $.ajax({
                type:"put",
                url: ctx + "sysManage/tableConf/" +  $(".id").val(),
                data: {
                    nameCN: $(".nameCN").val(),//
                    nameEN: $(".nameEN").val(),//
                    note: $(".note").val()  //
                },
                success:function (res) {
                    if (res.code == 0) {
                        top.layer.close(index);
                        top.layer.msg("表结构修改成功！");
                        layer.closeAll("iframe");
                        //刷新父页面
                        parent.location.reload();
                    } else {
                        layer.msg(res.msg, {icon: 5});
                    }
                }
            });
        }
        return false;
    })

})