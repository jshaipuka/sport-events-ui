//Refills
$(document).ready(function() {
  // Dropdown
  $(".dropdown-button").click(function() {
    var $button, $menu;
    $button = $(this);
    $menu = $button.siblings(".dropdown-menu");
    $menu.toggleClass("show-menu");
    $menu.children("li").click(function() {
      $menu.removeClass("show-menu");
      $button.html($(this).html());
      $button.css("color", "#000000");
    });
  });

  $("body").click(function(e) {
    var target = $(e.target);

    if (!target.is(".dropdown-button")) {
      var $button, $menu;
      $button = $(".dropdown-button");
      $menu = $button.siblings(".dropdown-menu");
      $menu.removeClass("show-menu");
      // $button.html($(this).html());
    }
  });


  //Modal
  $("#modal-1").on("change", function() {
    if ($(this).is(":checked")) {
      $("body").addClass("modal-open");
    } else {
      $("body").removeClass("modal-open");
    }
  });

  $(".modal-fade-screen, .modal-close").on("click", function() {
    $(".modal-state:checked").prop("checked", false).change();
  });

  $(".modal-inner").on("click", function(e) {
    e.stopPropagation();
  });

});
// SLIDING PANEL
$(document).ready(function() {
  $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart', function(e) {
    $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
    e.preventDefault();
  });
});
