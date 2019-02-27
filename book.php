<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
.film_info_hot img {
    -moz-box-shadow: 5px 5px 3px #cdcdcd;
    box-shadow: 5px 5px 3px #cdcdcd;
}
#showOwners {
    font-weight: bold; 
    color: #BE2D4F;
}

.weui-picker__item {
    margin: 0 15px;
}
</style>
<body style="background: #fff;">
    <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_text">
                <h4 class="weui-media-box__title"></h4>
                <p class="weui-media-box__desc"></p>
            </div>
        </div>
        <div class="weui-panel__ft">
            <a href="javascript:void(0);" class="weui-cell weui-cell_access weui-cell_link">
                <div id="showOwners" class="weui-cell__bd"><i class="fas fa-info-circle"></i> </div>
                <span class="weui-cell__ft"></span>
            </a>    
        </div>
    </div>
    
    <article id="book_detail" class="weui-article">
        <section>
            <section class="film_info_hot">
                <p style="float: left; max-width: 50%; margin-right: 20px;"><img src="#" alt="" style="max-height: 150px;"></p>
                <?php
                    if($_GET["code"] && ($_GET["user"] || $_GET["tagbook"])){
                ?>
                <div class="weui-cells weui-cells_form" style="max-width: 50%;">
                    <div class="weui-cell weui-cell">
                        <div class="weui-cell__hd"><label for="" class="weui-label">数量 <i class="far fa-edit"></i></label></div>
                        <div class="weui-cell__bd">
                            <input id="stock" class="weui-input" type="number" pattern="[0-9]*" value="weui input error" placeholder="">
                        </div>
                    </div>
                    <div class="weui-cell weui-cell_switch">
                        <div class="weui-cell__bd">可借阅</div>
                        <div class="weui-cell__ft">
                            <label for="switchCP" class="weui-switch-cp">
                                <input id="switchCP" class="weui-switch-cp__input" type="checkbox" checked="checked">
                                <div class="weui-switch-cp__box"></div>
                            </label>
                        </div>
                    </div>
                </div>
                <?php
                    if($_GET["code"] && $_GET["user"]){
                ?>
                <a id="btn-detail" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" style="margin: 10px 15px 0;">确定</a>
                
                <?php
                    }} else {
                ?>
                <div class="weui-cells weui-cells_form" style="max-width: 50%;">
                    <div class="weui-cell weui-cell" style="padding-left: 0; padding-right: 0;">
                        <span class="weui-badge">押金</span> <span style="font-size: 12px; margin-left: 10px;"> 100积分</span>
                    </div>
                    <div class="weui-cell weui-cell" style="padding-left: 0; padding-right: 0;">
                        <span class="weui-badge">租金</span> <span style="font-size: 12px; margin-left: 10px;">10积分</span>
                    </div>
                    <div class="weui-cell weui-cell" style="padding-left: 0; padding-right: 0;">
                        <span class="weui-badge">可用</span> <span style="font-size: 12px; margin-left: 10px;"><span id="bonus"></span>积分</span>
                    </div>
                    <div class="weui-cell weui-cell" style="padding-left: 0; padding-right: 0;">
                        <a href="qa.php?q=积分规则" style="color: #586C94; font-size: 12px;">想获取更多积分！</a>
                    </div>
                </div>
                <?php
                    }
                ?>
                <div style="clear: both;"> </div>
            </section>
        </section>
    </article>
    
    <?php include 'tag.php'; ?>

<?php include 'footer.php'; ?>
