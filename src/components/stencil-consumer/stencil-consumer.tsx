import { Component, Prop, Element } from '@stencil/core';

@Component({
  tag: 'stencil-consumer'
})
export class StencilConsumer {
  @Element() private element: HTMLElement;
  @Prop() renderer: Function = () => null;

  private getContext() {
    let parent = this.element.parentNode;
    while (parent) {
      const context = (parent as any).STENCIL_CONTEXT;
      if (context) {
        return context;
      }
      parent = parent.parentNode;
    }
  }
  
  render() {
    return this.renderer(this.getContext());
  }
}
