import { Component, Element, h } from '@stencil/core';
import { HTMLStencilElement } from '@stencil/core/internal';
import { createContext } from '../../utils/createContext';

interface Context {
  defaultValue: string;
}

const { Provider, Consumer } = createContext({defaultValue: 'foo'});

@Component({
  tag: 'my-component',
})
export class MyComponent {

  @Element() el!: HTMLStencilElement;
  secondLevel: Context = {defaultValue: 'bar'};
  thirdLevel: Context = {defaultValue: 'baz'};

  constructor() {
    setTimeout(() => {
      this.secondLevel = {defaultValue: 'test'};
      this.el.forceUpdate();
    }, 2000);
  }

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
