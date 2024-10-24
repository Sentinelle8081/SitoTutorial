// seleziona il form e aggiunge un event listener per l'invio

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const messageSection = document.createElement("p"); // messaggio generale

// validazione email
function validateEmail(userEmail) {
  const regex =
    /^(?:[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:a-zA-Z0-9?\.)+a-zA-Z0-9?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])?)\])/;
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
  let formValid = false;

  // controlliamo che i campi non siano vuoti
  if (!userName) {
    showError(nameInput, "Il nome è obbligatorio.");
    // || !userEmail || !userMessage) {
    // messageSection.textContent = `Tutti i campi sono obbligatori.`;
    // messageSection.classList.remove("success");
    // messageSection.classList.add("error");
  } else if (!validateEmail(userEmail)) {
    messageSection.textContent = "Per favore inserire una email valida.";
    messageSection.classList.remove("success");
    messageSection.classList.add("error");
  } else {
    messageSection.textContent = `Grazie ${userName} per averci contattato, ti risponderemo presto via mail a ${userEmail}.`;
    messageSection.classList.remove("error");
    messageSection.classList.add("success");

    // opzionale, resetta i campi del form
    form.reset();
  }
});

// aggiungi l'elemento p come figlio del form
form.appendChild(messageSection);
