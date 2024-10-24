// seleziona il form e aggiunge un event listener per l'invio

const form = document.querySelector("form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const messageSection = document.createElement("p");

// validazione email
function validateEmail(userEmail) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(userEmail);
}

// inserisce un event listener al pulsante di invio
form.addEventListener("submit", function (event) {
  event.preventDefault(); // previene il comportamento di default del form

  const userName = nameInput.value.trim();
  const userEmail = emailInput.value.trim();
  const userMessage = messageInput.value.trim();

  if (!userName || !userEmail || !userMessage) {
    messageSection.textContent = `Tutti i campi sono obbligatori.`;
    messageSection.classList.remove("success");
    messageSection.classList.add("error");
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
