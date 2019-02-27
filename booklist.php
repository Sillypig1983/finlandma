<!DOCTYPE html>
<html lang="en">

<?php include 'header.php'; ?>
    
<body style="background-color: #fff;">
    <div class="weui-cells" style="margin-top: 0;">
        <div class="weui-cell">
            <div id="nav_avatar" class="weui-cell__hd"></div>&nbsp;
            <div class="weui-cell__bd">
                <p><span id="nav_user"></span>添加的书</p>
            </div>
            <div id="nav_user_books" class="weui-cell__ft"></div>
        </div>
    </div>

    <div id="user_book_list" class="weui-panel__bd"></div>
    
    <div class="weui-loadmore">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
    </div>
    
    <br><br><br>
    
<?php include 'footer.php'; ?>