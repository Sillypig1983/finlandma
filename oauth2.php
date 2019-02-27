<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <title>邻里爱读书 - Neighborbook</title>
    <meta name="description" content="邻里爱读书" />
    <meta charset="utf-8" />
    <script type="text/javascript" src="default/js/jquery.min.js"></script>
    <script type="text/javascript" src="default/js/jquery.cookie.js"></script>
    <script type="text/javascript" src="default/js/configure.js"></script>
    <script>
        var timestamp = Date.parse(new Date());
        var code = getUrlParam("code");
        weixinLogin();
        
        function weixinLogin() {
            var map = {
                username: code,
                type: 'code'
            };

            $.ajax({
                url: $.api.base+"/nb-customer/api/weixin/login/login",
                type: "POST",
                data: map,
                async: false,
                beforeSend: function(request) {},
                complete: function(){},
                success: function (response, status, xhr) {
                    if(response.code === 'C0') {
                        if(xhr.getResponseHeader("Login") !== null){
                            $.cookie("login", xhr.getResponseHeader("Login") );
                        }
                        if(xhr.getResponseHeader("Authorization") !== null){
                            $.cookie("authorization", xhr.getResponseHeader("Authorization") );
                        }
                        sessionStorage.setItem('weixin_plugin',JSON.stringify(response.data.plugin.weixin_plugin));
                        $.cookie('usercode',response.data.code);
                        $.cookie('usermobile',response.data.mobile);
                        sessionStorage.setItem('authorize_time',timestamp);
                        
                        var strUrl = sessionStorage.getItem('location_href') || 'index.php';
                        window.location.href = strUrl;
                        
                    } else {
                        //alert(response.customerMessage);
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.log(textStatus, errorThrown);
                    window.location.href = 'maintenance.php';
                }
            });
        }
        
        function getUrlParam(key) {
			var url = window.location.search;
			var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
			var result = url.substr(1).match(reg);
			return result ? decodeURIComponent(result[2]) : null;
		}
    </script>
</head>
<body>
    页面跳转中...
</body>
</html>
        