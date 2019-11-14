import { Component, h } from '@stencil/core';
import { createContext } from '../../utils/createContext';

const { Consumer } = createContext({ defaultValue: 'foo' });

interface Context {
  defaultValue: string;
}

@Component({
  tag: 'my-component-grandchild',
})
export class MyComponentGrandchild {
  render() {
    return (
      <Consumer>
        {({ defaultValue }: Context) => (
          <div>3. {defaultValue} (grandchild)</div>
        )}
      </Consumer>
    );
  }
}
