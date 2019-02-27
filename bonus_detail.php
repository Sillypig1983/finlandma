<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>

<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center>
                    <a href="javascript:history.go(-1);" style="float: left; margin-right: -12px; color: #000"><i class="fas fa-chevron-left"></i></a>
                    <p>我的积分</p>
                </center>
            </div>
        </div>
    </div>
    
    <div class="weui-form-preview">
        <div class="weui-form-preview__hd">
            <div class="weui-form-preview__item">
                <label class="weui-form-preview__label">可用积分</label>
                <em id="bonus" class="weui-form-preview__value"></em>
            </div>
        </div>
    </div>
    
    <div class="weui-panel weui-panel_access">
        <div class="weui-panel__hd">积分明细</div>
        <div id="bonus_detail" class="weui-panel__bd"></div>
    </div>
    
    <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    
    <br><br><br>
    
<?php include 'footer.php'; ?>