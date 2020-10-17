import { Snowflake } from 'discord.js'
import { PREFIX } from '../constants'
import { commandWhiteList } from '../lists/lists'

export function AllowFor(roleIdList: Snowflake[]): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (_target: any, propertyKey: string | symbol): void {
    commandWhiteList.set(propertyKey.toString(), roleIdList)
    console.log(
      `[Bot] ${PREFIX}${propertyKey.toString()} command is now allowed only for next roles: ${roleIdList.join(
        ', ',
      )}!`,
    )
  }
}
