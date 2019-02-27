$.category = [];
$.listtype = 'tag';

var p = 0, q = 0, r = 0;
var timestamp = Date.parse(new Date());

$.shareData = '';
$(document).ready(function(){    
    if(timestamp - sessionStorage.getItem('authorize_time') > 604800000 && timestamp - sessionStorage.getItem('authorize_time') <= 2592000000){ //大于1周小于等于1个月
        window.location.href = strUrl;
    }
    
    getWechatSignature();
    
    if(!sessionStorage.getItem("taggroups") || sessionStorage.getItem("taggroups") == 'null' || sessionStorage.getItem("taggroups") == null || sessionStorage.getItem("taggroups") == '') {
        getTagGroups();
    }
    
    if(!sessionStorage.getItem("locationgroups") || sessionStorage.getItem("locationgroups") == 'null' || sessionStorage.getItem("locationgroups") == null || sessionStorage.getItem("locationgroups") == '') {
        getLocationGroups();
    }
    
    showTagGroups();
    countUserBooks();
    
    $('.weui-tabbar__item').on('click', function () {
        $.listtype = 'tag';
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
    });
    
    if(window.location.pathname.indexOf('upload.php') !== -1){ 
        $('#foot_add').addClass('weui-bar__item_on');
    } else if(window.location.pathname.indexOf('index.php') !== -1){ 
        $('#foot_all').addClass('weui-bar__item_on');
    } else if(window.location.pathname.indexOf('nearby.php') !== -1){ 
        $('#foot_nearby').addClass('weui-bar__item_on');
    } else if(window.location.pathname.indexOf('profile.php') !== -1){ 
        $('#foot_profile').addClass('weui-bar__item_on');
        showUserFullInfo(null);
    } else if(window.location.pathname.indexOf('bookshelf.php') !== -1 || window.location.pathname.indexOf('borrowerlist.php') !== -1 
            || window.location.pathname.indexOf('ownerlist.php') !== -1 || window.location.pathname.indexOf('aboutus.php') !== -1 
            || window.location.pathname.indexOf('bonus_detail.php') !== -1 || window.location.pathname.indexOf('following.php') !== -1 
            || window.location.pathname.indexOf('privacy.php') !== -1){ 
        $('#foot_profile').addClass('weui-bar__item_on');
    } else if(location.href === $.api.share+'/'){ 
        $('#foot_all').addClass('weui-bar__item_on');
    }
    
    if(!sessionStorage.getItem('age_selector') || sessionStorage.getItem('age_selector') == 'null' || sessionStorage.getItem('age_selector') == null || sessionStorage.getItem('age_selector') == '') {
        sessionStorage.setItem('age_selector','');
    } else {
        $('#age').val(sessionStorage.getItem('age_selector'));
    }
    
    if(!sessionStorage.getItem('category_selector') || sessionStorage.getItem('category_selector') == 'null' || sessionStorage.getItem('category_selector') == null || sessionStorage.getItem('category_selector') == '') {
        sessionStorage.setItem('category_selector','');
    } else {
        $('#category').val(sessionStorage.getItem('category_selector'));
    }
    
    if(!sessionStorage.getItem('language_selector') || sessionStorage.getItem('language_selector') == 'null' || sessionStorage.getItem('language_selector') == null || sessionStorage.getItem('language_selector') == '') {
        sessionStorage.setItem('language_selector','');
    } else {
        $('#language').val(sessionStorage.getItem('language_selector'));
    }
    
    if(!sessionStorage.getItem("sharable_selector") || sessionStorage.getItem("sharable_selector") == 'null' || sessionStorage.getItem("sharable_selector") == null || sessionStorage.getItem("sharable_selector") == '') {
        sessionStorage.setItem('sharable_selector','');
        $('#weuiOnlySharable').removeAttr('checked');
    } else {
        $('#weuiOnlySharable').attr('checked','checked');
    }
    
    $('.weui-navbar__item').on('click', function () {
        $(this).addClass('weui-bar__item_on').siblings('.weui-bar__item_on').removeClass('weui-bar__item_on');
    });
    
    $('#manual_upload').on('click', function(){
        $('#manual_uploader').fadeIn(200, function(){
            $('.weui-mask').click(function(){
                $('#manual_uploader').hide();
            });
            
            $('#btn-enter').click(function(){
                if($('#isbn_input').val() != ''){
                    uploadISBN(null);
                }
            });
        });
    });
    
    $('#login_btn').click(function(){
        updateMobile();
    });
    
    if($('#show_locations').length > 0){
        showLocations();
    }
    
    if($('#show_kids').length > 0){
        showKids();    
    }
    
    if($('#submit_event').length > 0){
        if((!$.cookie("usermobile") || $.cookie("usermobile") == 'null' || $.cookie("usermobile") == null || $.cookie("usermobile") == '') && window.location.pathname.indexOf('login.php') === -1) {
            redirectLogin();
        } else {
            if(getURLParameter('event') && getURLParameter('event') != ''){
                getEvent();
                
                $('#kids a').click(function(){
                    $.cookie("event_fullname_temp", $('#fullname').val());
                });
                
                $('#submit_event').click(function(){
                    if($('#fullname').val() != '' && $('#show_kids').html() != '') {
                        updateNameAndProfession();
                    } else {
                        $('body').append('<div id="signup_event_error" style="display: none;">\n\
            <div class="weui-mask_transparent">\n\
            <div class="weui-toast">\n\
            <i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content"> 请完善本人姓名及小孩信息 </p>\n\
            </div></div></div>');

                        $('#signup_event_error').fadeIn(100);
                        setTimeout(function () {
                            $('#signup_event_error').fadeOut(100).remove();
                        }, 2000);
                    }
                });
            }
        }
    }
    
    if($('#submit_volunteer').length > 0){
        if((!$.cookie("usermobile") || $.cookie("usermobile") == 'null' || $.cookie("usermobile") == null || $.cookie("usermobile") == '') && window.location.pathname.indexOf('login.php') === -1) {
            redirectLogin();
        } else {
            getUserVolunteer();

            $('#kids a, #locations a').click(function(){
                $.cookie("volunteer_fullname_temp", $('#fullname').val());
                $.cookie("volunteer_profession_temp", $('#profession').val());
                $.cookie("volunteer_speciality_temp", $('#speciality').val());
            });

            $('#submit_volunteer').click(function(){
                if($('#fullname').val() != '' && $('#profession').val() != '' && $('#speciality').val() != '' && $('#show_locations').html() != '') {
                    saveVolunteer();
                } else {
                    $('body').append('<div id="signup_volunteer_error" style="display: none;">\n\
        <div class="weui-mask_transparent">\n\
        <div class="weui-toast">\n\
        <i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content"> 请完善个人及地址信息 </p>\n\
        </div></div></div>');

                    $('#signup_volunteer_error').fadeIn(100);
                    setTimeout(function () {
                        $('#signup_volunteer_error').fadeOut(100).remove();
                    }, 2000);
                }
            });
        }
    }
    
    $('#save_kid').click(function(){
        if($('#nickname').val() != '' && $('#birthdate').val() != '' && $('#gender').val() != ''){
            saveKid();
        } else {
            $('body').append('<div id="save_kid_error" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content"> 请填写完整信息 </p>\n\
</div></div></div>');
                    
            $('#save_kid_error').fadeIn(100);
            setTimeout(function () {
                $('#save_kid_error').fadeOut(100).remove();
            }, 2000);
        }
    });
    
    if($('#searchAddress').length > 0){
        activateSearchAddress();
    }
    
    if($('#searchBar').length > 0){
        activateSearch();
    }
    
    if($('#book_list').length > 0){
        loadingToast();
        showBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"));
    }
    
    if($('#my_book_list').length > 0){
        loadingToast();
        showMyBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"),null);
    }
    
    if($('#borrow_book_list').length > 0){
        loadingToast();
        if(getURLParameter('list') && getURLParameter('list') == 'full'){
            showBorrowerBookList();
        } else {
            showBorrowerBookListUnfinished();
        }
    }
    
    if($('#owner_book_list').length > 0){
        loadingToast();
        if(getURLParameter('list') && getURLParameter('list') == 'full'){
            showOwnerBookList();
        } else {
            showOwnerBookListUnfinished();
        }
    }
    
    if($('#book_detail').length > 0){
        if(getURLParameter('user') && getURLParameter('user') == $.cookie('usercode')){
            showMyBookDetail();
        }
        showBookDetail();
    }
    
    if($('#user_book_list').length > 0){
        loadingToast();
        showUserInfo(getURLParameter('usercode'));
        showUserBookList();
    }
    
    if($('#nearby_list').length > 0){
        if((!$.cookie("usermobile") || $.cookie("usermobile") == 'null' || $.cookie("usermobile") == null || $.cookie("usermobile") == '') && window.location.pathname.indexOf('login.php') === -1) {
            redirectLogin();
        } else {
            loadingToast();
            getUserLocation($.cookie('usercode'));
        }
    } 
    
    if($('#following_list').length > 0){
        loadingToast();
        showFollowingUserList($.cookie('usercode'));
    } 
    
    if($('#invitation').length > 0){
        html2Canvas();
    }
    
    if($('#order').length > 0 && getURLParameter('usercode') && getURLParameter('code')){
        getOwnerInfo();        
        var stocks = [], stock, index, stockMax = getURLParameter('stock');
        if(stockMax > 0) {
            for(var i=0;i<stockMax;i++){
                index = i + 1;
                stock = {
                    label: index+'本',
                    value: index
                };
                stocks.push(stock);
            }
            $('#amount').text(1);
        } else {
            stocks = [{
                label: '0本',
                value: 0
            }];
            $('#amount').text(0);
        }
        
        $('#amount').on('click', function () {
            weui.picker(stocks, {
                onChange: function (result) {
                    console.log(result);
                },
                onConfirm: function (result) {
                    $('#amount').text(result);
                }
            });
        });
        
        $('#make_order').on('click', function () {
            getUserBonus();
            if($('#amount').text() > 0){
                if($.parseJSON(sessionStorage.getItem("userbonus")).currentBonus >= 110){
                    $('body').append('<div class="js_dialog" id="borrowNotice" style="display: none;">\n\
<div class="weui-mask"></div><div class="weui-dialog"><div class="weui-dialog__bd">消费10积分，押金100积分。如分享者同意，借书期为10天。<br><a href="qa.php?q=积分规则" style="color: #586C94;">想获取更多积分！</a></div><div class="weui-dialog__ft"><a href="javascript:;" id="borrow_notice_yes" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a></div></div></div>');
                } else {
                    var stillNeed = parseInt(110 - $.parseJSON(sessionStorage.getItem("userbonus")).currentBonus);
                    $('body').append('<div class="js_dialog" id="borrowNotice" style="display: none;">\n\
<div class="weui-mask"></div><div class="weui-dialog"><div class="weui-dialog__bd">当前积分'+$.parseJSON(sessionStorage.getItem("userbonus")).currentBonus+'，还需'+stillNeed+'积分才能借阅。<a href="qa.php?q=积分规则" style="color: #586C94;">快去获取积分</a>吧！</div><div class="weui-dialog__ft"><a href="javascript:;" id="borrow_notice_no" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a></div></div></div>');
                }
                
                $('#borrowNotice').fadeIn(200, function() {
                    $('#borrow_notice_yes').click(function(){
                        orderFormBorrow();
                    });
                    $('#borrow_notice_no').click(function(){
                        $('#borrowNotice').fadeOut(100).remove();
                    });
                });
            } else {
                $('#borrowErrorNotice').fadeIn(100).find('p').text('目前此书余量为0，无法借阅');
                setTimeout(function () {
                    $('#borrowErrorNotice').fadeOut(100);
                }, 2000);
            }
        });
    }
    
    if($('#order_detail').length > 0 && getURLParameter('order')){
        getOrderDetail();
    }
    
    $('#btn-detail').click(function(){
        saveUserBook(getURLParameter('code'));
    });
    
    $('#btn-tag').click(function(){
        tagBook($('#book_to_edit').val());
    });
    
    $('#showOwners').on('click', function () {
        if((!$.cookie("usermobile") || $.cookie("usermobile") == 'null' || $.cookie("usermobile") == null || $.cookie("usermobile") == '') && window.location.pathname.indexOf('login.php') === -1) {
            redirectLogin();
        } else {
            getAllUsersInfo(getURLParameter('code'));
        }
    });
    
    $('#checkin').on('click', function () {
        checkInDaily();
    });
    
    $('#change_display').on('click', function () {
        p = 0;
        $('#nearby_list').html('');
        
        if(!sessionStorage.getItem("nearby_display") || sessionStorage.getItem("nearby_display") == 'null' || sessionStorage.getItem("nearby_display") == null || sessionStorage.getItem("nearby_display") == '') {
            sessionStorage.setItem('nearby_display','books');
            $(this).html('<i class="far fa-laugh"></i> 按人排列');
        } else {
            if(sessionStorage.getItem("nearby_display") == 'books'){
                sessionStorage.setItem('nearby_display','people');
                $(this).html('<i class="fas fa-book"></i> 按书排列');
            } else {
                sessionStorage.setItem('nearby_display','books');
                $(this).html('<i class="far fa-laugh"></i> 按人排列');
            }
        }
        
        if(sessionStorage.getItem("useraddr") != null && sessionStorage.getItem("useraddr") != 'null' &&  sessionStorage.getItem("useraddr") != ''){
            showLocationGroups();
        }
    });
    
    if($('#bonus_detail').length > 0){
        loadingToast();
        showBonusDetail();
    }
    
    $(window).scroll(function (e) {
        var target = e.currentTarget,
            scrollTop = target.scrollTop || window.pageYOffset,
            scrollHeight = target.scrollHeight || document.body.scrollHeight;
        if(scrollHeight - scrollTop === $(target).innerHeight()) {            
            if($('#book_list').length > 0){
                if($.listtype == 'tag') {
                    showBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"));
                } else if($.listtype == 'search') {
                    showSearchList($('#searchInput').val());
                }
            }
            if($('#my_book_list').length > 0){
                showMyBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"),null);
            }
            if($('#borrow_book_list').length > 0 && getURLParameter('list') && getURLParameter('list') == 'full'){
                showBorrowerBookList();
            }
            if($('#owner_book_list').length > 0 && getURLParameter('list') && getURLParameter('list') == 'full'){
                showOwnerBookList();
            }
            if($('#user_book_list').length > 0){
                showUserBookList();
            }
            if($('#nearby_list').length > 0){
                getUserLocation($.cookie('usercode'));
            } 
            if($('#bonus_detail').length > 0){
                showBonusDetail();
            }
        }
    });
});

