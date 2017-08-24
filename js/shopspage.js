/**
 * Created by toby on 2017/7/8.
 */
;(function($){
//放大镜
    var oSpan=$(".magnifier");
    $(".sa_l_p_p").mousemove(function(ev){
        oSpan.show();
        $(".preview").show();
        var l=ev.pageX-$(this).offset().left-oSpan.width()/2;
        var t=ev.pageY-$(this).offset().top-oSpan.height()/2;
        var clientHeight=$(this).height();//图片最大高
        var clientWidth=$(this).width();//图片最大宽
        if(l<0){
            l=0;//l=0相当于贴左边
        }
        if(t<0){
            t=0;//t=0相当于贴上边
        }
        if(l>clientWidth- oSpan.outerWidth()){
            l=clientWidth- oSpan.outerWidth();
        }
        if(t>clientHeight- oSpan.outerHeight()){
            t=clientHeight- oSpan.outerHeight();
        }
        oSpan.css({"left":l,"top":t});
        $(".big_pic").css({"left":-l*2,"top":-t*2})
    });
    $(".sa_l_p_p").mouseleave(function(){
        oSpan.hide();
        $(".preview").hide();
    });
//----------------------------------------------------------------------
//鼠标悬浮小图激活对应大图
    $('.sa_pic_list li').mouseenter(function(){
        $(this).acOnly();
        var _this = $(this);
        var oLink = $(this).find('img').prop('src');
        $('.sa_l_pic .small_pic').prop('src',oLink);     //将小图地址复制给大图
        $('.sa_l_pic .big_pic').prop('src','images/s'+(_this.index()+1)+'_big.jpg');
    });
//----------------------------------------------------------------------
//放大镜小图左右切换
    $(".sa_pic_list_box_big .prevBtn").click(function(){
        $(".sa_pic_list").css("left","0px");
    });
    $(".sa_pic_list_box_big .nextBtn").click(function(){
        $(".sa_pic_list").css("left","-124px");
    });
//----------------------------------------------------------------------
//选择地址
    $('.address_choice').hover(
        function(){
            $(this).children('.address_list').show();
        },
        function(){
            $(this).children('.address_list').hide();
        });
    //点击li导航激活对应导航栏及内容区域
    //存储地址数组
    var addressArr = [];
    $('#address_list li').click(function(){
        $(this).acOnly();
        $('#address_cont>div').eq($(this).index()).acOnly();
    });
    $('#address_cont').on('click','dd',function(){
        //获取索引及点击的
        var n = $(this).parent().parent().index();
        var val = $(this).html();
        addressArr.push(val);    //将值并放到数组中
        $('#address_list li').eq(n).html(val);   //将赋值给导航
        //内容及导航点击切换
        $('#address_cont>div').eq(n+1).acOnly();
        $('#address_list li').eq(n+1).acOnly();
        //替换数组对应地址
        addressArr.splice(n,n+1,val);
        if(n==2){
            $('#address_list').hide();
            $('.address_choice span').html(adressArr.join(' '));
        }
    });
//----------------------------------------------------------------------
    //切换商品版本
    $('.sa_version').on('click','.square',function(ev){
        $(this).acOnly();
        var oPrice = 0;
        $('.sa_version .square').each(function(i){
            var oMsg = parseInt($('.sa_version .ac').eq(i).attr('data-price'));    //商品价格

            if (oMsg) {
                oPrice += oMsg;     //获取总价
            }
        });
        $('.sa_r_price_area .sa_price').html(oPrice.toFixed(2));    //展示总价
        //商品价格置换
        if($(this).hasClass('ver_price')){
            var oVerPrice =  $(this).attr('data-price');
            var oVerMsg = $(this).find(".sa_cc").html();

            $('#recommend_price').html(oVerPrice);
            $('#ver_pic').attr('data-price',oVerPrice);
            $('.sa_title_cc').html(oVerMsg)
        }
    });
//----------------------------------------------------------------------
    //加入购物车商品数量
    $('#join_car').on('click','span,#join_btn',function(){
        //商品数量
        var num = parseInt($('#join_car input').val());
        //数量增加
        if ($(this).hasClass('plus')) {
            $('#join_car input').val(++num);
            set(num);
        }
        //数量递减
        if ($(this).hasClass('sub')) {
            //数量为1时空大递减按钮样式
            if (num == 1) {
                set(num);
                return;
            }
            //正常情况递减并设置num
            $('#join_car input').val(--num);
            set(num);
        }
        //加入购物车
        if($(this).hasClass('join_btn')){
            if (confirm('是否加入购物车？')) {
                alert('恭喜，已将商品成功加入购物车！！')
            }
        }
        //数量递减样式
        function set(num){ //num：商品数量
            var cstyle = num == 1 ? 'not-allowed' : 'pointer';
            $('#join_car .sub').css('cursor',cstyle);
        }
    });
    //计算推荐区的总价
    $('#recommend_cont_list input').click(function(){
        var recommend_tatol = 0;
        var n = 0;
        $('#recommend_cont_list input').each(function(){
            var r_price = $(this).attr('data-price')*1;
            if($(this).prop('checked')){
                recommend_tatol += r_price;
                n++;
            }
        });
        var html = (recommend_tatol+$('#ver_pic').attr('data-price')*1).toFixed(2);
        $('#recommend_price').html(html);
        $('#recommend_num').html(n);
    });
//----------------------------------------------------------------------
    //推荐区域选项卡
    $('.recommend_nav li').tabCard($('.recommend_cont .recommend_list'));
//----------------------------------------------------------------------
    //商品介绍区域选项卡
    $('.psm_nav li').tabCard($('.psm_cont>div'));
})(jQuery);