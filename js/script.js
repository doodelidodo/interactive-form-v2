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
    }
});



/*
    init
 */


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
