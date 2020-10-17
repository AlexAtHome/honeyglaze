import { commandList } from './lists'
import { PREFIX } from '../constants'
import { ICommand } from '../models'

export function getCommandFromMessage(alias: string): ICommand | undefined {
  const name = getCommandName(alias)
  if (name) {
    return getCommand(name)
  }
}

export function getCommandName(text: string): string | undefined {
  return text?.split(' ')?.shift()?.slice(PREFIX.length)
}

export function getCommand(name: string): ICommand | undefined {
  let result = commandList.get(name)
  if (!result) {
    commandList.forEach(cmd => {
      if ((!result && cmd.aliases?.includes(name)) || cmd.name === name) {
        result = cmd
      }
    })
  }
  return result
}
