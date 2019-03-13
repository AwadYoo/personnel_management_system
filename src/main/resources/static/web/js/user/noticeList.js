layui.use(['form', 'layer', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;
    var ctx = $("meta[name='ctx']").attr("content");

    //用户列表
    var tableIns = table.render({
        elem: '#noticeList',
        url: ctx + 'notice/getList',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 20,
        id: "noticeListTable",
        cols: [[
            {type: "checkbox", field: "id", fixed: "left", width: 50},
            {field: 'title', title: '公告标题', minWidth: 100, align: "center"},
            {field: 'content', title: '公告内容', minWidth: 100, align: "center"},
            {field: 'memo', title: '备注', align: 'center', minWidth: 150},
            {field: 'createUser', title: '创建者', align: 'center', minWidth: 150},
            {field: 'updateUser', title: '修改者', align: 'center', minWidth: 150},
            {field: 'createTime', title: '创建时间', align: 'center', minWidth: 150},
            {field: 'updateTime', title: '修改时间', align: 'center', minWidth: 150},
            // {type: "hidden", field: "memo"},
            {title: '操作', minWidth: 155, templet: '#noticeListBar', fixed: "right", align: "center"}
        ]],
        // done: function () {
        //     $("[data-field='memo']").css('display', 'none');
        // }
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        //if($(".searchVal").val() != ''){
        table.reload("noticeListTable", {
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

    function addNotice(edit) {
        var index;
        if (edit) {
            index = layui.layer.open({
                title: "修改公告",
                type: 2,
                content: ctx + "admin/noticeAdd",
                success: function (layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    body.find(".action").val("update");
                    body.find(".id").val(edit.id);
                    body.find(".title").val(edit.title);
                    body.find(".content").val(edit.content);
                    body.find(".memo").val(edit.memo);
                    var iframeWindow = layero.find('iframe')[0].contentWindow;
                    iframeWindow.layui.form.render();
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回公告列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            })
        } else {
            index = layui.layer.open({
                title: "添加公告",
                type: 2,
                content: ctx + "admin/noticeAdd",
                success: function () {
                    var body = layui.layer.getChildFrame('body', index);
                    body.find(".action").val("create");
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回用户列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            })
        }
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }

    $(".addNews_btn").click(function () {
        addNotice();
    })

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('noticeListTable'),
            data = checkStatus.data,
            newsId = [];
        if (data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].id);
            }
            layer.confirm('确定删除选中的公告？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: ctx + "notice/notices/batch",
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
            layer.msg("请选择需要删除的公告");
        }
    })

    //列表操作
    table.on('tool(noticeList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            addNotice(data);
        } else if (layEvent === 'usable') { //启用禁用
            var _this = $(this),
                usableText = "是否确定禁用此部门？";
            //btnText = "已禁用";
            var action = "disable";
            if (_this.text() == "已禁用") {
                usableText = "是否确定启用此部门？",
                    //btnText = "已启用";
                    action = "enable";
            }
            layer.confirm(usableText, {
                icon: 3,
                title: '系统提示',
                cancel: function (index) {
                    layer.close(index);
                }
            }, function (index) {
                $.ajax({
                    type: "put",
                    url: ctx + "notice/notices/" + data.id + "/" + action,
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
            layer.confirm('确定删除此公告？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: "delete",
                    url: ctx + "notice/notices/" + data.id,
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