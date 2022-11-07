import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common'
import {
  ICommandBus,
  ICommandHandler,
  // IEventBus,
  // IEventSubscriber,
  // IQueryBus,
  // IQueryHandler,
} from '@deepblu/ddd'
import { CommandBus } from './commandbus'
// import { QueryBus } from './querybus'
// import { EventBus } from './eventbus'

interface CqrsModuleOptions {
  imports: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[]
  commandHandlers: Type<ICommandHandler>[]
  // queryHandlers: Type<IQueryHandler>[]
  // eventSubscribers: Type<IEventSubscriber>[]
}

export const COMMAND_HANDLERS = 'COMMAND_HANDLERS'
export const QUERY_HANDLERS = 'QUERY_HANDLERS'
export const EVENT_SUBSCRIBERS = 'EVENT_SUBSCRIBERS'

const commandProvider = commandHandlers => [
  ...commandHandlers,
  {
    provide: COMMAND_HANDLERS,
    useFactory: (...handlers: ICommandHandler[]) => handlers,
    inject: commandHandlers,
  },
  { provide: ICommandBus, useClass: CommandBus },
]

// const queryProvider = queryHandlers => [
//   ...queryHandlers,
//   {
//     provide: QUERY_HANDLERS,
//     useFactory: (...handlers: IQueryHandler[]) => handlers,
//     inject: queryHandlers,
//   },
//   { provide: IQueryBus, useClass: QueryBus },
// ]

// const eventProvider = eventSubscribers => [
//   ...eventSubscribers,
//   {
//     provide: EVENT_SUBSCRIBERS,
//     useFactory: (...subscribers: IEventSubscriber[]) => subscribers,
//     inject: eventSubscribers,
//   },
//   { provide: IEventBus, useClass: EventBus },
// ]

@Module({})
export class CqrsModule {
  static register({
    imports,
    commandHandlers,
  }: // queryHandlers,
  // eventSubscribers,
  CqrsModuleOptions): DynamicModule {
    const providers = []
    providers.push(...commandProvider(commandHandlers))
    // providers.push(...queryProvider(queryHandlers))
    // providers.push(...eventProvider(eventSubscribers))

    return {
      module: CqrsModule,
      imports,
      providers,
      exports: [ICommandBus], //, IEventBus, IQueryBus],
    }
  }
}
