import { Client, GuildMember, Message, MessageEmbed } from 'discord.js'
import { PREFIX } from './constants'
import { getCommandFromMessage } from './lists/get-command'
import { commandBlackList, commandWhiteList } from './lists/lists'
import { ICommand, PermissionError, TArgs, ValidationError } from './models'

export function attachCommands(bot: Client): void {
  bot.on('message', message => {
    if (message.author.bot) return
    if (!message.content.startsWith(PREFIX)) return
    resolveCommand(message)
  })
}

function resolveCommand(message: Message): void {
  const command = getCommandFromMessage(message.content)
  if (!command) {
    return
  }
  try {
    if (!isAllowedToRun(command, message.member)) {
      throw new PermissionError(command)
    }
    const args = command?.args
      ? getArguments(message.content, command.args)
      : []
    command?.run(message, ...args)
  } catch (e) {
    if (e instanceof ValidationError || e instanceof PermissionError) {
      const errorEmbed = new MessageEmbed()
        .setColor('#ff0000')
        .setTitle('An error occured!')
        .setDescription(e.message)
      message.channel.send(errorEmbed).then(m => m.delete({ timeout: 60000 }))
    }
  }
}

function isAllowedToRun(command: ICommand, user: GuildMember | null): boolean {
  if (!user) {
    return false
  }
  const { functionName } = command
  const whiteListRoles = commandWhiteList.get(functionName)
  if (whiteListRoles) {
    const hasRole = whiteListRoles.some(roleId => user.roles.cache.has(roleId))
    return hasRole
  }
  const blackListRoles = commandBlackList.get(functionName)
  if (blackListRoles) {
    const hasRole = blackListRoles.some(roleId => user.roles.cache.has(roleId))
    return !hasRole
  }
  return true
}

function getArguments(message: string, argTypes: TArgs): unknown[] {
  const args: unknown[] = []
  const arr = message.split(/\s+/).slice(1)
  if (arr.length === 0) {
    return []
  }
  argTypes.forEach(([summary, type], index) => {
    if (type === Number) {
      if (isNaN(Number(arr[index]))) {
        throw new ValidationError(
          `The argument "${summary}" should be a number!`,
        )
      }
      args.push(arr.shift())
    }
    if (type === String) {
      args.push(arr.shift())
    }
    if (type === Text) {
      const text = arr.join(' ')
      if (text === '') {
        throw new ValidationError(
          `The argument "${summary}" should be a non-empty text!`,
        )
      }
      args.push()
    }
  })
  return args
}
