// seleziona il form e aggiunge uun event listener per l'invio

const form = document.querySelector("form");
const nameInput = document.querySelector("#name"); // si usa # perchè si prende il nome id
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const messageSection = document.createElement("p"); // creiamo un elemento <p> per il messaggio

// validazione email
function validateEmail(userEmail) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(userEmail);
}

// inserisce un event listener al pulsante di invio
form.addEventListener("submit", function (event) {
  event.preventDefault(); // previene il comportamento di defalt del form, cioè ricaricare la pagina

  // otteniamo i valori degli input
  const userName = nameInput.value.trim(); // .tri() toglie gli spazi vuoti
  const userEmail = emailInput.value.trim();
  const userMessage = messageInput.value.trim();

  // validazione personalizzata: controlliamo che i campi non siano vuoti
  if (!userName || !userEmail || !userMessage) {
    messageSection.textContent = `Tutti i campi sono obbligatori.`;
    messageSection.classList.remove("success"); // modifica lo stile
    messageSection.classList.add("error"); // modifica lo stile
  }
  // validazione dell'email
  else if (!validateEmail(userEmail)) {
    messageSection.textContent = "Per favore inserire una email valida.";
    messageSection.classList.remove("success"); // modifica lo stile
    messageSection.classList.add("error"); // modifica lo stile
  } else {
    // se tutto è corretto mostriamo un messaggio di conferma
    messageSection.textContent = `Grazie ${userName} per averci contattato, ti risponderemo presto via mail a ${userEmail}.`;
    messageSection.classList.remove("error"); // modifica lo stile
    messageSection.classList.add("success"); // modifica lo stile

    // opzionale, resetta i campi del form
    form.reset();
  }
});

/* aggiungi l'elemento p come figlio del form */
form.appendChild(messageSection);
