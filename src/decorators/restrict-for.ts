import { Snowflake } from 'discord.js'
import { PREFIX } from '../constants'
import { commandBlackList } from '../lists/lists'

export function RestrictFor(roleIdList: Snowflake[]): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (_target: any, propertyKey: string | symbol): void {
    commandBlackList.set(propertyKey.toString(), roleIdList)
    console.log(
      `[Bot] ${PREFIX}${propertyKey.toString()} command is now restricted for next roles: ${roleIdList.join(
        ', ',
      )}!`,
    )
  }
}
