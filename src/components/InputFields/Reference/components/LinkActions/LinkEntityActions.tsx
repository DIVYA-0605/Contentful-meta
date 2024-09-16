import * as React from "react";
import { useMemo } from "react";

import { EditorAppSDK } from "@contentful/app-sdk";
import { EditorPermissions } from "../../common/useEditorPermissions";
import {
  Action,
  ActionLabels,
  Asset,
  ContentEntityType,
  Entry,
  NavigatorSlideInfo,
} from "../../types";
import { CombinedLinkActions } from "./CombinedLinkActions";
import { LinkActions, LinkActionsProps } from "./LinkActions";
import {
  createEntity,
  selectMultipleEntities,
  selectSingleEntity,
} from "./helpers";

type LinkEntityActionsProps = {
  fieldId: string;
  entityType: ContentEntityType;
  canLinkMultiple: boolean;
  sdk: EditorAppSDK;
  isDisabled: boolean;
  editorPermissions: EditorPermissions;
  onCreate: (id: string, index?: number) => void;
  onLink: (ids: string[], index?: number) => void;
  onAction?: (action: Action) => void;
  actionLabels?: Partial<ActionLabels>;
  itemsLength?: number;
};

export function useLinkActionsProps(
  props: LinkEntityActionsProps
): LinkActionsProps {
  const {
    fieldId,
    sdk,
    editorPermissions,
    entityType,
    canLinkMultiple,
    isDisabled,
    actionLabels,
    itemsLength,
  } = props;

  const maxLinksCount = editorPermissions.validations.numberOfLinks?.max;
  const value = sdk.entry.fields[fieldId].getValue();
  const linkCount = Array.isArray(value) ? value.length : value ? 1 : 0;
  const isFull = !!maxLinksCount && maxLinksCount <= linkCount;
  const isEmpty = linkCount === 0;

  const onCreated = React.useCallback(
    (
      entity: Entry | Asset,
      index = itemsLength,
      slide?: NavigatorSlideInfo
    ) => {
      props.onCreate(entity.sys.id, index);
      props.onAction &&
        props.onAction({
          type: "create_and_link",
          entity: entityType,
          entityData: entity,
          slide,
          index,
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
    [entityType, props.onCreate, props.onAction]
  );
  const onLinkedExisting = React.useCallback(
    (entities: Array<Entry | Asset>, index = itemsLength) => {
      props.onLink(
        entities.map((item) => item.sys.id),
        index
      );
      entities.forEach((entity, i) => {
        props.onAction &&
          props.onAction({
            type: "select_and_link",
            entity: entityType,
            entityData: entity,
            index: index === undefined ? undefined : index + i,
          });
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
    [entityType, props.onLink, props.onAction]
  );

  const onCreate = React.useCallback(
    async (contentTypeId?: string, index?: number) => {
      const { entity, slide } = await createEntity({
        sdk,
        entityType,
        contentTypeId,
      });
      if (!entity) {
        return;
      }

      onCreated(entity, index, slide);
    },
    [sdk, entityType, onCreated]
  );

  const onLinkExisting = React.useCallback(
    async (index?: number) => {
      const entity = await selectSingleEntity({
        sdk,
        entityType,
        editorPermissions,
      });
      if (!entity) {
        return;
      }

      onLinkedExisting([entity], index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
    [sdk, entityType, onLinkedExisting]
  );

  const onLinkSeveralExisting = React.useCallback(
    async (index?: number) => {
      const entities = await selectMultipleEntities({
        fieldId,
        sdk,
        entityType,
        editorPermissions,
      });

      if (!entities || entities.length === 0) {
        return;
      }
      onLinkedExisting(entities, index);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
    [sdk, entityType, onLinkedExisting]
  );

  // FIXME: The memoization might rerun every time due to the always changing callback identities above
  return useMemo(
    () => ({
      entityType,
      canLinkMultiple,
      isDisabled,
      isEmpty,
      isFull,
      canCreateEntity: editorPermissions.canCreateEntity,
      canLinkEntity: editorPermissions.canLinkEntity,
      contentTypes: editorPermissions.creatableContentTypes,
      onCreate,
      onLinkExisting: canLinkMultiple ? onLinkSeveralExisting : onLinkExisting,
      actionLabels,
      onCreated,
      onLinkedExisting,
      itemsLength,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
    [
      entityType,
      canLinkMultiple,
      isDisabled,
      isEmpty,
      isFull,
      editorPermissions.canCreateEntity,
      editorPermissions.canLinkEntity,
      actionLabels,
      // eslint-disable-next-line react-hooks/exhaustive-deps -- TODO: Evaluate the dependencies
      editorPermissions.creatableContentTypes.map((ct) => ct.sys.id).join(":"),
      onCreate,
      onLinkExisting,
      onLinkSeveralExisting,
      onCreated,
      onLinkedExisting,
      itemsLength,
    ]
  );
}

export function LinkEntityActions({
  renderCustomActions,
  ...props
}: LinkActionsProps & {
  renderCustomActions?: (props: LinkActionsProps) => React.ReactElement;
}) {
  return renderCustomActions ? (
    renderCustomActions(props)
  ) : (
    <LinkActions {...props} />
  );
}

export function CombinedLinkEntityActions({
  renderCustomActions,
  ...props
}: LinkActionsProps & {
  renderCustomActions?: (props: LinkActionsProps) => React.ReactElement;
}) {
  return renderCustomActions ? (
    renderCustomActions(props)
  ) : (
    <CombinedLinkActions {...props} />
  );
}
