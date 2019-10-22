import { h, Component, Prop } from '@stencil/core';

@Component({
  tag: 'stencil-provider'
})
export class StencilProvider {
  @Prop() STENCIL_CONTEXT: { [key: string]: any };

  render() {
    return <slot />;
  }
}
