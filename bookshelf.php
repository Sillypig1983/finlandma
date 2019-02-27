<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
    
<body style="background-color: #fff;">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div onclick="window.location = 'bookshelf.php'" class="weui-navbar__item weui-bar__item_on">
                自有<span id="nav_my_books"></span>
            </div>
            <div onclick="window.location = 'borrowerlist.php'" class="weui-navbar__item">
                借进<span id="nav_borrow_books"></span>
            </div>
            <div onclick="window.location = 'ownerlist.php'" class="weui-navbar__item">
                借出<span id="nav_owner_books"></span>
            </div>
        </div>
        <div class="weui-tab__panel">

        </div>
    </div>
    
    <div class="weui-search-bar" id="searchBar">
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
        <a href="javascript:" class="weui-search-bar__cancel-btn" id="searchConfirm">确定</a>
    </div>
    <div id="taggroups" class="weui-cells" style="margin-top: 0; margin-bottom: 10px;"></div>

    <div id="my_book_list" class="weui-panel__bd"></div>

    <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    
    <?php include 'tag.php'; ?>

<?php include 'footer.php'; ?>