/*function weixinLogin() {
    var map = {
        username: $.cookie('openid'),
        type: 'openid'
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
                    $.cookie("login", xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }

                $.cookie('weixin_plugin',JSON.stringify(response.data.plugin.weixin_plugin));
                $.cookie('usercode',response.data.code);
                $.cookie('usermobile',response.data.mobile);
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}*/

function getWechatSignature() {
    var sPageURL = encodeURIComponent(window.location.href);

    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/token/sign?url="+sPageURL,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Login") !== null){
                    $.cookie("login", xhr.getResponseHeader("Login"));
                }
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                var appId = response.data.appId;
                var nonceStr = response.data.nonceStr;
                var timestamp = response.data.timestamp;
                var signature = response.data.signature;

                wx.config({
                    debug: false,
                    appId: appId,
                    timestamp: timestamp,
                    nonceStr: nonceStr,
                    signature: signature,
                    jsApiList: [
                      'updateAppMessageShareData',
                      'updateTimelineShareData',
                      'scanQRCode'
                    ]
                });
                
                if(!sessionStorage.getItem("userbonus") || sessionStorage.getItem("userbonus") == 'null' || sessionStorage.getItem("userbonus") == null || sessionStorage.getItem("userbonus") == '') {
                    getUserBonus();
                }
                
                if(!sessionStorage.getItem("checkIsFollow") || sessionStorage.getItem("checkIsFollow") == 'null' || sessionStorage.getItem("checkIsFollow") == null || sessionStorage.getItem("checkIsFollow") == '') {
                    checkIsFollow();
                } else {
                    if(timestamp - sessionStorage.getItem("checkIsFollow") > 86400000){ //大于1天
                        checkIsFollow();
                    }
                }
            } else if(response.code === 'JWT0002') {
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

function checkIsFollow() {
    var weixin_plugin = $.parseJSON(sessionStorage.getItem("weixin_plugin"));
    var openid = weixin_plugin.openid;
            
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/token/isFollow?openid="+openid,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != true){
                    $('body').append('<div class="js_dialog" id="FollowReminder" style="display: none;">\n\
<div class="weui-mask"></div><div class="weui-dialog"><div class="weui-dialog__bd">识别图中二维码，精彩活动不错过！<br><br><img width="100" src="default/green/images/qr.jpg" alt=""></div><div class="weui-dialog__ft"><a href="javascript:;" id="FollowReminderLink" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a></div></div></div>');             
                    
                    $('#FollowReminder').fadeIn(200, function() {
                        $('#FollowReminderLink').click(function(){
                            $('#FollowReminder').fadeOut(100).remove();
                        });
                    });
                    
                    sessionStorage.setItem('checkIsFollow',timestamp); // 弹出后更新缓存
                }
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getUserBonus() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/userbonus/"+$.cookie('usercode'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                sessionStorage.setItem("userbonus", JSON.stringify(response.data));
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function redirectLogin() {
    window.location.href = "login.php?introUserCode="+getURLParameter('introUserCode')+"&source="+getURLParameter('source')+"";
}

function updateMobile() {
    var map = {
        baseUserBonus: {
            remark: '手机绑定',
            updated: $.parseJSON(sessionStorage.getItem("userbonus")).updated,
            userCode: $.cookie('usercode')    
        },
        mobile: $('#mobile_no').val(),
        userCode: $.cookie('usercode'),
        verificationCodeCheck: {
            code: $('#login_verify').val(),
            key: $.api.mobileVC,
            keyword: $('#mobile_no').val(),
            verifyType: 'mobile'
        }
    };
    
    if(getURLParameter('introUserCode') != null && getURLParameter('introUserCode') != '' && getURLParameter('introUserCode') != 'undefined'){
        map.userIntro = {
            introUserCode: getURLParameter('introUserCode'),
            source: getURLParameter('source'),
            userCode: $.cookie('usercode')
        };
    }
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/updateMobile",
        type: "PUT",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                $.cookie("usermobile",response.data.mobile);
                $.cookie("fullname",response.data.settings.name);
                $.cookie("profession",response.data.settings.profession);
                
                if(response.data.plugin.user_bonus != null && response.data.plugin.user_bonus != '') {
                    sessionStorage.setItem("userbonus", JSON.stringify(response.data.plugin.user_bonus));
                    var type;
                    switch(response.data.plugin.user_bonus.currentUserBonusDetail.type) {
                        case 0:
                          type = "调整";
                          break;
                        case 1:
                          type = "借阅申请";
                          break;
                        case 2:
                          type = "归还图书";
                          break;
                        case 3:
                          type = "注册赠送";
                          break;
                        case 4:
                          type = "添加图书";
                          break;
                        case 5:
                          type = "分享";
                          break;
                        case 6:
                          type = "邀请好友";
                          break;
                        case 7:
                          type = "签到";
                          break;
                        case 8:
                          type = "借阅同意";
                          break;
                        case 9:
                          type = "借阅不同意";
                          break;
                        default:
                          type = "未知";
                    }
                    
                    $('body').append('<div id="mobile_register_succeed" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-success-no-circle weui-icon_toast"></i><p class="weui-toast__content"> '+type+response.data.plugin.user_bonus.currentUserBonusDetail.bonus+'积分 </p>\n\
</div></div></div>');
                                                                
                    $('#mobile_register_succeed').fadeIn(100);
                    setTimeout(function () {
                        getUserLocation(null);
                    }, 1000);
                } else {
                    getUserLocation(null);
                }
            } else {
                $('#login_error_msg').fadeIn(100).find('p').text(response.customerMessage);
                setTimeout(function () {
                    $('#login_error_msg').fadeOut(100);
                }, 2000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

var countdownLogin=60;

function VeryficationCodeLogin() {
    var obj = $("#login_verify_link");
    var objInput = $("#login_verify");
    var userName = $('#mobile_no').val();
    
    objInput.attr('readonly',false);
    
    if(userName) {
        $.ajax({
            url: $.api.base+"/nb-customer/api/verify/sms?mobile="+userName,
            type: "POST",
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie("login"));
                request.setRequestHeader("Authorization", $.cookie("authorization"));
            },
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    $.api.mobileVC = response.data;
                    setTimeLogin(obj);       
                } else {
                    $('body').append('<div id="verify_error" style="display: none;">\n\
    <div class="weui-mask_transparent">\n\
    <div class="weui-toast">\n\
    <i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content">'+response.customerMessage+'</p>\n\
    </div></div></div>');

                    $('#verify_error').fadeIn(100);
                    setTimeout(function () {
                        $('#verify_error').fadeOut(1000).remove();
                    }, 1000);
                }
            }
        });
    }
}

function setTimeLogin(obj) {
    if (countdownLogin == 0) { 
        obj.attr('onclick','javascript: VeryficationCodeLogin()');
        obj.text('获取验证码');
        countdownLogin = 60; 
        return;
    } else { 
        obj.attr('onclick','javascript: void(0)');
        obj.text("重新获取 (" + countdownLogin + "s)");
        countdownLogin--; 
    }
    
    setTimeout(function() { 
        setTimeLogin(obj); }
        ,1000); 
}

function getUserLocation(uc) {
    var usercode;
    if(uc == null){
        usercode = $.cookie('usercode');
    } else {
        usercode = uc;
    }
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/userLocation/"+usercode,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                sessionStorage.setItem('useraddr',JSON.stringify(response.data));
                if(window.location.pathname.indexOf('location.php') !== -1 || window.location.pathname.indexOf('volunteer.php') !== -1){
                    if(sessionStorage.getItem("useraddr") != null && sessionStorage.getItem("useraddr") != 'null' &&  sessionStorage.getItem("useraddr") != ''){
                        $('#show_locations').html('');
                        var ha = $.parseJSON(sessionStorage.getItem("useraddr"));
                        
                        var home_tag_code, school_tag_code, tagcode;
                        $.each($.parseJSON(sessionStorage.getItem("locationgroups")), function(i,v) {
                            if(v.tagGroupTags.length > 0){
                                $.each(v.tagGroupTags, function(j,w) {
                                    if(w.tag.name == 'home'){
                                        home_tag_code = w.tag.code;
                                    } else if(w.tag.name == 'school'){
                                        school_tag_code = w.tag.code;
                                    }
                                });
                            }
                        });
                        
                        if(ha.length > 0){
                            var tag;
                            $.each(ha, function(i,v) {
                                if(v.tagCode == home_tag_code){
                                    tag = '家';
                                } else if(v.tagCode == school_tag_code){
                                    tag = '学校';
                                } else {
                                    tag = '未知';
                                }
                                
                                $('#show_locations').append('<div id="cell_'+v.tagCode+'" class="weui-cell"><div class="weui-cell__bd"><p>'+v.location.title+'<span class="weui-badge" style="margin-left: 5px;">'+tag+'</span></p></div><div class="weui-cell__ft"><span id="delete_'+v.tagCode+'" class="delete-location"><i class="far fa-trash-alt"></i><span class="hidden-info" style="display:none;">'+JSON.stringify(v)+'</span></span></div></div>');
                            });
                        }
                        
                        $('.delete-location').click(function(){
                            deleteLocation($(this).attr('id').split("_")[1], $(this).find('.hidden-info').text());
                        });
                    }
                } else if(window.location.pathname.indexOf('nearby.php') !== -1){
                    if(sessionStorage.getItem("useraddr") != null && sessionStorage.getItem("useraddr") != 'null' &&  sessionStorage.getItem("useraddr") != ''){
                        showLocationGroups();
                    }
                } else if(window.location.pathname.indexOf('order_detail.php') !== -1) {
                    if(sessionStorage.getItem("useraddr") != null && sessionStorage.getItem("useraddr") != 'null' &&  sessionStorage.getItem("useraddr") != ''){
                        var ha = $.parseJSON(sessionStorage.getItem("useraddr"));
                       
                        var home_tag_code, school_tag_code, tagcode;
                        $.each($.parseJSON(sessionStorage.getItem("locationgroups")), function(i,v) {
                            if(v.tagGroupTags.length > 0){
                                $.each(v.tagGroupTags, function(j,w) {
                                    if(w.tag.name == 'home'){
                                        home_tag_code = w.tag.code;
                                    } else if(w.tag.name == 'school'){
                                        school_tag_code = w.tag.code;
                                    }
                                });
                            }
                        });
                       
                        if(ha.length > 0){
                            var tag;
                            $.each(ha, function(i,v) {
                                if(v.tagCode == home_tag_code){
                                    tag = '家';
                                } else if(v.tagCode == school_tag_code){
                                    tag = '学校';
                                } else {
                                    tag = '未知';
                                }
                                
                                $('#addr_li .weui-dialog__bd').append(v.location.title+'<span class="weui-badge" style="margin-left: 5px; background-color: #f43530; color: #fff; border: none;">'+tag+'</span><br>');
                            });
                        }

                        $("#neighborhood a").on('click', function(){
                            $('#addr_li').fadeIn(200);
                            $('.weui-mask, .weui-dialog__btn').on('click',function () {
                                $('#addr_li').fadeOut(200);
                            });
                        });
                    }
                } else {
                    if(response.data == null || response.data == '' || response.data.length < 0 ){
                        window.location.href = "location.php";
                    } else {
                        window.location.href = sessionStorage.getItem("location_href");
                    }
                }
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getTagGroups() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/taggroup/findAllByVisible?visible=1",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                sessionStorage.setItem("taggroups", JSON.stringify(response.data) );
            } else {
                //alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getLocationGroups() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/taggroup/findAllByVisible?visible=0",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                sessionStorage.setItem("locationgroups", JSON.stringify(response.data) );
            } else {
                //alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showTagGroups() {
    $.each($.parseJSON(sessionStorage.getItem("taggroups")), function(i,v) {
        var options = '';
        if(v.tagGroupTags.length > 0){
            $.each(v.tagGroupTags, function(j,w) {
                options += '<option value='+w.tag.code+'>'+w.tag.title+'</option>';
                $.category.push(w.tag.code);
            });
        }

        if($('#taggroups').length > 0){
            $('#taggroups').append('<div class="weui-cell weui-cell_select" style="float: left;">\n\
<div class="weui-cell__bd">\n\
<select class="weui-select" id="'+v.name+'" name="'+v.name+'"><option selected="" value="">'+v.title+'</option>'+options+'</select>\n\
</div></div>');
        }
    });
    
    if($('#taggroups').length > 0){
        $('#taggroups').append('<div class="weui-cell weui-cell_select" style="padding: 6px 0;">\n\
<label class="weui-agree" for="weuiOnlySharable" style="padding: .5em 10px .5em 2px;">\n\
<input id="weuiOnlySharable" type="checkbox" class="weui-agree__checkbox"> 可借阅\n\
</label>\n\
</div>');
    }

    $("#age").on('change',function(){
        sessionStorage.setItem('age_selector', $("#age").children('option:selected').val() || '');
        p = 0;
        if($('#book_list').length > 0){
            $('#book_list').html("");
            showBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"));
        } else if($('#my_book_list').length > 0){
            $('#my_book_list').html("");
            showMyBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"),null);
        }
    });

    $("#category").on('change',function(){
        sessionStorage.setItem('category_selector', $("#category").children('option:selected').val() || '');
        p = 0;
        if($('#book_list').length > 0){
            $('#book_list').html("");
            showBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"));
        } else if($('#my_book_list').length > 0){
            $('#my_book_list').html("");
            showMyBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"),null);
        }
    });

    $("#language").on('change',function(){
        sessionStorage.setItem('language_selector', $("#language").children('option:selected').val() || '');
        p = 0;
        if($('#book_list').length > 0){
            $('#book_list').html("");
            showBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"));
        } else if($('#my_book_list').length > 0){
            $('#my_book_list').html("");
            showMyBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"),null);
        }
    });
    
    $("#weuiOnlySharable").on('change',function(){
        if($(this).is(":checked")) {
            sessionStorage.setItem('sharable_selector', '1');
        } else {
            sessionStorage.setItem('sharable_selector', '');
        }
        p = 0;
        if($('#book_list').length > 0){
            $('#book_list').html("");
            showBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"));
        } else if($('#my_book_list').length > 0){
            $('#my_book_list').html("");
            showMyBookList(sessionStorage.getItem("age_selector"),sessionStorage.getItem("category_selector"),sessionStorage.getItem("language_selector"),null);
        }
    });
}

