import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket, Status } from "../../domain";

export class TicketService {
  public readonly tickets: Ticket[] = [
    { id: UuidAdapter.v4(), number: 1, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createAt: new Date(), done: false },
  ];

  private readonly workingOnTickets: Ticket[] = [];

  public get pendingTickets(): Ticket[] {
    return this.tickets.filter((ticket) => !ticket.handleAtDesk);
  }

  public get lastWorkingOnTickets(): Ticket[] {
    return this.workingOnTickets.slice(0, 4);
  }

  public get lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  public createTicket(): Ticket {
    const newTicket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber + 1,
      createAt: new Date(),
      done: false,
    };

    this.tickets.push(newTicket);
    //TODO: Notificar al websocket

    return newTicket;
  }

  public drawTicket(desk: string) {
    const ticket = this.tickets.find((t) => !t.handleAtDesk);

    if (!ticket) {
      return { status: Status.ERROR, message: "No hay tickets pendientes" };
    }

    ticket.handleAtDesk = desk;
    ticket.handleAt = new Date();

    this.workingOnTickets.unshift({ ...ticket });

    //TODO: Notificar al websocket

    return { status: Status.OK, ticket };
  }

  public onFinishTicket(id: string) {
    const ticket = this.tickets.find((t) => t.id === id);

    if (!ticket) {
      return { status: Status.ERROR, message: "No se encontro el ticket" };
    }

    this.tickets.map((ticket) => {
      if (ticket.id === id) ticket.done = true;

      return ticket;
    });

    return { status: Status.OK, ticket };
  }
}
