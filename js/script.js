/*
    ”Job Role” section
    Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
    Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
    Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
 */
const $otherTitle = $('#other-title');
$otherTitle.hide();

$('#title').on('change', function() {
    let selectedTitle = $(this).children("option:selected").val();
    if (selectedTitle === "other") {
        $otherTitle.show();
    } else {
        $otherTitle.hide();
    }
});

/*
”T-Shirt Info” section
Project Warm Up: Select and option elements are commonly found on web forms, but can be confusing to work with. For some helpful practice, check out the project Warm Up Selects and Options.
    Until a theme is selected from the “Design” menu, no color options appear in the “Color” drop down and the “Color” field reads “Please select a T-shirt theme”.
For the T-Shirt "Color" menu, after a user selects a theme, only display the color options that match the design selected in the "Design" menu.
    If the user selects "Theme - JS Puns" then the color menu should only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
If the user selects "Theme - I ♥ JS" then the color menu should only display "Tomato," "Steel Blue," and "Dim Grey."
When a new theme is selected from the "Design" menu, both the "Color" field and drop down menu is updated.

*/

const $design = $('#design');
const $colorsJSPuns = $('#colors-js-puns');
const $colors = $('#color option');
$colorsJSPuns.hide();


$design.on('change', function() {
  const $selectedOption = $(this).children("option:selected").val();
  let puns = $('#color option:contains("JS Puns")');
  let love = $('#color option:contains("♥")');
  $colors.hide();
  $colors.attr('selected', false);

  if($selectedOption === 'js puns' || $selectedOption === 'heart js') {
      $colorsJSPuns.show();
  } else {
      $colorsJSPuns.hide();
  }

  if($selectedOption === 'js puns') {
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
”Register for Activities” section
Project Warm Up: This section of the project, working with checkboxes, is one of the trickier parts of the project. For some helpful practice, check out the project Warm Up Checkboxes.
Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.
When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.
As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
 */


const $totalDiv = $('<div>Total: <span class="total"></span></div>');
const activities = $('.activities');
$(activities).append($totalDiv);
$($totalDiv).hide();

$('.activities input').on('change', function() {
    let totalAmount = 0;
    const name = $(this).attr('name');
    const dateTime = $(this).attr('data-day-and-time');
    const allCheckboxes = $('.activities input');


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
         if($(target).is(":checked")) {
             totalAmount +=  parseInt($(target).attr('data-cost'));
         }
    });

    if(totalAmount > 0) {
        $($totalDiv).show();
        $('.total').text('$' + totalAmount);
    } else {
        $($totalDiv).hide();
    }
});


/*
"Payment Info" section
Display payment sections based on the payment option chosen in the select menu.
The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.
When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.
When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.
NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.
 */

const payment = $('#payment');
$('#payment option:eq(0)').attr('disabled', true);
$(payment).val('credit-card');

$(payment).siblings('div').each(function() {
   if(!($(this).attr('id') === 'credit-card')) {
       $(this).hide();
   }
});

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

const errorRequired = "This field is required";
const errorNoNumber = "No Numbers allowed in this Field";
const errorMail = "This is not a valid mail address";
const errorCheckbox = "At least one activity has to be checked";
const errorCreditCard = "The number has to be between 13 and 16 digits long";
const errorZIP = "The ZIP has to be 5 digits long";
const errorCVV = "The CVV has to be 3 digits long";

const setErrorMessage = function(element, errorMessage, errorBorderElement = "") {
    $(element).text(errorMessage).css('display', 'inherit');
    if(errorBorderElement) {
        $(errorBorderElement).css('border-color', 'red');
    }
};

const setValidField = function(element, borderElement = "") {
    $(element).css('display', 'none');
    if(borderElement) {
        $(borderElement).css('border-color', 'green');
    }
};

function isValidUsername(username) {
    return /^[a-z ,.'-]+$/i.test(username);
}
function isValidEmail(email) {
    return /[^@]+@[^@]+\.[a-z]+/i.test(email);
}

function isValidCreditCardNumber(creditCardNumber) {
    return /^[0-9]{13,16}$/.test(creditCardNumber);
}

function isValidZIP(zip) {
    return /^[0-9]{5}$/.test(zip);
}

function isValidCVV(cvv) {
    return /^[0-9]{3}$/.test(cvv);
}

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



const validateName = () => {
    return validator($('#name'), errorNoNumber, isValidUsername);
};

const validateMail = () => {
    return validator($('#mail'), errorMail, isValidEmail);
};

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

const validateCreditCard = () => {
    return validator($('#cc-num'), errorCreditCard, isValidCreditCardNumber);
};

const validateZIP = () => {
    return validator($('#zip'), errorZIP, isValidZIP);
};

const validateCVV = () => {
    return validator($('#cvv'), errorCVV, isValidCVV);
};




$('#name').on('input blur', () => {
    validateName();
});

$('#mail').on('input blur', e => {
    validateMail();
});

$('.activities input').on('change', e => {
   validateActivities();
});

$('#cc-num').on('input blur', e => {
    validateCreditCard();
});

$('#zip').on('input blur', e => {
    validateZIP();
});

$('#cvv').on('input blur', e => {
    validateCVV();
});

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

