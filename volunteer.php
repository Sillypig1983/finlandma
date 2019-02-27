<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .delete-kid,
    .delete-location {
        float: right;
        font-size: 13px;
    }
    
    #show_kids:before,
    #show_locations:before {
        content: " ";
        position: absolute;
        left: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #e5e5e5;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(.5);
        transform: scaleY(.5);
        z-index: 2;
    }
    
    .weui-cell:before {
        left: 0;
    }
    
    .weui-cell {
        background-color: #fff;
    }
    
    .weui-cells_form {
        background-color: #f8f8f8;
    }
    
    .weui-panel {
        margin-top: 0;
    }
    
    #kids, #locations {
        margin-top: 15px;
    }
    
    .weui-media-box__desc {
        color: #333;
    }
    
    .basic:before {
        left: 0;
    }
    
    .weui-cells:before {
        border-top: 0 none;
    }
    
    .weui-cell_select .weui-select {
        padding-left: 15px;
        font-size: 17px;
    }
    
    .weui-cell__ft {
        color: #000;
    }
    
    .weui-cell_select .weui-cell__bd:after {
        border-color: #61affe;
    }
    
    .weui-label {
        width: 55px;
    }
    
    input:disabled, textarea:disabled {
        color: #000;
        opacity: 1;
        -webkit-opacity: 1;
        -webkit-text-fill-color: #000;
    }
    
    .weui-badge {
        background-color: #f43530;
        color: #fff;
        border: 0 none;
    }
</style>
<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0;">
        <div class="weui-cell" style="background-color: #1aad19; color: #fff; font-weight: bold; text-shadow: 0 1px 0 rgba(0,0,0,.1);">
            <div class="weui-cell__bd">
                <center><p>志愿者报名</p></center>
            </div>
        </div>
        
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <p>个人信息</p>
            </div>
        </div>
        
        <div class="weui-cell basic">
            <div class="weui-cell__hd">
                <label class="weui-label">姓名</label>
            </div>
            <div class="weui-cell__bd">
                <input id="fullname" class="weui-input" type="text" placeholder="请输入姓名">
            </div>
        </div>
        
        <div class="weui-cell basic">
            <div class="weui-cell__hd">
                <label class="weui-label">专业</label>
            </div>
            <div class="weui-cell__bd">
                <input id="profession" class="weui-input" type="text" placeholder="请输入职业/专业">
            </div>
        </div>
        
        <div class="weui-cell basic">
            <div class="weui-cell__hd">
                <label class="weui-label">特长</label>
            </div>
            <div class="weui-cell__bd">
                <input id="speciality" class="weui-input" type="text" placeholder="请输入特长">
            </div>
        </div>
        
        <div class="weui-cell basic">
            <div class="weui-cell__hd">
                <label class="weui-label">手机</label>
            </div>
            <div class="weui-cell__bd">
                <input id="mobile" class="weui-input" type="text" disabled>
            </div>
        </div>
        
        <div class="weui-cell" id="locations">
            <div class="weui-cell__hd">
                <p>地址信息</p>
            </div>
            <div class="weui-cell__ft" style="position: absolute; right: 15px;">
                <span style="font-size: 14px;"><a href="add_home_addr.php?volunteer=1" class="weui-btn weui-btn_mini weui-btn_default" style="background-color: #1aad19; border: 0 none; color: #fff; font-weight: bold; text-shadow: 0 1px 0 rgba(0,0,0,.1);">+家庭地址</a></span>
                <span style="font-size: 14px; margin-left: 5px;"><a href="add_school_addr.php?volunteer=1" class="weui-btn weui-btn_mini weui-btn_default" style="background-color: #1aad19; border: 0 none; color: #fff; font-weight: bold; text-shadow: 0 1px 0 rgba(0,0,0,.1);">+学校地址</a></span>
            </div>
        </div>
        
        <div id="show_locations"></div>
        
        <div class="weui-cell" id="kids">
            <div class="weui-cell__hd">
                <p>小孩信息</p>
            </div>
            <div class="weui-cell__ft" style="position: absolute; right: 15px;">
                <span style="font-size: 14px;"><a href="add_kid.php?event=<?= htmlspecialchars($_GET["event"]) ?>" class="weui-btn weui-btn_mini weui-btn_default" style="background-color: #1aad19; border: 0 none; color: #fff; font-weight: bold; text-shadow: 0 1px 0 rgba(0,0,0,.1);">+</a></span>
            </div>
        </div>
        
        <div id="show_kids"></div>
    </div>
    
    <div style="margin: 15px;">
        <a id="submit_volunteer" href="javascript:;" class="weui-btn weui-btn_primary">提交报名</a>
    </div>
<?php include 'footer.php'; ?>