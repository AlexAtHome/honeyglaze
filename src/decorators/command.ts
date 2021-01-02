import { PREFIX } from '../constants'
import { ICommandMeta, TCommandFunction } from '../models'
import { commandList, instanceList } from '../lists/lists'
import { Logger } from '../utils/logger'
import chalk from 'chalk'
import { validateCommandAliases } from '../validation'

/**
 * Adds the command to the command registry so it's recognized and invoked by your bot.
 *
 * ```ts
 * class Fun {
 *   @Command()
 *   public hello(message: Message): void {
 *     message.reply('hello, world!')
 *   }
 * }
 * ```
 * You can also configure your command by rewriting its name, adding aliases, arguments, etc.
 * ```ts
 * class Fun {
 *   @Command({
 *     name: 'hello',
 *     summary: '',
 *     aliases: ['hi', 'whatsup', 'привет', 'gutentag'],
 *     args: [["Addressee", String, true]],
 *   })
 *   public hello(message: Message, addressee: string): void {
 *     message.reply(`hello, ${addressee}!`)
 *   }
 * }
 * ```
 * _It can be used only in class methods due to restrictions of Typescript decorators._
 *
 * @param meta - comamnd configuration. If skipped - the command will be added with the same name with the method
 */
export function Command(meta?: ICommandMeta): MethodDecorator {
  return function <T = TCommandFunction>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ): void {
    const moduleName = target.constructor.name
    const name = meta?.name || propertyKey.toString()
    let instance = instanceList.get(moduleName)
    if (meta?.aliases) {
      validateCommandAliases(meta?.aliases)
    }
    if (!instance) {
      instance = new target.constructor()
      instanceList.set(moduleName, instance as never)
    }
    commandList.set(name, {
      ...meta,
      name,
      functionName: propertyKey.toString(),
      module: moduleName,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      run: (descriptor.value as any).bind(instance),
    })
    const commandName = PREFIX + name
    Logger.log(`${chalk.grey('@Command')} ${commandName} ✔️`)
  }
}
