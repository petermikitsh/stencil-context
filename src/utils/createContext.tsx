import { FunctionalComponent, h } from '@stencil/core';

export const createContext = <T extends {[key: string]: any}>(defaultValue: T) => {

  const Provider: FunctionalComponent<{value?: T}> = (props, children) => {
    let resolvedValue: T = props && props.value || defaultValue;

    const providerRender = () => (
      <stencil-provider STENCIL_CONTEXT={resolvedValue}>
        {children}
      </stencil-provider>
    );

    return providerRender();
  }

  const Consumer: FunctionalComponent = (props, children) => {
    // First child is a function.
    const firstChild: any = children[0];

    const consumerRender = () => (
      <stencil-consumer renderer={firstChild} />
    );

    return consumerRender();
  }

  return {
    Provider,
    Consumer
  }
}