function showLocationGroups() {
    var home_tag_code, school_tag_code;
    $.each($.parseJSON(sessionStorage.getItem("locationgroups")), function(i,v) {
        if(v.tagGroupTags.length > 0){
            $.each(v.tagGroupTags, function(j,w) {
                if(w.tag.name == 'home'){
                    home_tag_code = w.tag.code;
                } else if(w.tag.name == 'school'){
                    school_tag_code = w.tag.code;
                }
            });
        }
    });
        
    if(sessionStorage.getItem("useraddr") != null && sessionStorage.getItem("useraddr") != 'null' && sessionStorage.getItem("useraddr") != ''){
        var options = [], tag;
        $.each($.parseJSON(sessionStorage.getItem("useraddr")),function(k,x) {
            if(x.tagCode == home_tag_code){
                tag = '家';
            } else if(x.tagCode == school_tag_code){
                tag = '学校';
            } else {
                tag = '未知';
            }
                
            options.push({
                title: x.location.title,
                value: x.location.lbsId,
                description: tag
            });
        });

        if($('#locationgroups').length > 0){
            $('#locationgroups').html('<div class="weui-cell weui-cell_access">\n\
            <div class="weui-cell__hd"><label for="in" class="weui-label">选择地址</label></div>\n\
            <div class="weui-cell__bd">\n\
            <input class="weui-input select-input" id="in" type="text" placeholder="请选择">\n\
            </div><div class="weui-cell__ft"></div></div>');
        }
        
        if(sessionStorage.getItem("locationTagCode") == null || sessionStorage.getItem("locationTagCode") == 'null' || sessionStorage.getItem("locationTagCode") == ''){
            var locationTagCode = [], locationTagName = [];
            $.each(options,function(k,x) {
                locationTagCode.push(x.value); 
                locationTagName.push(x.title); 
            });
            
            sessionStorage.setItem('locationTagCode',locationTagCode);
            sessionStorage.setItem('locationTagName',locationTagName);
        }

        var locationTagCode = sessionStorage.getItem("locationTagCode").split(',');
        if(sessionStorage.getItem("locationTagCode") != null && sessionStorage.getItem("locationTagCode") != 'null' && sessionStorage.getItem("locationTagCode") != ''){
            if(!sessionStorage.getItem("nearby_display") || sessionStorage.getItem("nearby_display") == 'null' || sessionStorage.getItem("nearby_display") == null || sessionStorage.getItem("nearby_display") == '') {
                showNearbyUserList(locationTagCode, $.cookie('usercode'));
            } else {
                if(sessionStorage.getItem("nearby_display") == 'books'){
                    showNearbyBookList(locationTagCode, $.cookie('usercode'));
                } else {
                    showNearbyUserList(locationTagCode, $.cookie('usercode'));
                }
            }      
        } else {
            $('#nearby_list').html('<article class="weui-article"><h2>未有地址记录，请<a href="location.php">点击前往添加</a></h2></article>');
            $('.weui-loadmore').fadeOut();
        }
        
        $("#in").select({
            input: sessionStorage.getItem("locationTagName"),
            title: '选择地址',
            multi: true,
            items: options,
            beforeClose: function(values, titles) {
                sessionStorage.setItem('locationTagCode',values.split(','));
                sessionStorage.setItem('locationTagName',titles.split(','));
                
                var locationTagCode = sessionStorage.getItem("locationTagCode").split(',');
                if(sessionStorage.getItem("locationTagCode") != null && sessionStorage.getItem("locationTagCode") != 'null' && sessionStorage.getItem("locationTagCode") != ''){
                    p = 0;
                    $('#nearby_list').html('');
                    if(!sessionStorage.getItem("nearby_display") || sessionStorage.getItem("nearby_display") == 'null' || sessionStorage.getItem("nearby_display") == null || sessionStorage.getItem("nearby_display") == '') {
                        showNearbyUserList(locationTagCode, $.cookie('usercode'));
                    } else {
                        if(sessionStorage.getItem("nearby_display") == 'books'){
                            showNearbyBookList(locationTagCode, $.cookie('usercode'));
                        } else {
                            showNearbyUserList(locationTagCode, $.cookie('usercode'));
                        }
                    }   
                }
            },
            onChange: function(d) {
                //
            },
            onClose: function (d) {
                //
            }
        });
    }
}

