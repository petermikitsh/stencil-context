import { Component, State, h } from '@stencil/core';
import { createContext } from '../../utils/createContext';

const { Provider, Consumer } = createContext({ defaultValue: 'foo' });

interface Context {
  defaultValue: string;
}

@Component({
  tag: 'my-component-child',
})
export class MyComponentChild {
  @State() childProvider?: Context;
  @State() clear: boolean = false;

  constructor() {
    window.setTimeout(() => {
      this.childProvider = { defaultValue: 'first-level-updated-4sec' };
    }, 4000);

    window.setTimeout(() => {
      this.clear = true;
    }, 6000);
  }
  render() {
    return (
      <Consumer>
        {({ defaultValue }: Context) => [
          <div>2. {defaultValue} (child)</div>,
          <Provider
            value={
              this.clear
                ? { defaultValue }
                : this.childProvider || { defaultValue }
            }
          >
            <my-component-grandchild />
            {this.clear ? null : <Consumer>{() => {}}</Consumer>}
          </Provider>,
        ]}
      </Consumer>
    );
  }
}
