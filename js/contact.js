var isValid = true;
// default values
var postDataObject = {
  "firstName": "",
  "lastName": "",
  "email": "",
  "phoneNumber": "",
  "city": "",
  "zipCode": "",
  "projectDescription": "",
  "qr_status": false,
  "fbc": "",
  "fbp": "",
  "originalUrl": "",
  "recaptchaToken": "",
  "streetAddress": "",
}
// Email Validation
function isEmail(email) {
  return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
}
// On input change
$(document).on("change", "input, textarea", (function (e) {
  if (e.target.value === "") {
    isValid = false;
    $(e.target).parent().addClass("error");
    return
  } else if (($(e.target).attr("name") === "email" && !isEmail(e.target.value))) {
    isValid = false;
    $(e.target).parent().addClass("error");
    return
  }
  //  else if (($(e.target).attr("name") === "streetAddress" && e.target.value.length < 3)) {
  //   isValid = false;
  //   $(e.target).parent().addClass("error");
  //   return
  // }
  else if (($(e.target).attr("data-value") === "false")) {
    isValid = false;
    $(this).parent().addClass("error");
    return;
  }
  else if (((!/^[0-9]+$/.test(e.target.value) && $(e.target).attr("name") === "phoneNumber") || ($(e.target).attr("name") === "phoneNumber" && (e.target.value.length < 5 || e.target.value.length > 12)))) {
    isValid = false;
    $(e.target).parent().addClass("error");
    return
  } else {
    postDataObject[e.target.getAttribute("name")] = e.target.value;
    $(e.target).parent().removeClass("error");
    return
  }
}));
$(document).on("change", "select", (function (e) {
  postDataObject[e.target.getAttribute("name")] = e.target.value;
  $(e.target).parent().removeClass("error");
  return
}));
jQuery(document).ready(function ($) {
  Cookies.set('HelloChapterContactPath', window.location.href, { expires: 20, path: window.location.href });
  setTimeout(function () {
    window.scrollTo(0, 0);
  }, 100)
  var inputQuantity = [];
  $("#phoneNumber").on("keyup", function (e) {
    var $field = $(this);
    val = this.value;
    $thisIndex = parseInt($field.data("idx"), 10);
    if (this.validity && this.validity.badInput || isNaN(val) || $field.is(":invalid")) {
      this.value = inputQuantity[$thisIndex];
      return;
    }
    if (val.length > Number($field.attr("maxlength"))) {
      val = val.slice(0, 12);
      $field.val(val);
    }
    inputQuantity[$thisIndex] = val;
  });
});
/*Ready function end*/
setTimeout(() => {
  window.fbq('track', 'Contact', { value: 0, currency: 'USD' });
}, 2000);
var inputs = $("#contact-form input");
// Ajax function
function makeAjaxCall(url, type, crossDomain, dataObject, callback) {
  $.ajax({
    dataType: "json",
    url: url,
    type: type,
    data: dataObject,
    crossDomain: crossDomain,
    async: !1,
    success: function (result) {
      callback(result)
    },
    error: function (jqXHR, exception) {
      // describes what needs to happen if form submission failed
      inputs.each(function () {
        $(this).attr("disabled", "false");
      })
    }
  })
}
// Redirect user on submit
function redirectToThankYou() {
  if (localStorage.getItem("qr_status")) {
    localStorage.setItem("formSubmitted", true);
  }

  window.location.href = "/contact-chapter-home-renovation/?submit=true"
  var url_check = window.location.href;
  if (url_check === "/?submit=true" || url_check === "/") {
    $(".modal-contact-thank-you").addClass("modal-open");
}
  // if (url_check.includes("contact-chapter-home-renovation")) {
  //   $(".form-wrap").hide();
  //   $(".thank-you-content-wrap").show();
  //   var stickyHeaderHeight = 160;
  //   var offset = $('.thank-you-content-wrap').offset().top - stickyHeaderHeight;
  //   $('html, body').animate({
  //     scrollTop: offset
  //   }, 400);
  // }
}
// Contact Submit 
//code for back button pressed the form will reset
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    window.location.reload();
  }
  $('form').get(0).reset();
});

