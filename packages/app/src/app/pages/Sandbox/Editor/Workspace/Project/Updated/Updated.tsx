import React from 'react';
import { inject, hooksObserver } from 'app/componentConnectors';
import { SandboxUpdated, Time } from './elements';

type IUpdatedProps = {
  store: any;
};

export const Updated = inject('store')(
  hooksObserver(
    ({
      store: {
        editor: { currentSandbox: sb },
      },
    }: IUpdatedProps) => (
      <SandboxUpdated>
        Last modified at: <Time dateTime={sb.version}>{sb.version}</Time>
      </SandboxUpdated>
    )
  )
);
