layui.use(['form', 'layer', 'table', 'laydate', 'element'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        table = layui.table,
        element = layui.element,
        laydate = layui.laydate;
    var ctx = $("meta[name='ctx']").attr("content");
    //执行一个laydate实例
    laydate.render({
        elem: '#beginTime', //指定元素
        format: 'yyyy-MM-dd HH:mm',
        type: 'datetime'
    });
    laydate.render({
        elem: '#endTime', //指定元素
        format: 'yyyy-MM-dd HH:mm',
        type: 'datetime'
    });

    //重新加载
    $(".reload_btn").on("click", function () {
        //if($(".searchVal").val() != ''){
        $.get(ctx + 'dataManage/metricNames/reload', function (res) {
            if (res.code == 0) {
                layer.msg("加载成功");
            } else {
                layer.msg("加载失败：" + res.message);
            }
        });
    });

    //添加,修改
    function addData(edit) {

        var index = layui.layer.open({
            title: "添加测点数据",
            type: 2,
            content: ctx + "dataManage/metrics/data/toAdd",
            area:['450px', '400px']
        })

        //layui.layer.full(index);
        //改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
        /*$(window).on("resize", function () {
            layui.layer.full(index);
        })*/
    }

    $(".add_btn").click(function () {
        addData();
    })

    //删除
    $(".del_btn").click(function () {

        layer.confirm('确定删除选中的数据？', {icon: 3, title: '提示信息'}, function (index) {

            var beginTime = $('#beginTime').val();
            if (beginTime == '') {
                layer.msg("开始时间错误");
                return false;
            }
            var endTime = $('#endTime').val();
            if (endTime == '') {
                layer.msg('结束时间错误');
                return false;
            }

            $.ajax({
                url: ctx + "dataManage/metrics/data/delete",
                type: "post",
                data: {
                    beginTime: beginTime, endTime: endTime, metericNames: $('#metricNameSelect').selectPageText(),
                    interval: $('#interval').val(), unit: $('#timeUnit').val(), queryType: $('#queryType').val()
                },
                success: function (res) {
                    if(res.code == 0){
                        layer.msg('成功删除数据');
                    }else{
                        layer.msg('删除数据失败：' + res.msg);
                    }
                }
            });

        });

    });

    $(".import_btn").click(function () {

        var index = layer.open({
            title: "导入测点数据",
            type: 2,
            area: ["480px", "320px"],
            content: ctx + "dataManage/toScadaImport",
            success: function (layero, index) {
                setTimeout(function () {
                    layui.layer.tips('点击此处返回友链列表', '.layui-layer-setwin .layui-layer-close', {
                        tips: 3
                    });
                }, 500)
            }
        })

    });

    $(".export_btn").click(function () {
        var beginTime = $('#beginTime').val();
        if (beginTime == '') {
            layer.msg("开始时间错误");
            return false;
        }
        var endTime = $('#endTime').val();
        if (endTime == '') {
            layer.msg('结束时间错误');
            return false;
        }
        var form = $('<form></form>').attr('action', ctx + 'dataManage/metrics/data/export').attr('method', 'post');
        $('<input>').attr({
            type:'hidden',
            name:'beginTime',
            value:beginTime
        }).appendTo(form);

        $('<input>').attr({
            type:'hidden',
            name:'endTime',
            value:endTime
        }).appendTo(form);

        $('<input>').attr({
            type:'hidden',
            name:'metericNames',
            value:$('#metricNameSelect').selectPageText()
        }).appendTo(form);

        $('<input>').attr({
            type:'hidden',
            name:'interval',
            value:$('#interval').val()
        }).appendTo(form);

        $('<input>').attr({
            type:'hidden',
            name:'unit',
            value:$('#timeUnit').val()
        }).appendTo(form);

        $('<input>').attr({
            type:'hidden',
            name:'queryType',
            value:$('#queryType').val()
        }).appendTo(form);

        form.appendTo('body').submit().remove();
        layer.msg("开始下载");
    });


    //init SelectPage
    $('#metricNameSelect').selectPage({
        showField: 'value',
        keyField: 'value',
        multiple: true,
        listSize: 15,
        pageSize: 15,
        searchField: 'value',
        selectOnly: false,
        data: ctx + "dataManage/json/list",
        eAjaxSuccess: function (data) {
            return data;
        }
    });


    require.config({
        paths: {
            echarts: ctx + 'public/echarts/2.2.7'
        }
    });
    var dataChart = null;
    require(['echarts', 'echarts/chart/line', 'echarts/chart/bar'], function (ec) {
        dataChart = ec.init(document.getElementById('eChart'));
    });


    //dataChart.setOption(option);

    $('.query_btn').click(function () {
        var beginTime = $('#beginTime').val();
        if (beginTime == '') {
            layer.msg("开始时间错误");
            return false;
        }
        var endTime = $('#endTime').val();
        if (endTime == '') {
            layer.msg('结束时间错误');
            return false;
        }

        $.ajax({
            url: ctx + "dataManage/metrics/data",
            type: "post",
            data: {
                beginTime: beginTime, endTime: endTime, metericNames: $('#metricNameSelect').selectPageText(),
                interval: $('#interval').val(), unit: $('#timeUnit').val(), queryType: $('#queryType').val()
            },
            success: function (res) {
                if (res.code == 0) {
                    var option = {
                        title: {
                            text: '测点数据'
                        },
                        tooltip: {
                            show: true,
                            trigger: 'axis'
                        },
                        legend: {
                            data: []
                        },
                        xAxis: [
                            /*{
                                type: 'time',
                                data: []
                            }*/
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            /*{
                                "name": "销量",
                                "type": "bar",
                                "data": [5, 20, 40, 10, 10, 20]
                            }*/
                        ]
                    };
                    //dataChart.setOption(option, true);
                    var list = res.data;
                    var names = $('#metricNameSelect').selectPageText().split(',');
                    var timeType = $('#timeUnit').val();
                    for (var i = 0; i < list.length; i++) {
                        var timestamp = [];
                        var values = [];
                        option.legend.data.push(names[i]);
                        for (var j = 0; j < list[i].length; j++) {
                            //var tv = ;
                            //tv.push();
                            timestamp.push(timestampToTime(list[i][j].timestamp, getTimeType(timeType)));
                            values.push(list[i][j].value);
                        }
                        option.series.push({name: names[i], type: 'line', data: values});
                        option.xAxis.push({type: 'category', data: timestamp});
                    }
                    dataChart.hideLoading();
                    dataChart.setOption(option,true);
                } else {
                    layer.msg(res.msg);
                }
            }
        });
    });

    function getTimeType(timeType) {
        if("second" == timeType) return 6;
        if("minute" == timeType) return 5;
        if("hour" == timeType) return 4;
        if("day" == timeType) return 3;
        if("week" == timeType) return 3;
        if("month" == timeType) return 2;
        if("year" == timeType) return 1;
    }

    function timestampToTime(timestamp, type) {
        var date = new Date(timestamp);
        var Y = date.getFullYear();// + '-';
        if(type < 2) return Y;
        Y += '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1); // + '-';
        if(type < 3) return  Y+M;
        M += '-';
        var D = date.getDate();// + ' ';
        if(D < 10) D = '0' + D;
        if(type < 4) return Y+M+D;
        D += ' ';
        var h = date.getHours();// + ':';
        if(h < 10) h = '0' + h;
        if(type < 5) return Y+M+D+h;
        h += ':';
        var m = date.getMinutes();// + ':';
        if(m < 10) m = '0' + m;
        if(type < 6) return Y+M+D+h+m;
        m += ':';
        var s = date.getSeconds();
        if(s < 10) s = '0' + s;
        return Y+M+D+h+m+s;
    }

});






