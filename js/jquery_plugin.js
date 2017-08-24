/**
 * Created by hxsd on 2017/6/29.
 */
$.fn.extend({
    //轮播图
    //image-tab
    imgTab:function(opt){
        var def={//默认参数
          "autoPlay":true,
            "time":1000
        };
        var n_opt= $.extend(def,opt);//如果传参就覆盖默认参数
        return this.each(function(){//相当于return this;，传出去后才能让该方法在使用时能链式操作
            var _this=$(this);//解决下方函数中this指向的问题，重新var一个
            var i=0;
            var aBtn=$(this).find("ol li"); //找按钮
            var imgLi=$(this).find("ul li"); //找图片
            var timer=null;

            aBtn.click(function(){//点击
                var n=$(this).index();//记录下标
                i=n;
               //点击的li
               $(this).addClass("ac").siblings().removeClass("ac");
                imgLi.eq(n).show().siblings().hide();
            });
            if(n_opt.autoPlay){//判断有无传自动的参数
                function  run(){//自动
                   timer= setInterval(function(){
                        //i==aBtn.length-1?i=0:i++;//三元替代注释部分,因为++在最后结束的时候还会加1次所以要减去1，分开写不会出错。
                        aBtn.eq(i).addClass("ac").siblings().removeClass("ac");
                        imgLi.eq(i).show().siblings().hide();
                        i++;
                        if(i==aBtn.size() ){
                           i=0;
                        }
                    },n_opt.time);//时间参数
                }
               run();
                _this.hover(//鼠标移入移出停留效果
                    function(){
                        clearInterval(timer);
                    },
                    function(){
                        run();
                    }
                )
            }
            $(".prevBtn").click(function(){
                i--;
                aBtn.eq(i).addClass("ac").siblings().removeClass("ac");
                imgLi.eq(i).show().siblings().hide();
                if(i==0 ){
                    i=aBtn.size();
                }
            });
            $(".nextBtn").click(function(){
                aBtn.eq(i).addClass("ac").siblings().removeClass("ac");
                imgLi.eq(i).show().siblings().hide();
                i++;
                if(i==aBtn.size() ){
                    i=0;
                }
            });
        })
    },
//----------------------------------------------------------------------
//设置AC激活
    acOnly:function(){
        return this.each(function(){
            $(this).addClass('ac').siblings().removeClass('ac');
            })
        },
//----------------------------------------------------------------------
//选项卡
    tabCard:function(contObj){  //contObj:需要控制的内容区域  this:控制选项的元素
        return this.each(function(){
            $(this).mouseover(function(){
                //激活
                $(this).acOnly();
                contObj.eq($(this).index()).show().siblings().hide();
            });
        });
    }
});