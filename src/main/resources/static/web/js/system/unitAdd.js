layui.use(['form','layer'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var ctx = $("meta[name='ctx']").attr("content");
    form.on("submit(addUnit)",function(data){
        //弹出loading
        var index = top.layer.msg('数据提交中，请稍候',{icon: 16,time:false,shade:0.8});
        // 实际使用时的提交信息
        if($(".action").val() == "create") {
            $.post(ctx + "sysManage/unit", {
                nameCN: $(".nameCN").val(),//
                nameEN: $(".nameEN").val(),//
                value: $(".value").val()  //
            }, function (res) {
                if (res.code == 0) {
                    top.layer.close(index);
                    top.layer.msg("数据单位添加成功！");
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
                url: ctx + "sysManage/unit/" +  $(".id").val(),
                data: {
                    nameCN: $(".nameCN").val(),//
                    nameEN: $(".nameEN").val(),//
                    value: $(".value").val()  //
                },
                success:function (res) {
                    if (res.code == 0) {
                        top.layer.close(index);
                        top.layer.msg("数据单位修改成功！");
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