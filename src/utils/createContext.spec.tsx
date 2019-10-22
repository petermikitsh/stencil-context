import { createContext } from './createContext';

describe('createContext', () => {
  it('returns Provider and Consumer', () => {
    const context = createContext({});
    expect(context.Provider).toBeTruthy();
    expect(context.Consumer).toBeTruthy();
  });
});
