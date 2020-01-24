$(document).ready(function() {
  $("#chat-footer input").keypress(function(event) {
    if (event.which == 13 && $(this).val() != "") {
      var newDate = new Date();
      var time = newDate.getHours() + ":" + newDate.getMinutes();
      var chatTemplate = $("#chat-main #user-message-template p").clone();
      chatTemplate.children("span").text($(this).val());
      chatTemplate.children("time").text(time);
      $("#chat-main").append(chatTemplate);
      $("#chat-footer input").val("");
      var contactTemplate = $("#chat-main #contact-message-template p").clone();
      contactTemplate.children("span").text(rispostaFiccante());
      contactTemplate.children("time").text(time);
      setTimeout(function() {$("#chat-main").append(contactTemplate)}, 1000);
    }
  });
  function rispostaFiccante() {
    var arrayRisposte = [
      "neanche morto",
      "piuttosto mi butto dal balcone",
      "non vedo l'ora di perdermelo",
      "sei utile come la forchetta nella zuppa",
      "se mio nonno avesse le rotelle sarebbe una carriola"
    ];
    var randomNum = Math.floor(Math.random() * 5);
    return arrayRisposte[randomNum];
  }
});
