
/*
When other job title has been chosen, show a text input field
 */

const otherTitle = $('#other-title');
otherTitle.hide();

$('#title').on('change', function() {
    let selectedTitle = $(this).children("option:selected").val();
    if (selectedTitle === "other") {
        otherTitle.show();
    } else {
        otherTitle.hide();
    }
});

//set color variables
const design = $('#design');
const colorsJSPuns = $('#colors-js-puns');
const colors = $('#color option');

//hide the color section
colorsJSPuns.hide();

//Hide color options and unselect the option
const setColors = function(element) {
    element.hide();
    element.attr('selected', false);
};

/*
design listener by change
show only the colors, which the design has in stock
*/

design.on('change', function() {
  const selectedOption = $(this).children("option:selected").val();
  let puns = $('#color option:contains("JS Puns")');
  let love = $('#color option:contains("♥")');
  setColors(colors);

  //show or hide the color div
  if(selectedOption === 'js puns' || selectedOption === 'heart js') {
      colorsJSPuns.show();
  } else {
      colorsJSPuns.hide();
  }

  //show the correct color options and set the first entry as selected
  if(selectedOption === 'js puns') {
      $(puns).each(function(index) {

          $(this).show();
          if(index === 0) {
              $(this).attr('selected','selected');
          }
      });
  } else {
      $(love).each(function(index) {
          $(this).show();
          if(index === 0) {
              $(this).attr('selected','selected');
          }
      });
  }
});


/*
create div for total cost
append it at the end in activities
 */
const $totalDiv = $('<div>Total: <span class="total"></span></div>');
const activities = $('.activities');
$(activities).append($totalDiv);
$($totalDiv).hide();


/*
event listener on change when a activity is selected
 */
$('.activities input').on('change', function() {
    let totalAmount = 0;
    const name = $(this).attr('name');
    const dateTime = $(this).attr('data-day-and-time');
    const allCheckboxes = $('.activities input');

    /**
    * Iterates over all checkboxes when a checkbox is checked
    *  When date-day-and-time equals the checked checkbox, disable the checkbox and set a css class
     *  else
    * */
    allCheckboxes.each(function() {
         let target = this;
         let targetName = $(target).attr('name');
         let targetDateTime = $(target).attr('data-day-and-time');
         if(!(targetName === name)) {
             if(dateTime === targetDateTime) {
                 $(target).attr('disabled', (_, val) => !val);
                 $(target).parent().toggleClass('activities-disabled');
             }
         }
         //if checkbox checked, add data-cost to totalAmount
         if($(target).is(":checked")) {
             totalAmount +=  parseInt($(target).attr('data-cost'));
         }
    });

    // if Amount > 0 show the total div
    if(totalAmount > 0) {
        $($totalDiv).show();
        $('.total').text('$' + totalAmount);
    } else {
        $($totalDiv).hide();
    }
});


/*
Set the first payment Method entry to disabled and select the payment option 'credit-card'
 */
const payment = $('#payment');
$('#payment option:eq(0)').attr('disabled', true);
$(payment).val('credit-card');


//hide all other payment options
$(payment).siblings('div').each(function() {
   if(!($(this).attr('id') === 'credit-card')) {
       $(this).hide();
   }
});

/*
Event listener on payment by change.
show only the payment option you have chosen and hide the other
* */

$(payment).on('change', function() {
    let paymentOption = $(this).children("option:selected").val();

    $(payment).siblings('div').each(function() {
            $(this).hide();
    });

    $(payment).siblings('div').each(function() {
        if(paymentOption === $(this).attr('id')) {
            $(this).show();
        }
    });
});


// Error messages
const errorRequired = "This field is required";
const errorNoNumber = "No Numbers allowed in this Field";
const errorMail = "This is not a valid mail address";
const errorCheckbox = "At least one activity has to be checked";
const errorCreditCard = "The number has to be between 13 and 16 digits long";
const errorZIP = "The ZIP has to be 5 digits long";
const errorCVV = "The CVV has to be 3 digits long";

/*
* setErrorMessage
* param1: element
* param2: errorMessage
* param3: errorBorderElement (optional)
*
* Show error message with error message given
* if BorderElement true, set border color to red
* */
const setErrorMessage = function(element, errorMessage, errorBorderElement = "") {
    $(element).text(errorMessage).css('display', 'inherit');
    if(errorBorderElement) {
        $(errorBorderElement).css('border-color', 'red');
    }
};


