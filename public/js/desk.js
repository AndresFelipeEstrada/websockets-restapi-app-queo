const $pending = document.querySelector("#lbl-pending");
const $deskTitle = document.querySelector("#deskTitle");
const $ticketAlert = document.querySelector("#ticketAlert");
const $nextTicketButton = document.querySelector("#nextTicket");
const $closeTicketButton = document.querySelector("#closeTicket");
const $currentTicketLbl = document.querySelector("#currentTicket");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("escritorio")) {
  window.location = "index.html";
  throw new Error("Escritio es requerido");
}

const deskNumber = searchParams.get("escritorio");
let workingTicket = null;
$deskTitle.innerText = deskNumber;

const getPendingTicket = async () => {
  const response = await fetch("/api/tickets/pending");
  const pendingTicket = await response.json();

  checkTicketCount(pendingTicket.length);

  $pending.innerHTML = pendingTicket.length || "";
};

function checkTicketCount(currentCount = 0) {
  if (currentCount === 0) {
    $ticketAlert.classList.remove("d-none");
  } else {
    $ticketAlert.classList.add("d-none");
  }

  $pending.innerHTML = currentCount;
}

async function getTicket() {
  await doneTicket();

  const response = await fetch(`/api/tickets/draw/${deskNumber}`);
  const { status, ticket, message } = await response.json();

  if (status === "ERROR") {
    $currentTicketLbl.innerText = message;
    return;
  }

  workingTicket = ticket;
  $currentTicketLbl.innerText = ticket.number;
}

async function doneTicket() {
  if (!workingTicket) return;

  const response = await fetch(`/api/tickets/done/${workingTicket.id}`, {
    method: "PUT",
    body: JSON.stringify({}),
    headers: { "Content-Type": "application/json" },
  });

  const { status, message } = await response.json();

  if (status === "ERROR") {
    $currentTicketLbl.innerText = message;
    return;
  }

  workingTicket = null;
  $currentTicketLbl.innerText = "Nadie";
}

function connectToWebSockets() {
  const socket = new WebSocket("ws://localhost:3000/ws");

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data);
    if (type !== "on-ticket-count-changed") return;

    checkTicketCount(payload);
  };

  socket.onclose = (_event) => {
    console.log("Connection closed");
    setTimeout(() => {
      console.log("retrying to connect");
      connectToWebSockets();
    }, 1500);
  };

  socket.onopen = (_event) => {
    console.log("Connected");
  };
}

$nextTicketButton.addEventListener("click", getTicket);
$closeTicketButton.addEventListener("click", doneTicket);

getPendingTicket();
connectToWebSockets();
