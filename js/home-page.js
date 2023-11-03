
// js for diamond shape
const link = document.querySelectorAll('.section-box-item');
const cursor = document.querySelector('.diamond-square');

const animateit = function (e) {
    const { offsetX: x, offsetY: y } = e,
        { offsetWidth: width, offsetHeight: height } = this,
        move = 25,
        xMove = x / width * (move * 2) - move,
        yMove = y / height * (move * 2) - move;
};

const editCursor = e => {
    const { clientX: x, clientY: y } = e;
    cursor.style.left = x + 'px';
    cursor.style.top = y + 'px';
};

link.forEach(b => b.addEventListener('mousemove', animateit));
link.forEach(b => b.addEventListener('mouseleave', animateit));
window.addEventListener('mousemove', editCursor);
$(".diamond-square").css("display", "none");

$(".section-confident .section-box").mouseenter(function () {
    $(".diamond-square").css("display", "block");
    $("body").css("cursor", "none");
});
$(".section-confident .section-box").mouseleave(function () {
    $("body").css("cursor", "inherit");
    $(".diamond-square").css("display", "none");
});


// Js for mobile devices
window.addEventListener('touchmove', editCursor);
const section_box = document.querySelector('.section-box');
section_box.addEventListener('touchstart', function (event) {
    $(".diamond-square").css("display", "block");
    $("body").css("cursor", "none");
});
section_box.addEventListener('touchend', function (event) {
    $("body").css("cursor", "inherit");
    $(".diamond-square").css("display", "none");
});
// Scroll down js
$(document).ready(function () {
    // Select box UI
    $('select').niceSelect();

    $("#scrollButton, #scrollButton2").click(function () {
        var nextSection = $(this).closest("section").next(".section-confident");
        $("html, body").animate({
            scrollTop: nextSection.offset().top - 60
        }, 1000);
    });

    $('.slider').on('init', function (event, slick) {
        story_animation();
    });

    // Js for intro section video
    var video = document.getElementById("video-player_html5_api");
    var playButton = document.getElementById("btn-play");
    $(playButton).on("click", function () {
        if (video.paused || video.ended) {
            $(this).removeClass("video-played");
            video.play().catch(function (error) {
                // console.error("Failed to play video:", error.message);
            });
        } else {
            video.pause();
            $(this).addClass("video-played");
        }
    });

    // how it works slider js
    var swiper;
    function isTouchDeviceBelowIpadPro() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        // const ipadProWidth = 1197;
        // return (
        //     'ontouchstart' in window && window.innerWidth < ipadProWidth
        // );
    }
    function initializeSwiper() {
        const swiperDirection = isTouchDeviceBelowIpadPro() ? 'vertical' : 'horizontal';
        // console.log(swiperDirection)
        swiper = new Swiper(".home-how-it-works-slider-swiper", {
            enabled: false,
            direction: swiperDirection,
            slidesPerView: 1,
            parallax: false,
            spaceBetween: 50,
            effect: 'fade',
            autoHeight: true,
            fadeEffect: {
                crossFade: true
            },
            speed: 600,
            mousewheel: {
                enabled: false,
                releaseOnEdges: true,
                sensitivity: 1,
                thresholdDelta: null,
                thresholdTime: null,
            }
        });
    }
    initializeSwiper();

    swiper.on("slideChangeTransitionStart", function () {
        $("body").addClass("is-swiper-animating");
        const isFirstSlide = swiper.isBeginning;
        if (isFirstSlide) {
            toggleMousewheelControl(true);
        }
    });
    swiper.on("slideChangeTransitionEnd", function () {
        $("body").removeClass("is-swiper-animating");
        const isLastSlide = swiper.isEnd;
        if (isLastSlide) {
            toggleMousewheelControl(true);
        }
    });

    // Function to enable/disable mousewheel control
    function toggleMousewheelControl(enable) {
        if (enable) {
            // console.log('ver')
            // swiper.direction = 'vertical'
            swiper.mousewheel.enable();
        } else {
            // swiper.direction = 'horizontal'
            swiper.mousewheel.disable();
        }

        // console.log(swiper)
    }
    // window.addEventListener('scroll', function () {
    //     var section = document.querySelector('.home-how-it-works-slider-swiper');
    //     var sectionTop = section.getBoundingClientRect().top;
    //     if (sectionTop <= 125) {
    //         toggleMousewheelControl(true);
    //     } else {
    //         toggleMousewheelControl(false);
    //     }
    // });
    function updateSectionTop() {
        // var section = document.querySelector('.home-how-it-works-slider-swiper');
        count_box = $('.section-home-how-it-works-slider .home-how-it-works-slider-position');
        // console.log("slider-position", count_box);
        if (count_box.length) {
            var intTotalHeight = count_box.offset().top;
            // console.log("count_box Height", intTotalHeight);
        }
        if (($(this).scrollTop()) >= intTotalHeight) {
            toggleMousewheelControl(true);
        } else {
            toggleMousewheelControl(false);
            // console.log("Current", $(this).scrollTop());

            $(document).off("mousewheel");
        }
        // var sectionTop = section.getBoundingClientRect().top;
        // if ((window.innerWidth > 1023) && (sectionTop <= 125)) {
        //     toggleMousewheelControl(true);
        // } else {
        //     toggleMousewheelControl(false);
        // }
    }

    window.addEventListener('scroll', updateSectionTop);
    window.addEventListener('resize', updateSectionTop);

    function handleTouchStart(evt) {
        const firstTouch = getTouches(evt)[0];                                      
        xDown = firstTouch.clientX;                                      
        yDown = firstTouch.clientY;                                      
    }; 

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }
    
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;
    
        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        count_box = $('.section-home-how-it-works-slider .home-how-it-works-slider-position');
        if (count_box.length) {
            var intTotalHeight = count_box.offset().top;
            // console.log("count_box Height", intTotalHeight);
        }
        if (($(this).scrollTop()) != intTotalHeight){
            // do nothing
            return false
        }

        // go beyond this only if above is all good


        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
            if ( xDiff > 0 ) {
                /* right swipe */ 
            } else {
                /* left swipe */
            }                       
        } else {
            if(yDiff<0){
                // debugger;
            }
            var scrollHeight = $('.home-how-it-works-slider-swiper .slider-item').height() * 3;
            if ( yDiff > 0 ) {
                if(swiper?.activeIndex===2){
                    console.log(swiper)
                    // set page scroll to +100
                    window.scrollBy(0, scrollHeight);
                    // debugger;
                }
                /* down swipe */ 
            } else if(yDiff<0) { 
                // debugger
                if(swiper?.activeIndex===0){
                    console.log(swiper)
                    // set page scroll to -100
                    window.scrollTo(0, scrollHeight*(-1));
                    // debugger;
                }
            }                                                                 
        }
    }
     document.addEventListener('touchmove', handleTouchMove, false);
     document.addEventListener('touchstart', handleTouchStart, false);        

     var xDown = null;                                                        
     var yDown = null;
     
     function getTouches(evt) {
       return evt.touches ||             // browser API
              evt.originalEvent.touches; // jQuery
     }                                                     
        
    swiper.on("transitionEnd", function () {
        if (swiper.isEnd) {
            $(document).off("mousewheel");
            toggleMousewheelControl(false);
        }
    });

    swiper.on("transitionStart", function () {
        if (swiper.isBeginning) {

        }
    });
   
    swiper.on("fromEdge", function () {
        toggleMousewheelControl(false);
        $("body").removeClass('custom-swiper-body');
        $(document).on("mousewheel", function (e) {
            e.preventDefault();
            swiper.mousewheel.handleMousewheel(e);
        });
    });

    const viewport_height = document.querySelector('.custom-swiper-slider');
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop() + (window.innerWidth < 1024 ? 92 : 114);
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + ($(elem).height() / 3);
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    window.addEventListener('resize', function (event) {
        animateOnScroll();
    }, true);

    function animateOnScroll() {
        $('.custom-swiper-slider').each(function () {
            if (isScrolledIntoView(this) === true) {
                $(".custom-swiper-slider").addClass('custom-swiper-animate-pause');
                swiper.enable();
            }
            else {
                $(".custom-swiper-slider").removeClass('custom-swiper-animate-pause');
                swiper.disable();
            }
        });
    }

    $(window).scroll(function () {
        animateOnScroll()
    });
    // Create the progress bars container
    var slider = $('.home-how-it-works-slider-swiper');
    var progressBarsContainer = $('.progress-bars');
    var totalSlides = swiper.slides.length;
    // Function to create and update progress bars
    function updateProgressBars() {
        var activeIndex = swiper.activeIndex + 1;
        progressBarsContainer.html('');
        for (var i = 0; i < totalSlides; i++) {
            var progressBar = $('<div class="progress-bar"></div>');
            if (i < activeIndex) {
                progressBar.addClass('active-progress-bar');
            }
            progressBarsContainer.append(progressBar);
        }
    }

    // Initial update of progress bars
    updateProgressBars();
    progressBarsContainer.on('click', '.progress-bar', function () {
        var index = $(this).index();
        swiper.slideTo(index);
    });
    swiper.on('slideChange', function () {
        updateProgressBars();
    });
    // how it works home-how-it-works-slider js end
});
// ready function end
var lastScrollTop = 0;
var delta = 3;