function uploadISBN(n) {
    var isbn;
    if(n == null){
        isbn = $('#isbn_input').val();
    } else {
        isbn = n;
    }
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/isbn/"+isbn,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                window.location.href = "book.php?code="+response.data.code+"&tagbook=1";
    
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showSearchList(txt) {
    if(q = 0){
        $('#book_list').html('');
    }
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/book/findAllBySearchAndUserCodeNot?search="+txt+"&userCode="+$.cookie('usercode')+"&page="+Math.round(q)+"",
        type: "POST",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $.each(response.data.content, function(i,v){
                    var authors = '';
                    if(v.authors.length > 0){
                        authors = v.authors[0].author.replace(txt,'<span style="color: #f43530;">'+txt+'</span>');
                        
                        if(v.authors.length > 1){
                            authors = authors.replace(txt,'<span style="color: #f43530;">'+txt+'</span>') + '等';
                        }
                    }
                    
                    var title = v.title.replace(txt,'<span style="color: #f43530;">'+txt+'</span>');
                    var publisher = v.publisher.replace(txt,'<span style="color: #f43530;">'+txt+'</span>');
                    
                    $('#book_list').append('<a href="book.php?code='+v.code+'" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.image+'" alt=""></div>\n\
<div class="weui-media-box__bd">\n\
<h4 class="weui-media-box__title">'+title+'</h4>\n\
<p class="weui-media-box__desc">作者: '+authors+'</p>\n\
<p class="weui-media-box__desc">出版社:'+publisher+'</p>\n\
</div>\n\
</a>');
                });
                
                q++;
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showNearbyBookList(lbs,uc) {
    var lbsId = [], sharable = '';
    lbsId = lbs;
    sharable = '&sharable=1';
   
    $.ajax({
        url: $.api.base+"/nb-customer/api/book/findAllByLbsIdAndUserCodeNot?page="+Math.round(p)+sharable+"&userCode="+$.cookie('usercode')+"",
        type: "POST",
        data: JSON.stringify(lbsId),
        dataType: "json",
        async: false,
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $.each(response.data.content, function(i,v){
                    var authors = '';
                    if(v.authors.length > 0){
                        authors = v.authors[0].author;
                        
                        if(v.authors.length > 1){
                            authors = authors + '等';
                        }
                    }
                    
                    $('#nearby_list').append('<a href="book.php?code='+v.code+'" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.image+'" alt=""></div>\n\
<div class="weui-media-box__bd">\n\
<h4 class="weui-media-box__title">'+v.title+'</h4>\n\
<p class="weui-media-box__desc">作者: '+authors+'</p>\n\
<p class="weui-media-box__desc">出版社:'+v.publisher+'</p>\n\
</div>\n\
</a>');
                });
                
                p++;
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showNearbyUserList(lbs,uc) {
    var lbsId = [], sharable = '';
    lbsId = lbs;
    sharable = '&sharable=1';
   
    $.ajax({
        url: $.api.base+"/nb-customer/api/nearby/findAllByLbsIdInAndUserCodeNot?page="+Math.round(p)+sharable+"&userCode="+$.cookie('usercode')+"",
        type: "POST",
        data: JSON.stringify(lbsId),
        dataType: "json",
        async: false,
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $.each(response.data.content, function(i,v){
                    var grid = '';                    
                    $.each(v.userBookMinInfos.content, function(j,k){
                        grid += '<div class="weui-grid">\n\
    <div class="weui-grid__icon"><a href="book.php?code='+k.bookMinInfo.code+'"><img class="weui-media-box__thumb" src="'+k.bookMinInfo.image+'" alt=""></a></div>\n\
    <p class="weui-grid__label">'+k.bookMinInfo.title+'</p>\n\
    </div>'; 
                    });
                    
                    var follows = '';
                    if(v.followed == true){
                        follows = '<a href="javascript:;" id="follow_'+v.user.code+'" class="weui-btn weui-btn_mini weui-btn_default unfollow"><i class="fas fa-check"></i> 已关注 <i class="fas fa-caret-up"></i></a>';
                    } else {
                        follows = '<a href="javascript:;" id="follow_'+v.user.code+'" class="weui-btn weui-btn_mini weui-btn_default follow"><i class="fas fa-plus" style="color: #e7666f"></i> 关注</a>';
                    }
                    
                    $('#nearby_list').append('<div class="weui-panel weui-panel_access">\n\
<div class="weui-panel__bd">\n\
<div class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.user.plugin.weixin_plugin.headimgurl+'" alt="" style="-moz-box-shadow: none; box-shadow: none;"></div>\n\
<div class="weui-media-box__bd"><h4 class="weui-media-box__title">'+v.user.plugin.weixin_plugin.nickname+'<p class="weui-media-box__desc">'+v.userBookMinInfos.totalElements+'本绘本</p></h4><p class="weui-media-box__desc"><a href="booklist.php?usercode='+v.user.code+'">查看更多</a></p></div>\n\
<div class="weui-media-box__ft">'+follows+'</div></div>\n\
<div class="weui-cell" style="margin-top: -20px;">\n\
'+grid+'</div></div></div>');
                });
                
                p++;       
                
                $('.follow').one("click", function () {
                    followUser($(this).attr('id').split('_')[1],'nearby'); 
                });

                $('.unfollow').one("click", function () {
                    var uc = $(this).attr('id').split('_')[1];
                    $.actions({
                        title: "选择操作",
                        onClose: function() {
                            console.log("close");
                        },
                        actions: [
                            {
                                text: "取消关注",
                                className: "color-danger",
                                onClick: function() {
                                    unFollowUser(uc,'nearby'); 
                                }
                            }
                        ]
                    });
                });
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showFollowingUserList(uc) {
    $.ajax({
        url: $.api.base+"/nb-customer/api/userfollow/followers/"+uc+"?page="+Math.round(p)+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $.each(response.data.content, function(i,v){
                    var grid = '';                    
                    $.each(v.follower.userBookMinInfos.content, function(j,k){
                        grid += '<div class="weui-grid">\n\
    <div class="weui-grid__icon"><a href="book.php?code='+k.bookMinInfo.code+'"><img class="weui-media-box__thumb" src="'+k.bookMinInfo.image+'" alt=""></a></div>\n\
    <p class="weui-grid__label">'+k.bookMinInfo.title+'</p>\n\
    </div>'; 
                    });
                    
                    var follows = '';
                    if(v.follower.followed == true){
                        follows = '<a href="javascript:;" id="follow_'+v.follower.user.code+'" class="weui-btn weui-btn_mini weui-btn_default unfollow"><i class="fas fa-check"></i> 已关注 <i class="fas fa-caret-up"></i></a>';
                    } else {
                        follows = '<a href="javascript:;" id="follow_'+v.follower.user.code+'" class="weui-btn weui-btn_mini weui-btn_default follow"><i class="fas fa-plus" style="color: #e7666f"></i> 关注</a>';
                    }
                    
                    $('#following_list').append('<div class="weui-panel weui-panel_access">\n\
<div class="weui-panel__bd">\n\
<div class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.follower.user.plugin.weixin_plugin.headimgurl+'" alt="" style="-moz-box-shadow: none; box-shadow: none;"></div>\n\
<div class="weui-media-box__bd"><h4 class="weui-media-box__title">'+v.follower.user.plugin.weixin_plugin.nickname+'<p class="weui-media-box__desc">'+v.follower.userBookMinInfos.totalElements+'本绘本</p></h4><p class="weui-media-box__desc"><a href="booklist.php?usercode='+v.follower.user.code+'">查看更多</a></p></div>\n\
<div class="weui-media-box__ft">'+follows+'</div></div>\n\
<div class="weui-cell" style="margin-top: -20px;">\n\
'+grid+'</div></div></div>');
                });
                
                p++;       
                
                $('.follow').one("click", function () {
                    followUser($(this).attr('id').split('_')[1],'nearby'); 
                });

                $('.unfollow').one("click", function () {
                    var uc = $(this).attr('id').split('_')[1];
                    $.actions({
                        title: "选择操作",
                        onClose: function() {
                            console.log("close");
                        },
                        actions: [
                            {
                                text: "取消关注",
                                className: "color-danger",
                                onClick: function() {
                                    unFollowUser(uc,'nearby'); 
                                }
                            }
                        ]
                    });
                });
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function followUser(uc,source) {
    var map = {
        followUserCode: uc,
        source: source,
        userCode: $.cookie('usercode')
    };
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/userfollow/follow",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('#follow_'+uc).removeClass('follow').addClass('unfollow').html('<i class="fas fa-check"></i> 已关注 <i class="fas fa-caret-up"></i>').one('click', function(){
                    $.actions({
                        title: "选择操作",
                        onClose: function() {
                            console.log("close");
                        },
                        actions: [
                            {
                                text: "取消关注",
                                className: "color-danger",
                                onClick: function() {
                                    unFollowUser(uc,source); 
                                }
                            }
                        ]
                    });
                });
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function unFollowUser(uc,source) {
    var map = {
        followUserCode: uc,
        source: source,
        userCode: $.cookie('usercode')
    };
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/userfollow/unfollow",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('#follow_'+uc).removeClass('unfollow').addClass('follow').html('<i class="fas fa-plus" style="color: #e7666f"></i> 关注').one('click',function(){
                    followUser(uc,source);
                });
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showBookList(a,c,l) {
    var tg = [], sharable = '';
    if(a != '' && a != null){
        tg.push(a);
    }
    
    if(c != '' && c != null){
        tg.push(c);
    }
    
    if(l != '' && l != null){
        tg.push(l);
    }
    
    if(sessionStorage.getItem('sharable_selector') == 1) {
        sharable = '&sharable=1';
    }
        
    $.ajax({
        url: $.api.base+"/nb-customer/api/book/findAllByTagCodeAndUserCodeNot?page="+Math.round(p)+sharable+"&userCode="+$.cookie('usercode')+"",
        type: "POST",
        data: JSON.stringify(tg),
        dataType: "json",
        async: false,
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $.each(response.data.content, function(i,v){
                    var authors = '';
                    if(v.authors.length > 0){
                        authors = v.authors[0].author;
                        
                        if(v.authors.length > 1){
                            authors = authors + '等';
                        }
                    }
                    
                    $('#book_list').append('<a href="book.php?code='+v.code+'" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.image+'" alt=""></div>\n\
<div class="weui-media-box__bd">\n\
<h4 class="weui-media-box__title">'+v.title+'</h4>\n\
<p class="weui-media-box__desc">作者: '+authors+'</p>\n\
<p class="weui-media-box__desc">出版社:'+v.publisher+'</p>\n\
</div>\n\
</a>');
                });
                
                p++;
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showBookDetail() {
    var code = getURLParameter('code') || null;
    $.ajax({
        url: $.api.base+"/nb-customer/api/book/findOneByCode/"+code+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                var tags = '';
                $.each(response.data.bookTags, function(i,v){
                    if ($.inArray(v.tag.code, $.category) >= 0) {
                        tags +=  '<span class="weui-badge">'+v.tag.title+'</span>'; 
                    }
                });
                
                var authors = '';
                if(response.data.authors.length > 0){
                    authors = response.data.authors[0].author;

                    if(response.data.authors.length > 1){
                        authors = authors + '等';
                    }
                }
                
                var stock, stocks = 0;
                if(response.data.userBooks.content.length > 0){
                    $.each(response.data.userBooks.content, function(i,v){
                        stock = parseInt(v.bookCount) - parseInt(v.lentAmount);
                        if(v.userCode != $.cookie('usercode')){
                            stocks = stocks + stock;
                        } 
                    });
                }
                
                if(stocks > 0){
                    $('#showOwners').append('目前库存'+stocks+'本，我要借阅');
                } else {
                    $('#showOwners').append('抱歉，此书暂无库存');
                }
                
                $('.weui-media-box__title').html(response.data.title);
                $('p.weui-media-box__desc').html(tags);
                $('.film_info_hot img').attr('src',response.data.image);
                $('.film_info_hot').append('<h3>作者: <span>'+authors+'</span></h3>\n\
<h3>出版时间: <span>'+(response.data.pubdate || '')+'</span></h3>\n\
<h3>出版社: <span>'+(response.data.publisher || '')+'</span></h3>\n\
<h3>ISBN: <span>'+(response.data.isbn13 || response.data.isbn10)+'</span></h3>\n\
<h3>包装: <span>'+(response.data.binding || '')+'</span></h3>\n\
<h3>售价: <span>'+(response.data.price || '')+'</span></h3>\n\
<h3>内容梗概:</h3>\n\
<p>'+(response.data.summary || '')+'</p>');
                
                if((!getURLParameter('tagbook') || getURLParameter('tagbook') != 1) && (!getURLParameter('sharebook') || getURLParameter('sharebook') != 1)){
                    $('.film_info_hot').append('<p class="weui-footer"><a class="weui-footer__link" href="javascript:history.go(-1);"><< 返回上一级</a></p>');
                    $('#bonus').text($.parseJSON(sessionStorage.getItem('userbonus')).currentBonus);
                } 
                
                if(getURLParameter('tagbook') && getURLParameter('tagbook') == 1){
                    if((!$.cookie("usermobile") || $.cookie("usermobile") == 'null' || $.cookie("usermobile") == null || $.cookie("usermobile") == '') && window.location.pathname.indexOf('login.php') === -1) {
                        redirectLogin();
                    } else {
                        if($('#edit_area_div').length > 0){
                            fillEditArea();
                        }
                        $('#edit_area').show();
                        $('#close_edit_area').hide();
                        $('#book_to_edit').val(getURLParameter('code'));

                        showMyBookDetail();
                    }
                }
                
                $.shareData = {
                    title: response.data.title+'，免费借阅',
                    desc: '我在邻里爱读书发现一本好书，免费借阅，快来看看！',
                    link: $.api.share+'/book.php?code='+response.data.code+'&sharebook=1&introUserCode='+$.cookie('usercode')+'&source=bookDetail',
                    imgUrl: response.data.image
                };
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showMyBookDetail() {
    var code = getURLParameter('code') || null;
    var user = $.cookie('usercode') || null;
    $.ajax({
        url: $.api.base+"/nb-customer/api/userbook/findOneByUserCodeAndBookCode?bookCode="+code+"&userCode="+user+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if($('#showOwners').length > 0){
                    $('#showOwners').parents('.weui-panel__ft').hide();
                }
                
                if(response.data != null){
                    $('#stock').val(response.data.bookCount);

                    if(response.data.sharable == 0) {
                        $('#switchCP').removeAttr('checked');
                    }
                    
                    if(getURLParameter('tagbook') && getURLParameter('tagbook') == 1){
                        $('body').append('<div id="upload_duplication" style="display: none;">\n\
    <div class="weui-mask_transparent">\n\
    <div class="weui-toast">\n\
    <i class="weui-icon-info-circle weui-icon_toast"></i><p class="weui-toast__content"> 你已分享过该书 </p>\n\
    </div></div></div>');

                        $('#upload_duplication').fadeIn(100);

                        setTimeout(function () {
                            $('#upload_duplication').fadeOut(100).remove();
                        }, 2000);
                    }
                } else {
                    $('#stock').val(1);
                }

            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function saveUserBook(id) {
    var sharable = 0;
    if($('#switchCP').is(":checked")) {
        sharable = 1;
    }
        
    var map = {
        baseUserBonus: {
            remark: '保存图书',
            updated: $.parseJSON(sessionStorage.getItem('userbonus')).updated,
            userCode: $.cookie('usercode')    
        },
        bookCode: id,
        bookCount: $('#stock').val(),
        sharable: sharable,
        userCode: $.cookie('usercode')
    };
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/userbook/save",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                var reward = '';
                if(response.data != null && response.data != '') {
                    sessionStorage.setItem("userbonus", JSON.stringify(response.data));
                    
                    if(response.data.currentUserBonusDetail != null && response.data.currentUserBonusDetail != '') {
                        reward = '<br>+ '+response.data.currentUserBonusDetail.bonus+'积分 ';
                    }
                }
                
                $('body').append('<div id="save_user_book_succeed" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-success-no-circle weui-icon_toast"></i><p class="weui-toast__content"> 添加分享图书成功 '+reward+'</p>\n\
</div></div></div>');
                    
                $('#save_user_book_succeed').fadeIn(100);
                setTimeout(function () {
                    window.location.href = "bookshelf.php";
                }, 1000);
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showMyBookList(a,c,l,s) {
    closeEditArea();
    var tg = [], sharable = '';
    if(a != '' && a != null){
        tg.push(a);
    }
    
    if(c != '' && c != null){
        tg.push(c);
    }
    
    if(l != '' && l != null){
        tg.push(l);
    }
    
    if(sessionStorage.getItem('sharable_selector') == 1) {
        sharable = '&sharable=1';
    }
    
    var sharableAmount = 0;
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/userbook/findAllByTagCodeAndUserCode?userCode="+$.cookie('usercode')+"&page=1&sharable=1",
        type: "POST",
        data: JSON.stringify([]),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                sharableAmount = response.data.totalElements;
            } else {
                alert(response.customerMessage);
            }
        }
    });
    
    var ajax = {};
    
    if(s != null) {
        if(p = 0){
            $('#my_book_list').html('');
        }
    
        ajax.url = $.api.base+"/nb-customer/api/userbook/findAllBySearchAndUserCode?search="+s+"&userCode="+$.cookie('usercode')+"&page="+Math.round(p)+"";
        ajax.data = "";
        ajax.dataType = "";
        ajax.async = true;
        ajax.contentType = "";
    } else {
        ajax.url = $.api.base+"/nb-customer/api/userbook/findAllByTagCodeAndUserCode?userCode="+$.cookie('usercode')+"&page="+Math.round(p)+sharable+"";
        ajax.data = JSON.stringify(tg);
        ajax.dataType = "json";
        ajax.async = false;
        ajax.contentType = "application/json";       
    }
    
    
    $.ajax({
        url: ajax.url,
        type: "POST",
        data: JSON.stringify(tg),
        async: ajax.async,
        dataType: ajax.dataType,
        contentType: ajax.contentType,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                if(response.data.content.length > 0){
                    $.each(response.data.content, function(i,v){
                        var tags = '', sharableTag = '';
                        if(v.bookMinInfo.bookTags.length > 0) {
                            $.each(v.bookMinInfo.bookTags, function(j,k){
                                if ($.inArray(k.tag.code, $.category) >= 0) {
                                    tags +=  '<span class="weui-badge">'+k.tag.title+'<span>('+k.tagCount+')</span></span> ';
                                }
                            });
                        }

                        if(v.sharable != 1){
                            sharableTag = '<span class="weui-badge" style="margin-bottom: 5px; background: #f43530; color: #fff;">不可借阅</span>';
                        }

                        $('#my_book_list').append('<div id="book_'+v.bookMinInfo.code+'" class="weui-media-box weui-media-box_appmsg">\n\
    <div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.bookMinInfo.image+'" alt=""></div>\n\
    <div class="weui-media-box__bd">\n\
    <h4 class="weui-media-box__title">'+v.bookMinInfo.title+'</h4>'+sharableTag+'\n\
    <p id="tags_'+v.bookMinInfo.code+'" class="weui-media-box__desc">'+tags+'</p>\n\
    <p class="weui-media-box__desc">\n\
    <a href="book.php?code='+v.bookMinInfo.code+'&user='+$.cookie('usercode')+'" class="weui-btn weui-btn_mini weui-btn_default">点击进入</a> \n\
    <a href="javascript: void(0);" id="tagging_'+v.bookMinInfo.code+'" class="weui-btn weui-btn_mini weui-btn_primary tagging">添加标签</a>\n\
    </p>\n\
    </div>\n\
    </div>');   
                    });
                }
                
                $.shareData = {
                    title: sharableAmount+'本绘本免费借阅',
                    desc: '我在邻里爱读书分享了'+sharableAmount+'本绘本，免费借！快来看看！',
                    link: $.api.share+'/booklist.php?usercode='+$.cookie('usercode')+'&introUserCode='+$.cookie('usercode')+'&source=myBookshelf',
                    imgUrl: $.api.share+'/default/green/images/share-logo.jpg'
                };
                
                p++;
                
                $('.tagging').click(function(){
                    closeEditArea();
                    $('html,body').animate({
                        scrollTop: $("#book_"+$(this).attr('id').split("_")[1]).offset().top
                    }, 0);
                    $('#book_to_edit').val($(this).attr('id').split("_")[1]);
                    openEditArea($(this).attr('id').split("_")[1]);
                });

                $('#close_edit_area').click(function(){
                    closeEditArea();
                });
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function countUserBooks() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/orderform/count/"+$.cookie('usercode')+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                var overdue = 0;
                if(response.data.borrowers.overdue > 0){
                    if(window.location.pathname.indexOf('profile.php') !== -1) {
                        $('.weui-cell').find('.weui-tabbar__item').eq(2).append('<span class="weui-badge" style="background-color: #F43530; border: 0 none; color: #fff; position: absolute;top: 0;right: 20px;">'+response.data.borrowers.overdue+'</span>');
                    }
                    overdue += response.data.borrowers.overdue;
                }
                    
                if(response.data.owners.overdue > 0){
                    if(window.location.pathname.indexOf('profile.php') !== -1) {
                        $('.weui-cell').find('.weui-tabbar__item').eq(3).append('<span class="weui-badge" style="background-color: #F43530; border: 0 none; color: #fff; position: absolute;top: 0;right: 20px;">'+response.data.owners.overdue+'</span>');
                    }
                    overdue += response.data.owners.overdue;
                }

                
                if(overdue > 0){
                    $('#foot_profile').append('<span class="weui-badge" style="background-color: #F43530; border: 0 none; color: #fff; position: absolute;top: -.4em;right: 2.3em;">'+overdue+'</span>');
                };
                
                if(window.location.pathname.indexOf('bookshelf.php') !== -1 || window.location.pathname.indexOf('borrowerlist.php') !== -1 
            || window.location.pathname.indexOf('ownerlist.php') !== -1) {
                    $('#nav_my_books').text('('+response.data.userBooks+')');
                    $('#nav_borrow_books').text('('+response.data.borrowers.count+')');
                    $('#nav_owner_books').text('('+response.data.owners.count+')');
                }
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showBorrowerBookListUnfinished() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/orderform/borrow/borrower/unfinished/"+$.cookie('usercode'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('.weui-loadmore').hide();
                
                $.each(response.data, function(i,v){
                    var oSS,orderDetailType, orderStatus;
                    oSS = orderStepSwitch(v.details[0].orderDetailType,v.orderStatus,v.details[0].orderDetailStatus);
                    orderDetailType = oSS[0];
                    orderStatus = oSS[1];
                    
                    var daysLeft = '';
                    if(v.orderStatus == 1 && v.days != null) {
                        if(v.days > 0) {
                            daysLeft = '<span class="weui-badge" style="margin-left: 5px; background-color: #F43530; color: #fff; border: 0 none;">逾期'+v.days+'天</span>';
                        } else if(v.days <= 0) {
                            v.days = v.days * -1;
                            daysLeft = '<span class="weui-badge" style="margin-left: 5px; background-color: #09bb07; color: #fff; border: 0 none;">还剩'+v.days+'天</span>';
                        }
                    }
                    
                    $('#borrow_book_list').append('<div id="order_'+v.code+'" onclick=\'window.location="order_detail.php?order='+v.code+'"\' class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.order.bookMinInfo.image+'" alt=""></div>\n\
<div class="weui-media-box__bd">\n\
<h4 class="weui-media-box__title">'+v.order.bookMinInfo.title+'</h4>\n\
<p class="weui-media-box__desc" style="margin-top: 5px;">'+orderStatus+daysLeft+'</p>\n\
<p class="weui-media-box__desc" style="margin-top: 5px; margin-bottom: -10px;">'+orderDetailType+'</p>\n\
<p class="weui-media-box__desc">\n\
<a href="book.php?code='+v.order.bookCode+'" class="weui-btn weui-btn_mini weui-btn_default">图书详情</a> \n\
<a href="javascript: void(0);" class="weui-btn weui-btn_disabled weui-btn_mini weui-btn_default">订单详情</a>\n\
</p>\n\
</div>\n\
</div>');   
                });
                
                $('#borrow_book_list').append('<center><a href="?list=full" style="color: #586C94;">点击查看完整借进列表 ></a></center>');
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showBorrowerBookList() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/orderform/borrow/borrower/"+$.cookie('usercode')+"?page="+Math.round(p)+"&sort=id,desc",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $.each(response.data.content, function(i,v){
                    var oSS,orderDetailType, orderStatus;
                    oSS = orderStepSwitch(v.details[0].orderDetailType,v.orderStatus,v.details[0].orderDetailStatus);
                    orderDetailType = oSS[0];
                    orderStatus = oSS[1];
                    
                    var daysLeft = '';
                    if(v.orderStatus == 1 && v.days != null) {
                        if(v.days > 0) {
                            daysLeft = '<span class="weui-badge" style="margin-left: 5px; background-color: #F43530; color: #fff; border: 0 none;">逾期'+v.days+'天</span>';
                        } else if(v.days <= 0) {
                            v.days = v.days * -1;
                            daysLeft = '<span class="weui-badge" style="margin-left: 5px; background-color: #09bb07; color: #fff; border: 0 none;">还剩'+v.days+'天</span>';
                        }
                    }
                    
                    $('#borrow_book_list').append('<div id="order_'+v.code+'" onclick=\'window.location="order_detail.php?order='+v.code+'"\' class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.order.bookMinInfo.image+'" alt=""></div>\n\
<div class="weui-media-box__bd">\n\
<h4 class="weui-media-box__title">'+v.order.bookMinInfo.title+'</h4>\n\
<p class="weui-media-box__desc" style="margin-top: 5px;">'+orderStatus+daysLeft+'</p>\n\
<p class="weui-media-box__desc" style="margin-top: 5px; margin-bottom: -10px;">'+orderDetailType+'</p>\n\
<p class="weui-media-box__desc">\n\
<a href="book.php?code='+v.order.bookCode+'" class="weui-btn weui-btn_mini weui-btn_default">图书详情</a> \n\
<a href="javascript: void(0);" class="weui-btn weui-btn_disabled weui-btn_mini weui-btn_default">订单详情</a>\n\
</p>\n\
</div>\n\
</div>');   
                });
                
                p++;
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showOwnerBookListUnfinished() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/orderform/borrow/owner/unfinished/"+$.cookie('usercode'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('.weui-loadmore').hide();
                
                $.each(response.data, function(i,v){
                    var oSS,orderDetailType, orderStatus;
                    oSS = orderStepSwitch(v.details[0].orderDetailType,v.orderStatus,v.details[0].orderDetailStatus);
                    orderDetailType = oSS[0];
                    orderStatus = oSS[1];
                    
                    var daysLeft = '';
                    if(v.orderStatus == 1 && v.days != null) {
                        if(v.days > 0) {
                            daysLeft = '<span class="weui-badge" style="margin-left: 5px; background-color: #F43530; color: #fff; border: 0 none;">逾期'+v.days+'天</span>';
                        } else if(v.days <= 0) {
                            v.days = v.days * -1;
                            daysLeft = '<span class="weui-badge" style="margin-left: 5px; background-color: #09bb07; color: #fff; border: 0 none;">还剩'+v.days+'天</span>';
                        }
                    }
                    
                    $('#owner_book_list').append('<div id="order_'+v.code+'" onclick=\'window.location="order_detail.php?order='+v.code+'"\' style="cursor:pointer;" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.order.bookMinInfo.image+'" alt=""></div>\n\
<div class="weui-media-box__bd">\n\
<h4 class="weui-media-box__title">'+v.order.bookMinInfo.title+'</h4>\n\
<p class="weui-media-box__desc" style="margin-top: 5px;">'+orderStatus+daysLeft+'</p>\n\
<p class="weui-media-box__desc" style="margin-top: 5px; margin-bottom: -10px;">'+orderDetailType+'</p>\n\
<p class="weui-media-box__desc">\n\
<a href="book.php?code='+v.order.bookCode+'" class="weui-btn weui-btn_mini weui-btn_default">图书详情</a> \n\
<a href="javascript: void(0);" class="weui-btn weui-btn_disabled weui-btn_mini weui-btn_default">订单详情</a>\n\
</p>\n\
</div>\n\
</div>');   
                });
                
                $('#owner_book_list').append('<center><a href="?list=full" style="color: #586C94;">点击查看完整借出列表 ></a></center>');
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showOwnerBookList() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/orderform/borrow/owner/"+$.cookie('usercode')+"?page="+Math.round(p)+"&sort=id,desc",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $.each(response.data.content, function(i,v){
                    var oSS,orderDetailType, orderStatus;
                    oSS = orderStepSwitch(v.details[0].orderDetailType,v.orderStatus,v.details[0].orderDetailStatus);
                    orderDetailType = oSS[0];
                    orderStatus = oSS[1];
                    
                    var daysLeft = '';
                    if(v.orderStatus == 1 && v.days != null) {
                        if(v.days > 0) {
                            daysLeft = '<span class="weui-badge" style="margin-left: 5px; background-color: #F43530; color: #fff; border: 0 none;">逾期'+v.days+'天</span>';
                        } else if(v.days <= 0) {
                            v.days = v.days * -1;
                            daysLeft = '<span class="weui-badge" style="margin-left: 5px; background-color: #09bb07; color: #fff; border: 0 none;">还剩'+v.days+'天</span>';
                        }
                    }
                    
                    $('#owner_book_list').append('<div id="order_'+v.code+'" onclick=\'window.location="order_detail.php?order='+v.code+'"\' style="cursor:pointer;" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.order.bookMinInfo.image+'" alt=""></div>\n\
<div class="weui-media-box__bd">\n\
<h4 class="weui-media-box__title">'+v.order.bookMinInfo.title+'</h4>\n\
<p class="weui-media-box__desc" style="margin-top: 5px;">'+orderStatus+daysLeft+'</p>\n\
<p class="weui-media-box__desc" style="margin-top: 5px; margin-bottom: -10px;">'+orderDetailType+'</p>\n\
<p class="weui-media-box__desc">\n\
<a href="book.php?code='+v.order.bookCode+'" class="weui-btn weui-btn_mini weui-btn_default">图书详情</a> \n\
<a href="javascript: void(0);" class="weui-btn weui-btn_disabled weui-btn_mini weui-btn_default">订单详情</a>\n\
</p>\n\
</div>\n\
</div>');   
                });
                
                p++;
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function openEditArea(id) {
    $('input:checkbox').removeAttr('checked');

    if($('#edit_area_div').length > 0){
        fillEditArea();
    }
    
    $('#edit_area').insertAfter("#book_"+id).fadeIn();
}

function closeEditArea() {
    $('#edit_area').appendTo('body').hide();
    $('#edit_area_div').html('');
    $('#book_to_edit').val('');
}

function fillEditArea() {
    $('#edit_area_div').html('');
    $.each($.parseJSON(sessionStorage.getItem("taggroups")), function(i,v) {
        var checkboxes = '';
        if(v.tagGroupTags.length > 0){
            $.each(v.tagGroupTags, function(j,w) {
                checkboxes += '<label class="weui-cell weui-check__label" for="'+v.name+'_'+w.tag.code+'"><div class="weui-cell__hd"><input type="checkbox" class="weui-check" id="'+v.name+'_'+w.tag.code+'" name="'+v.name+'[]" value="'+w.tag.code+'" /><i class="weui-icon-checked"></i></div><div class="weui-cell__bd"><p>'+w.tag.title+'</p></div></label>';
            });
        }

        $('#edit_area_div').append('<div class="weui-cells__title">'+v.title+'</div><div class="weui-cells weui-cells_checkbox">'+checkboxes+'</div>');
    });
}

function tagBook(id) {
    var tags = [];
    
    $('input:checkbox[name="age[]"]').each(function() {
        var age = {
            tag: {
                name: '',
                title: ''
            }
        };
        if(this.checked) {
            age.tag.name = $(this).parent().next().find('p').text();
            age.tag.title = age.tag.name;
            tags.push(age);
        }
    });
    
    $('input:checkbox[name="category[]"]').each(function() {
        var category = {
            tag: {
                name: '',
                title: ''
            }
        };
        if(this.checked) {
            category.tag.name = $(this).parent().next().find('p').text();
            category.tag.title = category.tag.name;
            tags.push(category);
        }
    });
    
    $('input:checkbox[name="language[]"]').each(function() {
        var language = {
            tag: {
                name: '',
                title: ''
            }
        };
        if(this.checked) {
            language.tag.name = $(this).parent().next().find('p').text();
            language.tag.title = language.tag.name;
            tags.push(language);
        }
    });
    
    var map = {
        bookCode: id,
        bookTags: tags
    };
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/tag/saveBookTags",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(getURLParameter('code') && getURLParameter('tagbook')){
                    saveUserBook(id);
                } else {
                    getEditedBookTag(id);
                }
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getEditedBookTag(id) {
    $.ajax({
        url: $.api.base+"/nb-customer/api/book/findOneByCode/"+id+"",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                closeEditArea();
                
                var tags = '';
                $.each(response.data.bookTags, function(i,v){
                    if ($.inArray(v.tag.code, $.category) >= 0) {
                        tags +=  '<span class="weui-badge">'+v.tag.title+'<span>('+v.tagCount+')</span></span> ';
                    }
                });
                
                $('#tags_'+response.data.code).fadeOut();
                $('#tags_'+response.data.code).html(tags);
                $('#tags_'+response.data.code).fadeIn();
                
                $('#tags_'+response.data.code+ ' span').css('background','#f43530');
                setTimeout(function () {
                    $('#tags_'+response.data.code+ ' span').css('background','#ffffff');
                },500);
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showUserInfo(uc) {
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/"+uc,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
            request.setRequestHeader("Cache-Control", "no-cache");
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('#nav_user').text(response.data.plugin.weixin_plugin.nickname);
                
                if($('#invitation').length > 0){
                     $('#nav_avatar').attr('src', response.data.plugin.weixin_plugin.headimgurl);
                }
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showUserFullInfo(uc) {
    getUserBonus();
    
    var usercode;
    if(uc == null){
        usercode = $.cookie('usercode');
    } else {
        usercode = uc;
    }     
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/full/"+usercode,
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                var gender = '';
                if(response.data.plugin.weixin_plugin.sex == 1) {
                    gender = '<i class="fas fa-male" style="color: #10AEFF;"></i>';
                } else if(response.data.plugin.weixin_plugin.sex == 2) {
                    gender = '<i class="fas fa-female" style="color: #F76260;"></i>';
                }
                
                $('#nav_user').html(response.data.plugin.weixin_plugin.nickname+' '+gender);
                $('#nav_avatar').attr('src', response.data.plugin.weixin_plugin.headimgurl);
                $('#bonus').text($.parseJSON(sessionStorage.getItem('userbonus')).currentBonus);
                if(response.data.mobile != null && response.data.mobile != 'null' && response.data.mobile != ''){
                    $('#phone_no').html('<a href="tel:'+response.data.mobile+'" style="color: #586C94;">'+response.data.mobile+'</a>');
                } else {
                    $('#phone_no').html('<a href="login.php" style="color: #586C94;">点击绑定手机号码</a>');
                }
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getOrderDetail() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/orderform/borrow/"+getURLParameter('order'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                var oSS,orderDetailType, orderStatus;
                oSS = orderStepSwitch(response.data.details[(response.data.details.length-1)].orderDetailType,response.data.orderStatus,response.data.details[(response.data.details.length-1)].orderDetailStatus);
                orderDetailType = oSS[0];
                orderStatus = oSS[1];
                
                orderStepButtons(response.data.details[(response.data.details.length-1)].orderDetailType,response.data.orderStatus,response.data.details[(response.data.details.length-1)].orderDetailStatus,response.data.order.borrowerUserCode,response.data.order.ownerUserCode,response.data.updated);
                
                $('#order_detail_type').html(orderDetailType);
                $('#order_status').html(orderStatus);
                $('#detail_created').text(response.data.details[(response.data.details.length-1)].created.split('.000')[0].replace('T',' '));
                $('#order_book a').attr('href','book.php?code='+response.data.order.bookCode);
                showOrderBook(response.data.order.bookCode);
                $('#order_period').text(
                    response.data.details[(response.data.details.length-1)].orderDetailType > 1 && response.data.order.startBorrowDate != null && response.data.order.expectedReturnDate != null? '从 '+response.data.order.startBorrowDate.split('T')[0]+' 到 '+response.data.order.expectedReturnDate.split('T')[0] : '-'
                );
                $('#order_detail_remark').text(response.data.details[0].remark || '');
                $('#order_count').text('x'+response.data.order.bookCount);
                $('#order_id').text(response.data.code);
                
                showUserFullInfo($.cookie('usercode') == response.data.order.ownerUserCode ? response.data.order.borrowerUserCode : response.data.order.ownerUserCode);
                
                if($.cookie('usercode') == response.data.order.ownerUserCode) {
                    $('.role').text('借阅');
                    getUserLocation(response.data.order.borrowerUserCode);
                } else if($.cookie('usercode') == response.data.order.borrowerUserCode) {
                    $('.role').text('分享');
                    getUserLocation(response.data.order.ownerUserCode);
                }
                                
                $.each(response.data.details, function(i,v){
                    switch(v.orderDetailType) {
                        case 1:
                          orderDetailType = "发起借阅申请";
                          break;
                        case 4:
                          if(v.orderDetailStatus == 1){
                              orderDetailType = "借阅成功";
                          } else {
                              orderDetailType = "借阅关闭";
                          }
                          break;
                        case 5:
                          orderDetailType = "发起续借申请";
                          break;
                        case 6:
                          if(v.orderDetailStatus == 1){
                              orderDetailType = "续借成功";
                          } else {
                              orderDetailType = "续借关闭";
                          }
                          break;
                        case 8:
                          orderDetailType = "归还图书";
                          break;
                        default:
                          orderDetailType = "未知状态";
                    }
                    
                    $('#flow_detail .weui-dialog__bd').append(v.created.split('.000')[0].replace('T',' ')+' <span class="weui-badge">'+orderDetailType+'</span><br>');
                });

                $("#flow_detail_link").on('click', function(){
                    $('#flow_detail').fadeIn(200);
                    $('.weui-mask, .weui-dialog__btn').on('click',function () {
                        $('#flow_detail').fadeOut(200);
                    });
                });
                
                function showOrderBook(bc) {
                    $.ajax({
                        url: $.api.base+"/nb-customer/api/book/findOneByCode/"+bc+"",
                        type: "GET",
                        async: false,
                        beforeSend: function(request) {
                            request.setRequestHeader("Login", $.cookie("login"));
                            request.setRequestHeader("Authorization", $.cookie("authorization"));
                        },
                        complete: function(){},
                        success: function (response, status, xhr) {
                            if(response.code === 'C0') {
                                if(xhr.getResponseHeader("Authorization") !== null){
                                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                                }

                                $('#order_book img').attr('src',response.data.image);
                                $('#order_book h4').text(response.data.title);

                            } else {
                                alert(response.customerMessage);
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                           console.log(textStatus, errorThrown);
                        }
                    });
                }
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showUserBookList() {
    var tagCodes = [];
    var map = tagCodes;
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/userbook/findAllByTagCodeAndUserCode?userCode="+getURLParameter('usercode')+"&sharable=1&page="+Math.round(p)+"",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $.each(response.data.content, function(i,v){
                    var authors = '';
                    if(v.bookMinInfo.authors.length > 0){
                        authors = v.bookMinInfo.authors[0].author;
                        
                        if(v.bookMinInfo.authors.length > 1){
                            authors = authors + '等';
                        }
                    }
                    
                    $('#nav_user_books').text('('+response.data.totalElements+')');
                    
                    var tags = '';
                    if(v.bookMinInfo.bookTags.length > 0) {
                        $.each(v.bookMinInfo.bookTags, function(j,k){
                            if ($.inArray(k.tag.code, $.category) >= 0) {
                                tags +=  '<span class="weui-badge">'+k.tag.title+'<span>('+k.tagCount+')</span></span> ';
                            }
                        });
                    }
                    
                    $('#user_book_list').append('<a href="book.php?code='+v.bookMinInfo.code+'" class="weui-media-box weui-media-box_appmsg">\n\
<div class="weui-media-box__hd"><img class="weui-media-box__thumb" src="'+v.bookMinInfo.image+'" alt=""></div>\n\
<div class="weui-media-box__bd">\n\
<h4 class="weui-media-box__title">'+v.bookMinInfo.title+'</h4>\n\
<p class="weui-media-box__desc">作者: '+authors+'</p>\n\
<p class="weui-media-box__desc">'+tags+'</p>\n\
</div>\n\
</a>');
                });
                
                p++;
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getAllUsersInfo(bc) {
    $.ajax({
        url: $.api.base+"/nb-customer/api/userbook/findAllUserInfoByBookCodeAndSharable?bookCode="+bc+"&sharable=1&page="+Math.round(r)+"&sort=id,desc",
        type: "POST",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                var owners = [], owner, stock;
                $.each(response.data.content, function(i,v){
                    stock = parseInt(v.bookCount) - parseInt(v.lentAmount);
                    if(stock > 0 && v.user.code != $.cookie('usercode')){
                        var location = '';
                        $.each(v.userLocations, function(j,w){
                            location += w.location.title + ' ';
                        });
                        
                        owner = {
                            label: '<img src="'+v.user.plugin.weixin_plugin.headimgurl+'" height="20" style="margin-bottom: -2px;" /> '+v.user.plugin.weixin_plugin.nickname+' ('+location+')',
                            value: v.user.code+'_'+stock
                        };
                        
                        owners.push(owner);
                    } 
                });

                if(owners.length > 0){
                    weui.picker(owners, {
                        onChange: function (result) {
                            console.log(result);
                        },
                        onConfirm: function (result) {
                            var res = result.toString();
                            window.location.href = "order.php?usercode="+res.split("_")[0]+"&code="+getURLParameter('code')+"&stock="+res.split("_")[1];
                        }
                    });
                } else {
                    $('body').append('<div id="book_unavailable" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content"> 抱歉，暂无此书库存 </p>\n\
</div></div></div>');
                    
                    $('#book_unavailable').fadeIn(100);
                    setTimeout(function () {
                        $('#book_unavailable').fadeOut(100).remove();
                    }, 2000);
                }
                
                //r++;
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getOwnerInfo() {
    showUserInfo(getURLParameter('usercode'));
    showBookDetail();
}

function orderFormBorrow() {
    var map = {
        baseUserBonus: {
            remark: '发起借阅申请',
            updated: $.parseJSON(sessionStorage.getItem('userbonus')).updated,
            userCode: $.cookie('usercode')    
        },
        bookCode: getURLParameter('code'),
        bookCount: $('#amount').text(),
        borrowerUserCode: $.cookie('usercode'),
        ownerUserCode: getURLParameter('usercode'),
        remark: $('#remark').val()
    };
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/orderform/borrow",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.userBonus != null && response.data.userBonus != '') {
                    sessionStorage.setItem("userbonus", JSON.stringify(response.data.userBonus));
                }
                
                window.location.href = "msg_success.php?order="+response.data.code;
            } else if(response.code === 'UB0001') {
                getUserBonus();
                setTimeout(function () {
                    orderFormBorrow();
                }, 500);                
            } else if(response.code === 'OF0013') {
                $('#borrowNotice').fadeOut(100);
                $('body').append('<div id="orderform_error" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content">'+response.customerMessage+'</p>\n\
</div></div></div>');
                    
                $('#orderform_error').fadeIn(100);
                setTimeout(function () {
                    window.location.href = "borrowerlist.php";    
                }, 4000);   
            } else {
                window.location.href = "msg_warn.php?book="+response.data.order.bookCode;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function borrowFlow(ot,ds,bor,own,ut) {
    var map = {
        baseUserBonus: {
            remark: '借阅类操作',
            updated: $.parseJSON(sessionStorage.getItem('userbonus')).updated,
            userCode: $.cookie('usercode')    
        },
        orderCode: getURLParameter('order'),
        orderDetailStatus: ds,
        orderDetailType: ot,
        updated: ut
    };
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/orderform/borrow/flow",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                var reward = '';
                if(response.data.userBonus != null && response.data.userBonus != '') {
                    sessionStorage.setItem("userbonus", JSON.stringify(response.data.userBonus));

                    if(response.data.userBonus.currentUserBonusDetail != null && response.data.userBonus.currentUserBonusDetail != '') {
                        reward = '<br>'+(response.data.userBonus.currentUserBonusDetail.bonus > 0? '+'+response.data.userBonus.currentUserBonusDetail.bonus : response.data.userBonus.currentUserBonusDetail.bonus)+'积分';
                    }   
                }
                
                var orderDetailType = '';
                if(response.data.details.length > 0){
                    switch(response.data.details[response.data.details.length - 1].orderDetailType) {
                        case 1:
                          orderDetailType = "发起借阅申请";
                          break;
                        case 4:
                          if(response.data.details[response.data.details.length - 1].orderDetailStatus == 1){
                              orderDetailType = "借阅成功";
                          } else {
                              orderDetailType = "借阅关闭";
                          }
                          break;
                        case 5:
                          orderDetailType = "发起续借申请";
                          break;
                        case 6:
                          if(response.data.details[response.data.details.length - 1].orderDetailStatus == 1){
                              orderDetailType = "续借成功";
                          } else {
                              orderDetailType = "续借关闭";
                          }
                          break;
                        case 8:
                          orderDetailType = "归还图书";
                          break;
                        case 9:
                          orderDetailType = "取消借阅";
                          break;
                        default:
                          orderDetailType = "未知状态";
                    }
                    
                    $('body').append('<div id="borrow_flow" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-info-circle weui-icon_toast"></i><p class="weui-toast__content"> '+orderDetailType+reward+' </p>\n\
</div></div></div>');
                    
                    $('#borrow_flow').fadeIn(100);
                };
                
                setTimeout(function () {
                    if($.cookie('usercode') == bor) {
                        window.location.href = "borrowerlist.php";
                    } else if($.cookie('usercode') == own) {
                        window.location.href = "ownerlist.php";
                    }
                }, 1000);
                
            } else if(response.code === 'UB0001') {
                getUserBonus();
                setTimeout(function () {
                    borrowFlow(ot,ds,bor,own,ut);
                }, 500);                
            } else {
                $('#flow_error_msg').fadeIn(100).find('p').text(response.customerMessage);
                setTimeout(function () {
                    $('#flow_error_msg').fadeOut(100);
                }, 2000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function orderStepSwitch(odt,os,ods) {
    var orderDetailType, orderStatus;
    switch(odt) {
        case 1:
          orderDetailType = "<i class='weui-icon-info-circle' style='margin-top: -1px;'></i> 发起借阅申请";
          break;
        case 4:
          if(ods == 1){
              orderDetailType = "<i class='weui-icon-info-circle' style='margin-top: -1px;'></i> 借阅成功";
          } else {
              orderDetailType = "<i class='weui-icon-info-circle' style='margin-top: -1px;'></i> 借阅关闭";
          }
          break;
        case 5:
          orderDetailType = "<i class='weui-icon-info-circle' style='margin-top: -1px;'></i> 发起续借申请";
          break;
        case 6:
          if(ods == 1){
              orderDetailType = "<i class='weui-icon-info-circle' style='margin-top: -1px;'></i> 续借成功";
          } else {
              orderDetailType = "<i class='weui-icon-info-circle' style='margin-top: -1px;'></i> 续借关闭";
          }
          break;
        case 8:
          orderDetailType = "<i class='weui-icon-success-no-circle' style='margin-top: -1px;'></i> 归还图书";
          break;
        case 9:
          orderDetailType = "<i class='weui-icon-info-circle' style='margin-top: -1px;'></i> 取消借阅";
          break;
        default:
          orderDetailType = "<i class='weui-icon-cancel' style='margin-top: -1px;'></i> 未知状态";
    }

    switch(os) {
        case 0:
          orderStatus = "<span class='weui-badge'>订单已取消</span>";
          break;
        case 1:
          orderStatus = "<span class='weui-badge'>订单进行中</span>";
          break;
        case 2:
          orderStatus = "<span class='weui-badge'>订单已完成</span>";
          break;
        default:
          orderStatus = "<span class='weui-badge'>订单处于未知状态</span>";
    }
    
    return [orderDetailType,orderStatus];
}

function orderStepButtons(odt,os,ods,bor,own,ut) {
    var btn_group;
    if($.cookie('usercode') == bor) {
        if(os == 1) {
            switch(odt) {
                case 1:
                  btn_group = '<a class="weui-btn weui-btn_disabled weui-btn_warn" href="javascript: borrowFlow(9,1,\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">取消订单</a>\n\
<a class="weui-btn weui-btn_default" href="borrowerlist.php" style="display: inline-block; width: 48%;">确定</a>';
                  break;
                case 4:
                  btn_group = '<a class="weui-btn weui-btn_warn" href="javascript: borrowExtendNotice(\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">续借</a>\n\
<a class="weui-btn weui-btn_primary" href="javascript: borrowFlow(8,1,\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">确认归还</a>';
                  break;
                case 5:
                  btn_group = '<a class="weui-btn weui-btn_default" href="borrowerlist.php" style="display: inline-block; width: 96%;">确定</a>';
                  break;
                case 6:
                  if(ods == 1){
                      btn_group = '<a class="weui-btn weui-btn_warn" href="javascript: borrowExtendNotice(\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">续借</a>\n\
<a class="weui-btn weui-btn_primary" href="javascript: borrowFlow(8,1,\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">确认归还</a>';
                  } else {
                      btn_group = '<a class="weui-btn weui-btn_primary" href="javascript: borrowFlow(8,1,\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">确认归还</a>\n\
<a class="weui-btn weui-btn_default" href="borrowerlist.php" style="display: inline-block; width: 48%;">确定</a>';
                  }
                  break;
                case 8:
                  btn_group = '<a class="weui-btn weui-btn_default" href="borrowerlist.php" style="display: inline-block; width: 96%;">确定</a>';
                  break;
                default:
                  btn_group = '<a class="weui-btn weui-btn_default" href="borrowerlist.php" style="display: inline-block; width: 96%;">确定</a>';
            }
        } else {
            btn_group = '<a class="weui-btn weui-btn_default" href="borrowerlist.php" style="display: inline-block; width: 96%;">确定</a>';
        }
    } else if($.cookie('usercode') == own) {
        if(os == 1) {
            switch(odt) {
                case 1:
                  btn_group = '<a class="weui-btn weui-btn_default" href="javascript: borrowFlow(4,0,\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">不同意</a>\n\
<a class="weui-btn weui-btn_primary" href="javascript: borrowFlow(4,1,\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">同意</a>';
                  break;
                case 4:
                  btn_group = '<a class="weui-btn weui-btn_default" href="ownerlist.php" style="display: inline-block; width: 96%;">确定</a>';
                  break;
                case 5:
                  btn_group = '<a class="weui-btn weui-btn_default" href="javascript: borrowFlow(6,0,\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">不同意</a>\n\
<a class="weui-btn weui-btn_primary" href="javascript: borrowFlow(6,1,\''+bor+'\',\''+own+'\',\''+ut+'\');" style="display: inline-block; width: 48%;">同意</a>';
                  break;
                case 6:
                  btn_group = '<a class="weui-btn weui-btn_default" href="ownerlist.php" style="display: inline-block; width: 96%;">确定</a>';
                  break;
                case 8:
                  btn_group = '<a class="weui-btn weui-btn_default" href="ownerlist.php" style="display: inline-block; width: 96%;">确定</a>';
                  break;
                default:
                  btn_group = '<a class="weui-btn weui-btn_default" href="ownerlist.php" style="display: inline-block; width: 96%;">确定</a>';
            }
        } else {
            btn_group = '<a class="weui-btn weui-btn_default" href="ownerlist.php" style="display: inline-block; width: 96%;">确定</a>';
        }
    }
    
    $('.weui-btn-area').html(btn_group);
}

function borrowExtendNotice(bor,own,ut) {
    $('#borrowExtendNotice').fadeIn(200, function() {
        $(this).find('a').click(function(){
            borrowFlow(5,1,bor,own,ut);
        });
    });
}

function activateSearch() {
    var $searchBar = $('#searchBar'),
        $searchText = $('#searchText'),
        $searchInput = $('#searchInput'),
        $searchClear = $('#searchClear'),
        searchConfirm = $('#searchConfirm');
    
    function hideSearchResult(){
        $searchInput.val('');
    }
    
    function cancelSearch(){
        hideSearchResult();
        $searchBar.removeClass('weui-search-bar_focusing');
        $searchText.show();
    }
    
    function excuteSearch(){
        q = 0;
        showSearchList($searchInput.val());
    }
    
    function excuteMySearch(){
        q = 0;
        showMyBookList(null,null,null,$searchInput.val());
    }

    $searchText.on('click', function(){
        $searchBar.addClass('weui-search-bar_focusing');
        $searchInput.focus();
    });
    $searchInput
        .on('blur', function () {
            if(!this.value.length) cancelSearch();
        })
        .on('input', function(){
            
        })
    ;
    $searchClear.on('click', function(){
        cancelSearch();
    });
    searchConfirm.on('click', function(){
        $.listtype = 'search';
        
        if($('#book_list').length > 0){
            $('#book_list').html('');
            excuteSearch();
        } else if($('#my_book_list').length > 0){
            $('#my_book_list').html('');
            excuteMySearch();
        }
        
        $searchInput.blur();
    });
}

function showLocations() {
    getUserLocation(null);
    $('#skip_to_next').attr('href',sessionStorage.getItem('location_href'));
}

function showKids() {    
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/children/findAllByUserCode/"+$.cookie('usercode'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('#show_kids').html('');

                if(response.data.length > 0){
                    var sex = '';
                    $.each(response.data, function(i,v) {
                        if(v.sex == 1){
                            sex = ' <i class="fas fa-baby" style="color: #10AEFF;"></i>';
                        } else if(v.sex == 2){
                            sex = ' <i class="fas fa-baby" style="color: #F76260;"></i>';
                        }
                        
                        $('#show_kids').append('<div id="panel_'+v.code+'" class="weui-panel">\n\
<div class="weui-panel__bd">\n\
<div class="weui-media-box weui-media-box_text"><h4 class="weui-media-box__title">'+v.nickname+sex+'\n\
<span id="kid_'+v.code+'" class="delete-kid"><i class="far fa-trash-alt"></i></span></h4>\n\
<p class="weui-media-box__desc">'+v.birthday.split('T')[0]+'</p></div></div></div>');
                    });
                }

                $('.delete-kid').click(function(){
                    deleteKid($(this).attr('id').split("_")[1]);
                });
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getEvent() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/event/"+getURLParameter('event'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                getUserEventDetail();
                
                $('#fullname').val($.cookie("event_fullname_temp") || '');
                $('#event').val(response.data.name);
                $('#location').val(response.data.location);
                
                var reg = new RegExp("-","g");
                var beginTime = (response.data.beginDate.split(':00.000+')[0]).replace('T',' ').replace(reg,'.');
                var endTime = (response.data.endDate.split('T')[1]).split(':00.000+')[0];
                $('#time').val(beginTime+'-'+endTime);
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getUserEventDetail() {
    var map = {
        eventCode: getURLParameter('event'),
        userCode: $.cookie('usercode')
    };

    $.ajax({
        url: $.api.base+"/nb-customer/api/userevent/detail",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data != null){
                    if(response.data.status == 1){
                        $('#fullname').val(response.data.user.settings.name);
                        $('#fullname').attr('disabled',true);
                        $('#kids, #show_kids, #submit_event').hide();

                        $('.weui-cells_form').append('<div class="weui-cell basic" style="margin-top: 15px;">\n\
    <div class="weui-cell__bd" style="color: #1aad19;">等待主办方通知报名结果</div></div>');
                    }
                }
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function updateNameAndProfession() {
    var name = $('#fullname').val();
    var profession = '-';
    if($.cookie("profession") != 'null' && $.cookie("profession") != null && $.cookie("profession") != ''){
        profession = $.cookie("profession");
    }
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/updateNameAndProfession?code="+$.cookie('usercode')+"&name="+name+"&profession="+profession+"",
        type: "PUT",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                signUpEvent();
            } else {
                $('body').append('<div id="signup_event_error" style="display: none;">\n\
        <div class="weui-mask_transparent">\n\
        <div class="weui-toast">\n\
        <i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content"> '+response.customerMessage+' </p>\n\
        </div></div></div>');

                $('#signup_event_error').fadeIn(100);
                setTimeout(function () {
                    $('#signup_event_error').fadeOut(100).remove();
                }, 2000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function signUpEvent() {
    var map = {
        eventCode: getURLParameter('event'),
        userCode: $.cookie('usercode')
    };

    $.ajax({
        url: $.api.base+"/nb-customer/api/userevent/signUp",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('body').append('<div id="signup_event_succeed" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-success-no-circle weui-icon_toast"></i><p class="weui-toast__content"> 报名成功 </p>\n\
</div></div></div>');
                    
                $('#signup_event_succeed').fadeIn(100);
                setTimeout(function () {
                    $('#signup_event_succeed').fadeOut(100).remove();
                    window.location.href = "event_registration.php?event="+getURLParameter('event');
                }, 2000);
            } else {
                $('body').append('<div id="signup_event_error" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content"> '+response.customerMessage+' </p>\n\
</div></div></div>');
                    
                $('#signup_event_error').fadeIn(100);
                setTimeout(function () {
                    $('#signup_event_error').fadeOut(100).remove();
                }, 2000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function getUserVolunteer() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/volunteer/"+$.cookie('usercode'),
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('#mobile').val($.cookie("usermobile"));
                
                if(response.data != null){
                    $('#fullname').val(response.data.name).attr('disabled',true);
                    $('#profession').val(response.data.profession).attr('disabled',true);
                    $('#speciality').val(response.data.speciality).attr('disabled',true);
                    $('#locations, #show_locations, #kids, #show_kids, #submit_volunteer').hide();

                    $('.weui-cells_form').append('<div class="weui-cell basic" style="margin-top: 15px;">\n\
<div class="weui-cell__bd" style="color: #1aad19;">感谢您报名邻里爱读书志愿者，我们会尽快与您联系！</div></div>');
                    
                } else {
                    $('#fullname').val($.cookie("volunteer_fullname_temp") || '');
                    $('#profession').val($.cookie("volunteer_profession_temp") || '');
                    $('#speciality').val($.cookie("volunteer_speciality_temp") || '');
                }
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function saveVolunteer() {
    var map = {
        code: $.cookie('usercode'),
        name: $('#fullname').val(),
        profession: $('#profession').val(),
        speciality: $('#speciality').val()
    };

    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/volunteer/save",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('body').append('<div id="signup_volunteer_succeed" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-success-no-circle weui-icon_toast"></i><p class="weui-toast__content"> 报名成功 </p>\n\
</div></div></div>');
                    
                $('#signup_volunteer_succeed').fadeIn(100);
                setTimeout(function () {
                    $('#signup_volunteer_succeed').fadeOut(100).remove();
                    window.location.href = "volunteer.php";
                }, 2000);
            } else {
                $('body').append('<div id="signup_volunteer_error" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content"> '+response.customerMessage+' </p>\n\
</div></div></div>');
                    
                $('#signup_volunteer_error').fadeIn(100);
                setTimeout(function () {
                    $('#signup_volunteer_error').fadeOut(100).remove();
                }, 2000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function saveKid() {
    var map = {
        birthday: $('#birthdate').val(),
        userCode: $.cookie('usercode'),
        nickname: $('#nickname').val(),
        sex: $('#gender').val()
    };

    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/children/save",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }

                $('#iosDialog2').fadeIn(200, function() {
                    $(this).find('a').click(function(){
                        if(sessionStorage.getItem('location_href').indexOf('event_registration.php') !== -1){
                            window.location.href = "event_registration.php?event="+getURLParameter('event');
                        } else {
                            window.location.href = 'children.php';
                        }
                    });
                });
            } else {
                $('body').append('<div id="save_kid_error" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content"> '+response.customerMessage+' </p>\n\
</div></div></div>');
                    
                $('#save_kid_error').fadeIn(100);
                setTimeout(function () {
                    $('#save_kid_error').fadeOut(100).remove();
                }, 2000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function deleteKid(c) {
    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/children/delete/"+c,
        type: "DELETE",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }

                $('#panel_'+c).remove();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function activateSearchAddress() {    
    var $searchBar = $('#searchAddress'),
        $searchResult = $('#searchAddressResult'),
        $searchText = $('#searchText'),
        $searchInput = $('#searchInput'),
        $searchClear = $('#searchClear'),
        $searchCancel = $('#searchCancel'),
        $searchRegion = $('#region');

    function hideSearchResult(){
        $searchResult.hide();
        $searchInput.val('');
    }
    function cancelSearch(){
        hideSearchResult();
        $searchBar.removeClass('weui-search-bar_focusing');
        $searchText.show();
    }
    
    var flag = true;
    $searchText.on('click', function(){
        $searchBar.addClass('weui-search-bar_focusing');
        $searchInput.focus();
    });
    $searchInput
        .on('blur', function () {
            if(!this.value.length) cancelSearch();
        })
        .on('compositionstart',function(){
            flag = false;
        })
        .on('compositionend',function(){
            flag = true;
        })
        .on('input', function(){
            if(this.value.length) {
                setTimeout(function(){
                    if(flag){
                        lbsSuggestion($searchInput.val(),$searchRegion.val());
                        $searchResult.show();
                    }
                },0);
            } else {
                $searchResult.hide();
            }
        })
    ;
    $searchClear.on('click', function(){
        hideSearchResult();
        $searchInput.focus();
    });
    $searchCancel.on('click', function(){
        cancelSearch();
        $searchInput.blur();
    });
    
    function lbsSuggestion(i,s) {
        $.ajax({
            url: $.api.base+"/nb-customer/api/weixin/lbs/suggestion?keyword="+i+"&region="+s,
            type: "GET",
            async: false,
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie("login"));
                request.setRequestHeader("Authorization", $.cookie("authorization"));
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                    }

                    $('#searchAddressResult').html('');
                    if(response.data.data != null){
                        $.each(response.data.data, function(i,v) {
                            $('#searchAddressResult').append('<div class="weui-cell weui-cell_access">\n\
    <div class="weui-cell__bd weui-cell_primary">\n\
    <p>'+v.title+'</p>\n\
    <small>'+v.address+'</small>\n\
    </div><div class="hide-addr" style="display: none;">'+JSON.stringify(v)+'</div></div>');
                        });

                        $('#searchAddressResult .weui-cell_access').each(function (i){
                            $(this).on('click', function(){
                                $('#selectedResult').html('');
                                var ha = $.parseJSON($(this).find('.hide-addr').text());
                                $('#save_location').show().click(function(){
                                    saveLocation(ha);
                                });
                                $('#selectedResult').append('<p><i class="weui-icon-success-no-circle"></i> '+ha.title+'</p><small>'+ha.city+ha.district+'</small><br>\n\
<small>'+ha.address+'</small>');
                                hideSearchResult();
                            });
                        });
                    }                
                } else {
                    alert(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
    
    function saveLocation(ha) {
        var home_tag_code, school_tag_code, tagcode;
        $.each($.parseJSON(sessionStorage.getItem("locationgroups")), function(i,v) {
            if(v.tagGroupTags.length > 0){
                $.each(v.tagGroupTags, function(j,w) {
                    if(w.tag.name == 'home'){
                        home_tag_code = w.tag.code;
                    } else if(w.tag.name == 'school'){
                        school_tag_code = w.tag.code;
                    }
                });
            }
        });
        
        if(window.location.pathname.indexOf('add_home_addr.php') !== -1){
            tagcode = home_tag_code;
        } else if(window.location.pathname.indexOf('add_school_addr.php') !== -1){
            tagcode = school_tag_code;
        }
        
        var map = {
            location: {
                adcode: ha.adcode,
                address: ha.address,
                city: ha.city,
                district: ha.district,
                lat: ha.lat,
                lbsId: ha.id,
                lng: ha.lng,
                province: ha.province,
                title: ha.title,
                type: ha.type
            },
            tagCode: tagcode,
            userCode: $.cookie('usercode')
        };

        $.ajax({
            url: $.api.base+"/nb-customer/api/weixin/user/saveUserLocation",
            type: "POST",
            data: JSON.stringify(map),
            async: false,
            dataType: "json",
            contentType: "application/json",
            beforeSend: function(request) {
                request.setRequestHeader("Login", $.cookie("login"));
                request.setRequestHeader("Authorization", $.cookie("authorization"));
            },
            complete: function(){},
            success: function (response, status, xhr) {
                if(response.code === 'C0') {
                    if(xhr.getResponseHeader("Authorization") !== null){
                        $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                    }
                    
                    $('#iosDialog2').fadeIn(200, function() {
                        $(this).find('a').click(function(){
                            if(sessionStorage.getItem('location_href').indexOf('profile.php') !== -1){
                                window.location.href = 'profile.php';
                            } else if(sessionStorage.getItem('location_href').indexOf('nearby.php') !== -1) {
                                window.location.href = 'nearby.php';
                            } else if(sessionStorage.getItem('location_href').indexOf('volunteer.php') !== -1) {
                                window.location.href = 'volunteer.php';
                            } else {
                                window.location.href = 'location.php';
                            }
                        });
                    });
                } else {
                    alert(response.customerMessage);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
               console.log(textStatus, errorThrown);
            }
        });
    }
}

function deleteLocation(tagcode,addrinfo) {
    var ha = $.parseJSON(addrinfo).location;
    
    var map = {
        location: {
            adcode: ha.adcode,
            address: ha.address,
            city: ha.city,
            district: ha.district,
            lat: ha.lat,
            lbsId: ha.lbsId,
            lng: ha.lng,
            province: ha.province,
            title: ha.title,
            type: ha.type
        },
        tagCode: tagcode,
        userCode: $.cookie('usercode')
    };

    $.ajax({
        url: $.api.base+"/nb-customer/api/weixin/user/deleteUserLocation",
        type: "DELETE",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
            
                sessionStorage.setItem('locationTagCode',null);
                sessionStorage.setItem('locationTagName',null);

                $('#cell_'+tagcode).remove();
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function checkInDaily() {
    var map = {
        baseUserBonus: {
            remark: '签到',
            updated: $.parseJSON(sessionStorage.getItem('userbonus')).updated,
            userCode: $.cookie('usercode')    
        },
        checkIn: timestamp
    };
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/usercheckin/checkIn",
        type: "POST",
        data: JSON.stringify(map),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                sessionStorage.getItem("userbonus", JSON.stringify(response.data));
                if($('#bonus').length > 0){
                    $('#bonus').text(response.data.currentBonus);
                }
                
                $('body').append('<div id="checkin_succeed" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-success-no-circle weui-icon_toast"></i><p class="weui-toast__content"> 签到成功 <br>+10积分</p>\n\
</div></div></div>');
                    
                $('#checkin_succeed').fadeIn(100);
                setTimeout(function () {
                    $('#checkin_succeed').fadeOut(1000).remove();
                }, 1000);
            } else if(response.code === 'UB0001') {
                getUserBonus();
                setTimeout(function () {
                    checkInDaily();
                }, 500);                
            } else {
                $('body').append('<div id="checkin_error" style="display: none;">\n\
<div class="weui-mask_transparent">\n\
<div class="weui-toast">\n\
<i class="weui-icon-cancel weui-icon_toast"></i><p class="weui-toast__content">'+response.customerMessage+'</p>\n\
</div></div></div>');
                    
                $('#checkin_error').fadeIn(100);
                setTimeout(function () {
                    $('#checkin_error').fadeOut(1000).remove();
                }, 1000);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function showBonusDetail() {
    $.ajax({
        url: $.api.base+"/nb-customer/api/userbonus/detail/"+$.cookie('usercode')+"?page="+Math.round(p)+"&sort=id,desc",
        type: "GET",
        async: false,
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                if(response.data.content.length <= 4){
                    $('.weui-loadmore').fadeOut();
                }
                
                $('#bonus').text($.parseJSON(sessionStorage.getItem('userbonus')).currentBonus);
                
                var type;
                $.each(response.data.content, function(i,v){
                    switch(v.type) {
                        case 0:
                          type = "调整";
                          break;
                        case 1:
                          type = "借阅申请";
                          break;
                        case 2:
                          type = "归还图书";
                          break;
                        case 3:
                          type = "注册赠送";
                          break;
                        case 4:
                          type = "添加图书";
                          break;
                        case 5:
                          type = "分享";
                          break;
                        case 6:
                          type = "邀请好友";
                          break;
                        case 7:
                          type = "签到";
                          break;
                        case 8:
                          type = "借阅同意";
                          break;
                        case 9:
                          type = "借阅不同意";
                          break;
                        case 10:
                          type = "取消借阅";
                          break;
                        default:
                          type = "未知";
                    }

                    $('#bonus_detail').append('<div class="weui-media-box weui-media-box_text">\n\
<h4 class="weui-media-box__title">'+type+' <span style="float: right;">'+(v.bonus > 0? '+'+v.bonus : v.bonus)+'</span></h4>\n\
<p class="weui-media-box__desc">'+v.created.split('.000')[0].replace('T',' ')+'</p></div>');   
                });
                
                p++;
                
            } else {
                alert(response.customerMessage);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
}

function loadingToast() {
    var $loadingToast = $('#loadingToast');
    if ($loadingToast.css('display') != 'none') return;
    $loadingToast.fadeIn(100);
    setTimeout(function () {
        $loadingToast.fadeOut(100);
    }, 1000);
  
}

function addDate(days){ 
    var d = new Date(); 
    d.setDate(d.getDate() + days); 
    var m = d.getMonth() + 1; 
    return d.getFullYear() + '-' + m + '-' + d.getDate(); 
} 

function getURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function refineUrl() {
    var url = window.location.href;
    var value = url.substring(url.lastIndexOf('/') + 1);
    value  = value.split("?")[0];   
    return value;     
}

function html2Canvas() {
    showUserInfo($.cookie('usercode'));
    
    $.ajax({
        url: $.api.base+"/nb-customer/api/userbook/findAllByTagCodeAndUserCode?userCode="+$.cookie('usercode')+"&page=1&sharable=1",
        type: "POST",
        data: JSON.stringify([]),
        async: false,
        dataType: "json",
        contentType: "application/json",
        beforeSend: function(request) {
            request.setRequestHeader("Login", $.cookie("login"));
            request.setRequestHeader("Authorization", $.cookie("authorization"));
        },
        complete: function(){},
        success: function (response, status, xhr) {
            if(response.code === 'C0') {
                if(xhr.getResponseHeader("Authorization") !== null){
                    $.cookie("authorization", xhr.getResponseHeader("Authorization"));
                }
                
                $('#title').text(response.data.totalElements+'本绘本免费借阅');
                $('#desc').text('我在邻里爱读书分享了'+response.data.totalElements+'本绘本，免费借！快来看看！');
            } else {
                alert(response.customerMessage);
            }
        }
    });
    
    setTimeout(function () {
        html2canvas(document.querySelector("#canvas"), {
            useCORS: true,
            scale: 2,
            height: $('#canvas').height() - 5
        }).then(canvas => {
            var image = canvas.toDataURL("image/png");  
            var pHtml = "<img src="+image+" style='position: absolute; top: 0; right: 0; left: 0; margin: 0 auto; width: 100%; z-index: 9999'>"; 
            $('body').append(pHtml);
        });
    }, 500);
    
}