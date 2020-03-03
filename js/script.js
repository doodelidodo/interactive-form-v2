/*
    ”Job Role” section
    Include a text field that will be revealed when the "Other" option is selected from the "Job Role" drop down menu.
    Give the field an id of “other-title,” and add the placeholder text of "Your Job Role".
    Note: You'll need to add the "Other" job role input directly into the HTML and hide it initially with JS in order to get this feature to work when JS is disabled, which is a requirement below.
 */
const $otherTitle =$('#other-title');
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
