<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
    
<body>
    <div class="weui-cells" id="order_detail" style="margin-top: 0; padding-bottom: 15px;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>订单信息</p>
            </div>
        </div>

        <div class="weui-panel__bd">
            <center><h2 id="order_detail_type"></h2></center>
        </div>
        
        <div class="weui-panel weui-panel_access" style="margin-top: 0;">
            <div class="weui-panel__bd">
                <div class="weui-media-box weui-media-box_text">
                    <h4 id="order_status" class="weui-media-box__title"></h4>
                    <p id="detail_created" class="weui-media-box__desc"></p>
                </div>
            </div>
            <div class="weui-panel__ft">
                <a href="javascript:void(0);" id="flow_detail_link" class="weui-cell weui-cell_access weui-cell_link">
                    <div class="weui-cell__bd">流程详情</div>
                    <span class="weui-cell__ft"></span>
                </a>    
            </div>
        </div>
    
        <div class="weui-panel weui-panel_access">
            <div id="order_book" class="weui-panel__bd">
                <a href="#" class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <img class="weui-media-box__thumb" src="#" alt="">
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title"></h4>
                        <p class="weui-media-box__desc">周期: <span id="order_period"></span></p>
                        <p class="weui-media-box__desc">备注: <span id="order_detail_remark"></span></p>
                    </div>
                    <div id="order_count" style="font-size: 17px;"></div>
                </a>
            </div>
        </div>
        
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p><span class="role"></span>人昵称</p>
            </div>
            <div class="weui-cell__ft"><img id="nav_avatar" style="width: 18px; vertical-align: middle; padding-bottom: 5px;" src="#" alt=""> <span id="nav_user"></span></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p><span class="role"></span>人手机</p>
            </div>
            <div id="phone_no" class="weui-cell__ft"></div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p><span class="role"></span>人地址</p>
            </div>
            <div id="neighborhood" class="weui-cell__ft">
                <a href="#!" style="color: #586C94;">点击查看</a>
            </div>
        </div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>本订单编号</p>
            </div>
            <div id="order_id" class="weui-cell__ft"></div>
        </div>
        
        <div class="weui-btn-area" style="text-align: center; margin-top: 0;"></div>
    </div>
    
    <div class="js_dialog" id="flow_detail" style="display: none;">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__bd" style="text-align: left;"></div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
            </div>
        </div>
    </div>
    
    <div class="js_dialog" id="addr_li" style="display: none;">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__hd"><span class="role"></span>人地址</div>
            <div class="weui-dialog__bd" style="text-align: left;"></div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
            </div>
        </div>
    </div>
    
    <div id="flow_error_msg" style="display: none;">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-cancel weui-icon_toast"></i>
            <p class="weui-toast__content"></p>
        </div>
    </div>
    
    <div class="js_dialog" id="borrowExtendNotice" style="display: none;">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__bd">如果申请被接受，借书期延长10天。</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
            </div>
        </div>
    </div>
    
    <br><br><br>
<?php include 'footer.php'; ?>