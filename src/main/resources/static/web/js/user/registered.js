layui.use(['form', 'layer'], function () {
    var form = layui.form
    layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
    var ctx = $("meta[name='ctx']").attr("content");
    form.on("submit(addUser)", function (data) {
        //弹出loading
        alert($(".action").val())
        var index = top.layer.msg('数据提交中，请稍候', {icon: 16, time: false, shade: 0.8});
        // 实际使用时的提交信息
            $.post(ctx + "user/registered", {
                loginId: $(".loginId").val(),//登录名
                name: $(".userName").val(),//姓名
                email: $(".userEmail").val(),  //邮箱
                phone: $("#_phone").val(),
                job: $("#_job").val(),
                deptId: depId,
                sex: data.field.sex,  //性别
                status: data.field.userStatus,    //用户状态
                note: $(".userDesc").val()    //用户简介
            }, function (res) {
                if (res.code == 0) {
                    top.layer.close(index);
                    top.layer.msg("用户注册申请提交成功！");
                    layer.closeAll("iframe");
                    //刷新父页面
                    parent.location.reload();
                } else {
                    layer.msg(res.msg, {icon: 5});
                }
            });
        // setTimeout(function(){
        //
        // },2000);
        return false;
    })

    $.ajax({
        type: "get",
        url: "/dept/getDept",
        success: function (res) {
            if (res.code == 0) {
                var deptData = res.data;
                var deptHtml = '';
                if (deptData.length > 0) {
                    deptData.forEach(function (item) {
                        deptHtml += ' <option value="' + item.id + '">' + item.name + '</option>'
                    })
                }
                $("#deptSelect").html(deptHtml);
                form.render('select');
            } else {
                layer.msg(res.msg, {icon: 5});
            }
        }
    });
    var depId = '';
    form.on('select(deptSelect)', function (data) {
        depId = data.value;
    });


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