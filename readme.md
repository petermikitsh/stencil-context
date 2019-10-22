# `stencil-context`

[![npm package][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coverage Status][coveralls-image]][coveralls-url]
[![Dependencies Status][david-image]][david-url]

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

[npm-image]:https://img.shields.io/npm/v/stencil-context.svg
[npm-url]:https://www.npmjs.com/package/stencil-context
[travis-image]:https://travis-ci.org/petermikitsh/stencil-context.svg?branch=master
[travis-url]:https://travis-ci.org/petermikitsh/stencil-context
[david-image]:https://david-dm.org/petermikitsh/stencil-context/status.svg
[david-url]:https://david-dm.org/petermikitsh/stencil-context
[coveralls-image]:https://coveralls.io/repos/github/petermikitsh/stencil-context/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/petermikitsh/stencil-context?branch=master
