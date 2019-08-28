import React from 'react';
import { inject, hooksObserver } from 'app/componentConnectors';
import { SandboxUpdated } from './elements';

type IUpdatedProps = {
  store: any;
  signals: any;
};

export const Updated = inject('store')(
  hooksObserver(
    ({
      store: {
        editor: { currentSandbox: sb },
      },
    }: IUpdatedProps) => {
      console.log('current sb', sb);
      return <SandboxUpdated>Last modified at: {sb.version}</SandboxUpdated>;
    }
  )
);
