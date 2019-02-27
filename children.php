<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .delete-kid {
        float: right;
        font-size: 13px;
        color: #999;
    }
</style>
<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0; padding-bottom: 10px;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center><p>我的小孩</p></center>
            </div>
        </div>        
    </div>
    
    <div id="show_kids"></div>
    
    <div style="margin: 15px;">
        <a href="add_kid.php" class="weui-btn weui-btn_primary">添加小孩</a>
    </div>
<?php include 'footer.php'; ?>