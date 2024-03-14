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
link.forEach(b => b.addEventListener('mousemove', animateit, { passive: true }));
link.forEach(b => b.addEventListener('mouseleave', animateit, { passive: true }));
window.addEventListener('mousemove', editCursor, { passive: true });
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
window.addEventListener('touchmove', editCursor, { passive: true });
const section_box = document.querySelector('.section-box');
section_box.addEventListener('touchstart', { passive: true }, function (event) {
    $(".diamond-square").css("display", "block");
    $("body").css("cursor", "none");
});
section_box.addEventListener('touchend', { passive: true }, function (event) {
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
    var video = document.getElementById("video-player");
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

// const submitNewsletterForm1 = (event) => {
//     event.preventDefault();
//     event.stopPropagation();

//     const form = document.getElementById("zcampaignOptinForm");
//     const formData = new FormData(form);

//     fetch("https://zymul-zgpm.maillist-manage.com/weboptin.zc", {
//         method: "POST",
//         body: formData
//     })
//         .then(data => {
//             if (data.status === 200) {
//                 document.getElementById("Zc_SignupSuccess").style.display = "block";
//                 const firstNameInput = document.getElementById('EMBED_FORM_EMAIL_LABEL');
//                 firstNameInput.value = '';
//                 setTimeout(function () {
//                     document.getElementById("Zc_SignupSuccess").style.display = "none";
//                 }, 6000);
//             } else {
//                 console.error("Form submission failed:", data.result.message);
//             }
//         })
//         .catch(error => {
//             console.error("Error submitting form:", error);
//         });
// }
// client section Next success story animation effect end