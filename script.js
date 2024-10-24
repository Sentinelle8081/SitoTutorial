// seleziona il form e aggiunge un event listener per l'invio

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
  let errorElement = input.nextElementSibling; // cerca l'elemento accanto all'input
  if (!errorElement || errorElement.tagName !== "SPAN") {
    errorElement = document.createElement("span");
    errorElement.classList.add("error-message");
    input.insertAdjacentElement("afterend", errorElement);
  }
  errorElement.textContent = message;
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

// ------------- inserisce un event listener al pulsante di invio
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
    formValid = false;
  }
  if (!validateEmail(userEmail)) {
    showError(emailInput, "Per favore inserisci una mail valida.");
    formValid = false;
  }
  if (!validateMessage(userMessage)) {
    showError(messageInput, "Il messaggio deve contenere almeno 6 caratteri.");
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
