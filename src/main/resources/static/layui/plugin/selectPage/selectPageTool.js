/**
 * Created by 陈熠 on 2017/6/21
 * email   :  228112142@qq.com
 */
(function ($) {
    var selectPages = [];
    /*分页默认参数*/
    var defaultParam = {
        search: false,
        nd: new Date().getTime(),
        limit: 15,
        page: 1,
        sidx: '',
        order: 'desc',
        init: true,
        _: new Date().getTime()
    };
    /* 入口函数 */
    $.fn.selectPage = function () {
        //参数数据
        var cyProps = $(this).attr("cyProps");
        if (!cyProps) {
            return
        }
        cyProps = cyProps ? cyProps : "";
        //将表格参数转为json
        cyProps = eval("({" + cyProps + "})");
        //创建节点
        createDom($(this), cyProps);

    };


    /**创建相关dom元素 **/
    function createDom(_this, cyProps) {
        var _name = $(_this).attr("name") || "";
        var _value = $(_this).attr("value") || "";
        var showTips = _value === "" ? "cy-show" : "cy-none";
        var _tips = cyProps.tips || "请选择";
        var _checkbox = cyProps.checkbox || "true";
        var ITEM_CLASS = _checkbox==="true"?"":"select-single";
        var _search = cyProps.search === "false" ? "none" : "block";
        var nowTime = (new Date()).getTime();
        var selectId = "multi-select-" + nowTime + $(".multi-select").length;
        var pageId = "page-" + nowTime + $(".dd-page").length;
        /** 渲染结果**/
        var outHtml =
            _this.html([
                '<div class="layui-form-select select-page" select-id="' + selectId + '">',
                '<input type="text" name="' + _name + '" value="' + _value + '" class="form-input cy-none">',
                '<div class="layui-input multi-select">',
                '<input type="text"  readonly="true" placeholder="' + _tips + '"  class="select-tips ' + showTips + '">',
                '</div>',
                '<i class="layui-edge"></i>',
                '<dl class="layui-anim layui-anim-upbit" style="">',
                '<dd lay-value="dd-search" class="dd-bar dd-search" style="display: ' + _search + '">',
                '<i class="layui-icon  select-page-search-btn" >&#xe615;</i>',
                '<input class="layui-input search_condition"  placeholder="关键字搜索">',
                '<i class="layui-icon select-page-search-clear">&#x1006;</i>',
                '</dd>',
                '<div class="dd-content '+ITEM_CLASS+'"></div>',
                '<dd lay-value="dd-page" class="dd-bar dd-page">',
                '<div class="lay-page" id="' + pageId + '"></div>',
                '</dd>',
                '</dl>',
                '</div>'
            ].join(""));
        _this.append(outHtml);

        selectPages.push($(_this));
        //下拉json数据
        var R = getSelectData(cyProps.url);
        var selectData = dataPage(1, 1000000, R.data || []);
        $t.setSessionStorage(selectId, selectData);
        $t.setSessionStorage("curr-"+selectId,selectData);
        //数据回填
        for (var i = 0; i < selectData.length; i++) {
            //默认值回选
            var _values = _value.split(",") || "";
            if (_values.indexOf(selectData[i].code) > -1) {
                var _selected = '<a href="javascript:;"><span class="selected-title" lay-value="' + selectData[i].code + '">' + selectData[i].value + '</span><i>×</i></a>';
                $(_this).find(".multi-select").append(_selected);

            }

        }


        renderPage(_this,pageId,selectId,R.count,_checkbox);

    }


    function renderPage(_this,pageId,selectId,count,_checkbox){
        layui.use(['form', 'laypage'], function () {
            var form = layui.form;
            var laypage = layui.laypage;
            laypage.render({
                elem: pageId
                , count: count || 0
                , first: false
                , last: false
                , limit: defaultParam.limit
                , prev: '<i class="fa fa-angle-double-left"></i>'
                , next: '<i class="fa fa-angle-double-right"></i>'
                , layout: ['prev', 'next', 'skip', 'count']
                , jump: function (obj, first) {
                    
                    var _v=$("#"+obj.elem).parents(".select-page").find(".form-input").val();
                    $(_this).find(".dd-content").html("");
                    var selectData = dataPage(obj.curr, defaultParam.limit, $t.getSessionStorage("curr-"+selectId) || []);

                    //数据渲染
                    for (var i = 0; i < selectData.length; i++) {
                        var _dd = _checkbox === "true"
                            ? '<dd class="select-item" lay-value="' + selectData[i].code + '" lay-title="' + selectData[i].value + '"><input type="checkbox" title="' + selectData[i].value + '" lay-filter="selectPageItem"  lay-skin="primary"></dd>'
                            : '<dd class="select-item" lay-value="' + selectData[i].code + '" lay-title="' + selectData[i].value + '">' + selectData[i].value + '</dd>';
                        //默认值回选
                        var _values = _v.split(",") || "";
                        if (_values.indexOf(selectData[i].code) > -1) {

                            if (_checkbox === "true") {
                                _dd = _dd.replace('<input type="checkbox"', '<input type="checkbox" checked');
                            }

                            if (_checkbox === "false") {
                                _dd = _dd.replace('<dd class="select-item"', '<dd class="select-item layui-this"');
                            }


                        }
                        $(_this).find(".dd-content").append(_dd);
                    }
                    form.render();
                }
            });
        });
    }
    /**数组分页
     * pageNo    当前第几页
     * pageSize  每页几条
     * array     数据列表
     * **/
    function dataPage(pageNo, pageSize, array) {
        var offset = (pageNo - 1) * pageSize;
        return (offset + pageSize >= array.length) ? array.slice(offset, array.length) : array.slice(offset, offset + pageSize);
    }

    /**隐藏其他下拉框  **/
    function hideOtherSelect(obj) {
        $.each(selectPages, function () {
            var selectId = $(this).find(".select-page").attr("select-id");
            var oldId = $(obj).parent().attr("select-id");
            if (selectId === oldId)return;
            $("[select-id='" + selectId + "']").removeClass("layui-form-selected");
        });
    }

    /**获取下拉树数据  **/
    function getSelectData(url) {
        var data = "";
        $.ajax({
            url: url,
            async: false,
            data: defaultParam,
            dataType: "json",
            success: function (R) {
                if (R.code == 0) {
                    data = R
                } else {
                    alert(R.msg);
                }
            },
            error: function () {
                alert("系统错误");
            }
        });
        return data;
    }

    /**获取搜索后的数据  **/
    function searchData(selectId, value) {
        var selectData = $t.getSessionStorage(selectId);
        //显示搜索结果菜单
        var k = value;
        // if (k == "") return;
        var arr = [];
        var patt = new RegExp(k);
        for (var i = 0; i < selectData.length; i++) {
            if (patt.test(selectData[i].value)) {
                arr.push({code: selectData[i].code, value: selectData[i].value});
            }

        }

        return arr;
    }

    /**获取插件配置  **/
    function getProps(elem) {
        //参数数据
        var cyProps = $(elem).parents("[cytype='selectPageTool']").attr("cyProps");
        cyProps = cyProps ? cyProps : "";
        //将表格参数转为json
        cyProps = eval("({" + cyProps + "})");

        return cyProps;
    }

    /**是否显示tips*/
    function showTips(selectId) {
        var _select = $('[select-id="' + selectId + '"]');
        //不显示
        if (_select.find(".form-input").val()) {
            _select.find(".select-tips").hide();
        }
        //显示
        else {
            _select.find(".select-tips").show();
        }
    }
    /**重置面板位置*/
    function  resetPosition(elem) {
        var _height=$(elem).parents(".select-page").height();
        $(elem).parents(".select-page").find(".layui-anim").css("top",_height+2+"px");

    }

    function searchSelect(_this){
        var cyProps = getProps($(_this));
        var _selectId = $(_this).parents(".select-page").attr("select-id");
        var data = searchData(_selectId, $(_this).val());

        var pageId=   $(_this).parents(".select-page").find(".lay-page").attr("id");
        $t.setSessionStorage("curr-"+_selectId, data);
        renderPage($(_this).parents(".select-page"),pageId,_selectId,data.length,cyProps.checkbox||"true");

        if (data.length === 0) {
            $(_this).parents(".select-page").find(".dd-content").html('<dd style="text-align: center">暂无数据</dd>');
        }
        var selectData = dataPage(1, defaultParam.limit, data);

        $(this).parents(".select-page").find(".select-item").remove();
        var _checkbox = cyProps.checkbox || "true";
        var _value = $(_this).parents(".select-page").find(".form-input").val() || "";

        //数据渲染
        for (var i = 0; i < selectData.length; i++) {
            var _dd = _checkbox === "true"
                ? '<dd class="select-item" lay-value="' + selectData[i].code + '" lay-title="' + selectData[i].value + '"><input  type="checkbox" title="' + selectData[i].value + '" lay-filter="selectPageItem" lay-skin="primary"></dd>'
                : '<dd class="select-item" lay-value="' + selectData[i].code + '" lay-title="' + selectData[i].value + '">' + selectData[i].value + '</dd>';
            //默认值回选
            var _values = _value.split(",") || "";
            if (_values.indexOf(selectData[i].code) > -1) {
                if (_checkbox === "true") {
                    _dd = _dd.replace('<input  type="checkbox"', '<input type="checkbox" checked');
                }

                if (_checkbox === "false") {
                    _dd = _dd.replace('<dd class="select-item"', '<dd class="select-item layui-this"');
                }

            }
            $(this).parents(".select-page").find(".dd-content").append(_dd);
        }
        layui.use(['form'], function () {
            var form = layui.form;
            form.render();
        });
    }

    /**搜索监听  **/
    $(document).on("keypress", ".search_condition", function (e) {
        e.stopPropagation();
        //是否为Enter键
        if (/^13$/.test(e.keyCode)) {
            searchSelect(this);

        }

    });
    /**监听值删除*/
    $(document).on("click", ".multi-select i", function (e) {
        var mutiElem=$(this).parents(".multi-select");
        var _value = $(this).prev().attr("lay-value");
        var cyProps = getProps(this);
        var _checkbox = cyProps.checkbox || "true";
        //如果是多选
        if (_checkbox === "true") {
            //隐藏域值修改
            var formValue = $(this).parents(".select-page").find(".form-input").val();
            var _values = formValue.split(",");
            var _index = _values.indexOf(_value);
            //从该数组中删除该元素
            _values.splice(_index, 1);
            $(this).parents(".select-page").find(".form-input").val(_values.join(","));
            $(".select-item[lay-value='" + _value + "']").find("input").attr("checked", false);
        }
        //如果是单选
        if (_checkbox === "false") {
            $(this).parents(".select-page").find(".form-input").val("");
            $(".select-item[lay-value='" + _value + "']").removeClass("layui-this");
        }
        layui.use(['form'], function () {
            var form = layui.form;
            form.render();
        });
        //是否显示提示语
        var selectId = $(this).parents(".select-page").attr("select-id");
        showTips(selectId);
        $(this).parents("a").remove();
        //重置面板
        resetPosition(mutiElem);
        e.stopPropagation();
    });

    /**清空搜索条件**/
    $(document).on("click", ".select-page-search-clear", function (event) {
        $(this).prev().val("");
        searchSelect(this);
        event.stopPropagation();
    });

    /**打开或隐藏面板**/
    $(document).on("click", "[cyType='selectPageTool'] .multi-select", function (e) {
        var _this = $(this).parent();
        _this.hasClass("layui-form-selected") === true ? _this.removeClass("layui-form-selected") : _this.addClass("layui-form-selected");
        var _height = _this.height();
        _this.find(".layui-anim").css("top", _height + 2 + "px");
        hideOtherSelect(this);
        e.stopPropagation();
    });
    $(document).on("click", "[cyType='selectPageTool'] .layui-anim", function (e) {
        e.stopPropagation();
    });

    $(document).on("click", "body:not('.select-page')", function () {
        $(".layui-form-selected").removeClass("layui-form-selected");
    });
    /**单选点击监听事件**/
    $(document).on("click", ".select-single .select-item", function () {
        var _value = $(this).attr("lay-value");
        var _title = $(this).attr("lay-title");
        var _selected = '<a href="javascript:;"><span class="selected-title" lay-value="' + _value+ '">' + _title + '</span><i>×</i></a>';
        $(this).parents(".select-page").find(".multi-select a").remove();
        $(this).parents(".select-page").find(".multi-select ").append(_selected);
        $(this).parents(".select-page").find(".form-input").val(_value);
        $(this).parent().find(".layui-this").removeClass("layui-this");
        $(this).parent().find("[lay-value='" + _value + "']").addClass("layui-this");

        //是否显示提示语
        var selectId = $(this).parents(".select-page").attr("select-id");
        showTips(selectId);

    });

    /**复选点击监听事件**/
    layui.use(['form'], function () {
        var form = layui.form;
        form.on('checkbox(selectPageItem)', function (data) {
            var formValue = $(data.elem).parents(".select-page").find(".form-input").val();
            var _value=$(data.elem).parents(".select-item").attr("lay-value");
            var _values = formValue.split(",");
            //如果是勾选
            if(data.elem.checked===true){

                var _title = $(data.elem).parents(".select-item").attr("lay-title");
                var _selected = '<a href="javascript:;"><span class="selected-title" lay-value="' + _value+ '">' + _title + '</span><i>×</i></a>';
                $(data.elem).parents(".select-page").find(".multi-select").append(_selected);
                //修改隐藏域的值
                formValue+=","+_value;
                $(data.elem).parents(".select-page").find(".form-input").val(formValue);
            }
            else{
                var _index = _values.indexOf(_value);
                //从该数组中删除该元素
                _values.splice(_index, 1);
                //修改隐藏域的值
                $(data.elem).parents(".select-page").find(".form-input").val(_values.join(","));
                $(data.elem).parents(".select-page").find(".selected-title[lay-value='"+_value+"']").parents("a").remove();
            }
            //是否显示提示语
            var selectId =$(data.elem).parents(".select-page").attr("select-id");
            showTips(selectId);
            //重置面板位置
            resetPosition(data.elem);
            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
        });
    });
})(jQuery);

$(document).ready(function () {
    var selectPageTools = $("[cyType='selectPageTool']");
    for (var i = 0; i < selectPageTools.length; i++) {
        $(selectPageTools[i]).selectPage();
    }

});