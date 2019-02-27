<?php
    if(basename($_SERVER['PHP_SELF']) != 'volunteer.php' && !$_GET["volunteer"] && !$_GET["event"]){
?>
<div class="weui-tabbar" style="position: fixed;">
    <a href="index.php" id="foot_all" class="weui-tabbar__item">
        <i class="fas fa-book-reader"></i>
        <p class="weui-tabbar__label">共享书架</p>
    </a>
    <a href="nearby.php" id="foot_nearby" class="weui-tabbar__item">
        <i class="fas fa-flag-checkered"></i>
        <p class="weui-tabbar__label">附近书架</p>
    </a>
    <a href="upload.php" id="foot_add" class="weui-tabbar__item">
        <i class="fas fa-plus"></i>
        <p class="weui-tabbar__label">添加图书</p>
    </a>
    <a href="profile.php" id="foot_profile" class="weui-tabbar__item">
        <i class="fas fa-user"></i>
        <p class="weui-tabbar__label">我的资料</p>
    </a>
</div>
<?php
    }
?>
<div id="loadingToast" style="display:none;">
    <div class="weui-mask_transparent"></div>
    <div class="weui-toast">
        <i class="weui-loading weui-icon_toast"></i>
        <p class="weui-toast__content">数据加载中</p>
    </div>
</div>
</body>
<script type="text/javascript" src="default/js/zepto.weui.js"></script>
<script type="text/javascript" src="default/js/weui.min.js"></script>
<?php
if(basename($_SERVER['PHP_SELF']) == 'add_home_addr.php' || basename($_SERVER['PHP_SELF']) == 'add_school_addr.php'){ 
?>
<script type="text/javascript" src="default/js/city-data.js"></script>
<script type="text/javascript" src="default/js/hzw-city-picker.min.js"></script>
<script>
    var cityPicker = new HzwCityPicker({
        data: data,
        target: 'region',
        valType: 'k-v',
        hideCityInput: {
            name: 'city',
            id: 'city',
            val: '22-上海市'
        },
        hideProvinceInput: {
            name: 'province',
            id: 'province',
            val: '21-上海'
        },
        callback: function(){
        }
    });

    cityPicker.init();
    $('#region').val($('#city').val().split('-')[1]);
</script>
<?php
} else if(basename($_SERVER['PHP_SELF']) == 'invitation.php'){
?>
<script type="text/javascript" src="default/js/html2canvas.min.js"></script>
<?php
}
?>
<script type="text/javascript" src="default/js/scripts.js?t=<?php echo date("Y-m-d")?>"></script>
<script type="text/javascript" src="default/js/demo.js"></script>
</html>