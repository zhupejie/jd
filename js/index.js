/**
 * Created by toby on 2017/7/2.
 */
;(function($){
    //轮播图调用
$("#ban_focus").imgTab(
    {
        time:1500
    }
);
//----------------------------------------------------------------------
//侧边对应楼层导航
    $(document).scroll(function(){
        // 接近1楼且大于当前窗口一半的高度时显示
        //获取文档超出部分高度和2者差比较
        if ($(this).scrollTop() > ($('.main_floor_list').offset().top)-($(window).height()/2)) {
            $('.side_nav').fadeIn(300);
        }else{
            $('.side_nav').fadeOut(300);
        }
        // 楼层滚动对应的导航按钮跟着滚动
        $('.floor').each(function() {//内容区滚动到窗口一半时激活对应按钮
            var newHeight = $(window).scrollTop()+$(window).height()/2;
            var everyToDocTop = $(this).offset().top;

            if(everyToDocTop < newHeight){
                $('.side_nav li').eq($(this).index()).acOnly();
            }
        });
    });
    // 点击li到达对应楼层
    $('.side_nav li').click(function(){
       // $(this).acOnly();
        //$(document).unbind("scroll");

        $('html,body').animate({'scrollTop':$('.floor').eq($(this).index()).offset().top-20},1000);
    });
//----------------------------------------------------------------------
//每层楼的标题TAB切换
    $("#floor1 .title li").tabCard($("#floor1 .con_right"));
    $("#floor2 .title li").tabCard($("#floor2 .con_right"));
    $("#floor3 .title li").tabCard($("#floor3 .con_right"));
    $("#floor4 .title li").tabCard($("#floor4 .con_right"));
    $("#floor5 .title li").tabCard($("#floor5 .con_right"));
    $("#floor6 .title li").tabCard($("#floor6 .con_right"));
    $("#floor7 .title li").tabCard($("#floor7 .con_right"));
    $("#floor8 .title li").tabCard($("#floor8 .con_right"));
    $("#floor9 .title li").tabCard($("#floor9 .con_right"));
    $("#floor10 .title li").tabCard($("#floor10 .con_right"));
    $("#floor11 .title li").tabCard($("#floor11 .con_right"));
//----------------------------------------------------------------------
//回到顶部
    $(".side_last li").eq(0).click(function(){
        $("html,body").animate({"scrollTop":0},1000);
    });
//----------------------------------------------------------------------
    //banner右侧12格子
    var show = true;
    $('.has_menu').hover(function(){
            if (show) {
                $('.has_menu').addClass('active');
                $('.banner_nav_menu').addClass('moveToTop');
            }
        },
        function(){
            show = true;
        });
    // 点击X关闭菜单
    $('#banner_nav_btn').click(function(){
        $(this).parent().removeClass('moveToTop');
        $('.has_menu').removeClass('active');
        show = false;
    });
    // 激活对应大标题
    $('.has_menu').mouseover(function(){
        $(this).acOnly();
        $('.banner_nav_menu_cont_list').eq($(this).index()).acOnly();
    });
    // 激活小标题对应内容块
    $('.banner_nav_menu').on('mouseover','li',function(){
        $(this).acOnly();
        $(this).parent().next().children('.banner_cont_mid_list').eq($(this).index()).acOnly();
    });
    // 显示价格
    $('.banner_nav_menu').on('change','select',function(){
        var pVal = ($(this).val())*1;
        if(pVal<300){
            $(this).next().html('¥ '+(pVal-2.0).toFixed(1)+' ~ '+'¥ '+(pVal-0.0).toFixed(1));
        }else{
            $(this).next().html('¥ '+(pVal-Math.random()*10-50).toFixed(1)+' ~ '+'¥ '+(pVal-Math.random()*20-30).toFixed(1));
        }
    });
//----------------------------------------------------------------------
// 激活主菜单
    $('.nav_list li').mouseenter(function(){
        $(this).acOnly();
        $('.popup>.section').eq($(this).index()).acOnly();
    });
    //移出菜单区隐藏
    $('.wrap').mouseleave(function(){
        $('.popup>.section').removeClass('ac');
        $('.nav_list li').removeClass('ac');
    });
//----------------------------------------------------------------------
    //header的nav二级菜单
    $('.mainNav>li').each(function() {//遍历
        var subMenu=$(this).children('ul').length;//声明子节点有ul

        if(subMenu){//判断是否有
            $(this).children('ul').addClass('subMenu');
        }
    });
    $('.mainNav>li').hover(function(){
            $(this).children('ul').show();
        },
        function(){
            $(this).children('ul').hide();
        }
    );
//----------------------------------------------------------------------
// 搜索的autocomplete
    var resource = ['小米电脑','苹果手机','华为手机','苹果电脑','小米手机','DELL电脑','智能手环','智能手表','智能机器人','男士T恤','男士裤子','男士运动鞋','男士钱包','女士皮包','女士上衣','女士化妆品','女士裙子'];
    $('.search_txt').autocomplete({
        source: resource
    });
})(jQuery);

