layui.use(['form', 'layer', 'table'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table;
    var ctx = $("meta[name='ctx']").attr("content");

    var colsConf = [];
    var colsTitle = [];
    colsConf.push({type: "checkbox", field: "id", fixed: "left", width: 25});
    colsTitle.push("id")
    /*var index = layer.load(1, {
        shade: [0.1, '#fff'] //0.1透明度的白色背景
    });*/

    //列表
   /* var tableIns = table.render({
        elem: '#dataList',
        url: ctx + 'dataManage/scadaData?cols=' + colsTitle,
        cellMinWidth: 95,
        page: true,
        height: "full-125",
        limits: [10, 15, 20, 25],
        limit: 20,
        id: "listTable",
        cols: [colsConf]
    });*/

    //列表
    var tableIns = table.render({
        elem: '#dataList',
        url : ctx + 'dataManage/metricNames',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 15,
        id : "listTable",
        cols : [[
            {type: "checkbox", field:"id", fixed:"left", width:50},
            {field: 'name', title: '测点名称', minWidth:100, align:"center"},
            {title: '操作', width:200, templet:'#listBar',fixed:"right",align:"center"}
        ]]
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

    /*var windFieldValue = -1;
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
    });*/

    //搜索
    $(".search_btn").on("click", function () {
        //if($(".searchVal").val() != ''){
        table.reload("listTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                name: $(".searchVal").val() //搜索的关键字
            }
        })
        //}else{
        //layer.msg("请输入搜索的内容");
        //}
    });

    //重新加载
    $(".reload_btn").on("click", function () {
        //if($(".searchVal").val() != ''){
        $.get(ctx + 'dataManage/metricNames/reload');
        table.reload("listTable", {
            page: {
                curr: 1 //重新从第 1 页开始
            },
            where: {
                name: $(".searchVal").val() //搜索的关键字
            }
        })
        //}else{
        //layer.msg("请输入搜索的内容");
        //}
    });

    //添加,修改
    function addData(edit) {
        var index;
        if (edit) {
            index = layui.layer.open({
                title: "修改Scada数据",
                type: 2,
                content: ctx + "dataManage/scadaUpdate/" + edit.id,
                success: function (layero, index) {
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回数据单位列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            })
        } else {
            index = layui.layer.open({
                title: "添加Scada数据",
                type: 2,
                content: ctx + "dataManage/scadaAdd",
                success: function () {
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回数据单位列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500);
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
        addData();
    })

    //批量删除
    $(".delAll_btn").click(function () {
        var checkStatus = table.checkStatus('listTable'),
            data = checkStatus.data,
            ids = [];
        if (data.length > 0) {
            for (var i in data) {
                ids.push(data[i].name);
            }
            layer.confirm('确定删除选中的测点, 测点下的数据会被全部删除？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url: ctx + "dataManage/metrics",
                    type: "post",
                    dataType: "json",
                    data: {names: ids},
                    success: function () {
                        layer.close(index);
                        tableIns.reload();
                    }
                })
            })
        } else {
            layer.msg("请选择需要删除的记录");
        }
    });
    
    $(".import_btn").click(function () {

        var index = layer.open({
            title : "导入Scada数据",
            type : 2,
            area : ["480px","320px"],
            content : ctx + "dataManage/toScadaImport",
            success : function(layero, index){
                setTimeout(function(){
                    layui.layer.tips('点击此处返回友链列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                },500)
            }
        })

    });

    $(".export_btn").click(function () {
        var form = $('<form></form>').attr('action', ctx + 'dataManage/metrics/export').attr('method','post');
        form.appendTo('body').submit().remove();
        layer.msg("开始下载");
    });

    //列表操作
    table.on('tool(dataList)', function (obj) {
        var layEvent = obj.event,
            data = obj.data;

        if (layEvent === 'edit') { //编辑
            addData(data);
        } else if (layEvent === 'del') { //删除
            layer.confirm('确定删除此测点，此测点下的所有数据都会被删除？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    type: "delete",
                    url: ctx + "dataManage/metric/" + data.name,
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