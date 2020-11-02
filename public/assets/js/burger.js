// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".change-sleep").on("click", function(event) {
    var id = $(this).data("id"); // "5"
    var newSleep = $(this).data("newsleep"); // "false"

      // { sleepy: "false" }
    var newSleepState = {
      sleepy: newSleep
    };

    // Send the PUT request.
      // /api/cats/5 PUT { sleepy: "false" }
    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: newSleepState
    }).then(
      function() {
        console.log("changed sleep to", newSleep);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });

/* ------------------------------- create-form ------------------------------ */
  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
      //* { name: "Hendrix", sleepy: "1" }
    var newCat = {
      name: $("#ca").val().trim(),
      sleepy: $("[name=sleepy]:checked").val().trim()
    };

    // Send the POST request.
    $.ajax("/api/cats", {
      type: "POST",
      data: newCat  //* sending this data: { name: "Hendrix", sleepy: "1" }
    }).then(
      function() {
        console.log("created new cat");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
