// seleziona il form e aggiunge uun event listener per l'invio

const form = document.querySelector("form");
const nameInput = document.querySelector("#name"); // si usa # perchè si prende il nome id
const messageSection = document.createElement("p"); // creiamo un elemento <p> per il messaggio

form.addEventListener("submit", function (event) {
  // inserisce un event listener al pulsante di invio
  event.preventDefault(); // previene il comportamento di defalt del form, cioè ricaricare la pagina

  const userName = nameInput.value; // ottiene il valore dell'input "name"

  // creiamo un messaggio personalizzato
  const message = `Grazie ${userName} per averci contattato!`;

  // aggiungiamo il messaggio al DOM
  messageSection.textContent = message;
});

/* aggiungi l'elemento p come figlio del form */
form.appendChild(messageSection);
