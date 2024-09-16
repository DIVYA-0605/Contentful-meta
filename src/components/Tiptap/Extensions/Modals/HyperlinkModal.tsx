import * as React from 'react'

import { EditorAppSDK } from '@contentful/app-sdk'
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  Modal,
  ModalControls,
  Select,
  TextInput,
  TextLink,
} from '@contentful/f36-components'
import tokens from '@contentful/f36-tokens'
import { EntityProvider, Link } from '@contentful/field-editor-reference'
import { INLINES } from '@contentful/rich-text-types'
import { useCurrentEditor } from '@tiptap/react'
import { css } from 'emotion'
import { GlobalContext } from '../../../../contexts/globalContext'
import {
  FetchingWrappedAssetCard,
} from '../../../InputFields/Reference/assets/WrappedAssetCard/FetchingWrappedAssetCard'
import {
  FetchingWrappedEntryCard,
} from '../../../InputFields/Reference/entries/WrappedEntryCard/FetchingWrappedEntryCard'


const styles = {
  removeSelectionLabel: css`
    margin-left: ${tokens.spacingS};
  `,
}

interface HyperlinkModalProps {
  linkText?: string;
  linkType?: string;
  linkTarget?: string;
  linkEntity?: Link;
  onClose: (value: unknown) => void;
  sdk: EditorAppSDK;
  readonly: boolean;
  fieldId: string;
}

const SYS_LINK_TYPES = {
  [INLINES.ENTRY_HYPERLINK]: 'Entry',
  [INLINES.ASSET_HYPERLINK]: 'Asset',
}

const LINK_TYPE_SELECTION_VALUES = {
  [INLINES.HYPERLINK]: 'URL',
  [INLINES.ENTRY_HYPERLINK]: 'Entry',
  [INLINES.ASSET_HYPERLINK]: 'Asset',
}