// reCaptcha callback function
function reCaptchaChallenge(siteToken) {
  // here we will remove the restriction added on submitting form.
  $(recaptcha_id).hide();
  postDataObject.recaptchaToken = siteToken;
}

var recaptcha_id = document.getElementById("recaptcha-error")
$(recaptcha_id).hide();
function submitForm(e) {
  // Read cookies parameter 
  const cookieValue_fbp = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_fbp="))
    ?.split("=")[1];
  const cookieValue_fbc = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_fbc="))
    ?.split("=")[1];
  const payload = {
    fbp: cookieValue_fbp,
    fbc: cookieValue_fbc
  }
  if (payload.fbc === undefined || payload.fbc === "") {
    payload.fbc = null;
  }
  if (payload.fbp === undefined || payload.fbp === "") {
    payload.fbp = null;
  }
  var inputs = $("#contact-form input");
  isValid = true;
  inputs.each((function () {
    // debugger;
    if (this.value === "") {
      isValid = false;
      $(this).parent().addClass("error");
    }
    if (($(this).attr("name") === "email" && !isEmail(this.value))) {
      isValid = false;
      $(this).parent().addClass("error");
    }
    if (($(this).attr("data-value") === "false")) {
      isValid = false;
      $(this).parent().addClass("error");
    }
    if ($(this).attr("data-place-id") === "") {
      isValid = false;
      $(this).parent().addClass("error");
    }
    if (((!/^[0-9]+$/.test(this.value) && $(this).attr("name") === "phoneNumber") || ($(this).attr("name") === "phoneNumber" && (this.value.length < 5 || this.value.length > 12)))) {
      isValid = false;
      $(this).parent().addClass("error");
    }
  }));
  if ($("textarea[name='projectDescription']").val() === "") {
    $("textarea[name='projectDescription']").parent().addClass("error");
    return false;
  }

  // Handle reCAPTCHA not verified  
  // if (postDataObject.recaptchaToken === undefined || postDataObject.recaptchaToken === "") {
  //   $(recaptcha_id).show();
  //   return false;
  // }
  if (isValid) {
    var emailElement = document.getElementById('contact-email-field-id');
    //console.log("emailElement1");
    if (emailElement) {
      localStorage.setItem('Contactemail', emailElement.value);
      emailElement.setAttribute("data-email", emailElement.value);
    }
    $('#loader-spinner').show();
    $('#loader-spinner svg').show();
    // $('#contact-form-submit-label').hide();
    // $('#loader-spinner-label').show();
    $('#submit').addClass("loading-data");
   // debugger;

    inputs.each(function () {
      $(this).attr("disabled", "disabled");
    })
    // QR code form submitted 
    if (localStorage.getItem("qr_status") && (localStorage.getItem("formSubmitted") === 'false')) {
      postDataObject.qr_status = true
    } else {
      postDataObject.qr_status = false
    }
    postDataObject.fbc = payload.fbc;
    postDataObject.fbp = payload.fbp;
    // postDataObject.city = city;
    // postDataObject.state = state;
    // postDataObject.zipCode = postalCode;
    // get url 

    postDataObject.originalUrl = Cookies.get('HelloChapterContactPath');

    grecaptcha.ready(function () {
      grecaptcha.execute('6LfrUnEpAAAAAOSgJLs2oDMX2d41b4hDl9uM8QNk', { action: 'submit' })
        .then(function (token) {
          // add generated token to the post data object
          postDataObject.recaptchaToken = token;
          setTimeout(function () {
            makeAjaxCall("https://api.hellochapter.com/api/contact/add", "POST", !0, postDataObject, redirectToThankYou);
            // makeAjaxCall(" ", "POST", !0, postDataObject, redirectToThankYou);
          }, 500);

        })
        .catch(err => {
          // recaptcha token not generated.
          // reset form ??
          // console.log(err);
        });
    });
  }
  else {
    $('#loader-spinner').hide();
    // $('#loader-spinner-label').hide();
    // $('#contact-form-submit-label').show();
    $('#submit').removeClass("loading-data");
  }
  // return false;
}