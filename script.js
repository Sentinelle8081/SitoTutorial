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

// inserisce un event listener al pulsante di invio
form.addEventListener("submit", function (event) {
  event.preventDefault(); // previene il comportamento di default del form che è quello di ricaricare la pagina

  // rimuove i vecchi messaggi di errore
  document.querySelectorAll(".error-message").forEach((el) => el.remove());

  // otteniamo i valori degli input
  const userName = nameInput.value.trim();
  const userEmail = emailInput.value.trim();
  const userMessage = messageInput.value.trim();

  // validazione personalizzata del form
  let formValid = true;

  // controlliamo che i campi non siano vuoti
  if (!userName) {
    showError(nameInput, "Il nome è obbligatorio.");
    formValid = false;
  }
  if (!userEmail) {
    showError(emailInput, "L'email è obbligatoria.");
  } else if (!validateEmail(userEmail)) {
    showError(emailInput, "Per favore inserisci una email valida.");
    formValid = false;
  }
  if (!userMessage) {
    showError(messageInput, "Il messaggio è obbligatorio.");
    formValid = false;
  }
  if (formValid) {
    messageSection.textContent = `Grazie ${userName} per averci contattato, ti risponderemo presto via mail a ${userEmail}.`;
    messageSection.classList.remove("error");
    messageSection.classList.add("success");
    // opzionale, resetta i campi del form
    form.reset();
  } else {
    messageSection.textContent =
      "Ci sono errori nel modulo. Controlla e riprova.";
    messageSection.classList.remove("success");
    messageSection.classList.add("error");
  }
});

// aggiungi l'elemento p come figlio del form
form.appendChild(messageSection);
