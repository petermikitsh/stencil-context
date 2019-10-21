import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stencil-context',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
