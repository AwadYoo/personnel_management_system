layui.use(['form','layer','table','laytpl'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laytpl = layui.laytpl,
        table = layui.table;
    var ctx = $("meta[name='ctx']").attr("content");

    //用户列表
    var tableIns = table.render({
        elem: '#unitList',
        url : ctx + 'sysManage/unit',
        cellMinWidth : 95,
        page : true,
        height : "full-125",
        limits : [10,15,20,25],
        limit : 20,
        id : "unitListTable",
        cols : [[
            {type: "checkbox", field:"id", fixed:"left", width:50},
            {field: 'nameCN', title: '单位名', minWidth:80, align:"center"},
            {field: 'nameEN', title: '英文名', minWidth:100, align:"center"},
            {field: 'value', title: '字母表示', minWidth:80, align:'center'},
            {field: 'createUser', title: '创建人',  align:'center'},
            {field: 'createTime', title: '创建时间', align:'center',minWidth:150},
            {field: 'updateUser', title: '最新修改人',  align:'center'},
            {field: 'updateTime', title: '最新修改时间', align:'center',minWidth:150},
            {title: '操作', minWidth:145, templet:'#unitListBar',fixed:"right",align:"center"}
        ]]
    });

    //搜索
    $(".search_btn").on("click",function(){
        //if($(".searchVal").val() != ''){
            table.reload("unitListTable",{
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
    function addUnit(edit){
        var index;
            if(edit){
            index = layui.layer.open({
                title: "修改数据单位",
                type: 2,
                content: ctx + "sysManage/unitAdd",
                success: function (layero, index) {
                    var body = layui.layer.getChildFrame('body', index);
                    body.find(".action").val("update");
                    body.find(".id").val(edit.id);
                    body.find(".nameCN").val(edit.nameCN);//
                    body.find(".nameEN").val(edit.nameEN); //
                    body.find(".value").val(edit.value);  //
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回数据单位列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            })
        }else {
            index = layui.layer.open({
                title: "添加数据单位",
                type: 2,
                content: ctx + "sysManage/unitAdd",
                success: function () {
                    var body = layui.layer.getChildFrame('body', index);
                    body.find(".action").val("create");
                    setTimeout(function () {
                        layui.layer.tips('点击此处返回数据单位列表', '.layui-layer-setwin .layui-layer-close', {
                            tips: 3
                        });
                    }, 500)
                }
            })
        }
        layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        $(window).on("resize",function(){
            layui.layer.full(index);
        })
    }
    $(".addUnit_btn").click(function(){
        addUnit();
    })

    //批量删除
    $(".delAll_btn").click(function(){
        var checkStatus = table.checkStatus('unitListTable'),
            data = checkStatus.data,
            ids = [];
        if(data.length > 0) {
            for (var i in data) {
                ids.push(data[i].id);
            }
            layer.confirm('确定删除选中的记录？', {icon: 3, title: '提示信息'}, function (index) {
                $.ajax({
                    url : ctx + "sysManage/unit/batch",
                    type : "post",
                    dataType : "json",
                    data:{id:ids},
                    success: function () {
                        tableIns.reload();
                        layer.close(index);
                    }
                })
            })
        }else{
            layer.msg("请选择需要删除的记录");
        }
    })

    //列表操作
    table.on('tool(unitList)', function(obj){
        var layEvent = obj.event,
            data = obj.data;

        if(layEvent === 'edit'){ //编辑
            addUnit(data);
        }else if(layEvent === 'del'){ //删除
            layer.confirm('确定删除此记录？',{icon:3, title:'提示信息'},function(index){
                 $.ajax({
                     type:"delete",
                     url: ctx + "sysManage/unit/" + data.id,
                     success: function(data){
                         if(data.code == 0) {
                             tableIns.reload();
                             layer.close(index);
                         }else{
                             layer.msg(data.msg, {icon:5});
                         }
                     }
                 })
            });
        }
    });


})