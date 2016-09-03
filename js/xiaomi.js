// 根据窗口宽度设置跟元素的字体大小，实现响应式设计
(function(doc, win) {
        var docEl = doc.documentElement,
                resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
                recalc = function() {
                        var clientWidth = docEl.clientWidth;
                        if (!clientWidth) return;
                        docEl.style.fontSize = 20 * (clientWidth / 1280) + 'px';
                };

        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


//实现顶部菜单的hover交互
$(function() {
        $('.top-nav').on('mouseover', function() {
                $(this).addClass('top-hover');

        });

        $('.top-nav').on('mouseleave', function() {
                $(this).removeClass('top-hover');
        });
});

//实现搜索框的交互
$(function() {
        $('.search-input').on('focus', function() {
                $('.search-input').addClass('s-active');
                $('.nav-wrap').addClass('nav-dispear');
                $('.nav-container').addClass('main-focus');
                // $('.icon-search').addClass('icon-dispear');
        });

        $('.search-input').on('focusout', function() {
                $('.search-input').removeClass('s-active');
                $('.nav-wrap').removeClass('nav-dispear');
                $('.nav-container').removeClass('main-focus');
                // $('.icon-search').removeClass('icon-dispear');
        });
});

//实现主导航的交互
$(function() {
        $('.nav-main').on('mouseover', function() {
                $(this).addClass('nav-active');
        });

        $('.nav-main').on('mouseleave', function() {
                $(this).removeClass('nav-active');
        });
});

// 实现左侧导航的交互
// hover全部分类
$(function() {
        $('.left-tittle').on('mouseover', function() {
                $('.left-list').addClass('left-show');
                $('.left-tittle').addClass('tittle-hover');
        });
        $('.leftnav-wrap').on('mouseleave', function() {
                $('.left-list').removeClass('left-show');
                $('.left-tittle').removeClass('tittle-hover');
        });
});




// hover左侧导航每个分类
$(function() {
        $('.list-div').on('mouseover', function() {
                $(this).addClass('list-hover');
                $(this).siblings('.child-div').addClass('child-show');
                $('.left-nav').removeClass('current-nav');
                $(this).parent('.left-nav').addClass('current-nav');
                $('.left-nav').addClass('normal-nav');
                $(this).parent('.left-nav').removeClass('normal-nav');
        });

        // 重新初始化导航
        $('.leftnav-wrap').on('mouseleave', function() {
                $('.left-nav').removeClass('current-nav');
                $('.left-nav').addClass('normal-nav');
        });
});




// 实现左侧子导航的交互
// hover 商品
$(function() {
        $('.item').on('mouseover', function() {
                $(this).addClass('item-hover');
        });


        $('.item').on('mouseleave', function() {
                $(this).removeClass('item-hover');
        });
});


//实现banner的自动轮播效果
var banner = ["img/banner1.jpeg", "img/banner2.jpeg", "img/banner3.jpeg", "img/banner4.jpeg", "img/banner5.jpeg"];
var index = 0;
var changeBanner = (function() {
        (index < 4) ? index = index + 1: index = 0;
        var setBanner = banner[index];
        $('.image').attr('src', setBanner);
        $('.image').addClass('fande-in');
        $('.image').addClass('fande-out');
});
//下方圆形按钮对应显示
var changeCircle = (function() {
        switch (index) {
                case 0:
                        $('.banner-radius').removeClass('selected');
                        $('.banner1').addClass('selected');
                        break;
                case 1:
                        $('.banner-radius').removeClass('selected');
                        $('.banner2').addClass('selected');
                        break;
                case 2:
                        $('.banner-radius').removeClass('selected');
                        $('.banner3').addClass('selected');
                        break;
                case 3:
                        $('.banner-radius').removeClass('selected');
                        $('.banner4').addClass('selected');
                        break;
                case 4:
                        $('.banner-radius').removeClass('selected');
                        $('.banner5').addClass('selected');
                        break;
        }
});

// 设置轮播事件
var change = setInterval("changeBanner()", 4000);
setInterval("changeCircle()", 300);
changeCircle();



// 左右按钮翻页事件
$(function() {
        // --------------左侧按钮点击事件
        $('.left-control').on('click', function() {
                (index >= 1) ? index = index - 1: index = 4;
                var current_Banner = banner[index];
                $('.image').attr('src', current_Banner);
                changeCircle();
        });

        // hover样式
        $('.left-control').on('mouseover', function() {
                $('.left-control').addClass('banner-change');
        });
        // 鼠标离开事件
        $('.left-control').on('mouseleave', function() {
                $('.left-control').removeClass('banner-change');
        });


        // --------------右侧侧按钮点击事件
        $('.right-control').on('click', function() {
                changeBanner();
                changeCircle();

        });
        // hover样式
        $('.right-control').on('mouseover', function() {
                $('.right-control').addClass('banner-change');
        });
        $('.right-control').on('mouseleave', function() {
                $('.right-control').removeClass('banner-change');
        });
});

//hover停止翻页
$(function(e) {
        $('.banner-container').on('mouseover', function(e) {
                // stopBubble(e) ;
                clearInterval(change);
                // event.stopPropagation();
                // return flase;
        });
        $('.banner-container').on('mouseleave', function(e) {
                // stopBubble(e) ;
                // 用var踩了个局部变量的大坑
                change = setInterval("changeBanner()", 4000);
                // event.stopPropagation();
                // return flase;
        });

});







// 防止冒泡
function a(e) {
        var e = (e) ? e : ((window.event) ? window.event : null);
        var e = e || window.event; // firefox下window.event为null, IE下event为null }
}

function stopBubble(e) { //如果提供了事件对象，则这是一个非IE浏览器
        if (e && e.stopPropagation)
        //因此它支持W3C的stopPropagation()方法
                e.stopPropagation();
        else
        //否则，我们需要使用IE的方式来取消事件冒泡
                window.event.cancelBubble = true;
}



// 圆形按钮翻页事件
$(function() {
        $('.banner-radius').on('mouseover', function() {
                $('.banner-radius').removeClass('selected');
                $(this).addClass('selec ted');
        });

        $('.banner1').on('mouseover', function() {
                clearInterval(change);
                index = 0;
                var setBanner = banner[index];
                $('.image').attr('src', setBanner);
        });

        $('.banner2').on('mouseover', function() {
                clearInterval(change);
                index = 1;
                var setBanner = banner[index];
                $('.image').attr('src', setBanner);
        });

        $('.banner3').on('mouseover', function() {
                clearInterval(change);
                index = 2;
                var setBanner = banner[index];
                $('.image').attr('src', setBanner);
        });
        $('.banner4').on('mouseover', function() {
                clearInterval(change);
                index = 3;
                var setBanner = banner[index];
                $('.image').attr('src', setBanner);
        });
        $('.banner5').on('mouseover', function() {
                clearInterval(change);
                index = 4;
                var setBanner = banner[index];
                $('.image').attr('src', setBanner);
        });

});



// -------------------------------明星单品轮播效果-------------------------------
// 增加轮播效果
//
var hotLeft = (function() {
        $('.all-wrap').addClass('hot-move1');
        $('.all-wrap').removeClass('hot-move2');
});
//
var hotRight = (function() {
        $('.all-wrap').removeClass('hot-move1');
        $('.all-wrap').addClass('hot-move2');
});

var left = setInterval("hotLeft()", 5000);
var right = setInterval("hotRight()", 10000);

// hover时阴影效果
$(function() {
        $('.hot-wrap').on('mouseover', function() {
                $(this).addClass('hot-shadow');
        });

        $('.hot-wrap').on('mouseleave', function() {
                $(this).removeClass('hot-shadow');
        });
});

// hover时移动效果
$(function() {
        $('.hot-image').on('mouseover', function() {
                $(this).addClass('hot-hover');
                $(this).removeClass('hot-leave');
        });

        $('.hot-image').on('mouseleave', function() {
                $(this).removeClass('hot-hover');
                $(this).addClass('hot-leave');
        });
});


// -------------------------------热评商品hover效果-------------------------------
// 阴影以及右边移
$(function() {
        $('.review-collection').on('mouseover', function() {
                $(this).children('.review-image').addClass('rimage-hover');
                $(this).addClass('rbox-hover');
        });

        $('.review-collection').on('mouseleave', function() {
                $(this).children('.review-image').removeClass('rimage-hover');
                $(this).removeClass('rbox-hover');
        });
});

// 图片放大
$(function() {
        $('.review-image').on('mouseover', function() {
                $(this).addClass('rimage-hover');
                $(this).removeClass('rimage-leave');
        });

        $('.review-image').on('mouseleave', function() {
                $(this).removeClass('rimage-hover');
                $(this).addClass('rimage-leave');
        });
});

// *******************************楼层*************
// 楼层商品hover移动效果
$(function() {
        $('.floor-wrap').on('mouseover', function() {
                $(this).find('.floor-image').addClass('floor-hover');
                $(this).find('.floor-image').removeClass('floor-leave');
        });

        $('.floor-wrap').on('mouseleave', function() {
                $(this).find('.floor-image').removeClass('floor-hover');
                $(this).find('.floor-image').addClass('floor-leave');
        });
});

// *******************************视频介绍楼层*************
// hover状态
$(function() {
        $('.v-image').on('mouseover', function() {
                $(this).parent('.review-photo').find('.icon-play-circle').addClass('play-hover');
        });

        $('.v-image').on('mouseleave', function() {
                $(this).parent('.review-photo').find('.icon-play-circle').removeClass('play-hover');
        });
});




