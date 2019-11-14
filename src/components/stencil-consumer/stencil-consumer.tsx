import { Component, Event, EventEmitter, Prop, State } from '@stencil/core';

@Component({
  tag: 'stencil-consumer',
})
export class StencilConsumer {
  @Prop() renderer: any;
  @State() context: any;
  @Event({ eventName: 'mountConsumer' }) mountEmitter: EventEmitter;
  @State() promise: Promise<any>;
  @State() resolvePromise: any;

  constructor() {
    this.promise = new Promise((resolve) => {
      this.resolvePromise = resolve;
    });
  }

  setContext = async (context: any) => {
    this.context = context;
    return this.promise;
  };

  componentDidLoad() {
    this.mountEmitter.emit(this.setContext);
  }

  componentDidUnload() {
    this.resolvePromise();
  }

  render() {
    if (!this.context) {
      return null;
    }
    return this.renderer(this.context);
  }
}
