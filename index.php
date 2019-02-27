<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
<body>
    <div class="weui-search-bar" id="searchBar" style="padding-top: 80px; background:url(default/green/images/bg-pattern.png),#844190; background:url(default/green/images/bg-pattern.png),-webkit-gradient(linear,right top,left top,from(#844190),to(#d03348)); background:url(default/green/images/bg-pattern.png),linear-gradient(to left,#844190, #983a78, #b2355d, #d03348);">
        <img src="default/green/images/top-banner-new-year.png" alt="" style="position: absolute; top: 0; left: 0; right: 0; width: 260px; margin: 0 auto;">
        <form class="weui-search-bar__form">
            <div class="weui-search-bar__box">
                <i class="weui-icon-search"></i>
                <input type="search" class="weui-search-bar__input" id="searchInput" placeholder="搜索" required/>
                <a href="javascript:" class="weui-icon-clear" id="searchClear"></a>
            </div>
            <label class="weui-search-bar__label" id="searchText">
                <i class="weui-icon-search"></i>
                <span>搜索 (书名、ISBN、作者、出版社)</span>
            </label>
        </form>
        <a href="qa.php?q=积分规则" style="position: absolute; top: 10px; right: 10px; color: #fff; font-size: 14px;">新手帮助</a>
        <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchConfirm" style="background: #fff; margin-left: 0; padding: 0 5px; font-size: 14px;">确定</a>
    </div>
    <div id="taggroups" class="weui-cells" style="margin-top: 0; margin-bottom: 10px;"></div>

    <div id="book_list" class="weui-panel__bd"></div>
    
    <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    
    <br><br><br>

<?php include 'footer.php'; ?>