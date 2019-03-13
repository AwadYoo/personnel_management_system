layui.use(['form', 'layer'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var ctx = $("meta[name='ctx']").attr("content");
    form.on("submit(addDept)", function (data) {
        //弹出loading
        alert($(".action").val())
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        // 实际使用时的提交信息
        if ($(".action").val() == "create") {
            $.post(ctx + "dept/depts", {
                name: $(".name").val(),
                code: $(".code").val(),
                leader: $(".leader").val(),
                memo: $(".memo").val()
            }, function (res) {
                if (res.code == 0) {
                    top.layer.close(index);
                    top.layer.msg("部门添加成功！");
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
                url: ctx + "dept/depts/" + $(".id").val(),
                data: {
                    name: $(".name").val(),
                    code: $(".code").val(),
                    leader: $(".leader").val(),
                    memo: $(".memo").val()
                },
                success: function (res) {
                    if (res.code == 0) {
                        top.layer.close(index);
                        top.layer.msg("部门修改成功！");
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

    // $.ajax({
    //     type: "get",
    //     url: "/getDept",
    //     success: function (res) {
    //         if (res.code == 0) {
    //             var deptData = res.data;
    //             var deptHtml = '';
    //             if (deptData.length > 0) {
    //                 deptData.forEach(function (item) {
    //                     deptHtml += ' <option value="' + item.id + '">' + item.name + '</option>'
    //                 })
    //             }
    //             $("#deptSelect").html(deptHtml);
    //             form.render('select');
    //         } else {
    //             layer.msg(res.msg, {icon: 5});
    //         }
    //     }
    // });
    // var depId = '';
    // form.on('select(deptSelect)', function (data) {
    //     depId = data.value;
    // });


    //格式化时间
    /* function filterTime(val){
         if(val < 10){
             return "0" + val;
         }else{
             return val;
         }
     }*/
    //定时发布
    // var time = new Date();
    // var submitTime = time.getFullYear()+'-'+filterTime(time.getMonth()+1)+'-'+filterTime(time.getDate())+' '+filterTime(time.getHours())+':'+filterTime(time.getMinutes())+':'+filterTime(time.getSeconds());

})