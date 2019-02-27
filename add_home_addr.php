<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<style>
    .weui-cell:before {
        border-top: none;
    }
    
    .weui-cells:after {
        border-bottom: none;
    }
    
    .weui-cells {
        margin-top: 10px;
    }
    
    .weui-cell__hd {
        width: 124px;
        font-size: 14px;
    }
    
    .weui-search-bar__form:after {
        border: none;
        background: transparent;
    }
    
    .weui-cell_primary {
        padding: 2px 0 2px 20px;
        color: #666;
        font-size: 14px;
    }
    
    .weui-search-bar {
        padding: 4px 10px;
        font-size: 14px;
    }
    
    .searchbar-result {
        padding-bottom: 40px;
    }
    
    .weui-cell_access .weui-cell__ft:after {
        display: none;
    }
</style>
<body>
    <div class="weui-cells weui-cells_form" style="margin-top: 0; padding-bottom: 10px;">
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <center><p>新增家庭地址</p></center>
            </div>
        </div>
        
        <div class="weui-cell">
            <div class="weui-cell__hd">
                <i class="fas fa-map-marker-alt" style="color: #777;"></i>
                <input class="weui-input" type="text" id="region" style="width: 80px; margin-left: 5px;" placeholder="请选择地区" readonly="readonly">
                <i class="fas fa-angle-down" style="color: #777;"></i>
            </div>
            <div class="weui-cell__bd">
                <div class="weui-search-bar" id="searchAddress">
                    <form class="weui-search-bar__form">
                        <div class="weui-search-bar__box">
                            <i class="weui-icon-search"></i>
                            <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="例如: 三湘四季花城" required>
                            <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
                        </div>
                        <label class="weui-search-bar__label" id="searchText" style="background-color: #efeff4;">
                            <i class="weui-icon-search"></i>
                            <span>地址或小区名</span>
                        </label>
                    </form>
                    <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchCancel">取消</a>
                </div>
            </div>
        </div>
        <div class="weui-cells">
            <div class="weui-cell weui-cell_access">
                <div id="selectedResult" class="weui-cell__bd weui-cell_primary">
                    <p><i class="weui-icon-circle"></i> 暂无地址记录</p>
                </div>
                <div class="weui-cell__ft" style="font-size: 0">
                    <a id="save_location" href="javascript:;" class="weui-btn weui-btn_mini weui-btn_primary" style="display:none;">保存</a>
                </div>
            </div>
        </div>
        <div class="weui-cells searchbar-result" id="searchAddressResult" style="display: none; margin-top: 0;"></div>
    </div>
    <div class="js_dialog" id="iosDialog2" style="display: none;">
        <div class="weui-mask"></div>
        <div class="weui-dialog">
            <div class="weui-dialog__bd">地址保存成功！</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary">知道了</a>
            </div>
        </div>
    </div>

<?php include 'footer.php'; ?>