/*
* setValidField
* param1: element
* param2: errorBorderElement (optional)
*
* hide error message
* if BorderElement true, set border color to green
* */
const setValidField = function(element, borderElement = "") {
    $(element).css('display', 'none');
    if(borderElement) {
        $(borderElement).css('border-color', 'green');
    }
};

//validate the name. only a-z and some special characters are allowed
function isValidUsername(username) {
    return /^[a-z ,.'-]+$/i.test(username);
}

//validates an email
function isValidEmail(email) {
    return /[^@]+@[^@]+\.[a-z]+/i.test(email);
}

//validates a creditnumber. only digits and the length must be between 13 and 16
function isValidCreditCardNumber(creditCardNumber) {
    return /^[0-9]{13,16}$/.test(creditCardNumber);
}

//validates a ZIP. It has to be digits the length has to be 5 digits long
function isValidZIP(zip) {
    return /^[0-9]{5}$/.test(zip);
}

//validates a CVV. It has to be digits the length has to be 3 digits long
function isValidCVV(cvv) {
    return /^[0-9]{3}$/.test(cvv);
}


/*
validator
param1: element
param3: errorCode
param4 validator

first checks if element is empty and set the error for that
second it checks if entry is wrong with the validator
for both sets the error message
else sets valid field
 */
const validator = function (element, errorCode, validator) {
    const valElement = $(element);
    const valElementValue = $(valElement).val();
    const valErrorSpan = $(valElement).next();
    const valid = validator(valElementValue);
    if(!valElementValue) {
        setErrorMessage(valErrorSpan, errorRequired, valElement);
        return false;
    } else if (!valid) {
        setErrorMessage(valErrorSpan, errorCode, valElement);
        return false;
    }else {
        setValidField(valErrorSpan, valElement);
        return true;
    }
};


//validator for Name
const validateName = () => {
    return validator($('#name'), errorNoNumber, isValidUsername);
};
//validator for Mail
const validateMail = () => {
    return validator($('#mail'), errorMail, isValidEmail);
};

/*
this function can't use the validator because it has another structure

validateActivities

checks, if one of the checkboxes is checked
if not set error message (no border)
else set validField
* */
const validateActivities = () => {
    const checkboxes = $('.activities input');
    const errorSpan = $('.activities .error-message');
    let totalCheckboxes = 0;
    $(checkboxes).each(function () {
        if($(this).is(":checked")) {
            totalCheckboxes += 1;
        }
    });
    if(totalCheckboxes === 0) {
        setErrorMessage(errorSpan, errorCheckbox);
        return false;
    } else {
        setValidField(errorSpan);
        return true;
    }
};

//validator for credit card
const validateCreditCard = () => {
    return validator($('#cc-num'), errorCreditCard, isValidCreditCardNumber);
};
//validator for zip
const validateZIP = () => {
    return validator($('#zip'), errorZIP, isValidZIP);
};

//validator for cvv
const validateCVV = () => {
    return validator($('#cvv'), errorCVV, isValidCVV);
};



//event listener for name
$('#name').on('input blur', () => {
    validateName();
});

//event listener for mail
$('#mail').on('input blur', e => {
    validateMail();
});

//event listener for activities
$('.activities input').on('change', e => {
   validateActivities();
});

//event listener for credit card
$('#cc-num').on('input blur', e => {
    validateCreditCard();
});

//event listener for zip
$('#zip').on('input blur', e => {
    validateZIP();
});

//event listener for cvv
$('#cvv').on('input blur', e => {
    validateCVV();
});


/*
* validateForm
*
* if payment method is credit-card
* check all required input fields
* else not check the credit-card fields
*  */

const validateForm = () => {
    if( $('#payment').val() === "credit-card") {
        return validateMail() &&
        validateName() &&
        validateActivities()&&
        validateCreditCard() &&
        validateZIP()&&
        validateCVV();


    }else return validateMail() &&
        validateName() &&
        validateActivities();

};


/*
Event listener for the submit button

if formValidator returns true submit the form
else validate the form and show the error messages
 */
$('button').on('click', e => {
    e.preventDefault();
    if(validateForm()) {
        $('form').submit();
    } else {
        validateName();
        validateMail();
        validateActivities();
        if($('#payment').val() === "credit-card") {
            validateCreditCard();
            validateZIP();
            validateCVV();
        }
    }
});

