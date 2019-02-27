<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0; padding-bottom: 15px;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center><p>手机绑定</p></center>
            </div>
        </div>
        
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <label class="weui-label">手机号</label>
            </div>
            <div class="weui-cell__bd">
                <input id="mobile_no" class="weui-input" type="tel" placeholder="请输入手机号">
            </div>
        </div>
        <div class="weui-cell weui-cell_vcode">
            <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
            <div class="weui-cell__bd">
                <input id="login_verify" class="weui-input" type="number" placeholder="请输入验证码" readonly="true">
            </div>
            <div class="weui-cell__ft">
                <button onclick="javascript: VeryficationCodeLogin()" id="login_verify_link" class="weui-vcode-btn">获取验证码</button>
            </div>
        </div>
        <div class="weui-cell"></div>
        <div style="margin: 0 15px;">
            <a id="login_btn" href="javascript:;" class="weui-btn weui-btn_primary">绑定</a>
        </div>
    </div>
    
    <div id="login_error_msg" style="display: none;">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-cancel weui-icon_toast"></i>
            <p class="weui-toast__content"></p>
        </div>
    </div>

<?php include 'footer.php'; ?>