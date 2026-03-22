import { Request, Response } from "express";

export class TicketController {
  //TODO: DI - wssService
  constructor() {}

  public getTickets = async (req: Request, res: Response) => {
    return res.json("getTickets");
  };

  public getLastTicketNumber = async (req: Request, res: Response) => {
    return res.json("getLastTicketNumber ");
  };

  public pendingTicket = async (req: Request, res: Response) => {
    return res.json("pendingTicket");
  };

  public createTicket = async (req: Request, res: Response) => {
    return res.json("createTicket");
  };

  public drawTicket = async (req: Request, res: Response) => {
    return res.json("drawTicket");
  };

  public ticketDone = async (req: Request, res: Response) => {
    return res.json("ticketDone");
  };

  public workingOn = async (req: Request, res: Response) => {
    return res.json("workingOn");
  };
}
