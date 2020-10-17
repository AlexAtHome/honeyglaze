import chalk from 'chalk'
import { Snowflake } from 'discord.js'
import { PREFIX } from '../constants'
import { commandBlackList } from '../lists/lists'
import { Logger } from '../utils/logger'

export function RestrictFor(roleIdList: Snowflake[]): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (_target: any, propertyKey: string | symbol): void {
    commandBlackList.set(propertyKey.toString(), roleIdList)
    const commandName = PREFIX + propertyKey.toString()
    Logger.log(
      `${chalk.red('@RestrictFor ' + commandName)} ✋ ${chalk.grey(
        roleIdList.join(', '),
      )}`,
    )
  }
}
