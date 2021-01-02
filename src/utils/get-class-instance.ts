import { ClassLikeDeclaration } from 'typescript'
import { instanceList } from '../lists/lists'

// eslint-disable-next-line @typescript-eslint/ban-types
export const getOrCreateClassInstance = (
  moduleName: string,
  // eslint-disable-next-line @typescript-eslint/ban-types
  target: Object,
): ClassLikeDeclaration => {
  let instance = instanceList.get(moduleName)
  if (!instance) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    instance = new (target as any).constructor()
    instanceList.set(moduleName, instance as never)
  }
  return instance as ClassLikeDeclaration
}
