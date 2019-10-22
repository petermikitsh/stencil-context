# `stencil-context`

A react-like context implementation for Stencil.js.

## Usage

```jsx
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
import { createContext } from 'stencil-context';

const defaultValue = {foo: 'foo', bar: 'bar'};
const { Provider, Consumer } = createContext(defaultValue);

@Component({
  tag: 'my-app',
})
export class MyApp {
  render() {
    return (
      <Provider value={{foo: 'foo1', bar: 'bar1'}}>
        <Consumer>
          {({ foo, bar }) => (
            [
              <div>{foo} {bar}</div>,
              <Provider value={{foo: 'foo2'}}>
                <Consumer>
                  {({ foo, bar }) => (
                    <div>{foo} {bar}</div>
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
