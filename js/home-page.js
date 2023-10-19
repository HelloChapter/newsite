
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
    var animationPath = './js/scroll-animation.json';
    var container = document.getElementById('scrollButton');
    // Load the Lottie animation
    var animation = lottie.loadAnimation({
        container: container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath
    });

    $("#scrollButton, #scrollButton2").click(function () {
        var nextSection = $(this).closest("section").next(".section-confident");
        $("html, body").animate({
            scrollTop: nextSection.offset().top - 60
        }, 1000);
    });

    // Home page client video

    // When the "Open Modal" button is clicked
    $('#openModal').click(function () {
        // create and append modal structure here.
        const docString = `
            <div id="client1-modal" class="modal modal-home-client-video">
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <button id="client1-btn-close" class="btn-styled-removed btn-close" data-dismiss="modal">
                            <img src="./images/icons/close-icon.svg" alt="icon" />
                        </button>
                    </div>
                    <div class="mid-content">
                        <div class="video-box">
                            <div id="player1"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const modalContainer = document.getElementById('clent1-modal-container');
        modalContainer.innerHTML = docString;

        // attach event handler for the rendered modal
        $(".modal-home-client-video .btn-close").on("click", function () {
            stopYouTubeVideo("modal1");
        });

        $('#client1-modal').css('display', 'flex');
        loadYouTubeVideo('EroEwFzupYI');
    });

    $('#openModal2').click(function () {
        // create and append modal structure here.
        const docString2 = `
            <div id="client2-modal" class="modal modal-home-client-video">
                <div class="modal-backdrop"></div>
                <div class="modal-content">
                    <div class="modal-header">
                        <button id="client1-btn-close" class="btn-styled-removed btn-close" data-dismiss="modal">
                            <img src="./images/icons/close-icon.svg" alt="icon" />
                        </button>
                    </div>
                    <div class="mid-content">
                        <div class="video-box">
                            <div id="player2"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        const modalContainer = document.getElementById('clent1-modal-container');
        modalContainer.innerHTML = docString2;

        // attach event handler for the rendered modal
        $(".modal-home-client-video .btn-close").on("click", function () {
            stopYouTubeVideo("modal2");
        });

        $('#client2-modal').css('display', 'flex');
        loadYouTubeVideo2('wmmtsXhlG0s');
    });


    $('.modal-home-client-video .btn-close, .modal-home-client-video').click(function () {
        $('#client1-modal, #client2-modal').css('display', 'none');
        stopYouTubeVideo();
    });

    // Prevent clicks inside the modal from closing it
    $('.modal-content').click(function (event) {
        event.stopPropagation();
    });

    // Load and control the YouTube video

    var queryParams = '?modestbranding=1&rel=0&showinfo=0&enablejsapi=1&start=0';

    function loadYouTubeVideo(videoId) {
        var videoUrl = 'https://www.youtube.com/embed/' + videoId + queryParams;
        new YT.Player('player1', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'playsinline': 1,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'iv_load_policy': 3
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
    function loadYouTubeVideo2(videoId) {
        var videoUrl = 'https://www.youtube.com/embed/' + videoId + queryParams;
        new YT.Player('player2', {
            height: '100%',
            width: '100%',
            videoId: videoId,
            playerVars: {
                'playsinline': 1,
                'modestbranding': 1,
                'rel': 0,
                'showinfo': 0,
                'iv_load_policy': 3
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }

    function onPlayerReady(event) {
        event.target.playVideo();
    }
    function stopYouTubeVideo(type) {
        if (type === 'modal1') {
            const client1Modal = document.getElementById('client1-modal');
            client1Modal.remove();
        } else if (type === 'modal2') {
            const client2Modal = document.getElementById('client2-modal');
            client2Modal.remove();
        }
    }
    function onPlayerStateChange(event) {
        // Handle video state changes here (e.g., pause, end)
        if (event.data === YT.PlayerState.PAUSED) {
        }
        if (event.data === YT.PlayerState.ENDED) {
        }
    }

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
                console.error("Failed to play video:", error.message);
            });
        } else {
            video.pause();
            $(this).addClass("video-played");
        }
    });

    // how it works slider js
    const section = document.getElementById("custom-swiper-slider");
    var swiper = new Swiper(".home-how-it-works-slider-swiper", {
        direction: "horizontal",
        slidesPerView: 1,
        parallax: false,
        spaceBetween: 50,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 600,
        mousewheel: {
            enabled: false,
            releaseOnEdges: true,
            sensitivity: 9,
        },

    });
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
            swiper.mousewheel.enable();
        } else {
            swiper.mousewheel.disable();
        }
    }

    window.addEventListener('scroll', function () {
        var section = document.querySelector('.home-how-it-works-slider-swiper');
        var sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 125) {
            toggleMousewheelControl(true);
        } else {
            toggleMousewheelControl(false);
        }
    });

    swiper.on("reachEnd", function () {
        toggleMousewheelControl(false);
        $(document).off("mousewheel");
    });

    swiper.on("fromEdge", function () {
        toggleMousewheelControl(true);
        $(document).on("mousewheel", function (e) {
            e.preventDefault();
            swiper.mousewheel.handleMousewheel(e);
        });
    });

    const viewport_height = document.querySelector('.custom-swiper-slider');
    function isScrolledIntoView(elem) {
        var docViewTop = $(window).scrollTop() + (window.innerWidth < 768 ? 92 : 114);
        //console.log(window.innerWidth < 768 ? 92 : 144);
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