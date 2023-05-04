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
  "qr_status":false,
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
  } else if (($(e.target).attr("name") === "streetAddress" && e.target.value.length < 5)) {
    isValid = false;
    $(e.target).parent().addClass("error");
    return
  } else if (((!/^[0-9]+$/.test(e.target.value) && $(e.target).attr("name") === "phoneNumber") || ($(e.target).attr("name") === "phoneNumber" && (e.target.value.length < 5 || e.target.value.length > 12)))) {
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
window.fbq('track', 'Contact', { value: 0, currency: 'USD' });
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
      inputs.each(function () {
        $(this).attr("disabled", "false");
      })
    }
  })
}
// Redirect user on submit
function redirectToThankYou() {
  if(localStorage.getItem("qr_status")){
    localStorage.setItem("formSubmitted",true);
  }
  window.location.pathname = "/thank-you-message/"
}
// Contact Submit 
function handleContactSubmit(e) {


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
    fbp:cookieValue_fbp,
    fbc:cookieValue_fbc
  }

  console.log(payload,118)


  var inputs = $("#contact-form input");
  isValid = true;
  inputs.each((function () {
    if (this.value === "") {
      isValid = false;
      $(this).parent().addClass("error");
    }
    if (($(this).attr("name") === "email" && !isEmail(this.value))) {
      isValid = false;
      $(this).parent().addClass("error");
    }
    if (($(this).attr("name") === "streetAddress" && this.value.length < 5)) {
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
  if (isValid) {
    $('#loader').show();
    inputs.each(function () {
      $(this).attr("disabled", "disabled");
    })
    // console.log(postDataObject)
    // window.gtag('event', 'conversion', {'send_to': 'AW-10883092413/R16jCK7357kDEL2fu8Uo'});
    
    // QR code status 
    // if(localStorage.getItem("qr_status")){
    //   postDataObject.qr_status = true 
    // }else {
    //   postDataObject.qr_status = false
    // }

   // all user 
    // if(localStorage.getItem("formSubmitted")){
    //   postDataObject.formSubmitted = true
    // }else{
    //   postDataObject.formSubmitted = false
    // }

    // QR code form submitted 
    
    if(localStorage.getItem("qr_status") && (localStorage.getItem("formSubmitted") === 'false')){  
      postDataObject.qr_status = true
    }else {
      postDataObject.qr_status = false 
    }

    

    setTimeout(function(){
        makeAjaxCall("https://api.hellochapter.dev/api/contact/add", "POST", !0, postDataObject, redirectToThankYou);
    }, 500)
    
    //makeAjaxCall("", "POST", !0, postDataObject, redirectToThankYou);
  }

  // return false;
}