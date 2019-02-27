<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>

<body>
    <div id="order" class="weui-cells" style="margin-top: 0;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <p>您正在向<span id="nav_user"></span>借书</p>
            </div>
        </div>

        <div class="page__bd">
            <div class="weui-form-preview">
                <div class="weui-form-preview__hd">
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label">书名</label>
                        <div id="book_name" class="cell__ft weui-media-box__title"></div>
                    </div>
                </div>
                <div class="weui-form-preview__bd">
                    <div class="weui-form-preview__item weui-cell_access">
                        <label class="weui-form-preview__label">数量</label>
                        <div id="amount" class="weui-cell__ft">请选择</div>
                    </div>
                    <div class="weui-form-preview__item">
                        <label class="weui-form-preview__label"><i class="fas fa-edit"></i> 备注</label>
                        <textarea id="remark" class="weui-textarea weui-form-preview__value"></textarea>
                    </div>
                </div>
                <div class="weui-form-preview__ft">
                    <a class="weui-form-preview__btn weui-form-preview__btn_default" href="javascript:history.go(-1);">取消</a>
                    <button type="button" id="make_order" class="weui-form-preview__btn weui-form-preview__btn_primary" href="javascript:">确定</button>
                </div>
                <div class="film_info_hot" style="display: none;">
                    <p class="weui-media-box__desc"></p>
                    <img src="#" />
                </div>
            </div>
        </div>
    </div>
    
    <div id="borrowErrorNotice" style="display: none;">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-cancel weui-icon_toast"></i>
            <p class="weui-toast__content"></p>
        </div>
    </div>

<?php include 'footer.php'; ?>