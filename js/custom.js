jQuery(document).ready(function ($) {
    // Header sticky
    jQuery(window).scroll(function () {
        var scroll = jQuery(window).scrollTop();
        if (scroll >= 15) {
            jQuery("body").addClass("header-sticky");
        } else {
            jQuery("body").removeClass("header-sticky");
        }
    });
    count_box = $('.count-box');
    if (count_box.length) {
        var intTotalHeight = count_box.offset().top;
    }

    $(window).scroll(function () {
        if ($(this).scrollTop() >= intTotalHeight) {
            $('.count-number').each(function () {
                var $this = $(this), countTo = $this.attr('data-count');
                $({ countNum: $this.text() }).animate({ countNum: countTo },
                    {
                        duration: 1500, easing: 'linear', step: function () { $this.text(Math.floor(this.countNum)); },
                        complete: function () { $this.text(this.countNum); }
                    });
            });
        }
    });
    // Counter number js end
    $(".menu-btn-toggle").click(function () {
        $("body").toggleClass("header-open");
    });
    $(".accordion .card .card-content").css(
        "display",
        "none"
    );
    //$(".accordion .card:first-of-type .card-title button").addClass("active-btn");

    $(".accordion .card-title button").click(function () {
        $(".active-btn")
            .not(this)
            .removeClass("active-btn")
            .parent()
            .next()
            .slideUp(300);
        $(this).toggleClass("active-btn").parent().next().slideToggle(300);
    });
    // accordion js end
    $('.home-image-content-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        speed: 800,
        autoplaySpeed: 3000,
        dots: false,

    });
    // Home slider end
    $('.review-slider').slick({
        infinite: true,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        speed: 10000,
        autoplaySpeed: 0,
        dots: false,
        centerMode: true,
        variableWidth: false,
        centerPadding: "250px",
        asNavFor: '.slider-nav',
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    centerPadding: '150px',
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '40px',
                    slidesToShow: 2,
                }
            }
        ]
    });
    $('.slider-nav').slick({
        asNavFor: '.review-slider',
        infinite: true,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        speed: 10000,
        autoplaySpeed: 0,
        dots: false,
        centerMode: true,
        variableWidth: false,
        centerPadding: "250px",
        cssEase: 'linear',
        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    centerPadding: '150px',
                    slidesToShow: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    centerPadding: '40px',
                    slidesToShow: 2,
                }
            }
        ]
    });
    // Review slider end
    AOS.init({
        duration: 1200,
    });
    // Aos Animate
    jQuery(".location-link-hover").hover(function () {
        jQuery(this).parents(".col-location").toggleClass("hover-");
    });
    
});
/*Ready function end*/
// After Before Js start
$(".range-slider1").on("input change", (e)=>{
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $('.two-joint-images1 .foreground-img').css('width', `${sliderPos}%`)
    // Update the position of the slider button
    $('.two-joint-images1 .slider-button').css('left', `calc(${sliderPos}% - 28px)`)
  });
  $(".range-slider2").on("input change", (e2)=>{
    const sliderPos = e2.target.value;
    // Update the width of the foreground image
    $('.two-joint-images2 .foreground-img').css('width', `${sliderPos}%`)
    // Update the position of the slider button
    $('.two-joint-images2 .slider-button').css('left', `calc(${sliderPos}% - 28px)`)
  });
  $(".after-before-btn-wrap .before-btn").on("input click", (e)=>{
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $('.foreground-img').css('width', '100%')
    // Update the position of the slider button
    $('.slider-button').css('left', `calc(100% - 40px)`)
  });
  $(".two-joint-images1 .after-before-btn-wrap .after-btn").on("input click", (e)=>{
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $('.two-joint-images1 .foreground-img').css('width', '0%')
    // Update the position of the slider button
    $('.two-joint-images1 .slider-button').css('left', `calc(0px)`)
  });
  $(".two-joint-images2 .after-before-btn-wrap .before-btn").on("input click", (e)=>{
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $('.two-joint-images2 .foreground-img').css('width', '100%')
    // Update the position of the slider button
    $('.two-joint-images2 .slider-button').css('left', `calc(100% - 40px)`)
  });
  $(".two-joint-images2 .after-before-btn-wrap .after-btn").on("input click", (e)=>{
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $('.two-joint-images2 .foreground-img').css('width', '0%')
    // Update the position of the slider button
    $('.two-joint-images2 .slider-button').css('left', `calc(0px)`)
  });
  // After Before Js end