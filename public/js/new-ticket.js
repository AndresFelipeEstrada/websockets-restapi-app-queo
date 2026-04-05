const $currentTicket = document.querySelector("#lbl-new-ticket");
const $createTicketBottom = document.querySelector("button");

const getLastTicket = async () => {
  const response = await fetch("/api/tickets/last");
  const lastTicket = await response.json();

  $currentTicket.innerHTML = lastTicket;
};

const createTicket = async () => {
  const response = await fetch("/api/tickets/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  const newTicket = await response.json();
  console.log(newTicket);

  $currentTicket.innerHTML = newTicket.number;
};

$createTicketBottom.addEventListener("click", createTicket);

getLastTicket();

