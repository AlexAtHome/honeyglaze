import { ICommand } from './command'

export class ValidationError extends Error {
  name = 'ValidationError'
}

export class PermissionError extends Error {
  name = 'PermissionError'
  constructor(public command: ICommand) {
    super('Вы не можете использовать данную команду!')
  }
}
