// @flow
import * as React from 'react';
import { inject, hooksObserver } from 'app/componentConnectors';

import Margin from '@codesandbox/common/lib/components/spacing/Margin';
import getDefinition from '@codesandbox/common/lib/templates';
import { WorkspaceSubtitle } from '../elements';

import AddVersion from './AddVersion';
import VersionEntry from './VersionEntry';
import AddResource from './AddResource';
import ExternalResource from './ExternalResource';

import { ErrorMessage } from './elements';

const Dependencies = inject('store', 'signals')(
  hooksObserver(
    ({ store: { editor }, signals: { workspace, editor: editorSignals } }) => {
      const sandbox = editor.currentSandbox;

      if (!editor.parsedConfigurations.package) {
        return <ErrorMessage>Unable to find package.json</ErrorMessage>;
      }

      const { parsed, error } = editor.parsedConfigurations.package;

      if (error) {
        return (
          <ErrorMessage>
            We weren
            {"'"}t able to parse the package.json
          </ErrorMessage>
        );
      }

      const dependencies = parsed.dependencies || {};
      // const devDependencies = parsed.devDependencies || {};

      const templateDefinition = getDefinition(sandbox.template);

      return (
        <div>
          <Margin bottom={0}>
            {Object.keys(dependencies)
              .sort()
              .map(dep => (
                <VersionEntry
                  key={dep}
                  dependencies={dependencies}
                  dependency={dep}
                  onRemove={name =>
                    editorSignals.npmDependencyRemoved({ name })
                  }
                  onRefresh={(name, version) =>
                    editorSignals.addNpmDependency({
                      name,
                      version,
                    })
                  }
                />
              ))}
            {/* {Object.keys(devDependencies).length > 0 && (
          <WorkspaceSubtitle>Development Dependencies</WorkspaceSubtitle>
        )}
        {Object.keys(devDependencies)
          .sort()
          .map(dep => (
            <VersionEntry
              key={dep}
              dependencies={devDependencies}
              dependency={dep}
              onRemove={name => signals.editor.npmDependencyRemoved({ name })}
              onRefresh={(name, version) =>
                signals.editor.addNpmDependency({
                  name,
                  version,
                })
              }
            />
          ))} */}
            <AddVersion>Add Dependency</AddVersion>
          </Margin>
          {templateDefinition.externalResourcesEnabled && (
            <div>
              <WorkspaceSubtitle>External Resources</WorkspaceSubtitle>
              {(sandbox.externalResources || []).map(resource => (
                <ExternalResource
                  key={resource}
                  resource={resource}
                  removeResource={() =>
                    workspace.externalResourceRemoved({
                      resource,
                    })
                  }
                />
              ))}
              <AddResource
                addResource={resource =>
                  workspace.externalResourceAdded({
                    resource,
                  })
                }
              />
            </div>
          )}
        </div>
      );
    }
  )
);

export default Dependencies;
