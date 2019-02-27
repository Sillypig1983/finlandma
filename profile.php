<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .weui-tabbar__item {
        position: relative;
    }
    
    .weui-media-box__thumb {
        -moz-box-shadow: none;
        box-shadow: none;
    }
        
    .weui-panel_access {
        background:url(default/green/images/bg-pattern.png),#a37cb6;
        background:url(default/green/images/bg-pattern.png),-webkit-gradient(linear,right top,left top,from(#a37cb6),to(#e7666f));
        background:url(default/green/images/bg-pattern.png),linear-gradient(to left,#a37cb6,#e7666f);
        padding: 20px 15px;
        margin-top: 0;
    }
    
    .weui-media-box {
        background-color: rgba(255,255,255,0.9);
    }
</style>

<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center><p>我的资料</p></center>
            </div>
        </div>
    </div>
    
    <div class="weui-panel weui-panel_access">
        <div class="weui-panel__bd">
            <a href="children.php" class="weui-media-box weui-media-box_appmsg weui-cell_access">
                <div class="weui-media-box__hd">
                    <img id="nav_avatar" class="weui-media-box__thumb" src="#" alt="">
                </div>
                <div class="weui-media-box__bd">
                    <h4 id="nav_user" class="weui-media-box__title"></h4>
                    <p class="weui-media-box__desc">手机 <b id="phone_no"></b></p>
                    <p class="weui-media-box__desc">积分 <b id="bonus"></b></p>
                </div>
                <span class="weui-cell__ft" style="font-size: 13px;">完善孩子资料</span>
            </a>
        </div>
    </div>
    
    <div class="weui-panel" style="margin-top: 0;">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <div class="weui-cell">
                        <a href="bonus_detail.php" class="weui-tabbar__item">
                            <i class="far fa-money-bill-alt" style="color: #e7666f;"></i>
                            <p class="weui-tabbar__label">我的积分</p>
                        </a>
                        <a href="bookshelf.php" class="weui-tabbar__item">
                            <i class="fas fa-book" style="color: #BE2D4F;"></i>
                            <p class="weui-tabbar__label">我的书架</p>
                        </a>
                        <a href="borrowerlist.php" class="weui-tabbar__item">
                            <i class="fas fa-sign-in-alt" style="color: #973A7A;"></i>
                            <p class="weui-tabbar__label">借进记录</p>
                        </a>
                        <a href="ownerlist.php" class="weui-tabbar__item">
                            <i class="fas fa-sign-out-alt" style="color: #a37cb6;"></i>
                            <p class="weui-tabbar__label">借出记录</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
        
    <div class="weui-panel">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_access" href="location.php">
                        <div class="weui-cell__hd"><i class="fas fa-map-marked-alt" style="margin-right: 6px; color: #e7666f;"></i></div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>编辑地址</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a  id="checkin" class="weui-cell weui-cell_access" href="javascript:;">
                        <div class="weui-cell__hd"><i class="far fa-calendar-check" style="margin-right: 10px; color: #C52B48;"></i></div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>今日签到</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="following.php">
                        <div class="weui-cell__hd"><i class="far fa-heart" style="margin-right: 10px; color: #C52B48;"></i></div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>我的关注</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-panel">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_access" href="invitation.php">
                        <div class="weui-cell__hd"><i class="fas fa-link" style="margin-right: 10px; color: #AF3260;"></i></div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>邀请邻里</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    
    <div class="weui-panel">
        <div class="weui-panel__bd">
            <div class="weui-media-box weui-media-box_small-appmsg">
                <div class="weui-cells">
                    <a class="weui-cell weui-cell_access" href="qa.php?q=积分规则">
                        <div class="weui-cell__hd"><i class="fab fa-readme" style="margin-right: 10px; color: #903C81;"></i></div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>积分规则</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="contact.php">
                        <div class="weui-cell__hd"><i class="fas fa-headset" style="margin-right: 10px; color: #903C81;"></i></div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>联系客服</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="aboutus.php">
                        <div class="weui-cell__hd"><i class="fas fa-info-circle" style="margin-right: 10px; color: #a37cb6;"></i></div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>关于我们</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                    <a class="weui-cell weui-cell_access" href="privacy.php">
                        <div class="weui-cell__hd"><i class="far fa-file-word" style="margin-left: 3px; margin-right: 12px; color: #a37cb6;"></i></div>
                        <div class="weui-cell__bd weui-cell_primary">
                            <p>隐私政策</p>
                        </div>
                        <span class="weui-cell__ft"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <br><br><br>

<?php include 'footer.php'; ?>