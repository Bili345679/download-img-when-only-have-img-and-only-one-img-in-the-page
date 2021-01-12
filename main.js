// ==UserScript==
// @name         自动下载只有图片文件的页面里面的图片
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       You
// @include      *
// @grant        GM_download
// @require      https://code.jquery.com/jquery-3.5.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    // console.log(document.domain)
    // console.log(window.location.host)
    // console.log($('body').children().eq(0).prop("tagName") == 'IMG')
    var url = window.location.href
    if(url.indexOf('https://www.gamersky.com/showimage/id_gamersky.shtml?') == 0){
        var num = url.lastIndexOf('?')+1
        var img_src = url.substring(num)

        // 下载
        download_img(img_src)
    }else{
        $(document).ready(function(){
            // console.log($('body').children().length)
            // console.log($('body').children().length)
            if(($('body').children().length == 1 || $('body').children().length == 2) && $('body').children().eq(0).prop("tagName") == 'IMG'){
                // console.log('img only')·

                var img = $('img')
                var img_src = img[0].src

                // 下载
                download_img(img_src)

            }
        })
    }
})();

function download_img(url){
    var name = ''
    if(url.indexOf('https://gss0.baidu.com/') == 0){
        console.log('baidu')
        var tick = new Date().getTime()
        var random = Math.random()
        name = (tick + '' + random).replace('0.', '_')
    }else{
        var num = url.lastIndexOf('/')+1
        name = url.substring(num)
    }

    console.log(name)

    GM_download({
        name: name,
        url: url,
        onload: function(r){
            console.log('GM_download_success')
            // 关闭页面
            close_page()
        },
        onerror: function(r){
            console.log('GM_download_error', r)
        }
    })

}

function close_page(){
    // console.log('close page')
    if (navigator.userAgent.indexOf('MSIE') > 0) { // close IE
        if (navigator.userAgent.indexOf('MSIE 6.0') > 0) {
            window.opener = null;
            window.close();
        } else {
            window.open('', '_top');
            window.top.close();
        }
    } else { // close chrome;It is effective when it is only one.
        window.opener = null;
        window.open('', '_self');
        window.close();
    }
}
