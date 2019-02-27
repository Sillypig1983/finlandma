<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .weui-cells:after {
        border-bottom: 0 none;
    }
    
    .weui-cells:before {
        border-top: 0 none;
    }
    
    .weui-article {
        padding: 10px 15px;
    }
    
    .weui-article section {
        margin-bottom: 0;
        text-align: center;
        position: relative;
    }
    
    .weui-panel:before {
        border-top: 0 none;
    }
    
    .weui-panel:after {
        border-bottom: 0 none;
    }
    
    .weui-media-box__thumb {
        -moz-box-shadow: none;
        box-shadow: none;
    }
    
    .slogan {
        position: absolute;
        color: #fff;
        margin: 0 auto;
        left: 0;
        right: 0;
    }
    
    #invitation img {
        max-width: 300px;
        margin: 0 auto;
        -webkit-border-top-left-radius: 10px;
        -webkit-border-top-right-radius: 10px;
        -moz-border-radius-topleft: 10px;
        -moz-border-radius-topright: 10px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-bottom: -7px;
    }
    
</style>

<body style="background: #48385a;">
    <div id="canvas" style="background: #48385a;">
        <div class="weui-cells weui-cells_form" style="background: transparent; margin-top: 0;">
            <div class="weui-cell">
                <div class="weui-cell__bd" style="color: #fff;">
                    <center><p><img id="nav_avatar" width="20" src="#" crossorigin="anonymous" alt=""> <span id="nav_user"></span><span>向你推荐</span></p></center>
                </div>
            </div>
        </div>

        <article class="weui-article">
            <section id="invitation">
                <div class="slogan" style="top: 40px;">开启亲子阅读之门</div>
                <div class="slogan" style="top: 60px;">让孩子们爱上阅读</div>
                <img src="default/green/images/invitation_bg_1.jpg" />
            </section>
            <div class="weui-panel weui-panel_access" style="max-width: 300px; margin: 0 auto;">
                <div class="weui-panel__bd">
                    <a href="#!" class="weui-media-box weui-media-box_appmsg weui-cell_access" style="background: transparent; padding: 20px 15px;">
                        <div class="weui-media-box__bd">
                            <h4 id="title" class="weui-media-box__title"></h4>
                            <h4 id="desc"></h4>
                        </div>
                        <div class="weui-media-box__hd" style="height: auto;">
                            <img class="weui-media-box__thumb" src="default/green/images/logo-icon.jpg" alt="">
                        </div>
                    </a>
                </div>
            </div>
            <div style="height: 60px; line-height: 60px; text-align: center;">
                <span style="display: inline-block; width: 25px; border-top: 1px solid #fff; padding-top: 3px;"></span>
                <span style="color: #fff; vertical-align: middle;">长按上图保存图片，或发送给朋友</span>
                <span style="display: inline-block; width: 25px; border-top: 1px solid #fff; padding-top: 3px;"></span>
            </div>
        </article>
    </div>

<?php include 'footer.php'; ?>