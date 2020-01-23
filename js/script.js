$(document).ready(function() {
  $("#chat-footer input").keypress(function(event) {
    if (event.which == 13) {
      var chatTemplate = $("#chat-main #user-message-template p").clone();
      chatTemplate.children("span").text($(this).val());
      $("#chat-main").append(chatTemplate);
      var contactTemplate = $("#chat-main #contact-message-template p").clone();
      setTimeout(function() {$("#chat-main").append(contactTemplate)}, 1000);
    }
  });
});
