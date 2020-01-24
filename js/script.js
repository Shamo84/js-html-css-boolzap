$(document).ready(function() {
  // Cerca tra i contatti
  $("#cerca-contatti input").keydown(function() {
    setTimeout(function() {
      var textLo = $("#cerca-contatti input").val().toLowerCase();
      contactSearch(textLo);
  }, 1);
  });
// TOGGLE DELLE ICONE ALL'INPUT CHAT
  $("#chat-footer input").keydown(function() {
    if ($("#chat-footer input").val().length == 0) {
      $("#chat-footer .fa-microphone").show();
      $("#chat-footer .fa-paper-plane").hide();
    } else if (event.which >= 32 && event.which <= 255) {
      $("#chat-footer .fa-microphone").hide();
      $("#chat-footer .fa-paper-plane").show();
    }
  });
  // INVIO MESSAGGIO AL CLICK SULL'AEROPLANINO
  $("#chat-footer .fa-paper-plane").click(function() {
      sendMessage();
  });
  // INVIO MESSAGGIO DALL'INPUT
  $("#chat-footer input").keypress(function(event) {
    if (event.which == 13 && $(this).val() != "") {
      sendMessage();
    }
  });
});
function contactSearch(stringLo) {
  $(".contatto").hide();
  var nameToLowerCase;
  for (var i = 0; i < $(".contatto").length; i++) {
    nameToLowerCase = $(".contatto").eq(i).find(".nome-contatto").text().toLowerCase();
    if (nameToLowerCase.includes(stringLo)) {
      $(".contatto").eq(i).show();
    }
  }
}

function sendMessage() {
  var newDate = new Date();
  var time = timeDigits(newDate.getHours()) + ":" + timeDigits(newDate.getMinutes());
  var chatTemplate = $("#user-message-template span").clone();
  var message = $("#chat-footer input").val();
  chatTemplate.prepend(message);
  chatTemplate.children("time").text(time);
  $("#chat-main").append(chatTemplate);
  $("#chat-footer input").val("");
  $("#chat-footer .fa-microphone").show();
  $("#chat-footer .fa-paper-plane").hide();
  var contactTemplate = $("#contact-message-template span").clone();
  contactTemplate.prepend(rispostaFiccante());
  contactTemplate.children("time").text(time);
  setTimeout(function() {$("#chat-main").append(contactTemplate)}, 1000);
}

function timeDigits(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

function rispostaFiccante() {
  var arrayRisposte = [
    "neanche morto",
    "piuttosto mi butto dal balcone",
    "non vedo l'ora di perdermelo",
    "sei utile come la forchetta nella zuppa",
    "se mio nonno avesse le rotelle sarebbe una carriola",
    "mi hai fatto venire voglia di bere della cicuta"
  ];
  var randomNum = Math.floor(Math.random() * 5);
  return arrayRisposte[randomNum];
}
