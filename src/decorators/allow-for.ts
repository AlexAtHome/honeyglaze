import chalk from 'chalk'
import { Snowflake } from 'discord.js'
import { PREFIX } from '../constants'
import { commandWhiteList } from '../lists/lists'
import { Logger } from '../utils/logger'

export function AllowFor(roleIdList: Snowflake[]): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (_target: any, propertyKey: string | symbol): void {
    commandWhiteList.set(propertyKey.toString(), roleIdList)
    const commandName = chalk.blueBright(PREFIX + propertyKey.toString())
    Logger.log(
      `${chalk.green('@AllowFor')} ${commandName} 👍 ${chalk.grey(
        roleIdList.join(', '),
      )}`,
    )
  }
}
