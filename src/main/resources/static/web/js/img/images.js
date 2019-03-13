layui.config({
	base : "public/web/js/"
}).use(['flow','form','layer','upload'],function(){
    var flow = layui.flow,
        form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        upload = layui.upload,
        $ = layui.jquery;
    var ctx = $("meta[name='ctx']").attr("content");
    //流加载图片
    var imgNums = 15;  //单页显示图片数量
    flow.load({
        elem: '#Images', //流加载容器
        done: function(page, next){ //加载下一页
            $.get(ctx + "img/list",function(res){
                //模拟插入
                var imgList = [],data = res.data;
                var maxPage = imgNums*page < data.length ? imgNums*page : data.length;
                setTimeout(function(){
                    for(var i=imgNums*(page-1); i<maxPage; i++){
                        imgList.push('<li><img layer-src="'+ data[i].src +'" src="'+ data[i].thumb +'" alt="'+data[i].alt+'"><div class="operate"><div class="check"><input type="checkbox" name="belle" lay-filter="choose" lay-skin="primary" title="'+data[i].alt+'"></div><i class="layui-icon img_del">&#xe640;</i></div></li>');
                    }
                    next(imgList.join(''), page < (data.length/imgNums));
                    form.render();
                }, 500);
            });
        }
    });

    //设置图片的高度
    $(window).resize(function(){
        $("#Images li img").height($("#Images li img").width());
    })

    //多图片上传
    upload.render({
        elem: '.uploadNewImg',
        url: ctx + 'img/userface',
        multiple: true,
        before: function(obj){
            //预读本地文件示例，不支持ie8
            obj.preview(function(index, file, result){
                $('#Images').prepend('<li><img layer-src="'+ result +'" src="'+ result +'" alt="'+ file.name +'" class="layui-upload-img"><div class="operate"><div class="check"><input type="checkbox" name="belle" lay-filter="choose" lay-skin="primary" title="'+file.name+'"></div><i class="layui-icon img_del">&#xe640;</i></div></li>')
                //设置图片的高度
                $("#Images li img").height($("#Images li img").width());
                form.render("checkbox");
            });
        },
        done: function(res){
            //上传完毕
        }
    });

    //弹出层
    $("body").on("click","#Images img",function(){
        parent.showImg();
    })

    //删除单张图片
    $("body").on("click",".img_del",function(){
        var _this = $(this);
        layer.confirm('确定删除图片"'+_this.siblings().find("input").attr("title")+'"吗？',{icon:3, title:'提示信息'},function(index){
            _this.parents("li").hide(1000);
            setTimeout(function(){_this.parents("li").remove();},950);
            layer.close(index);
        });
    })

    //全选
    form.on('checkbox(selectAll)', function(data){
        var child = $("#Images li input[type='checkbox']");
        child.each(function(index, item){
            item.checked = data.elem.checked;
        });
        form.render('checkbox');
    });

    //通过判断是否全部选中来确定全选按钮是否选中
    form.on("checkbox(choose)",function(data){
        var child = $(data.elem).parents('#Images').find('li input[type="checkbox"]');
        var childChecked = $(data.elem).parents('#Images').find('li input[type="checkbox"]:checked');
        if(childChecked.length == child.length){
            $(data.elem).parents('#Images').siblings("blockquote").find('input#selectAll').get(0).checked = true;
        }else{
            $(data.elem).parents('#Images').siblings("blockquote").find('input#selectAll').get(0).checked = false;
        }
        form.render('checkbox');
    })

    //批量删除
    $(".batchDel").click(function(){
        var $checkbox = $('#Images li input[type="checkbox"]');
        var $checked = $('#Images li input[type="checkbox"]:checked');
        if($checkbox.is(":checked")){
            layer.confirm('确定删除选中的图片？',{icon:3, title:'提示信息'},function(index){
                var index = layer.msg('删除中，请稍候',{icon: 16,time:false,shade:0.8});
                setTimeout(function(){
                    //删除数据
                    $checked.each(function(){
                        $(this).parents("li").hide(1000);
                        setTimeout(function(){$(this).parents("li").remove();},950);
                    })
                    $('#Images li input[type="checkbox"],#selectAll').prop("checked",false);
                    form.render();
                    layer.close(index);
                    layer.msg("删除成功");
                },2000);
            })
        }else{
            layer.msg("请选择需要删除的图片");
        }
    })

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('mainChart'));

// 指定图表的配置项和数据
    var option = {
        title: {
            text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
            data:['销量']
        },
        xAxis: {
            data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

})