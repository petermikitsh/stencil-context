# `stencil-context`

A react-like context implementation for Stencil.js.

## Usage

```jsx
import { Component, h } from '@stencil/core';
import { createContext } from 'stencil-context';

const defaultValue = {foo: 'bar'};

const { Provider, Consumer } = createContext(defaultValue);

@Component({
  tag: 'my-app',
})
export class MyApp {
  render() {
    return (
      <Provider>
        <Consumer>
          {({ foo }) => (
            <div>{foo}</div>
          )}
        </Consumer>
      </Provider>
    )
  }
}

```

## Usage (Advanced)

You can define nested `Provider` and `Consumer`,

```jsx
import { Component, h } from '@stencil/core';
import { createContext } from 'stencil-context';

const defaultValue = {foo: 'foo'};
const { Provider, Consumer } = createContext(defaultValue);

@Component({
  tag: 'my-app',
})
export class MyApp {
  render() {
    return (
      <Provider value={{foo: 'foo1'}}>
        <Consumer>
          {({ foo }) => (
            [
              <div>{foo}</div>,
              <Provider value={{foo: 'foo2'}}>
                <Consumer>
                  {({ foo }) => (
                    <div>{foo}</div>
                  )}
                </Consumer>
              </Provider>
            ]
          )}
        </Consumer>
      </Provider>
    )
  }
}
```
