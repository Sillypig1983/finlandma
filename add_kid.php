<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
</style>
<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center><p>添加小孩</p></center>
            </div>
        </div>
        
        <div class="weui-cell">
            <div class="weui-cell__hd"><label class="weui-label">姓名</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" id="nickname" type="text" placeholder="请输入孩子姓名">
            </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after" style="padding-top: 10px; padding-bottom: 10px;">
            <div class="weui-cell__hd"><label for="" class="weui-label">出生日期</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" id="birthdate" type="date" value="">
            </div>
        </div>
        <div class="weui-cell weui-cell_select weui-cell_select-after">
            <div class="weui-cell__hd"><label for="" class="weui-label">性别</label></div>
            <div class="weui-cell__bd">
                <select class="weui-select" name="gender" id="gender">
                    <option value=""></option>
                    <option value="1">男</option>
                    <option value="2">女</option>
                </select>
            </div>
        </div>
    </div>
    <div class="weui-btn-area">
        <a class="weui-btn weui-btn_primary" href="javascript:" id="save_kid">确定</a>
    </div>
    <div class="js_dialog" id="iosDialog2" style="display: none;">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__bd">添加小孩成功！</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
            </div>
        </div>
    </div>

<?php include 'footer.php'; ?>