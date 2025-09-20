$(document).ready(function() {
  let selectedRating = 0;
  $(".star-rating .fa-star").on("click", function() {
    selectedRating = $(this).data("index");
    $("#rating").val(selectedRating);
    $(".star-rating .fa-star").removeClass("checked");
    for (let i = 1; i <= selectedRating; i++) {
      $(".star-rating .fa-star[data-index='" + i + "']").addClass("checked");
    }
  });
  $("#feedbackForm").on("submit", function(event) {
    event.preventDefault();
    if ($("#rating").val() === "" || $("#comments").val().trim() === "") {
      this.classList.add("was-validated");
      return;
    }
    alert("Thank you for your feedback!\nRating: " + selectedRating + " stars\nComments: " + $("#comments").val());
    this.reset();
    $(".star-rating .fa-star").removeClass("checked");
    selectedRating = 0;
    $("#rating").val("");
    this.classList.remove("was-validated");
  });
});
