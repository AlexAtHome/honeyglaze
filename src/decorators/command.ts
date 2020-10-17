import { assert } from 'console'
import { PREFIX } from '../constants'
import { ICommandMeta, TCommandFunction } from '../models'
import { commandList, instanceList } from '../lists/lists'

export function Command(meta?: ICommandMeta): MethodDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <T = TCommandFunction>(
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<T>,
  ): void {
    const moduleName = target.constructor.name
    const name = meta?.name || propertyKey.toString()
    let instance = instanceList.get(moduleName)
    if (meta?.aliases) {
      assert(
        meta?.aliases?.every(alias => !alias.includes(' ')),
        `[Bot] ВНИМАНИЕ! Команда ${name} имеет алиас с пробелами!`,
      )
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
    console.log(
      `[Bot] ${PREFIX}${name} (${propertyKey.toString()}) command is ready!`,
    )
  }
}
