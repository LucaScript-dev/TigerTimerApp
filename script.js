"use strict ";
// HTML DOM
const toolSection = document.querySelector(".tools-section");
const labelSelectTools = document.querySelector(".label_select-tools");
const titleSub = document.querySelectorAll(".title_sub");
const inputTime = document.querySelectorAll(".inp");
const inputLabel = document.querySelectorAll(".label");
const startBtn = document.querySelector(".btn-start");
const tools = document.querySelectorAll(".tool");
const intervalTool = document.querySelector(".interval-tool");
const relojSvg = document.querySelector(".reloj");
const hidden = document.querySelector(".hidden");
const relojAguja = document.querySelector(".relojAguja");

// Mouse hover event
toolSection.addEventListener("mouseover", () => {
  labelSelectTools.classList.add("on");
  titleSub.forEach((el) => {
    el.classList.add("on");
  });
  inputTime.forEach((el) => {
    el.classList.add("on");
  });
  inputLabel.forEach((el) => {
    el.classList.add("on");
  });
  startBtn.classList.add("on");
});

toolSection.addEventListener("mouseout", () => {
  labelSelectTools.classList.remove("on");
  titleSub.forEach((el) => {
    el.classList.remove("on");
  });
  inputTime.forEach((el) => {
    el.classList.remove("on");
  });
  inputLabel.forEach((el) => {
    el.classList.remove("on");
  });
  startBtn.classList.remove("on");
});

// Mouse clicked event

const eventMouseClickedAll = function (html) {
  html.forEach((el) => {
    el.addEventListener("mousedown", () => {
      el.classList.add("clicked");
    });
    el.addEventListener("mouseup", () => {
      el.classList.remove("clicked");
    });
  });
};

eventMouseClickedAll(inputTime);
eventMouseClickedAll(tools);

startBtn.addEventListener("mousedown", () => {
  startBtn.classList.add("clicked");
});
startBtn.addEventListener("mouseup", () => {
  startBtn.classList.remove("clicked");
  inputTime.forEach((el) => {
    setTimeout(() => {
      el.value = "";
    }, 1000);
  });
});

// Press keyboard event

document.addEventListener("keyup", (e) => {
  if (inputTime[0].value > 24) inputTime[0].value = "";
  if (inputTime[1].value > 60) inputTime[1].value = "";
  if (inputTime[2].value > 60) inputTime[2].value = "";
  if (inputTime[3].value > 24) inputTime[3].value = "";
  if (inputTime[4].value > 60) inputTime[4].value = "";
  if (inputTime[5].value > 60) inputTime[5].value = "";

  inputTime.forEach((el) => {
    if (isNaN(el.value)) el.value = "";
    if (el.value.length > 2) el.value = "";
    if (el.value) startBtn.classList.add("visibility");
  });
});

tools[0].addEventListener("click", () => {
  labelSelectTools.textContent = "temporizador";
  startBtn.dataset.tool = "temporizador";
  intervalTool.classList.remove("toogle");
});
tools[1].addEventListener("click", () => {
  labelSelectTools.textContent = "Interval";
  startBtn.dataset.tool = "interval";
  intervalTool.classList.add("toogle");
});

startBtn.addEventListener("click", (e) => {
  const horaTemp = !inputTime[3].value ? 0 : inputTime[3].value * 3600000;
  const minTemp = !inputTime[4].value ? 0 : inputTime[4].value * 60000;
  const secTemp = !inputTime[5].value ? 0 : inputTime[5].value * 1000;

  const horaInter = !inputTime[0].value ? 0 : inputTime[0].value * 3600000;
  const minInter = !inputTime[1].value ? 0 : inputTime[1].value * 60000;
  const secInter = !inputTime[2].value ? 0 : inputTime[2].value * 1000;

  hidden.classList.add("remove");
  relojSvg.classList.add("lest-go");
  relojAguja.classList.add("rotate");
  startBtn.classList.remove("visibility");

  const tigeRoar = new Audio("./audio/tiger-time.mp3");
  const stop = new Audio("./audio/stop.wav");
  const lestgo = new Audio("./audio/lestgo.wav");

  lestgo.play();

  if (e.target.dataset.tool === "temporizador") {
    const timeTemp = horaTemp + minTemp + secTemp;

    setTimeout(() => {
      stop.play();

      hidden.classList.remove("remove");
      relojSvg.classList.remove("lest-go");
      relojAguja.classList.remove("rotate");
    }, timeTemp);
  }
  if (e.target.dataset.tool === "interval") {
    const timeTemp = horaTemp + minTemp + secTemp;
    const timeInter = horaInter + minInter + secInter;

    const interTimer = setInterval(() => {
      tigeRoar.play();
    }, timeInter);

    setTimeout(() => {
      setTimeout(() => {
        stop.play();
      }, 1000);

      clearInterval(interTimer);

      hidden.classList.remove("remove");
      relojSvg.classList.remove("lest-go");
      relojAguja.classList.remove("rotate");
    }, timeTemp);
  }
});
