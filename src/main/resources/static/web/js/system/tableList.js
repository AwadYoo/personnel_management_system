layui.use(['form', 'layer', 'table'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;
    var ctx = $("meta[name='ctx']").attr("content");

    //列表
    var tableIns = table.render({
        elem: '#tableList',
        url: ctx + 'sysManage/tableConf',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 20,
        id: "listTable",
        cols: [[
            {type: "checkbox", field: "id", fixed: "left", width: 50},
            {field: 'nameEN', title: '表名', minWidth: 100, align: "center"},
            {field: 'nameCN', title: '中文名', minWidth: 80, align: "center"},
            {field: 'note', title: '备注', minWidth: 80, align: 'center'},
            {field: 'createUser', title: '创建人', align: 'center'},
            {field: 'createTime', title: '创建时间', align: 'center', minWidth: 150},
            {field: 'updateUser', title: '最新修改人', align: 'center'},
            {field: 'updateTime', title: '最新修改时间', align: 'center', minWidth: 150},
            {title: '操作', minWidth: 135, templet: '#listBar', fixed: "right", align: "center"}
        ]]
    });

    //搜索
    $(".search_btn").on("click", function () {
        table.reload("listTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                key: $(".searchVal").val()  //搜索的关键字
            }
        })
    });

    //添加,修改
    function add(edit) {
        var index;
        if (edit) {
            index = layui.layer.open({
                title: "修改表结构",
                type: 2,
                content: ctx + "sysManage/toTableConf",
                success: function (layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    body.find(".action").val("update");
                    body.find(".id").val(edit.id);
                    body.find(".nameCN").val(edit.nameCN);//
                    body.find(".nameEN").val(edit.nameEN); //
                    body.find(".note").val(edit.note);  //
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            })
        } else {
            index = layui.layer.open({
                title: "创建表结构",
                type: 2,
                content: ctx + "sysManage/toTableConf",
                success: function () {
                    var body = layui.layer.getChildFrame('body', index);
                    body.find(".action").val("create");
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
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

    $(".add_btn").click(function () {
        add();
    })

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('listTable'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            for (var i in data) {
                ids.push(data[i].id);
            }
            layer.confirm('确定删除选中的记录？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: ctx + "sysManage/tableConf/batch",
                    type: "post",
                    dataType: "json",
                    data: {id: ids},
                    success: function () {
                        tableIns.reload();
                        layer.close(index);
                    }
                })
            })
        } else {
            layer.msg("请选择需要删除的记录");
        }
    })

    //列表操作
    table.on('tool(tableList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;
        if (layEvent === 'edit') { //编辑
            add(data);
        } else if (layEvent === 'view') { //删除
            var index = layui.layer.open({
                title: "表结构信息",
                type: 2,
                content: ctx + "sysManage/tableConfInfo/" + data.id,
                success: function () {
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            });
            layui.layer.full(index);
        }
    });


});