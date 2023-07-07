let selectedEmp = null;

jQuery(document).ready(function ($) {
    // Cookie code

    var jQueryScript = document.createElement('script');
    jQueryScript.setAttribute('src', 'https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js');
    document.head.appendChild(jQueryScript);
    //console.log(jQueryScript)
    function custom_cookie() {
        if (Cookies.get('HelloChapterContactPath') === undefined) {
            Cookies.set('HelloChapterContactPath', window.location.href, { expires: 30, path: '' })
        }

        if (window.location.pathname === '/contact-chapter-home-renovation/') {
            // Cookies.set('HelloChapterContactPath',window.location.href, { expires: 30, path: '' })
        }

    }
    setTimeout(custom_cookie, 1000);

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

    // About team click js

    $(".desktop-team-wrapper .team-image").click(function () {
        var current_item = $(this).attr("data-point-id");
        if ($(".team-clickable-content")[current_item].classList.contains('d-block')) {
            // just remove 'd-block' and add 'd-none' to all elements and return here
            $(".team-clickable-content").removeClass('d-block');
            $(".team-clickable-content").addClass('d-none');
            $(".col-team").removeClass("active-member");
            return false;
        }
        // check if div has class 'd-block'
        $(".team-clickable-content").removeClass('d-block');
        $(".team-clickable-content").addClass('d-none');

        $(".team-clickable-content")[current_item].classList.remove('d-none');
        $(".team-clickable-content")[current_item].classList.add('d-block');

        // if($(".col-team").classList.contains('active-member')){
        //     $(".col-team").removeClass("active-member");
        //     $(this).parent(".col-team").addClass("active-member");
        //     return false;
        // }
        $(".col-team").removeClass("active-member");
        $(this).parent(".col-team").addClass("active-member");
    });

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
        fade: true,
        cssEase: 'ease-in-out',

    });
    // Home slider end
    $('.after-before-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        speed: 1000,
        autoplaySpeed: 3000,
        dots: true,
        fade: true,
        cssEase: 'ease-in-out',
        draggable: false,
        swipeToSlide: false,
        touchMove: false,
        swipe: false,

    });
    // after-before-slider end
    $('.review-slider').slick({
        autoplay: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        speed: 10000,
        autoplaySpeed: 0,
        dots: false,
        centerMode: true,
        variableWidth: false,
        centerPadding: "250px",
        pauseOnHover: false,
        pauseOnFocus: false,
        draggable: false,
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
                    slidesToShow: 1,
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
        jQuery(this).parents(".col-location").toggleClass("hover-link");
    });

});
/*Ready function end*/
// After Before Js start

// $(".range-slider2").on("input change", (e2) => {
//     const sliderPos = e2.target.value;
//     // Update the width of the foreground image
//     $('.two-joint-images2 .foreground-img').css('width', `${sliderPos}%`)
//     // Update the position of the slider button
//     $('.two-joint-images2 .slider-button').css('left', `calc(${sliderPos}% - 28px)`)
// });
// $(".after-before-btn-wrap .before-btn").on("input click", (e) => {
//     const sliderPos = e.target.value;
//     // Update the width of the foreground image
//     $('.foreground-img').css('width', '100%')
//     // Update the position of the slider button
//     $('.slider-button').css('left', `calc(100% - 40px)`)
// });
// $(".two-joint-images1 .after-before-btn-wrap .after-btn").on("input click", (e) => {
//     const sliderPos = e.target.value;
//     // Update the width of the foreground image
//     $('.two-joint-images1 .foreground-img').css('width', '0%')
//     // Update the position of the slider button
//     $('.two-joint-images1 .slider-button').css('left', `calc(0px)`)
// });
// $(".two-joint-images2 .after-before-btn-wrap .before-btn").on("input click", (e) => {
//     const sliderPos = e.target.value;
//     // Update the width of the foreground image
//     $('.two-joint-images2 .foreground-img').css('width', '100%')
//     // Update the position of the slider button
//     $('.two-joint-images2 .slider-button').css('left', `calc(100% - 40px)`)
// });
// $(".two-joint-images2 .after-before-btn-wrap .after-btn").on("input click", (e) => {
//     const sliderPos = e.target.value;
//     // Update the width of the foreground image
//     $('.two-joint-images2 .foreground-img').css('width', '0%')
//     // Update the position of the slider button
//     $('.two-joint-images2 .slider-button').css('left', `calc(0px)`)
// });

// Js for global after before
// $(".range-slider").change(function (e) {
$('body').on('input change', '.range-slider', function (e) {
    const sliderPos = e.target.value;

    console.log("input change", +sliderPos);
    setTimeout(() => {
        // Update the width of the foreground image
        e.target.parentElement.parentElement.querySelector(".foreground-img").style['width'] = `${sliderPos}%`;
        // Update the position of the slider button
        e.target.parentElement.parentElement.querySelector(".slider-button").style['left'] = `calc(${sliderPos}% - 28px)`;
        // $(this).parents('.two-joint-images').children('.slider-button').css('left', `calc(${sliderPos}% - 28px)`)
    }, 0);
});
$(".after-before-btn-wrap .before-btn").click(function (e) {
    const sliderPos = e.target.value;
    // Update the width of the foreground image
    $(this).parents('.two-joint-images').find(".foreground-img").css('width', '100%');
    // Update the position of the slider button
    $(this).parents('.two-joint-images').find('.slider-button').css('left', `calc(100% - 40px)`);

});
$(".two-joint-images .after-before-btn-wrap .after-btn").click(function () {
    $(this).parents('.two-joint-images').find(".foreground-img").css('width', '0%');
    $(this).parents('.two-joint-images').find('.slider-button').css('left', `calc(0px)`);

});

  // After Before Js end