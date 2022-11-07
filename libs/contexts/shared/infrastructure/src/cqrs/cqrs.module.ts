import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common'
import {
  ICommandBus,
  ICommandHandler,
  // IEventBus,
  // IEventSubscriber,
} from '@deepblu/ddd'
import { CommandBus } from './commandbus'
// import { EventBus } from './eventbus'

interface CqrsModuleOptions {
  imports: (Type | DynamicModule | Promise<DynamicModule> | ForwardReference)[]
  commandHandlers: Type<ICommandHandler>[]
  // eventSubscribers: Type<IEventSubscriber>[]
}

export const COMMAND_HANDLERS = 'COMMAND_HANDLERS'
export const EVENT_SUBSCRIBERS = 'EVENT_SUBSCRIBERS'

@Module({})
export class CqrsModule {
  static register({
    imports,
    commandHandlers,
  }: // eventSubscribers,
  CqrsModuleOptions): DynamicModule {
    return {
      module: CqrsModule,
      imports,
      providers: [
        ...commandHandlers,
        {
          provide: COMMAND_HANDLERS,
          useFactory: (...handlers: ICommandHandler[]) => handlers,
          inject: commandHandlers,
        },
        { provide: ICommandBus, useClass: CommandBus },
        // ...eventSubscribers,
        // {
        //   provide: EVENT_SUBSCRIBERS,
        //   useFactory: (...subscribers: IEventSubscriber[]) => subscribers,
        //   inject: eventSubscribers,
        // },
        // { provide: IEventBus, useClass: EventBus },
      ],
      exports: [ICommandBus], //, IEventBus],
    }
  }
}
