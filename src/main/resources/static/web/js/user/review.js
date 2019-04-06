layui.use(['form', 'layer', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;
    var ctx = $("meta[name='ctx']").attr("content");

    //用户列表
    var tableIns = table.render({
        elem: '#userList',
        url: ctx + 'user/reviews',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 20,
        id: "userListTable",
        cols: [[
            {type: "checkbox", field: "id", fixed: "left", width: 50},
            {field: 'userName', title: '用户姓名', minWidth: 100, align: "center"},
            {field: 'userId', title: '登录名', minWidth: 100, align: "center"},
            {
                field: 'userEmail', title: '用户邮箱', minWidth: 200, align: 'center', templet: function (d) {
                    if (d.userEmail) {
                        return '<a class="layui-blue" href="mailto:' + d.userEmail + '">' + d.userEmail + '</a>';
                    } else {
                        return '';
                    }
                }
            },
            {field: 'userSex', title: '用户性别', align: 'center'},
            {field: 'phone', title: '手机', align: 'center'},
            {field: 'dept', title: '部门', align: 'center'},
            {field: 'job', title: '职位', align: 'center'},
            {field: 'checked', title: '审核状态', align: 'center'},
            {field: 'lastLoginTime', title: '最后登录时间', align: 'center', minWidth: 150},
            {type: "hidden", field: "userDesc"},
            {title: '操作', minWidth: 155, templet: '#userListBar', fixed: "right", align: "center"}
        ]],
        done: function () {
            $("[data-field='userDesc']").css('display', 'none');
        }
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        //if($(".searchVal").val() != ''){
        table.reload("userListTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                key: $(".searchVal").val()  //搜索的关键字
            }
        })
        //}else{
        //layer.msg("请输入搜索的内容");
        //}
    });

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('userListTable'),
            data = checkStatus.data,
            newsId = [];
        if (data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].id);
            }
            layer.confirm('确定删除选中的用户？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: ctx + "user/users/batch",
                    type: "post",
                    dataType: "json",
                    data: {id: newsId},
                    success: function () {
                        tableIns.reload();
                        layer.close(index);
                    }
                })
            })
        } else {
            layer.msg("请选择需要删除的用户");
        }
    })

    //列表操作
    table.on('tool(userList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            addUser(data);
        } else if (layEvent === 'usable') { //启用禁用
            var _this = $(this),
                usableText = "是否确定添加此用户？";
            //btnText = "已禁用";
            var action = "enable";

            layer.confirm(usableText, {
                icon: 3,
                title: '系统提示',
                cancel: function (index) {
                    layer.close(index);
                }
            }, function (index) {
                $.ajax({
                    type: "put",
                    url: ctx + "user/reviewUser/" + data.id + "/" + action,
                    success: function (res) {
                        if (res.code == 0) {
                            tableIns.reload();
                            layer.close(index);
                        }
                    }
                });
            }, function (index) {
                layer.close(index);
            });
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此用户？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: "delete",
                    url: ctx + "user/users/" + data.id,
                    success: function (data) {
                        if (data.code == 0) {
                            tableIns.reload();
                            layer.close(index);
                        } else {
                            layer.msg(data.msg, {icon: 5});
                        }
                    }
                })
            });
        }
    });

})