const sysDtsFields = [
  'subHeading',
  'heading',
  'button',
  'tags',
  'limit',
  'orderBy',
  'condition',
  'breadCrumb',
  'description',
  'isLightMode',
]

export const dtsFields = {
  DynamicWidgetInsights: [...sysDtsFields],
  DynamicWidgetFeatured: [...sysDtsFields],
  DynamicHeroInsights: [...sysDtsFields],
  DynamicPressRelease: [...sysDtsFields],
  DynamicEventWidget: [...sysDtsFields],
  DynamicMediaHighlights: [...sysDtsFields],
  DynamicWidgetOurTeam: [...sysDtsFields],
}
