import { Component, State, h } from '@stencil/core';
import { createContext } from '../../utils/createContext';

const { Provider, Consumer } = createContext({ defaultValue: 'first-level' });

interface Context {
  defaultValue: string;
}

@Component({
  tag: 'my-component',
})
export class MyComponent {
  constructor() {
    setTimeout(() => {
      this.firstLevel = { defaultValue: 'first-level-updated-2sec' };
    }, 2000);
  }

  @State() firstLevel: Context = { defaultValue: 'first-level' };

  render() {
    return (
      <Provider value={this.firstLevel}>
        <Consumer>
          {({ defaultValue }: Context) => (
            <div>
              <div>1. {defaultValue}</div>
              <my-component-child />
            </div>
          )}
        </Consumer>
      </Provider>
    );
  }
}
