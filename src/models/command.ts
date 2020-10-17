import { Message } from 'discord.js'
import { ClassLikeDeclaration } from 'typescript'
import { ArgType } from './argument-type'

export type TArgs = ([string, ArgType] | [string, ArgType, boolean])[]

export type TCommandFunction = <T = ClassLikeDeclaration>(message: Message, ...args: T[]) => never

export interface ICommandMeta {
  name?: string
  summary?: string
  aliases?: string[]
  args?: TArgs
}

export interface ICommand extends ICommandMeta {
  name: string
  functionName: string
  module: string
  run: TCommandFunction
}