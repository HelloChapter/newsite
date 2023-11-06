$(document).ready(function () {
    // Select box UI
    $("#scrollButton, #scrollButton2").click(function () {
        var nextSection = $(this).closest("section").next(".section-confident");
        $("html, body").animate({
            scrollTop: nextSection.offset().top - 60
        }, 1000);
    });

    $('.slider').on('init', function (event, slick) {
        story_animation();
    });
    
    // ----------------------------------------------------------------New Code----------------------------------------------------------------
    // swiper related JS --------------------------------
    var swiper;
    function isTouchDeviceBelowIpadPro() {
        return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    }
    function initializeSwiper() {
        const swiperDirection = isTouchDeviceBelowIpadPro() ? 'horizontal' : 'horizontal';
        // console.log(swiperDirection)
        swiper = new Swiper(".home-how-it-works-slider-swiper", {
            enabled: true,
            // direction: swiperDirection,
            slidesPerView: 1,
            parallax: false,
            spaceBetween: 50,
            effect: 'fade',
            autoHeight: true,
            fadeEffect: {
                crossFade: true
            },
            speed: 600,
        });
    }
    initializeSwiper();
    
    // adding event handlers for scroll event
    document.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    function handleScroll(event) {
        var sliderTop = $('.section-home-how-it-works-slider .slider-position-top');
        var sliderBottom = $('.section-home-how-it-works-slider .slider-position-bottom');

        sliderScrollAmount = (sliderBottom.offset().top - sliderTop.offset().top)/4;

        var scrollerArray = [];
        for(var i=0; i< 4; i++){
            scrollerArray.push(sliderTop.offset().top + (i*sliderScrollAmount));
        } 
        // update slider here conditionally
        if($(this).scrollTop() < scrollerArray[1]){
            swiper.slideTo(0);
        }else if($(this).scrollTop() > scrollerArray[1] && $(this).scrollTop() < scrollerArray[2]){
            swiper.slideTo(1);
        }else if($(this).scrollTop() > scrollerArray[2]){
            swiper.slideTo(2);
        }
    }
    // ----------------------------------------------------------------New Code----------------------------------------------------------------                                                 
    
    // ------------------------------------------------------------------Old Code

    // Create the progress bars container
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
        // used to programmatically update the slider slide
        swiper.slideTo(index);
    });
    swiper.on('slideChange', function () {
        updateProgressBars();
    });
    // how it works home-how-it-works-slider js end
});
// ready function end

// client section Next success story animation effect end