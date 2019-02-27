<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .weui-cell__ft span a {
        color: #000;
    }
    
    .weui-badge {
        background-color: #f43530;
        color: #fff;
        border: 0 none;
    }
</style>
<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0; padding-bottom: 10px;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center><p>编辑地址</p></center>
            </div>
            <div class="weui-cell__ft" style="position: absolute; right: 15px;">
                <span style="font-size: 14px;"><a href="#" id="skip_to_next">跳过 ></a></span>
            </div>
        </div>        
    </div>
    
    <div id="show_locations" class="weui-cells"></div>
    
    <div style="margin: 15px;">
        <a href="add_home_addr.php" class="weui-btn weui-btn_primary">新增家庭地址</a>
    </div>
    
    <div style="margin: 15px;">
        <a href="add_school_addr.php" class="weui-btn weui-btn_primary">新增学校地址</a>
    </div>
<?php include 'footer.php'; ?>