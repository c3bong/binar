const result = document.querySelector(".result");
var pScore = document.querySelector(".p-score");
var cScore = document.querySelector(".c-score");
var pPick = document.querySelector(".p-pick");
var cPick = document.querySelector(".c-pick");

class Player {
  constructor(pilihan) {
    this.pilihan = pilihan;
  }
}
class Com extends Player {
  constructor() {
    super();
    this.acak();
  }
  acak() {
    let random = Math.random();
    if (random < 0.34) return (this.pilihan = "batu");
    if (random >= 0.34 && random < 0.67) return (this.pilihan = "kertas");
    return (this.pilihan = "gunting");
  }
}
class GameLogic extends Player {
  constructor(playerPick, comPick) {
    super();
    this.playerPick = playerPick;
    this.comPick = comPick;
  }

  logic() {
    const win = {
      batu: "gunting",
      gunting: "kertas",
      kertas: "batu",
    };

    if (win[this.playerPick] == this.comPick) {
      result.innerHTML = "Player win!";
      pScore.innerText = parseInt(pScore.innerText) + 1;
    } else if (this.playerPick == this.comPick) {
      result.innerHTML = "Draw!";
    } else {
      result.innerHTML = "Computer win!";
      cScore.innerText = parseInt(cScore.innerText) + 1;
    }
  }
}

// playerpick
function mulai(pilihan) {
  let pick = new Player(pilihan);
  let comp = new Com();
  let hasil = new GameLogic(pick.pilihan, comp.pilihan);
  hasil.logic();
  result.style.display = "inline";
  pPick.innerHTML = pick.pilihan;
  cPick.innerHTML = comp.pilihan;
  //   pilihan.currentTarget.style.backgroundColor = "none"; ini kog ga bisa ya kak?
}
