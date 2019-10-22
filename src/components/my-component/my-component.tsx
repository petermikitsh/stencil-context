import { Component, Element, State, h } from '@stencil/core';
import { createContext } from '../../utils/createContext';

interface Context {
  defaultValue: string;
}

const { Provider, Consumer } = createContext({defaultValue: 'foo'});

@Component({
  tag: 'my-component',
})
export class MyComponent {
  constructor() {
    setTimeout(() => {
      this.secondLevel = {defaultValue: 'test'};
    }, 2000);
  }

  @State() secondLevel: Context = {defaultValue: 'bar'};
  @State() thirdLevel: Context = {defaultValue: 'baz'};

  render() {
    return [
      <Provider>
        <Consumer>
          {({ defaultValue }: Context) => (
            <div>
              <div>1. {defaultValue}</div>
              <Provider value={this.secondLevel}>
                <Consumer>
                  {({ defaultValue }: Context) => (
                    <div>
                      <div>2. {defaultValue}</div>
                      <Provider value={this.thirdLevel}>
                        <Consumer>
                          {({ defaultValue }: Context) => (
                            <div>3. {defaultValue}</div>
                          )}
                        </Consumer>
                      </Provider>
                    </div>
                  )}
                </Consumer>
              </Provider>
            </div>
          )}
        </Consumer>
      </Provider>
    ]
  }
}
