<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .weui-cells:after,
    .weui-panel:after {
        border-bottom: 0 none;
    }
</style>

<body style="background-color: #fff;">
    <div class="weui-cells weui-cells_form" style="margin-top: 0;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center>
                    <a href="javascript:history.go(-1);" style="float: left; margin-right: -12px; color: #000"><i class="fas fa-chevron-left"></i></a>
                    <p>新手帮助</p>
                </center>
            </div>
        </div>
    </div>
    
    <?php
        $qa = 'default/qa/';
        $ext = 'htm';
        $ans = $ans =  $qa.'未知答案.'.$ext;
        
        if( $_GET['q'] &&  $_GET['q'] != '') {
            $ans =  $qa.urldecode( $_GET['q']).'.'.$ext;
        }
    ?>
    
    <div class="weui-panel" style="margin-top: 0;">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>Q: 积分规则</p>
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_access">
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>A: <br><?php include $ans; ?></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php include 'footer.php'; ?>