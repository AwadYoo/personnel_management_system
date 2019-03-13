var _ctx = document.getElementsByName("ctx")[0].getAttribute("content");
layui.config({
    base: _ctx + 'public/layui/ext/'
}).extend({
    formSelects: 'formSelects'
})

layui.use(['form', 'layer', 'laydate', 'formSelects'], function () {
    var form = layui.form,
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery,
        laydate = layui.laydate,
        formSelectes = layui.formSelects;
    var ctx = $("meta[name='ctx']").attr("content");

    laydate.render({
        elem: '#timeBegin',
        type: 'datetime'
    });

    laydate.render({
        elem: '#timeEnd',
        type: 'datetime'
    });

    var lastChartTypeVal = $("#chartType").val();

    form.on('select(chartType)', function (option) {
        if (lastChartTypeVal != option.value) {
            lastChartTypeVal = option.value;
            if (option.value == "-1") {
                $('.xData').hide();
                $('.yData').hide();
                $('.zData').hide();
            } else if (option.value == "2DScatterPlot") {
                getXData(1);
                $('.xData').show();
                $('.yData').hide();
                $('.zData').hide();
                var xSelectVal = $('#xData').val()
                form.on('select(xData)', function (p) {
                    if (xSelectVal != p.value) {
                        xSelectVal = p.value;
                        if (p.value != -1) {
                            getYData(p.value);
                            $('.yData').show();
                        } else {
                            $('.yData').hide();
                        }
                    }
                })
            } else if (option.value == "3DScatterPlot") {
                getXData(1);
                $('.xData').show();
                $('.yData').hide();
                $('.zData').hide();
                form.on('select(xData)', function (p) {
                    if (xSelectVal != p.value) {
                        xSelectVal = p.value;
                        if (p.value != -1) {
                            getYData(p.value);
                            $('.yData').show();
                            var ySelectVal = $('#yData').val();
                            form.on('select(yData)', function (op) {
                                if (ySelectVal != op.value) {
                                    ySelectVal = op.value;
                                    if (op.value != -1) {
                                        var cols = [];
                                        cols.push(p.value);
                                        cols.push(op.value);
                                        getZData(cols);
                                        $('.zData').show();
                                    } else {
                                        $('.zData').hide();
                                    }
                                }
                            })
                        } else {
                            $('.yData').hide();
                        }
                    }
                })
            } else if (option.value == "lineChart" || option.value == "boxPlot") {
                $('.yData').hide();
                $('.zData').hide();
                getXData(2);
                formSelectes.selects({
                    name: 'select',
                    el: '#xData',
                    filter: 'xData',
                    left: '',
                    right: '',
                    separator: ','
                });
                $('.xData').show();
            }
        }
    });


    var mainChart;
    var option;


    function resizeChart(){
        var mainHeight = $('.childrenBody').height() - $('.quoteBox').height() - 35;
        var mainWidth = $('.childrenBody').width() - 10;
        if(mainHeight < 400) mainHeight = 400;
        if(mainWidth < 600) mainWidth = 600;
        var mainDiv =  document.getElementById('mainChart');
        mainDiv.style.height =  mainHeight + 'px';
        mainDiv.style.width = mainWidth + 'px';
        mainChart = echarts.init(mainDiv);
        if(option && option.series){
            mainChart.setOption(option);
            mainChart.resize();
        }

    }

    resizeChart();


    var doing = 0;
    $(window).resize (function () {
        if(doing == 0) {
            doing == 1;
            setTimeout(resizeChart(), 700);
            doing = 0;
        }

    });



    //分析
    $(".search_btn").on("click", function () {
        var type = $('#chartType').val();
        if (type == '2DScatterPlot') {
            var x = $('#xData').val();
            if (x == '-1') {
                layer.alert("请选择X轴参数", {icon: 7});
                return;
            }
            var y = $('#yData').val();
            if (y == '-1') {
                layer.alert('请选择Y轴参数', {icon: 7});
                return;
            }
            $.ajax({
                url: ctx + 'dataManage/scadaData/2DScatterPlot',
                type: 'get',
                data: {x: x, y: y, begin: $('#timeBegin').val(), end: $('#timeEnd').val()},
                success: function (res) {
                    if (res.code == 0) {
                        option = {xAxis: {},yAxis: {},series:[{symbolSize:10, data:res.data, type:'scatter'}]};
                        mainChart.setOption(option);
                    } else {
                        layer.msg('分析错误:' + res.msg, {icon: 5});
                    }
                }
            });

        } else if (type == "3DScatterPlot") {

        } else if (type == "lineChart") {

        } else if (type == "boxPlot") {

        } else {
            layer.alert("请选择一个具体的图形类型", {icon: 7});
        }
    });

    function getXData(type) {
        $.ajax({
            type: 'get',
            url: ctx + 'dataManage/scadaData/xData',
            async: false,
            success: function (res) {
                if (res.code == 0) {
                    var xSelect = $("#xData");
                    xSelect.empty();
                    if (type == 1) { //
                        xSelect.append($('<option>选择X轴参数</option>').attr('value', '-1'));
                    }
                    for (var i = 0; i < res.data.length; i++) {
                        var op = $('<option></option>');
                        op.text(res.data[i].nameCN);
                        op.attr('value', res.data[i].nameEN)
                        xSelect.append(op);
                    }
                    form.render();
                } else {
                    layer.msg('数据获取失败:' + res.msg, {icon: 5});
                }
            }
        });
    }

    function getYData(option) {
        $.ajax({
            type: 'get',
            url: ctx + 'dataManage/scadaData/yData',
            async: false,
            data: {column: option},
            success: function (res) {
                if (res.code == 0) {
                    var ySelect = $("#yData");
                    ySelect.empty();
                    ySelect.append($('<option>选择Y轴参数</option>').attr('value', '-1'));
                    for (var i = 0; i < res.data.length; i++) {
                        var op = $('<option></option>');
                        op.text(res.data[i].nameCN);
                        op.attr('value', res.data[i].nameEN)
                        ySelect.append(op);
                    }
                    form.render();
                } else {
                    layer.msg('数据获取失败:' + res.msg);
                }
            }
        });
    }

    function getZData(cols) {
        $.ajax({
            type: 'get',
            url: ctx + 'dataManage/scadaData/zData',
            async: false,
            data: {columns: cols},
            success: function (res) {
                if (res.code == 0) {
                    var zSelect = $("#zData");
                    zSelect.empty();
                    zSelect.append($('<option>选择Z轴参数</option>').attr('value', '-1'));
                    for (var i = 0; i < res.data.length; i++) {
                        var op = $('<option></option>');
                        op.text(res.data[i].nameCN);
                        op.attr('value', res.data[i].nameEN)
                        zSelect.append(op);
                    }
                    form.render();
                } else {
                    layer.msg('数据获取失败:' + res.msg);
                }
            }
        });
    }


});