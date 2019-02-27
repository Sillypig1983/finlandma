<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>
    
<body style="background-color: #fff;">
    <div class="weui-tab">
        <div class="weui-navbar">
            <div onclick="window.location = 'bookshelf.php'" class="weui-navbar__item">
                自有<span id="nav_my_books"></span>
            </div>
            <div onclick="window.location = 'borrowerlist.php'" class="weui-navbar__item weui-bar__item_on">
                借进<span id="nav_borrow_books"></span>
            </div>
            <div onclick="window.location = 'ownerlist.php'" class="weui-navbar__item">
                借出<span id="nav_owner_books"></span>
            </div>
        </div>
        <div class="weui-tab__panel">

        </div>
    </div>

    <div id="borrow_book_list" class="weui-panel__bd"></div>

    <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    
    <br><br><br>
    
<?php include 'footer.php'; ?>