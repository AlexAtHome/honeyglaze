import { Logger } from './utils/logger'
import {
  Client,
  GuildMember,
  Message,
  MessageEmbedOptions,
  PartialGuildMember,
} from 'discord.js'
import { PREFIX } from './constants'
import { getCommandFromMessage } from './lists/get-command'
import {
  commandBlackList,
  commandWhiteList,
  joinHooksList,
} from './lists/lists'
import { ICommand, PermissionError, TArgs, ValidationError } from './models'
import chalk from 'chalk'

/**
 * Adds `message` event listener to the `client` instance that resolves the commands from incoming messages.
 * @param bot - discord client instance
 */
export function initialize(bot: Client): void {
  bot.on('message', (message: Message) => {
    if (message.author.bot) return
    if (!message.content.startsWith(PREFIX)) return
    resolveCommand(message)
  })
  bot.on('guildMemberAdd', (newcomer: GuildMember | PartialGuildMember) => {
    for (const joinHook of joinHooksList) {
      joinHook(newcomer)
    }
  })
  Logger.log(chalk.greenBright('Initialization complete!'))
}

function resolveCommand(message: Message): void {
  const command = getCommandFromMessage(message.content)
  if (!command) {
    return
  }
  try {
    if (!isAllowedToRun(command, message.member)) {
      throw new PermissionError()
    }
    const args = command?.args
      ? getArguments(message.content, command.args)
      : []

    void command?.run(message, ...args)
  } catch (e) {
    errorHandler(e, message)
  }
}

function errorHandler<T extends Error>(error: T, message: Message): void {
  const embed: MessageEmbedOptions = {
    title: 'An error occured!',
    color: '#ff0000',
    description: error.message || 'Try again later!',
  }
  if (error instanceof ValidationError) {
    embed.title = 'Wrong command usage!'
  } else if (error instanceof PermissionError) {
    embed.title = 'You have no permissions to run this command!'
    embed.description = 'Ask an admin to let you run it.'
  }
  message.channel.send({ embed }).catch(err => console.error(err))
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

function getArguments(
  message: string,
  argTypes: TArgs,
): (number | string | undefined)[] {
  const arr = message.split(/\s+/).slice(1)
  if (arr.length === 0) {
    return []
  }
  return argTypes.map(([summary, type], index) => {
    if (type === Number) {
      if (isNaN(Number(arr[index]))) {
        throw new ValidationError(
          `The argument "${summary}" should be a number!`,
        )
      }
      return Number(arr.shift())
    }
    if (type === Text) {
      const text: string = arr.join(' ')
      if (text === '') {
        throw new ValidationError(
          `The argument "${summary}" should be a non-empty text!`,
        )
      }
      return text
    }
    return String(arr.shift())
  })
}
