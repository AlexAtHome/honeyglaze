import chalk from 'chalk'
import { Snowflake } from 'discord.js'
import { PREFIX } from '../constants'
import { commandBlackList, commandWhiteList } from '../lists/lists'
import { ValidationError } from '../models'
import { Logger } from '../utils/logger'

/**
 * Allows the command evaluation to users with certain roles.
 *
 * ```ts
 * @Command()
 * @Allow(["745464790348202055", "745464790376580205"])
 * public hello(message: Message): void {
 *   message.reply('hello, world!')
 * }
 * ```
 * @param roleIdList - role id list to allow the command for
 */
export function Allow(roleIdList: Snowflake[]): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (_target: any, propertyKey: string | symbol): void {
    const commandName = propertyKey.toString()
    const restrictedRoles = commandBlackList.get(commandName)
    if (restrictedRoles) {
      Logger.warn(
        `There's no sense to allow and restrict the ${commandName} command simultaneously!`,
      )
      if (restrictedRoles?.some(role => roleIdList.includes(role))) {
        throw new ValidationError(
          `You can't allow and restrict the "${commandName}" command at the same time!`,
        )
      }
    }
    commandWhiteList.set(commandName, roleIdList)
    Logger.log(
      `${chalk.green('@AllowFor ' + PREFIX + commandName)} 👍 ${chalk.grey(
        roleIdList.join(', '),
      )}`,
    )
  }
}
