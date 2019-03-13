var $,tab,dataStr,layer;
var _ctx = document.getElementsByName("ctx")[0].getAttribute("content");
//alert(_ctx);
layui.config({
	base : _ctx + "public/web/js/"
}).extend({
	"bodyTab" : "bodyTab"
})
layui.use(['bodyTab','form','element','layer','jquery'],function(){
	var form = layui.form,
		element = layui.element;
		$ = layui.$;
    	layer = parent.layer === undefined ? layui.layer : top.layer;
    	var ctx = $("meta[name='ctx']").attr("content");
		tab = layui.bodyTab({
			openTabNum : "50",  //最大可打开窗口数量
			url :  ctx + "menu" //获取菜单json地址
		});

		$.ajaxSetup({
            complete:function (xhr,status) {
				if(xhr.responseJSON){
					if(xhr.responseJSON.code == 601 ||xhr.responseJSON.code == 600){
                        loginWindow();
					}
				}
            }
		});


	//通过顶部菜单获取左侧二三级菜单   注：此处只做演示之用，实际开发中通过接口传参的方式获取导航数据
	function getData(json){
		$.getJSON(tab.tabConfig.url,{topTitle:json},function(data){
			if(data.code == 0){
		    	dataStr = data.data;
            	tab.render();
            }
			/*if(json == "contentManagement"){
				dataStr = data.contentManagement;
				//重新渲染左侧菜单
				tab.render();
			}else if(json == "memberCenter"){
				dataStr = data.memberCenter;
				//重新渲染左侧菜单
				tab.render();
			}else if(json == "systemeSttings"){
				dataStr = data.systemeSttings;
				//重新渲染左侧菜单
				tab.render();
			}else if(json == "seraphApi"){
                dataStr = data.seraphApi;
                //重新渲染左侧菜单
                tab.render();
            }*/
		})
	}

    //弹出登录窗口
    function loginWindow() {
        layer.open({
            title: false,
            type: 1,
            content: '<div class="admin-header-lock" id="lock-box">' +
            '<div class="input_btn">' +
            '登录信息已失效 请重新登录'+
            '</div>' +
			'<div class="input_btn">' +
            '<input type="text" class="layui-input" autocomplete="off" placeholder="请输入登录名.." name="loginName" id="loginName" />' +
            '</div>' +
            '<div class="input_btn">' +
			'<input type="password" class="layui-input" autocomplete="off" placeholder="请输入密码.." name="password" id="password" />' +
            '</div>' +
            '<div class="input_btn">' +
			'<button class="layui-btn" id="doLogin">登录</button>' +
            '</div>' +
            '</div>',
            closeBtn: 0,
            shade: 0.97,
            success: function () {

            }
        })
        $("#loginName").focus();
    }

    //ajax 登录
    $("body").on("click", "#doLogin", function () {
        if ($(this).siblings("#loginName").val() == '') {
            layer.msg("请输入登录名！");
            $(this).siblings("#loginName").focus();
        } else if ($(this).siblings("#password").val() == '') {
            layer.msg("请输入密码！");
            $(this).siblings("#password").focus();
        } else {
            $.post(ctx + "login", {"password": $("#password").val(),"username":$("#loginName").val()}, function (result) {
                   if(result.code && result.code == 200) {
                       layer.closeAll("page");
                       layer.msg("登录成功");
                   }else{
                       layer.msg("用户名或密码错误！");
                   }
                }
            )
        }
    });
    $(document).on('keydown', function (event) {
        var event = event || window.event;
        if (event.keyCode == 13) {
            $("#doLogin").click();
        }
    });

	//页面加载时判断左侧菜单是否显示
	//通过顶部菜单获取左侧菜单
	$(".topLevelMenus li,.mobileTopLevelMenus dd").click(function(){
		if($(this).parents(".mobileTopLevelMenus").length != "0"){
			$(".topLevelMenus li").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
		}else{
			$(".mobileTopLevelMenus dd").eq($(this).index()).addClass("layui-this").siblings().removeClass("layui-this");
		}
		$(".layui-layout-admin").removeClass("showMenu");
		$("body").addClass("site-mobile");
		getData($(this).data("menu"));
		//渲染顶部窗口
		tab.tabMove();
	})

	//隐藏左侧导航
	$(".hideMenu").click(function(){
		if($(".topLevelMenus li.layui-this a").data("url")){
			layer.msg("此栏目状态下左侧菜单不可展开");  //主要为了避免左侧显示的内容与顶部菜单不匹配
			return false;
		}
		$(".layui-layout-admin").toggleClass("showMenu");
		//渲染顶部窗口
		tab.tabMove();
	})

	//通过顶部菜单获取左侧二三级菜单   注：此处只做演示之用，实际开发中通过接口传参的方式获取导航数据
	//getData("contentManagement");
	getData();

	//手机设备的简单适配
    $('.site-tree-mobile').on('click', function(){
		$('body').addClass('site-mobile');
	});
    $('.site-mobile-shade').on('click', function(){
		$('body').removeClass('site-mobile');
	});

	// 添加新窗口
	$("body").on("click",".layui-nav .layui-nav-item a:not('.mobileTopLevelMenus .layui-nav-item a')",function(){
		//如果不存在子级
		if($(this).siblings().length == 0){
			addTab($(this));
			$('body').removeClass('site-mobile');  //移动端点击菜单关闭菜单层
		}
		$(this).parent("li").siblings().removeClass("layui-nav-itemed");
	})

	//清除缓存
	$(".clearCache").click(function(){
		window.sessionStorage.clear();
        window.localStorage.clear();
        var index = layer.msg('清除缓存中，请稍候',{icon: 16,time:false,shade:0.8});
        setTimeout(function(){
            layer.close(index);
            layer.msg("缓存清除成功！");
        },1000);
    })

	//刷新后还原打开的窗口
    if(cacheStr == "true") {
        if (window.sessionStorage.getItem("menu") != null) {
            menu = JSON.parse(window.sessionStorage.getItem("menu"));
            curmenu = window.sessionStorage.getItem("curmenu");
            var openTitle = '';
            for (var i = 0; i < menu.length; i++) {
                openTitle = '';
                if (menu[i].icon) {
                    if (menu[i].icon.split("-")[0] == 'icon') {
                        openTitle += '<i class="seraph ' + menu[i].icon + '"></i>';
                    } else {
                        openTitle += '<i class="layui-icon">' + menu[i].icon + '</i>';
                    }
                }
                openTitle += '<cite>' + menu[i].title + '</cite>';
                openTitle += '<i class="layui-icon layui-unselect layui-tab-close" data-id="' + menu[i].layId + '">&#x1006;</i>';
                element.tabAdd("bodyTab", {
                    title: openTitle,
                    content: "<iframe src='" + menu[i].href + "' data-id='" + menu[i].layId + "'></frame>",
                    id: menu[i].layId
                })
                //定位到刷新前的窗口
                if (curmenu != "undefined") {
                    if (curmenu == '' || curmenu == "null") {  //定位到后台首页
                        element.tabChange("bodyTab", '');
                    } else if (JSON.parse(curmenu).title == menu[i].title) {  //定位到刷新前的页面
                        element.tabChange("bodyTab", menu[i].layId);
                    }
                } else {
                    element.tabChange("bodyTab", menu[menu.length - 1].layId);
                }
            }
            //渲染顶部窗口
            tab.tabMove();
        }
    }else{
		window.sessionStorage.removeItem("menu");
		window.sessionStorage.removeItem("curmenu");
	}
})


