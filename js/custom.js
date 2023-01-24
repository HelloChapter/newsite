jQuery(document).ready(function ($) {
    // Header sticky
    jQuery(window).scroll(function () {
        var scroll = jQuery(window).scrollTop();
        if (scroll >= 20) {
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
        dots: true,

    });
    // Home slider end
    $('.review-slider').slick({
        infinite: true,
        autoplay:true,
        slidesToShow: 2,
        slidesToScroll: 2,
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
                breakpoint: 768,
                settings: {
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
        ]
    });
    $('.slider-nav').slick({
        asNavFor: '.review-slider',
        infinite: true,
        autoplay:true,
        slidesToShow: 2,
        slidesToScroll: 2,
        arrows: false,
        speed: 10000,
        autoplaySpeed: 0,
        dots: false,
        centerMode: true,
        variableWidth: false,
        centerPadding: "250px",
        cssEase: 'linear',
    });
    // Review slider end

});
/*Ready function end*/