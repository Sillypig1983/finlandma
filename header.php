<head>
    <title>邻里爱读书 - Neighborbook</title>
    <meta name="description" content="邻里爱读书" />
    <meta charset="utf-8" />
    <meta name="viewport" id="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
    <meta content="yes" name="apple-mobile-web-app-capable" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link href="default/green/css/weui.min.css" rel="stylesheet" type="text/css" />
    <?php
    if(basename($_SERVER['PHP_SELF']) == 'nearby.php' || basename($_SERVER['PHP_SELF']) == 'following.php'){ 
    ?>
    <link href="default/green/css/weuix.css" rel="stylesheet" type="text/css" />
    <?php
    }
    ?>
    <link href="default/green/fontawesome/css/all.min.css" rel="stylesheet" type="text/css" />
    <?php
    if(basename($_SERVER['PHP_SELF']) == 'add_home_addr.php' || basename($_SERVER['PHP_SELF']) == 'add_school_addr.php'){ 
    ?>
    <link href="default/green/css/hzw-city-picker.css" rel="stylesheet" type="text/css" />
    <?php
    }
    ?>
    <link rel="icon" href="default/green/images/favicon.ico" type="image/x-icon"/>
    <link rel="shortcut icon" href="default/green/images/favicon.ico" type="image/x-icon"/>
    <style>
        .page, body {
            background-color: #f8f8f8;
        }
        
        .weui-navbar__item.weui-bar__item_on {
            background:url(default/green/images/bg-pattern.png),#a37cb6;
            background:url(default/green/images/bg-pattern.png),-webkit-gradient(linear,right top,left top,from(#a37cb6),to(#e7666f));
            background:url(default/green/images/bg-pattern.png),linear-gradient(to left,#a37cb6,#e7666f);
            color: #fff;
        }
        
        .weui-search-bar:before {
            border-top: 0 none;
        }
        
        .weui-search-bar__form:after {
            border: 0 none;
        }
        
        .weui-cell_select .weui-select {
            padding-right: 22px;
            padding-left: 10px;
            font-size: 13px;
        }
        
        .weui-media-box {
            background-color: #fff;
        }
        
        .weui-badge {
            background-color: #fff;
            color: #000;
            border: 1px solid rgba(0,0,0,.2);
        }
        
        .weui-tabbar__item {
            font-size: 17px;
        }
        
        .weui-tabbar__label {
            color: #000;
            font-size: 13px;
        }
        
        .weui-agree__checkbox {
            color: #999;
        }
        
        #book_detail, #edit_area {
            background-color: #fff;
        }
        .weui-media-box_appmsg .weui-media-box__hd {
            height: 70px;
        }
        .weui-mask {
            background: rgba(0,0,0,.3);
        }
        .weui-tabbar__item.weui-bar__item_on .weui-tabbar__icon, 
        .weui-tabbar__item.weui-bar__item_on i, 
        .weui-tabbar__item.weui-bar__item_on .weui-tabbar__label {
            color: #BE2D4F;
            font-weight: bold;
        }
        .weui-media-box__thumb {
            -moz-box-shadow: 5px 5px 3px #cdcdcd;
            box-shadow: 5px 5px 3px #cdcdcd;
        }
        .weui-dialog, .weui-toast {
            opacity: 1;
            visibility: visible;
        }
    </style>
    <script type="text/javascript" src="default/js/jquery.min.js"></script>
    <script type="text/javascript" src="default/js/jweixin-1.4.0.js"></script>
    <script type="text/javascript" src="default/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="default/js/configure.js"></script>
    <script>
		var appID = $.api.appId;
		var redirectUri = encodeURIComponent($.api.share+"/oauth2.php");
		var state = "1";
        var strUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appID + "&redirect_uri=" + redirectUri + "&response_type=code&scope=snsapi_userinfo&state=" + state + "#wechat_redirect";
        var timestamp = Date.parse(new Date());
        if(window.location.pathname.indexOf('login.php') === -1 && window.location.pathname.indexOf('location.php') === -1 && window.location.pathname.indexOf('add_home_addr.php') === -1 && window.location.pathname.indexOf('add_school_addr.php') === -1 && window.location.pathname.indexOf('add_kid.php') === -1){
            sessionStorage.setItem('location_href',window.location.href);
        }
        
        if(sessionStorage.getItem('weixin_plugin') != undefined && sessionStorage.getItem('weixin_plugin') != null && sessionStorage.getItem('weixin_plugin') != '') {
            var weixin_plugin = $.parseJSON(sessionStorage.getItem('weixin_plugin'));
            var openid = weixin_plugin.openid;
            if(openid == undefined || openid == null || openid == ''){
                window.location.href = strUrl;
            } else {
                if(timestamp - sessionStorage.getItem('authorize_time') > 2592000000){ //30天
                    window.location.href = strUrl;
                }
            }
        } else {
            window.location.href = strUrl;
        }
    </script>
    <!--[if lt IE 9]> 
<script src="commons/js/html5.js"></script>
<![endif]-->
</head>