<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>

<body>
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-warn weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">操作失败</h2>
            <p class="weui-msg__desc">借阅申请发起失败，请检查原因，<a href="javascript:void(0);" onclick="window.location = 'book.php?code=<?= $_GET['book']; ?>'">点击</a>重新操作</a></p>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="index.php" class="weui-btn weui-btn_primary">确定</a>
            </p>
        </div>
    </div>

<?php include 'footer.php'; ?>