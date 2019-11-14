import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
  Watch,
} from '@stencil/core';

interface ConsumerEvent extends Event {
  detail: Function;
}

@Component({
  tag: 'stencil-provider',
})
export class StencilProvider {
  @Prop() STENCIL_CONTEXT: { [key: string]: any };
  @State() consumers: Function[] = [];

  @Watch('STENCIL_CONTEXT')
  watchContext(newContext) {
    this.consumers.forEach((consumer) => consumer(newContext));
  }
  @Event({ eventName: 'mountConsumer' }) mountEmitter: EventEmitter;

  @Listen('mountConsumer')
  async mountConsumer(event: ConsumerEvent) {
    event.stopPropagation();
    this.consumers = this.consumers.slice().concat([event.detail]);
    await event.detail(this.STENCIL_CONTEXT);
    const index = this.consumers.indexOf(event.detail);
    const newConsumers = this.consumers
      .slice(0, index)
      .concat(this.consumers.slice(index + 1, this.consumers.length));
    this.consumers = newConsumers;
  }

  componentDidUnload() {
    this.consumers.map((consumer) => this.mountEmitter.emit(consumer));
  }

  render() {
    return <slot />;
  }
}
