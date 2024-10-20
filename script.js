// seleziona il form e aggiunge uun event listener per l'invio

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault(); // previene il comportamento di defalt del form
  alert("Grazie di avermi contattato, ti risponderò al più presto.");
});
