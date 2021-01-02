import { Logger } from '../utils/logger'
import { scheduledTasksList, instanceList } from '../lists/lists'
import { Client } from 'discord.js'
import chalk from 'chalk'

export interface IScheduleParams {
  interval: number
  delay?: number
}

export type TSchedulerHook = (client: Client) => void

export interface ISchedulerMeta extends IScheduleParams {
  name: string
  run: TSchedulerHook
}

/**
 * Runs your method on schedule immediately after starting the bot.
 *
 * Usage:
 * ```ts
 * @Scheduled({
 *   interval: 1000,
 *   delay: 2000,
 * })
 * consoleLog(client: Client): void {
 *   console.log(`logging ${this.tick} by ${client?.user?.tag}`);
 *   this.tick++;
 * }
 * ```
 * It passes the bot instance into the decorated method so you can access its data.
 *
 * This decorator might be useful to run certains operations on schedule (like scanning the database, renaming channels, etc)
 *
 * @param params - scheduled operation parameter
 */
export function Scheduled({
  interval,
  delay,
}: IScheduleParams): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <T = TSchedulerHook>(
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ) {
    const name = propertyKey.toString()
    let instance = instanceList.get(target.constructor.name)
    if (!instance) {
      instance = target.constructor()
      instanceList.set(target.constructor.name, instance as never)
    }
    scheduledTasksList.push({
      interval,
      delay,
      name,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      run: (descriptor.value as any).bind(instance),
    })
    Logger.log(`${chalk.cyan('@Cron')} ${name} ✔️`)
  }
}
