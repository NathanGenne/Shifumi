// --------------------------------------------------------------------------------------------
// ---------------------------Fonction Drag and Drop ------------------------------------------
// --------------------------------------------------------------------------------------------

let yourChoice;
let aiChoice;
let yourScore = 0;
let iaScore = 0;
let counter = 1;

function dragNdrop() {
  item = $(".item");

  item.mouseenter(function () {
    $(this).css({
      transform: "translateY(-20px)",
      transition: "transform 200ms ease-in-out",
    });
  });

  item.mouseleave(function () {
    $(this).css({
      transform: "translateY(0px)",
      transition: "transform 200ms ease-in-out",
    });
  });

  item.on("dragstart", dragStart);
  item.on("dragend", dragEnd);

  // dragStart: lorsque qu'on "prend" la carte
  function dragStart() {
    $(this).addClass("active");
  }
  //  dragEnd: lorsque qu'on "relache" la carte
  function dragEnd() {
    $(this).removeClass("active");
  }
  $(".first-card").each(function () {
    $(this).on("dragover", dragOver);
    $(this).on("drop", drop);
  });
  function dragOver(e) {
    e.preventDefault();
  }
  // Génère une valeur aléatoire pour l'ia et compare les choix pour déterminer le gagnant
  function compareChoices() {
    aiChoice = parseInt(Math.random() * 3);
    console.log(aiChoice);
    console.log(yourChoice);
    if (aiChoice == yourChoice) {
      $(".message").text("Draw");
    } else if (
      (aiChoice == 0 && yourChoice == 2) ||
      (aiChoice == 1 && yourChoice == 0) ||
      (aiChoice == 2 && yourChoice == 1)
    ) {
      yourScore += 1;
      $(".scoreUser span").text(yourScore);
      $(".message").text("You Win");
    } else {
      iaScore += 1;
      $(".scoreAI span").text(iaScore);
      $(".message").text("You Loose");
    }
    $(".second-card").html(
      `<img class="img-card item" src="./assets/img/` + aiChoice + `.svg">`
    );
  }
  
  // au moment du relachement
  function drop() {
    let item = $(".active");
    let itemValue = item.attr("value");
    // console.log('drop');
    $(this).append(item);
    $(this).attr("value", itemValue);
    $(".item").off("mouseenter");
    $(".item").off("mouseleave");
    item.mouseleave(function () {
      $(this).css({
        transform: "translateY(0px)",
        transition: "transform 200ms ease-in-out",
      });
    });
    yourChoice = $(this).attr("value");
    setTimeout(function () {
      compareChoices();
    }, 1000);
    setTimeout(function () {
      roundCount();
    }, 3000);
  }

  function dragEnter(e) {
    e.target.addClass('drag-over');
  }

  function dragLeave(e) {
    e.target.classList.removeClass('drag-over');
  }
}

function roundCount() {
  let round = $(".count span");
  counter++;
  round.text(counter);
  let activeCard = $('.first-card .item')
  let iaCard = $('.second-card .item')
  activeCard.appendTo('.content-card')
  $(".message").text("Shi...Fu...Mi");
  iaCard.remove()
  
  if (counter > 5) {
    if (yourScore > iaScore) {
      alert(`You Won !`);
    } else if (yourScore == iaScore) {
      alert(`It's a Draw !`);
    } else {
      alert(`You lost !`);
    }
    counter = 1;
    round.text(counter);
    yourScore = 0;
    $(".scoreUser span").text(yourScore);
    iaScore = 0;
    $(".scoreAI span").text(iaScore);
    $(".message").text("Shi...Fu...Mi !");

  }
}

// on execute les fonctions quand le DOM est chargé

$(function () {
  dragNdrop();
});
