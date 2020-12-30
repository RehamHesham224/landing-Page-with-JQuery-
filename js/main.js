// document.addEventListener('DOMContentLoaded', () => {
//     //the event occurred
//   })
  
$(document).ready(function(){
//crate Dynamic menu
function buildMenu(parent , items){
$(items).each(function(){
        var li='<li><a href="#" data-scroll="#'+$(this).attr('id')+'">'+$(this).attr("id")+'</a></li>';
    parent.html(parent.html()+li);
    
})
}
buildMenu($('#menu'),$('section'));

//smooth scroll
$("nav #menu li a").on("click",function(e){//
    e.preventDefault();
 $("body , html").animate({
    scrollTop : $($(this).data("scroll")).offset().top +1
 },1000)

});
//add class active and remove from siblings
$('#nav #menu li').on("click",' a',function(){//
    $(this).addClass('active').parent('li').siblings().find('a').removeClass('active');
    $($(this).data('scroll')).addClass('active').siblings('section').removeClass('active');
})
//fixed nav 
var prevScrollpos = $(window).scrollTop();
$(window).on('scroll',function(){
    //fixed nav ..scroll down=>hide , scroll up=>show
    
    var currentScrollPos = $(window).scrollTop();
    if (prevScrollpos < currentScrollPos ) {
        document.getElementById("nav").style.top = "-80px";//
    } else {
        document.getElementById("nav").style.top = "0";//
    }
    prevScrollpos = currentScrollPos;

     //sync number links on sections
    $('section').each(function(){
        if($(window).scrollTop()> $(this).offset().top){
            var sectionId=$(this).attr('id');
                $('#nav #menu li a').removeClass('active');
                $('#nav #menu li a[data-scroll ="'+sectionId+'"]').addClass('active');
                $(this).addClass('active').siblings('section').removeClass('active');
            
        }
    });
    //scroll to top button
    let scrollToTop=$(".scroll-to-top");
    if($(window).scrollTop()> 1000){
        if(scrollToTop.is(":hidden")){
            scrollToTop.fadeIn(400);
        }
        
    }else{
        scrollToTop.fadeOut(400);
    }
});


$(".scroll-to-top").on("click",function(event){
    event.preventDefault();
 $("body , html").animate({
    scrollTop : 0
 },1000);
});

//buttons with effects
$(".button-effects button").each(function(){
    $(this).prepend("<span></span>")
});
$(".from-left ").hover(function(){
    $(this).find("span").eq(0).animate({
        width:"100%"
    },300);
    $(this).find("span").eq(0).animate({
        width:0
    },300);
});


});
    //fixed nav ..scroll down=>hide , scroll up=>show with js

// var prevScrollpos = window.pageYOffset;
// window.onscroll = function() {
//   var currentScrollPos = window.pageYOffset;
//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("menu").style.top = "0";
//   } else {
//     document.getElementById("menu").style.top = "-80px";
//   }
//   prevScrollpos = currentScrollPos;
// }
// vars
'use strict'
var	testim = document.getElementById("Testimonial"),
	testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;

window.onload = function() {
    //hide spinner
    $('.spinner').delay(2000).fadeOut('slow');
    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;
            
            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
}

