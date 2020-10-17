import { ValidationError } from '../models/errors'

export function validateCommandAliases(aliasList: string[]): void {
  if (aliasList?.some(alias => alias.includes(' '))) {
    throw new ValidationError(
      `The "${name}" command has an alias with a space in it!`,
    )
  }
}
