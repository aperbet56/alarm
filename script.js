// Récupération des différents éléments
const displayTime = document.querySelector("#clock");
const input = document.querySelector("input");
const setAlarmBtn = document.querySelector(".set-alarm");
const clearAlarmBtn = document.querySelector(".clear-alarm");

// Création de la constante audio qui contient le son de l'alarme
const audio = new Audio(
  "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
);
//La propriété loop est un booléen indiquant si la ressource audio doit être rejouée
audio.loop = true;

// Création des variables alarmTime et alarmTimeout réglées par défaut à null
let alarmTime = null;
let alarmTimeout = null;

// Déclaration de la fonction updateTime qui va permettre de l'heure, des minutes et des secondes
const updateTime = () => {
  // Stockage de la date actuelle dans la constante date
  const date = new Date();

  // Stockage des heures, minutes et secondes dans des constantes
  const hour = formatTime(date.getHours());
  const minutes = formatTime(date.getMinutes());
  const seconds = formatTime(date.getSeconds());

  // Affichage du temps dans le DOM
  displayTime.textContent = `${hour} : ${minutes} : ${seconds}`;
};

// Déclaration de la fonction formatTime qui va définir le format de l'heure, des minutes et des secondes
const formatTime = (time) => {
  if (time < 10) {
    return "0" + time;
  } else {
    return time;
  }
};

// Déclaration de la fonction setAlarmTime qui va permettre de choisir un horaire afin de régler l'alarme
const setAlarmTime = (value) => {
  alarmTime = value;
};

// Déclaration de la fonction setAlarm qui permet de régler l'alarme
const setAlarm = () => {
  if (alarmTime) {
    const current = new Date();
    const timeToAlarm = new Date(alarmTime);
    console.log(timeToAlarm);

    if (timeToAlarm > current) {
      const timeout = timeToAlarm.getTime() - current.getTime();
      alarmTimeout = setTimeout(() => audio.play(), timeout);
      alert(`Alarme réglée le ${timeToAlarm}`);
    }
  }
};

// Déclaration de la fonction clearAlarm qui va permettre de stopper/arrêter l'alarme
const clearAlarm = () => {
  audio.pause();
  if (alarmTimeout) {
    clearTimeout(alarmTimeout);
    alert("Alarme arrêtée");
    input.value = "";
  }
};

// Mise à jour de 'laffichage du temps toutes les 1000ms soit toutes les secondes
setInterval(updateTime, 1000);

// Ecoute de l'événement "click" sur le bouton "Régler l'alarme" et appel de la fonction setAlarm
setAlarmBtn.addEventListener("click", setAlarm);

// Ecoute de l'événement "click" sur le bouton "Arrêter l'alarme" et appel de la fonction clearAlarm
clearAlarmBtn.addEventListener("click", clearAlarm);
