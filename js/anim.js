var mainLogo = document.getElementById("main-logo");
var mainBrand = document.getElementById("main-brand"),
    mainBrandFill = document.querySelectorAll("#main-brand path");
var mainLogoFill = document.querySelectorAll('#main-logo .st0'),
    mainLogoFillArrSize = mainLogoFill.length;
var mainDevice = document.getElementById("device"),
    mainDeviceBubble =  document.querySelectorAll("#device .device-bubble");
var mainNav = document.getElementById("navbar");
var heroText = document.querySelector(".hero-text");
var shadowTitle = document.querySelector(".shadow-title");
var footer = document.querySelector("footer");



var intervalTime = 1000;
var colorArr = ['DEEPPINK', 'CRIMSON', 'DARKORANGE', 'GOLD', 'GREENYELLOW', 'MEDIUMSPRINGGREEN', 'LIGHTSEAGREEN', 'DEEPSKYBLUE'];
var burstStartRadiusArr = [{90: 160}, {110: 170}, {130: 180}, {150: 200}];
var arrCount = 0;

new mojs.Burst({
    radius:   { 70: 150 },
    children: {
      fill:   'black',
  }
}).play();
TweenMax.to(mainLogo, 5, {width:"15%"});
var brandAnim = new Vivus('main-brand', {
            type: 'delayed',
            duration: 200,
            animTimingFunction: Vivus.EASE
        }).stop();

var mainTimeline = function(){
    for(var i = 0; i < mainLogoFillArrSize; i=i+1){
        mainLogoFill[i].style.fill = colorArr[arrCount];
    }    
    new mojs.Burst({
        radius:   burstStartRadiusArr[arrCount > 3 ? 3 : arrCount],
        children: {
          fill:   colorArr[arrCount],
      }
    }).play();
    arrCount = arrCount + 1;
    if(intervalTime > 400) intervalTime = intervalTime - 150;
    if(arrCount === colorArr.length - 1) brandAnim.play();
    if(arrCount === colorArr.length) TweenMax.to(mainBrandFill, 3, {fillOpacity:1.0});
    if(arrCount < colorArr.length) setTimeout(mainTimeline, intervalTime);
    else setTimeout(revealTimeline, 1000);
};

setTimeout(mainTimeline, intervalTime);

var moveXVal = window.innerWidth*2.6;
var moveYVal = window.innerHeight*0.7;
console.log(moveXVal);
var revealTimeline = function(){
    mainNav.style.display = 'flex';
    heroText.style.display = 'block';
    shadowTitle.style.display = 'block';
    footer.style.display = 'block';
    var tl = new TimelineLite();
    tl.to(mainBrand, 0.1, {scale: 0});
    tl.to(mainLogo, 3, {scale:50, rotation:85, x:"-="+moveXVal, y:"-="+moveYVal});
    tl.from(shadowTitle, 0.6, {opacity: 0}, "-=0.6");
    tl.to(device, 0.5, {opacity:1.0, y:"-=40"});
    for(var i = 0; i < mainDeviceBubble.length; i=i+1){
        console.log(mainDeviceBubble[i]);
        tl.from(mainDeviceBubble[i], 0.2, {scale: 0, opacity: 0}, "-=0.1");
    }
    tl.from(mainNav, 0.6, {opacity: 0});
    tl.from(heroText, 1, {opacity: 0}, "-=0.6");
    tl.from(footer, 1, {opacity: 0}, "-=1");
}

