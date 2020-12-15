// ==UserScript==
// @name         自动下载只有图片文件的页面里面的图片
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @include      *
// @grant        none
// @require      https://code.jquery.com/jquery-1.12.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    //$(document).ready(function(){
        if($('body').children().length == 1 && $('body').children().eq(0).prop("tagName") == 'IMG'){
            console.log(document.domain)
            console.log(window.location.host)
            console.log('img only')

            var img = $('img')
            var img_src = img[0].src

            var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
            //地址
            save_link.href = img_src
            save_link.download = name
            var ev = document.createEvent("MouseEvents")
            ev.initMouseEvent(
                "click", true, false, window, 0, 0, 0, 0, 0
                , false, false, false, false, 0, null
            )
            save_link.dispatchEvent(ev)

            // 关闭页面
            close_page()
        }
    //})
})();

function close_page(){
    console.log('close page')
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
