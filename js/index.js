/**
 *
 */
(function(window,document,undefined){
    var hearts=[];
    var source=["var","const","function","default","break","RegExp","null","onclick","true","false","boolean","string","number","window","jquery","history"];
    window.requestAnimationFrame=(function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback){
                setTimeout(callback,1000/60);
            }
    })();
    init();
    function init(){
        attachEvent();
        gameloop();
    }
    function getRandomKeyword(){
        return source[Math.floor(Math.random()*source.length)];
    }
    function gameloop(){
        for(var i=0;i<hearts.length;i++){
            if(hearts[i].alpha<=0){
                document.body.removeChild(hearts[i].el);
                hearts.splice(i,1);
                continue;
            }
            hearts[i].y--;
            hearts[i].scale+=0.004;
            hearts[i].alpha-=0.013;
            css({
                left:hearts[i].x+"px",
                top:hearts[i].y+"px",
                opacity:hearts[i].alpha,
                transform:"scale("+hearts[i].scale+")translate(-50%,0)"
            },hearts[i].el);
        }
        requestAnimationFrame(gameloop);
    }
    function attachEvent(){
        var old=typeof window.onclick==="function"&&window.onclick;
        document.onclick=function(event){
            old&&old();
            createWord(event);
        }
    }
    function createWord(event){
        var d=document.createElement("div");
        hearts.push({
            el:d,
            x:event.clientX-5,
            y:event.clientY-5,
            scale:1,
            alpha:1,
            color:randomColor()
        });
        css({
            display:"inline-block",
            transform:"translate(-50%,0)",
            position:"fixed",
            zIndex:"99999999",
            color:randomColor(),
            fontSize:"14px"
        },d);
        d.innerHTML=getRandomKeyword();
        document.body.appendChild(d);
        d.onselectstart=function(){return false;}
    }
    function css(css,node){
        for(var index in css){
            if(css.hasOwnProperty(index)){
                node.style[index]=css[index];
            }
        }
    }
    function randomColor(){
        return "rgb("+(~~(Math.random()*255))+","+(~~(Math.random()*255))+","+(~~(Math.random()*255))+")";
    }
})(window,document);

//如果页面向下滚动>36px就把nav的margin-top去掉
(function(){
    window.onscroll=function(){
        //除IE678外的兼容写法
        if(window.pageYOffset>36){
            nav.style.marginTop="0";
        }else{
            nav.style.marginTop="36px";
        }
    }
})();

////为左侧滑出菜单添加按钮点击事件
//(function(){
//    //找到a按钮
//    console.log("1");
//    var a=document.querySelector(".menu");
//    //console.log(a);
//    a.onclick=function(){
//        //找到ul
//        var ul=document.querySelector("#left-side ul");
//        if(ul.className==""){
//            ul.className="active";
//        }else{
//            ul.className="";
//        }
//
//    };
//
//    //为ul中的a添加鼠标移入事件
//    $("#left-side li").on("mouseenter","a.active",function(){
//
//        $(this).removeClass("active").siblings().css({
//            left:0,
//            opacity:1
//        });
//
//    });
//
//    $("#left-side li").on("mouseleave","a",function(){
//        if(this.className==""){
//            $(this).css({
//                left:"40px",
//                opacity:0
//            }).siblings().addClass("active");
//        }
//    });
//
//})();


























