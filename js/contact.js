var isValid = true;
// default values
var postDataObject = {
	"firstName": "",
	"lastName": "",
  "email": "",
	"phoneNumber": "",
	"city": "",
	"zipCode": "",
}
// Email Validation
function isEmail(email) {
    return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)
}
// On input change
$(document).on("change", "input", (function(e) {
    if(e.target.value === ""){
      isValid=false;
      $(e.target).parent().addClass("error");
      return
    }else if(($(e.target).attr("name") === "email" && !isEmail(e.target.value))){
      isValid=false;
      $(e.target).parent().addClass("error");
      return
    }else if(($(e.target).attr("name") === "streetAddress" && e.target.value.length < 5)){
      isValid=false;
      $(e.target).parent().addClass("error");
      return
    }else if(((!/^[0-9]+$/.test(e.target.value) && $(e.target).attr("name") === "phone") || ($(e.target).attr("name") === "phone" && (e.target.value.length < 5 || e.target.value.length > 12 )))){
      isValid=false;
      $(e.target).parent().addClass("error");
      return
    }else {
      postDataObject[e.target.getAttribute("name")] = e.target.value;
      $(e.target).parent().removeClass("error");
      return
    }
}));
$(document).on("change", "select", (function(e) {
    postDataObject[e.target.getAttribute("name")] = e.target.value;
    $(e.target).parent().removeClass("error");
    return
}));
window.fbq('track', 'Contact', { value: 0, currency: 'USD' });
// Ajax function
function makeAjaxCall(url, type, crossDomain, dataObject, callback) {
    $.ajax({
        dataType: "json",
        url: url,
        type: type,
        data: dataObject,
        crossDomain: crossDomain,
        async: !1,
        success: function(result) {
            callback(result)
        },
        error: function(jqXHR, exception) {
            inputs.each(function(){
              $(this).attr("disabled", "false");
            })
            console.log(jqXHR.responseJSON.details)
        }
    })
}
// Redirect user on submit
function redirectToThankYou(){
    window.location.pathname = "/thank-you-message.html"
}
// Contact Submit 
function handleContactSubmit(e) {
    var inputs = $("#contact-form input");
    isValid = true;
    inputs.each((function() {
        if(this.value === ""){
          isValid=false;
          $(this).parent().addClass("error");
        }
        if(($(this).attr("name") === "email" && !isEmail(this.value))){
          isValid=false;
          $(this).parent().addClass("error");
        }
        if(($(this).attr("name") === "streetAddress" && this.value.length < 5)){
          isValid=false;
          $(this).parent().addClass("error");
        }
        if(((!/^[0-9]+$/.test(this.value) && $(this).attr("name") === "phone") || ($(this).attr("name") === "phone" && (this.value.length < 5 || this.value.length > 12 )))){
          isValid=false;
          $(this).parent().addClass("error");
        }
    }));
    if(isValid){
      inputs.each(function(){
        $(this).attr("disabled", "disabled");
      })
      makeAjaxCall("https://api.hellochapter.dev/api/contact/add", "POST", !0, postDataObject, redirectToThankYou);
    }
    
    // return false;
}