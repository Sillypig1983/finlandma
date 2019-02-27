<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .weui-media-box__desc a {
        color: #BE2D4F;
    }
    
    .weui-cells {
        margin-top: 0;
    }
    
    .weui-grid__icon {
        width: 80px;
        height: 90px;
    }
    
    .weui-grid {
        padding: 0;
    }
    
    .weui-grid:before {
        border-right: 0 none;
    }
    
    .weui-grid:after {
        border-bottom: 0 none;
    }
    
    .weui-cell:before {
        border-top: 0 none;
    }
    
    .weui-media-box_appmsg .weui-media-box__thumb {
        width: 40px;
        vertical-align: bottom;
    }
    
    .weui-grid__icon {
        margin:  0 0 0 10px;
    }
    
    .weui-grid__icon+.weui-grid__label {
        text-align: left;
        margin-left: 10px;
    }
    
    h4 .weui-media-box__desc {
        display: inline-block;
        vertical-align: middle;
        margin-left: 5px;
    }
    
    .weui-panel {
        margin-top: 0;
    }
    
    .weui-btn_mini {
        padding: 0 0.6em;
    }
</style>
<body>
    <div class="weui-cells weui-cells_form">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center>
                    <p>我的关注</p>
                </center>
            </div>
        </div>
    </div>

    <div id="following_list" class="weui-panel__bd"></div>
    
    <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    
    <br><br><br>    
<?php include 'footer.php'; ?>