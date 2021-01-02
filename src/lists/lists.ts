import { Snowflake } from 'discord.js'
import { ClassLikeDeclaration } from 'typescript'
import { ISchedulerMeta } from '../decorators/scheduled'
import { ICommand } from '../models'
import { GuildMemberHook } from '../models/hooks'

export const commandList = new Map<string, ICommand>()

export const instanceList = new Map<string, ClassLikeDeclaration>()

export const commandWhiteList = new Map<string, Snowflake[]>()

export const commandBlackList = new Map<string, Snowflake[]>()

export const joinHooksList: GuildMemberHook[] = []

export const leaveHooksList: GuildMemberHook[] = []

export const scheduledTasksList: ISchedulerMeta[] = []

export const intervalIdsList = new Set<number>()
