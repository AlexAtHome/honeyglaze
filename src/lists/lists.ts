import { Snowflake } from 'discord.js'
import { ClassLikeDeclaration } from 'typescript'
import { JoinHook } from '../decorators/join'
import { ICommand } from '../models'

export const commandList = new Map<string, ICommand>()

export const instanceList = new Map<string, ClassLikeDeclaration>()

export const commandWhiteList = new Map<string, Snowflake[]>()

export const commandBlackList = new Map<string, Snowflake[]>()

export const joinHooksList: JoinHook[] = []
