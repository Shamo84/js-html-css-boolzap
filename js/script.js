$(document).ready(function() {
  // CERCA TRA I CONTATTI
  $("#cerca-contatti input").keydown(function() {
    setTimeout(function() {
      var textLo = $("#cerca-contatti input").val().toLowerCase().trim();
      contactSearch(textLo);
    }, 1);
  });
  // CHEVRON DOWN QUANDO HOVERI SU UN MESSAGGIO
  $(document).on("mouseover", ".chat-main.active span.message", function(event) {
    if ($(event.target).hasClass("message")) {
      if ($(event.target).find("i").hasClass("fa-chevron-down") == false) {
        var chevronClone = $("#template .fa-chevron-down").clone();
        chevronClone.prependTo($(event.target));
      }
    }
  });
  // RIMUOVE LA CHEVRON QUANDO ESCI DAL MESSAGGIO
  $(document).on("mouseover", ".chat-main.active", function(event) {
    if ($(event.target).hasClass("chat-main")) {
      for (var i = 0; i < $(".active .message").length; i++) {
        if ($(".active .message").eq(i).find("div").hasClass("message-menu") == false) {
          $(".active .message").eq(i).find(".fa-chevron-down").remove();
        }
      }
    }
  });
  //  APRE IL MESSAGE MENU QUANDO CLIKKI LA FRECCIA E LO CHIUDE QUANDO CLIKKI FUORI
  $(document).on('click', function(event) {
    if ($(".chat-main.active").find("div").hasClass("message-menu")) {
      if ($(event.target).hasClass("message-menu")) {
      } else if ($(event.target).hasClass('message-info')) {
      } else if ($(event.target).hasClass("delete-message")) {
        $(event.target).parents(".message").remove();
      } else if ($(event.target).hasClass("message") && ($(event.target).find("div").hasClass("message-menu"))) {
      } else {
        $(".chat-main.active .message-menu").remove();
        $(".chat-main.active .fa-chevron-down").remove();
      }
    } else {
      if ($(event.target).hasClass('fa-chevron-down')) {
        var messageMenuClone = $("#template .message-menu").clone();
        messageMenuClone.prependTo($(event.target).parent("span"));
      }
    }
  });
  // TOGGLE DELLE ICONE ALL'INPUT CHAT
  $("#chat-footer input").keydown(function(event) {
    setTimeout(function() {
      if ($("#chat-footer input").val().length == 0) {
        $("#chat-footer .fa-microphone").show();
        $("#chat-footer .fa-paper-plane").hide();
      } else {
        $("#chat-footer .fa-microphone").hide();
        $("#chat-footer .fa-paper-plane").show();
      }
    }, 1);
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
  // MOSTRA CHAT, IMMAGINE E NOME DEL CONTATTO ACTIVE
  $(document).on("click", ".contatto", function() {
  // $(".contatto").click(function() {
    $(this).siblings().removeClass("active");
    $(this).addClass("active");
    var nomeContattoActive = $(this).find(".nome-contatto").text();
    var contattoID = $(this).children(".avatar").attr("userid");
    showContactChat(contattoID, nomeContattoActive);
  })
});
function contactSearch(stringLo) {
  var nameToLowerCase;
  for (var i = 0; i < $(".contatto").length; i++) {
    nameToLowerCase = $(".contatto").eq(i).find(".nome-contatto").text().toLowerCase();
    if (nameToLowerCase.includes(stringLo)) {
      $(".contatto").eq(i).show();
    } else {
      $(".contatto").eq(i).hide();
    }
  }
}

function sendMessage() {
  var newDate = new Date();
  var time = timeDigits(newDate.getHours()) + ":" + timeDigits(newDate.getMinutes());
  $(".contatto.active").children("time").text(time);
  var chatTemplate = $("#template .user.message").clone();
  var message = $("#chat-footer input").val();
  chatTemplate.prepend(message);
  chatTemplate.children("time").text(time);
  $(".chat-main.active").append(chatTemplate);
  $("#chat-footer input").val("");
  $("#chat-footer .fa-microphone").show();
  $("#chat-footer .fa-paper-plane").hide();
  var contactTemplate = $("#template .contact.message").clone();
  contactTemplate.prepend(rispostaFiccante());
  contactTemplate.children("time").text(time);
  $(".contatto.active").prependTo("#lista-contatti");
  setTimeout(function() {$(".chat-main.active").append(contactTemplate)}, 1000);
}

function timeDigits(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

function showContactChat(userid, nomeContattoActive) {
  $(".chat-main.active").addClass("display-none").removeClass("active");
  $(".chat-main").eq(userid-1).addClass("active").removeClass("display-none");
  $("#foto-contatto").attr("class", "avatar + contatto-" + userid + "");
  $("#chat-header .nome-contatto").text(nomeContattoActive);
}

function rispostaFiccante() {
  var arrayRisposte = [
    "neanche morto",
    "piuttosto mi butto dal balcone",
    "non vedo l'ora di perdermelo",
    "sei utile come la forchetta nella zuppa",
    "se mio nonno avesse le rotelle sarebbe una carriola",
    "mi hai fatto venire voglia di bere della cicuta",
    "tutt'ad un tratto il suicidio mi sembra un'opzione plausibile"
  ];
  var randomNum = Math.floor(Math.random() * 5);
  return arrayRisposte[randomNum];
}
