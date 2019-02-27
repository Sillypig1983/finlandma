<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .weui-panel:after, .weui-panel:before, 
    .weui-panel__hd:after {
        display: none;
    }
    
    .weui-media-box__hd i {
        font-size: 40px;
        vertical-align: middle;
        color: #666;
    }
    
    .weui-input {
        background: #efeff4;
        padding: 5px 10px;
        width: 80%;
    }
    
    .weui-cells:after {
        border-bottom: 0 none;
    }
</style>

<body style="background-color: #fff;">
    <div class="weui-cells" style="margin-top: 0; padding-bottom: 15px;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center><p>自有图书上传</p></center>
            </div>
        </div>

        <div class="weui-panel weui-panel_access" style="margin-top: -10px;">
            <div class="weui-panel__bd" style="padding-right: 15px;">
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <i class="fas fa-barcode"></i>
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">1</h4>
                        <p class="weui-media-box__desc">扫描书本后面的isbn条形码找到图书信息</p>
                    </div>
                </a>
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <i class="fas fa-tags"></i>
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">2</h4>
                        <p class="weui-media-box__desc">找到后给这本书打上标签即可完成上传自有图书</p>
                    </div>
                </a>
                <a href="javascript:void(0);" class="weui-media-box weui-media-box_appmsg">
                    <div class="weui-media-box__hd">
                        <i class="far fa-check-circle"></i>
                    </div>
                    <div class="weui-media-box__bd">
                        <h4 class="weui-media-box__title">3</h4>
                        <p class="weui-media-box__desc">上传后可在我的书架里看到它们，同时也会在共享书架里展示给别人</p>
                    </div>
                </a>
            </div>
        </div>
        
        <div class="weui-btn-area weui-media-box" style="text-align: center;">
            <a class="weui-btn weui-btn_default" id="manual_upload" href="javascript:;" style="display: inline-block; width: 48%;"><i class="fas fa-pencil-alt"></i> 手动输入</a>
            <a class="weui-btn weui-btn_primary" id="scan-barcode" href="javascript:;" style="display: inline-block; width: 48%;"><i class="fas fa-camera"></i> 扫码上传</a>
        </div>
        
        <div class="js_dialog" id="manual_uploader" style="display: none;">
            <div class="weui-mask"></div>
            <div class="weui-dialog">
                <div class="weui-dialog__bd">
                    手动输入ISBN码<br><br>
                    <input class="weui-input" id="isbn_input" type="text" value="" placeholder="请输入图书ISBN码">
                </div>
                <div class="weui-dialog__ft">
                    <a href="javascript:;" id="btn-enter"  class="weui-dialog__btn weui-dialog__btn_primary">确认</a>
                </div>
            </div>
        </div>
    </div>

<?php include 'footer.php'; ?>