import { ICommand } from "./command";

export class ValidationError extends Error {}

export class PermissionError extends Error {
  constructor(public command: ICommand) {
    super('Вы не можете использовать данную команду!')
  }
}