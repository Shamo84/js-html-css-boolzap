$(document).ready(function() {
  $("#footer-chat input").keypress(function(event) {
    if (event.which == 13) {
      var chatTemplate = $("main-chat .user-message-template").clone();
      chatTemplate.children("p").text($(this).val());
      $("main-chat").append(chatTemplate);
    }
  });
});
