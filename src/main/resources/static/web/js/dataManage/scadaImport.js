layui.use(['form','layer','upload'],function(){
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        upload = layui.upload;
    var ctx = $("meta[name='ctx']").attr("content");


    upload.render({
        elem: '#selectedFile',
        method: "post",
        url: ctx + 'dataManage/scadaData/import',
        auto: false,
        bindAction: '#importFile',
        accept: 'file',
        exts: 'csv|xls|xlsx',
        before:function (obj) {
          this.data = {"windField": $("[name='windField']").val()};
        },
        done: function(res){
            if(res.code == 0){
                layer.msg("数据导入成功");
            }else{
                layer.msg("数据导入失败:" + res.msg, {icon:5} );
            }
        }
    });

    form.on("submit(importFile)", function () {
        return false;
    });

})