$(window).on('load', function () {
    story_animation();
    function story_animation() {
        setTimeout(function () {
            var textWrapper = document.querySelector('.btn-next-success-story .text-1');
            var subtexts = $('.btn-next-success-story .text-1').html();
            var subStrInEm = subtexts.match("<em>(.*)</em>");
            subtexts = subtexts.replace('/em', 'em');
            subtexts = subtexts.split('<em>');
            $('.btn-next-success-story .text-1').html('');
            var i, text2Length;
            text2Length = $('.btn-next-success-story .text-2').text();
            text2Length = text2Length.length;
            var delayTime = 30 * text2Length + 2000;
            for (i = 0; i < subtexts.length; ++i) {
                var str = subtexts[i].replace(/<(.|\n)*?>/g, '');
                if (subStrInEm != null && subtexts[i] == subStrInEm[1]) {
                    $('.btn-next-success-story .text-1').append(str.replace(/([^\x80-\xFF]|\w)/g, "<span class='button-label color'>$&</span>"));
                } else {
                    $('.btn-next-success-story .text-1').append(str.replace(/([^\x80-\xFF]|\w)/g, "<span class='button-label'>$&</span>"));
                }
            }
            $('.btn-next-success-story .text-1').css('opacity', 1);
            anime.timeline({ loop: true })
                .add({
                    targets: '.btn-next-success-story .text-1 .button-label',
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: 300,
                    delay: function (el, i) {
                        return 30 * (i + 1)
                    }
                }).add({
                    targets: '.btn-next-success-story .text-1',
                    opacity: 0,
                    duration: 900,
                    easing: "easeOutExpo",
                    delay: 900
                }).add({
                    targets: '.btn-next-success-story .text-1',
                    opacity: 0,
                    duration: delayTime,
                    easing: "easeOutExpo",
                    delay: 0
                });
        }, 100);

        setTimeout(function () {
            var textWrapper = document.querySelector('.btn-next-success-story .text-2');
            var subtexts = $('.btn-next-success-story .text-2').html();
            var subStrInEm = subtexts.match("<em>(.*)</em>");
            subtexts = subtexts.replace('/em', 'em');
            subtexts = subtexts.split('<em>');
            $('.btn-next-success-story .text-2').html('');
            var i, text1Length;
            text1Length = $('.btn-next-success-story .text-1').text();
            text1Length = text1Length.length;
            var delayTime = 30 * text1Length + 2000;
            for (i = 0; i < subtexts.length; ++i) {
                var str = subtexts[i].replace(/<(.|\n)*?>/g, '');
                if (subStrInEm != null && subtexts[i] == subStrInEm[1]) {
                    $('.btn-next-success-story .text-2').append(str.replace(/([^\x80-\xFF]|\w)/g, "<span class='button-label color'>$&</span>"));
                } else {
                    $('.btn-next-success-story .text-2').append(str.replace(/([^\x80-\xFF]|\w)/g, "<span class='button-label'>$&</span>"));
                }
            }
            $('.btn-next-success-story .text-2').css('opacity', 1);
            anime.timeline({ loop: true })
                .add({
                    targets: '.btn-next-success-story .text-2',
                    opacity: 1,
                    duration: delayTime,
                    easing: "easeOutExpo",
                    delay: 0
                })
                .add({
                    targets: '.btn-next-success-story .text-2 .button-label',
                    opacity: [0, 1],
                    easing: "easeInOutQuad",
                    duration: 300,
                    delay: function (el, i) {
                        return 30 * (i + 1)
                    }
                }).add({
                    targets: '.btn-next-success-story .text-2',
                    opacity: 0,
                    duration: 900,
                    easing: "easeOutExpo",
                    delay: 900
                });
        }, 100);
    }

});
// client section Next success story animation effect end