//左侧一级菜单点击
$(".navBar li>a").on('click', function () {
    //二级菜单也要标识出当前打开的是哪个菜单
    $('.navBar li>.layui-nav-child dd').removeClass('layui-this');
    $(this).siblings('dl').find('dd:first-child').addClass('layui-this');

    $(this).parent().removeClass('layui-nav-itemed');
    $(".navBar li").removeClass('navSelectd');
    $(this).parent().addClass('navSelectd');
    var href = $(this).attr('data-url');
    $(".clildFrame div").html('<iframe allowfullscreen="true" allowtransparency="true" src="' + href + '"></iframe>');
});
//左侧二级菜单点击
$(".navBar li>.layui-nav-child dd").on('click', function () {
    //二级菜单也要标识出当前打开的是哪个菜单
    $('.navBar li>.layui-nav-child dd').removeClass('layui-this');
    $(this).addClass('layui-this');

    $(this).parent().parent().removeClass('layui-nav-itemed');
    $(".navBar li").removeClass('navSelectd');
    $(this).parent().parent().addClass('navSelectd');
    var href = $(this).find('a').attr('data-url');
    $(".clildFrame div").html('<iframe allowfullscreen="true" allowtransparency="true" src="' + href + '"></iframe>');
});
//打开新窗口
function addTab(_this){
	tab.tabAdd(_this);
}

//捐赠弹窗
function donation(){
	layer.tab({
		area : ['260px', '367px'],
		tab : [{
			title : "微信",
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='images/wechat.jpg'></div>"
		},{
			title : "支付宝",
			content : "<div style='padding:30px;overflow:hidden;background:#d2d0d0;'><img src='images/alipay.jpg'></div>"
		}]
	})
}

//图片管理弹窗
function showImg(){
    $.getJSON('json/images.json', function(json){
        var res = json;
        layer.photos({
            photos: res,
            anim: 5
        });
    });
}