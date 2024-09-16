import { accordionFields } from './contentModelFields/accordion.fields'
import { accordionItemFields } from './contentModelFields/accordionItems.fields'
import { breadCrumbFields } from './contentModelFields/breadcrumb.fields'
import { calloutFields } from './contentModelFields/callout.fields'
import { cardComponentFields } from './contentModelFields/cardComponent.fields'
import { carouselFields } from './contentModelFields/carousel.fields'
import { countDownFields } from './contentModelFields/countdown.fields'
import { CTAFields } from './contentModelFields/cta.fields'
import { CTARowFields } from './contentModelFields/ctaRow.fields'
import { featuredRowsFields } from './contentModelFields/featuedRows.fields'
import { formFields } from './contentModelFields/form.fields'
import { heroFields } from './contentModelFields/hero.fields'
import { imageGalleryFields } from './contentModelFields/imageGallery.fields'
import { logoFields } from './contentModelFields/logo.fields'
import { logoShowcaseFields } from './contentModelFields/logoShowcase.fields'
import { menuListFields } from './contentModelFields/menuList.fields'
import { navigationHeaderFields } from './contentModelFields/navigation.fields'
import { navigationMenuItemFields } from './contentModelFields/navigationMenuItem.fields'
import { notificationFields } from './contentModelFields/notification.fields'
import { pageFields } from './contentModelFields/page.fields'
import { playerFields } from './contentModelFields/player.fields'
import { popupFields } from './contentModelFields/popup.fields'
import { afsFields } from './contentModelFields/sysAfs.fields'
import { dtsFields } from './contentModelFields/sysDts.fields'

// globalCommonFields are fields that are common across all content types
export const globalCommonFields = ['internalName']

// heroCommonFields are fields that are common across all hero templates.
const heroCommonFields = ['heading', 'description', 'bgImage']

// fieldsConfig is a map of content types to their fields.
const fieldsConfig = {
  page: pageFields,
  hero: heroFields,
  cardComponent: cardComponentFields,
  componentAccordionItem: accordionItemFields,
  componentAccordion: accordionFields,
  linkComponent: CTAFields,
  componentCallout: calloutFields,
  componentCtaRow: CTARowFields,
  componentMenuList: menuListFields,
  componentFeaturedRows: featuredRowsFields,
  carouselComponent: carouselFields,
  heroComponent: heroFields,
  componentNavigationHeader: navigationHeaderFields,
  navigationMenuItems: navigationMenuItemFields,
  breadCrumbComponent: breadCrumbFields,
  componentCountdown: countDownFields,
  componentLogo: logoFields,
  componentLogoShowcase: logoShowcaseFields,
  componentNotification: notificationFields,
  componentPopup: popupFields,
  player: playerFields,
  systemAfs: afsFields,
  componentGallery: imageGalleryFields,
  componentForm: formFields,
  componentDynamicTagging: dtsFields
}

export default fieldsConfig
