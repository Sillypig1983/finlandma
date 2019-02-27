wx.ready(function () {
    if($('#scan-barcode').length > 0){
        document.querySelector('#scan-barcode').onclick = function () {
            wx.scanQRCode({
                needResult: 1,
                scanType: ["barCode"],
                success: function (res) {
                    var result = res.resultStr.split(',');
                    var isbn = $.trim(result[1]);
                    uploadISBN(isbn);
                }
            });
        };
    }

    if($.shareData === ''){
        $.shareData = {
            title: '邻里爱读书，图书免费借',
            desc: '我在使用邻里爱读书，海量图书免费借阅，快来看看！',
            link: $.api.share+'/?introUserCode='+$.cookie('usercode')+'&source=default',
            imgUrl: $.api.share+'/default/green/images/share-logo.jpg'
        };
    }
    
    wx.updateAppMessageShareData({
        title: $.shareData.title,
        desc:  $.shareData.desc,
        link:  $.shareData.link,
        imgUrl: $.shareData.imgUrl,
        success: function () {
        }
    });
    
    wx.updateTimelineShareData({
        title: $.shareData.title,
        desc:  $.shareData.desc,
        link:  $.shareData.link,
        imgUrl: $.shareData.imgUrl,
        success: function () {
        }
    });
});

wx.error(function (res) {
    alert(res.errMsg);
});
