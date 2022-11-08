import { DynamicModule, ForwardReference, Type } from '@nestjs/common'
import {
  ICommandBus,
  ICommandHandler,
  IEventBus,
  IEventSubscriber,
  IQueryBus,
  IQueryHandler,
} from '@deepblu/ddd'
import { CommandBus } from './commandbus'
import { QueryBus } from './querybus'
import { EventBus } from './eventbus'

export const COMMAND_HANDLERS = 'COMMAND_HANDLERS'
export const QUERY_HANDLERS = 'QUERY_HANDLERS'
export const EVENT_SUBSCRIBERS = 'EVENT_SUBSCRIBERS'

const commandProviders = (
  commandHandlers,
  useCommandBusClass: Type<ICommandBus> = CommandBus
) => [
  ...commandHandlers,
  {
    provide: COMMAND_HANDLERS,
    useFactory: (...handlers: ICommandHandler[]) => handlers,
    inject: commandHandlers,
  },
  { provide: ICommandBus, useClass: useCommandBusClass },
]

const queryProviders = (
  queryHandlers,
  useQueryBusClass: Type<IQueryBus> = QueryBus
) => [
  ...queryHandlers,
  {
    provide: QUERY_HANDLERS,
    useFactory: (...handlers: IQueryHandler[]) => handlers,
    inject: queryHandlers,
  },
  { provide: IQueryBus, useClass: useQueryBusClass },
]

const eventProviders = (
  eventSubscribers,
  useEventBusClass: Type<IEventBus> = EventBus
) => [
  ...eventSubscribers,
  {
    provide: EVENT_SUBSCRIBERS,
    useFactory: (...subscribers: IEventSubscriber[]) => subscribers,
    inject: eventSubscribers,
  },
  { provide: IEventBus, useClass: useEventBusClass },
]

interface CqrsModuleOptions {
  imports?: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[]
  commandHandlers: Type<ICommandHandler>[]
  useCommandBusClass?: Type<ICommandBus>
  queryHandlers: Type<IQueryHandler>[]
  useQueryBusClass?: Type<IQueryBus>
  eventSubscribers: Type<IEventSubscriber>[]
  useEventBusClass?: Type<IEventBus>
}

export class CqrsModule {
  static register({
    imports,
    commandHandlers,
    useCommandBusClass = CommandBus,
    queryHandlers,
    useQueryBusClass = QueryBus,
    eventSubscribers,
    useEventBusClass = EventBus,
  }: CqrsModuleOptions): DynamicModule {
    const providers = []
    const exports = []

    if (commandHandlers?.length) {
      providers.push(...commandProviders(commandHandlers, useCommandBusClass))
      exports.push(ICommandBus)
    }

    if (queryHandlers?.length) {
      providers.push(...queryProviders(queryHandlers, useQueryBusClass))
      exports.push(IQueryBus)
    }

    if (eventSubscribers?.length) {
      providers.push(...eventProviders(eventSubscribers, useEventBusClass))
      exports.push(IEventBus)
    }

    return {
      module: CqrsModule,
      global: true,
      imports,
      providers,
      exports,
    }
  }
}
