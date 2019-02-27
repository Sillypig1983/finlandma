<!DOCTYPE html>
<html lang="zh-cmn-Hans">

<?php include 'header.php'; ?>

<body>
    <div class="weui-msg">
        <div class="weui-msg__icon-area"><i class="weui-icon-success weui-icon_msg"></i></div>
        <div class="weui-msg__text-area">
            <h2 class="weui-msg__title">操作成功</h2>
            <p class="weui-msg__desc">已经发起借阅申请，请等待对方回复。<a href="javascript:void(0);" onclick="window.location = 'order_detail.php?order=<?= $_GET['order']; ?>'">点击</a>查看详情</a></p>
        </div>
        <div class="weui-msg__opr-area">
            <p class="weui-btn-area">
                <a href="borrowerlist.php" class="weui-btn weui-btn_primary">确定</a>
            </p>
        </div>
    </div>

<?php include 'footer.php'; ?>