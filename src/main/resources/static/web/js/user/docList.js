layui.use(['form', 'layer', 'table', 'laytpl'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;
    var ctx = $("meta[name='ctx']").attr("content");

    //用户列表
    var tableIns = table.render({
        elem: '#docList',
        url: ctx + 'doc/getList',
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 20,
        id: "docListTable",
        cols: [[
            {type: "checkbox", field: "id", fixed: "left", width: 50},
            {field: 'name', title: '文件名称', minWidth: 100, align: "center"},
            {field: 'suffix', title: '文件格式', minWidth: 100, align: "center"},
            {field: 'size', title: '文件大小(kb)', minWidth: 100, align: "center"},
            // {
            //     field: 'userEmail', title: '用户邮箱', minWidth: 200, align: 'center', templet: function (d) {
            //         if (d.userEmail) {
            //             return '<a class="layui-blue" href="mailto:' + d.userEmail + '">' + d.userEmail + '</a>';
            //         } else {
            //             return '';
            //         }
            //     }
            // },
            // {field: 'userSex', title: '用户性别', align: 'center'},
            // {field: 'phone', title: '手机', align: 'center'},
            // {field: 'dept', title: '部门', align: 'center'},
            // {field: 'job', title: '职位', align: 'center'},
            // {field: 'userStatus', title: '用户状态', align: 'center'},
            {field: 'createUser', title: '创建者', align: 'center', minWidth: 150},
            // {field: 'updateUser', title: '修改者', align: 'center', minWidth: 150},
            {field: 'createTime', title: '创建时间', align: 'center', minWidth: 150},
            // {field: 'updateTime', title: '修改时间', align: 'center', minWidth: 150},
            {type: "hidden", field: "memo"},
            {title: '操作', minWidth: 155, templet: '#docListBar', fixed: "right", align: "center"}
        ]],
        done: function () {
            $("[data-field='memo']").css('display', 'none');
        }
    });

    //搜索【此功能需要后台配合，所以暂时没有动态效果演示】
    $(".search_btn").on("click", function () {
        //if($(".searchVal").val() != ''){
        table.reload("docListTable", {
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

    //添加,修改
    function addDoc(edit) {
        var index;
        if (edit) {

        } else {
            index = layui.layer.open({
                title: "上传附件",
                type: 2,
                content: ctx + "admin/docAdd",
            })
        }
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize", function () {
            layui.layer.full(index);
        })
    }

    $(".addNews_btn").click(function () {
        addDoc();
    })

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('docListTable'),
            data = checkStatus.data,
            newsId = [];
        if (data.length > 0) {
            for (var i in data) {
                newsId.push(data[i].id);
            }
            layer.confirm('确定删除选中的附件？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: ctx + "doc/docs/batch",
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
            layer.msg("请选择需要删除的附件");
        }
    })

    //列表操作
    table.on('tool(docList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            addDept(data);
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
                    url: ctx + "doc/docs/" + data.id + "/" + action,
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
            layer.confirm('确定删除此附件？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: "delete",
                    url: ctx + "doc/docs/" + data.id,
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
        } else if (layEvent === 'download') {
            window.location.href = ctx + "doc/download/" + data.id;
        }
    });

})