export function HyperlinkModal(props: HyperlinkModalProps) {

  // const [linkText, setLinkText] = React.useState(props.linkText)
  const [linkType, setLinkType] = React.useState(props.linkType ?? 'URL')
  const [linkTemplate, setLinkTemplate] = React.useState('Link')

  const [linkTarget, setLinkTarget] = React.useState('https://')
  const [linkEntity, setLinkEntity] = React.useState<Link | null>(props.linkEntity ?? null)
  const linkTargetInputRef = React.useRef<HTMLInputElement>(null)
  const locale = React.useContext(GlobalContext).currentLocale
  const { isHyperLinkModalOpen, setIsHyperLinkModalOpen } = React.useContext(GlobalContext)
  const { editor } = useCurrentEditor()
  const openInOptions = [{
    label: 'Same window',
    value: '_self',
  }, {
    label: 'New window',
    value: '_blank',
  }]
  const [openIn, setOpenIn] = React.useState(openInOptions[0].value)

  // React.useEffect(() => {
  //   if (linkType === INLINES.HYPERLINK && linkTargetInputRef.current) {
  //     linkTargetInputRef.current.focus();
  //   }
  // }, [linkType]);

  React.useEffect(() => {

    if (isHyperLinkModalOpen) {

      // const selectedText = getSelectedText(editor)
      // setLinkText(selectedText)

      const { href, target, entity } = editor?.getAttributes('link')
      if (entity) {
        setLinkType(entity.sys.linkType)
        setLinkEntity(entity)
      } else {
        setLinkType('URL')
        setLinkTarget(href)
      }
      setOpenIn(target)
      console.log('link attributes', editor?.getAttributes('link'))
    }

  }, [isHyperLinkModalOpen])

  function isLinkComplete() {
    const isRegularLink = linkType === 'URL'
    if (isRegularLink) {
      return !!(linkTarget)
    }

    // const entityLinks: string[] = Object.keys(SYS_LINK_TYPES)
    const isEntityLink = linkType === 'Entry' || linkType === 'Asset'
    if (isEntityLink) {
      return !!(linkEntity)
    }

    return false
  }

  function handleOnSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()

    if (linkType === 'URL') {
      editor?.chain()
        .extendMarkRange('link')
        .setLink({ href: linkTarget, entity: null, target: openIn, class: linkTemplate === "GenericLink" ? "genericLink" : "link" }).run()
    } else {
      editor?.chain()
        .extendMarkRange('link')
        .setLink({ href: '#', entity: linkEntity, target: openIn, class: linkTemplate === "GenericLink" ? "genericLink" : "link" }).run()
    }
    props.onClose({ linkType, linkTarget, linkEntity })
    setIsHyperLinkModalOpen(false)
    setLinkTarget('https://')
  }

  function entityToLink(entity: any): Link {
    const { id, type } = entity.sys

    return { sys: { id, type: 'Link', linkType: type } }
  }

  async function selectEntry() {
    const options = {
      locale: locale,
      // contentTypes: getLinkedContentTypeIdsForNodeType(props.sdk.entry.fields[fieldId], INLINES.ENTRY_HYPERLINK),
    }
    const entry = await props.sdk.dialogs.selectSingleEntry(options)
    setLinkTarget('')
    setLinkEntity(entityToLink(entry))
  }

  async function selectAsset() {
    const options = {
      locale: locale,
    }
    const asset = await props.sdk.dialogs.selectSingleAsset(options)
    setLinkTarget('')
    setLinkEntity(entityToLink(asset))
  }

  function resetLinkEntity() {
    setLinkEntity(null)
  }

  return (
    <EntityProvider sdk={props.sdk}>
      <Modal onClose={() => setIsHyperLinkModalOpen(false)} isShown={isHyperLinkModalOpen}>
        {() => (
          <>
            <Modal.Header
              title='Insert hyperlink'
              onClose={() => setIsHyperLinkModalOpen(false)}
            />
            <Modal.Content>
              <Form>
                {/*{(*/}
                {/*  <FormControl id='link-text' isRequired>*/}
                {/*    <FormControl.Label>Link text</FormControl.Label>*/}
                {/*    <TextInput*/}
                {/*      testId='link-text-input'*/}
                {/*      name='link-text'*/}
                {/*      value={linkText}*/}
                {/*      isReadOnly={true}*/}
                {/*      // onChange={(event) => setLinkText(event.target.value)}*/}
                {/*    />*/}
                {/*    <FormControl.HelpText>*/}
                {/*      Text selection required*/}
                {/*    </FormControl.HelpText>*/}
                {/*  </FormControl>*/}
                {/*)}*/}
                <FormControl id='link-type'>
                  <FormControl.Label>Link type</FormControl.Label>
                  <Select
                    value={linkType}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setLinkType(event.target.value)
                    }
                    testId='link-type-input'
                    isDisabled={props.readonly}
                  >
                    {['URL', 'Asset', 'Entry'].map((nodeType) => (
                      <Select.Option key={nodeType} value={nodeType}>
                        {nodeType}
                      </Select.Option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl>
                  <FormControl.Label>Open in</FormControl.Label>
                  <Select
                    value={openIn}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setOpenIn(event.target.value)
                    }
                    testId='link-type-input'
                    isDisabled={props.readonly}
                  >
                    {openInOptions.map((option) => (
                      <Select.Option key={option.value} value={option.value}>
                        {option.label}
                      </Select.Option>
                    ))}
                  </Select>
                </FormControl>


                {linkType === 'URL' && (
                  <FormControl id='linkTarget' isRequired>
                    <FormControl.Label>Link</FormControl.Label>
                    <TextInput
                      ref={linkTargetInputRef}
                      name='linkTarget'
                      value={linkTarget}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setLinkEntity(null)
                        setLinkTarget(event.target.value)
                      }}
                      testId='link-target-input'
                      isDisabled={props.readonly}
                    />
                    <FormControl.HelpText>
                      A protocol may be required, e.g. https://
                    </FormControl.HelpText>
                  </FormControl>
                )}

                <FormControl >
                  <FormControl.Label>Link Template</FormControl.Label>
                  <Select
                    value={linkTemplate}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      setLinkTemplate(event.target.value)
                    }
                    testId='link-type-input'
                    isDisabled={props.readonly}
                  >
                    {['GenericLink', 'Link'].map((nodeType) => (
                      <Select.Option key={nodeType} value={nodeType}>
                        {nodeType}
                      </Select.Option>
                    ))}
                  </Select>
                </FormControl>

                {linkType !== 'URL' && (
                  <div>
                    <FormLabel isRequired htmlFor=''>
                      Link target{' '}
                    </FormLabel>

                    {linkEntity
                      // && linkEntity.sys.linkType === SYS_LINK_TYPES[linkType]
                      ? (
                        <>
                          {!props.readonly && (
                            <TextLink
                              testId='entity-selection-link'
                              onClick={resetLinkEntity}
                              className={styles.removeSelectionLabel}
                            >
                              Remove selection
                            </TextLink>
                          )}
                          <div>
                            {linkType === 'Entry' && (
                              <FetchingWrappedEntryCard
                                fieldId={props.fieldId}
                                sdk={props.sdk}
                                entryId={linkEntity.sys.id}
                                isDisabled={true}
                                hasCardEditActions={false}
                                parameters={{
                                  instance: {
                                    showCreateEntityAction: false,
                                    showLinkEntityAction: true,
                                  },
                                }}
                                viewType={'link'}
                                isInitiallyDisabled={true}
                                onRemove={resetLinkEntity} />
                            )}
                            {linkType === 'Asset' && (
                              <FetchingWrappedAssetCard
                                sdk={props.sdk}
                                assetId={linkEntity.sys.id}
                                isDisabled={true}
                                viewType={'card'}
                                onRemove={resetLinkEntity} />
                            )}
                          </div>
                        </>
                      ) : (
                        <div>
                          {linkType === 'Entry' && (
                            <TextLink testId='entity-selection-link' onClick={selectEntry}>
                              Select entry
                            </TextLink>
                          )}
                          {linkType === 'Asset' && (
                            <TextLink testId='entity-selection-link' onClick={selectAsset}>
                              Select asset
                            </TextLink>
                          )}
                        </div>
                      )}
                  </div>
                )}
              </Form>

              <ModalControls>
                <Button
                  type='button'
                  onClick={() => {
                    props.onClose(null)
                    editor?.commands.unsetLink()
                    setIsHyperLinkModalOpen(false)
                  }}
                  variant='negative'
                  testId='cancel-cta'
                  size='small'
                >
                  Remove
                </Button>
                <Button
                  type='submit'
                  variant='positive'
                  size='small'
                  isDisabled={props.readonly || !isLinkComplete()}
                  onClick={handleOnSubmit}
                  testId='confirm-cta'
                >
                  {props.linkType ? 'Update' : 'Insert'}
                </Button>
              </ModalControls>
            </Modal.Content>
          </>
        )}
      </Modal>

    </EntityProvider>
  )
}