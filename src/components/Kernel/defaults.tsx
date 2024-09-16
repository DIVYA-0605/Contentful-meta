import {InteractiveI, KernelI} from './interface'

export const InteractiveD: InteractiveI = {
    isInteractive: true,
    isFocusable: true,
    isTrackable: true,
    isEnabled: true,
    isBlurred: false,
    isFocused: false,
    isHighlighted: false,
    isHotspot: false,
    isHotspotActive: false,
    isHotspotEnabled: false
}

export const KernelD: KernelI = {
    _conf: {
        name: 'Kernel',
        NS: 'Altus',
        family: '',
        status: 'READY',
        genus: '',
        isDisabledContent: '',
        version: '',
        isIndexable: false,
        contentfulMeta: {
            __typename: '',
            contentful_id: '',
            id: '',
            tags: [],
            children: [],
            createdAt: '',
            node_locale: '',
            description: '',
            dateAdded: '',
            dateUpdated: ''
        }
    },
    ...InteractiveD,
    as: 'div',
    isImmersive: false,
    isInteractive: false,
    isFocusable: false,
    isTrackable: false,
    isVisible: true,
    isPresent: true,
    isAsIs: false,
    theme: 'LIGHT',
    isEnabled: true
}