// inserisce un messaggio alert al bottone greetButton
document.getElementById("greetButton").addEventListener("click", function () {
  alert("Benvenuto nel mio sito!");
});

// creo animazione (cambio del colore) al passaggio del mouse sopra il paragrafo about
const aboutDescription = document.getElementById("aboutDescription");
aboutDescription.addEventListener("mouseover", function () {
  aboutDescription.style.color = "blue"; // diventa blue quando il mouse è sopra la scritta
});
aboutDescription.addEventListener("mouseout", function () {
  aboutDescription.style.color = "black"; // torna al colore nero quando il mouse si toglie
});

// ----------------------------CARDS ---------- carte progetto ---------------------------------------------
// const projectCard = document.querySelectorAll(".project-card"); // seleziono tutti gli elementi con classe .project-card
// projectCard.forEach((card) => {
//   card.addEventListener("click", function () {
//     // ad ogni card aggiungo un eventListener sul click
//     const details = card.querySelector(".project-details"); // trova i dettagli all'interno della carta cliccata

//     // alterna la visibilità
//     if (details.style.display === "none" || details.style.display === "") {
//       details.style.display = "block";
//     } else {
//       details.style.display = "none";
//     }
//   });
// });

// // Espansione dei dettagli
// document.addEventListener("DOMContentLoaded", function () {
//   document.querySelectorAll(".toggle-btn").forEach((button) => {
//     button.addEventListener("click", function () {
//       const card = this.closest(".project-card"); // seleziona il progetto specifico
//       card.classList.toggle("active"); // aggiunge o rimuove la classe ".active"
//     });
//   });
// });

//------------------------------------ FILTRO -----------------------------------------------------------------------------------

// --------FORM --------- seleziona il form e aggiunge un event listener per l'invio -------------------------------------------------

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const messageSection = document.createElement("p"); // messaggio generale

// validazione email
function validateEmail(userEmail) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(userEmail);
}

// funzione per mostrare messaggio di errore accanto a ciascun campo
function showError(input, message) {
  const errorElement = document.querySelector(`#${input.id}-error`); // trova l'elemento HTML che visualizzerà il messaggio di errore
  errorElement.textContent = message;
  errorElement.classList.remove("visually-hidden"); // mostra il messaggio
}

function clearError(input) {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = "";
  errorElement.classList.add("visually-hidden"); // nasconde il messaggio
}

function handlePlaceHolder(input, message) {
  input.placeholder = message; // imposta il placeholder in caso di errore
  setTimeout(() => {
    input.placeholder = ""; // rimuove il messaggio di errore dopo qualche secondo
  }, 7000); // il tempo può essere regolato
}
// Aggiunge classi dinamiche per validazione in tempo reale
function handleInputValidation(input, validationFn) {
  input.addEventListener("input", function () {
    if (validationFn(input.value.trim())) {
      input.classList.remove("error");
      input.classList.add("success");
    } else {
      input.classList.remove("success");
      input.classList.add("error");
    }
  });
}

//validazione del nome (lunghezza minima)
function validateName(userName) {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/; // controllo che il nome non abbia numeri, caratteri speciali, accetta lettere, spazi, apostrofi e trattini
  return userName.length > 2 && nameRegex.test(userName); // nome di almeno 3 caratteri
}

// validazione dei messaggi
function validateMessage(userMessage) {
  return userMessage.trim().length > 5; // messaggio di almneo 6 caratteri e che non sia solo spazi vuoti
}

// validazione in tempo reale
handleInputValidation(nameInput, validateName);
handleInputValidation(emailInput, validateEmail);
handleInputValidation(messageInput, validateMessage);
//---------------TESTIMONIANZE ------------------------------------------

let currentIndex = 0;
const testimonialsWrapper = document.querySelector(".testimonials-wrapper");
const totalTestimonials = document.querySelectorAll(".testimonial").length;

function showTestimonial(index) {
  const offset = -index * 100; // Calcola l'offset in base all’indice
  testimonialsWrapper.style.transform = `translateX(${offset}%)`; // Trasforma il wrapper
}

function showNext() {
  currentIndex = (currentIndex + 1) % totalTestimonials; // Incrementa e resetta l’indice
  showTestimonial(currentIndex);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials; // Decrementa e resetta l’indice
  showTestimonial(currentIndex);
}

// Cambio automatico ogni 5 secondi
setInterval(showNext, 5000);

// ------------- FORM -------------------------inserisce un event listener al pulsante di invio
form.addEventListener("submit", function (event) {
  event.preventDefault(); // previene il comportamento di default del form che è quello di ricaricare la pagina

  document
    .querySelectorAll(".error-message") // pulire il contenuto del messaggio di errore associato senza rimuovere l'elemento.
    .forEach((el) => (el.textContent = ""));

  // otteniamo i valori degli input
  const userName = nameInput.value.trim();
  const userEmail = emailInput.value.trim();
  const userMessage = messageInput.value.trim();

  // validazione personalizzata del form
  let formValid = true;

  // controllo dei campi
  if (!validateName(userName)) {
    showError(nameInput, "Il nome deve contenere almeno 3 caratteri");
    handlePlaceHolder(nameInput, "Errore nel nome!");
    formValid = false;
  }
  if (!validateEmail(userEmail)) {
    showError(emailInput, "Per favore inserisci una mail valida.");
    handlePlaceHolder(emailInput, "Errore nella email!");
    formValid = false;
  }
  if (!validateMessage(userMessage)) {
    showError(messageInput, "Il messaggio deve contenere almeno 6 caratteri.");
    handlePlaceHolder(messageInput, "Errore nel messaggio!");
    formValid = false;
  }

  // mostra messaggio finale
  if (formValid) {
    messageSection.textContent = `Grazie ${userName} per averci contattato, ti risponderemo presto via mail a ${userEmail}.`;
    messageSection.classList.remove("error");
    messageSection.classList.add("success");
    // opzionale, resetta i campi del form
    form.reset();

    // rimuovi classi error e success dai campi
    nameInput.classList.remove("success", "error");
    emailInput.classList.remove("success", "error");
    messageInput.classList.remove("success", "error");
  } else {
    messageSection.textContent =
      "Ci sono errori nel modulo. Controlla e riprova.";
    messageSection.classList.remove("success");
    messageSection.classList.add("error");
  }
});

// aggiungi l'elemento p come figlio del form
form.appendChild(messageSection);
