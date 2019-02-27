<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .delete-kid {
        float: right;
        font-size: 13px;
    }
    
    #show_kids:before {
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
    
    #kids {
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
</style>
<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0;">
        <div class="weui-cell" style="background-color: #1aad19; color: #fff; font-weight: bold; text-shadow: 0 1px 0 rgba(0,0,0,.1);">
            <div class="weui-cell__bd">
                <center><p>活动报名</p></center>
            </div>
        </div>
        
        <div class="weui-cell basic">
            <div class="weui-cell__bd">
                <input id="event" class="weui-input" type="text" disabled>
            </div>
        </div>
        
        <div class="weui-cell basic">
            <div class="weui-cell__hd">
                <label class="weui-label"><i class="fas fa-clock" style="color: #999;"></i></label>
            </div>
            <div class="weui-cell__bd">
                <input id="time" class="weui-input" type="text" disabled>
            </div>
        </div>
        
        <div class="weui-cell basic">
            <div class="weui-cell__hd">
                <label class="weui-label"><i class="fas fa-map-marker-alt" style="color: #999;"></i></label>
            </div>
            <div class="weui-cell__bd">
                <input id="location" class="weui-input" type="text" disabled>
            </div>
        </div>
        
        <div class="weui-cell basic" style="margin-top: 15px;">
            <div class="weui-cell__hd">
                <label class="weui-label">姓名</label>
            </div>
            <div class="weui-cell__bd">
                <input id="fullname" class="weui-input" type="text" placeholder="请输入姓名">
            </div>
        </div>
        
        <div class="weui-cell" id="kids">
            <div class="weui-cell__hd">
                <p>小孩信息</p>
            </div>
            <div class="weui-cell__ft" style="position: absolute; right: 15px;">
                <span style="font-size: 14px;"><a href="add_kid.php?event=<?= htmlspecialchars($_GET["event"]) ?>" class="weui-btn weui-btn_mini weui-btn_default" style="background-color: #1aad19; border: 0 none; color: #fff; font-weight: bold; text-shadow: 0 1px 0 rgba(0,0,0,.1);">添加小孩</a></span>
            </div>
        </div>
        
        <div id="show_kids"></div>
    </div>
    
    <div style="margin: 15px;">
        <a id="submit_event" href="javascript:;" class="weui-btn weui-btn_primary">提交报名</a>
    </div>
<?php include 'footer.php'; ?>