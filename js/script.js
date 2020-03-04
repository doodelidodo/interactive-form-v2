/*
    ”Job Role” section
    Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
    Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
    Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
 */
const $otherTitle = $('#other-title');
$otherTitle.hide();

$('#title').change(function() {
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





function showOrHideTip(show, element) {
    // show element when show is true, hide when false
    if (show) {
        element.style.display = "inherit";
    } else {
        element.style.display = "none";
    }
}

function createListener(validator) {
    return e => {
        const text = e.target.value;
        const valid = validator(text);
        const showTip = text !== "" && !valid;
        const tooltip = e.target.nextElementSibling;
        showOrHideTip(showTip, tooltip);
    };
}
