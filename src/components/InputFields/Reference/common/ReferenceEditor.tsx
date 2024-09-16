import * as React from 'react'
import { useContext } from 'react'

import deepEqual from 'deep-equal'

import type { LinkActionsProps } from '../components'
import { Action, ActionLabels, ViewType } from '../types'
import { CustomCardRenderer, RenderCustomMissingEntityCard } from './customCardTypes'
import { EntityProvider } from './EntityStore'
import { EditorAppSDK } from '@contentful/app-sdk'
import { FieldConnector } from '../../shared'
import { GlobalContext } from '../../../../contexts/globalContext'

// TODO: Rename common base for reference/media editors to something neutral,
//  e.g. `LinkEditor<T>`.

export interface ReferenceEditorProps {
  fieldId: string;
  /**
   * Whether or not the field should be disabled initially.
   */
  isInitiallyDisabled: boolean;
  hasCardEditActions: boolean;
  hasCardMoveActions?: boolean;
  hasCardRemoveActions?: boolean;
  sdk: EditorAppSDK;
  viewType: ViewType;
  renderCustomCard?: CustomCardRenderer;
  renderCustomActions?: (props: CustomActionProps) => React.ReactElement;
  renderCustomMissingEntityCard?: RenderCustomMissingEntityCard;
  getEntityUrl?: (entryId: string) => string;
  onAction?: (action: Action) => void;
  actionLabels?: Partial<ActionLabels>;
  parameters: {
    instance: {
      showCreateEntityAction?: boolean;
      showLinkEntityAction?: boolean;
      bulkEditing?: boolean;
    };
  };
  updateBeforeSortStart?: ({ index }: { index: number }) => void;
  onSortingEnd?: ({
                    oldIndex,
                    newIndex,
                  }: {
    oldIndex: number;
    newIndex: number;
  }) => void;
}

export type CustomActionProps = LinkActionsProps;

export function ReferenceEditor<T>(
  props: ReferenceEditorProps & {
    children: FieldConnector<T>['props']['children'];
  },
) {
  const currentLocale = useContext(GlobalContext).currentLocale
  
  return (
    <EntityProvider sdk={props.sdk}>
      <FieldConnector<T>
        throttle={0}
        field={props.sdk.entry.fields[props.fieldId].getForLocale(currentLocale)}
        isInitiallyDisabled={props.isInitiallyDisabled}
        isEqualValues={(value1, value2) => {
          return deepEqual(value1, value2)
        }}
      >
        {props.children}
      </FieldConnector>
    </EntityProvider>
  )
}

ReferenceEditor.defaultProps = {
  isInitiallyDisabled: true,
  hasCardEditActions: true,
}