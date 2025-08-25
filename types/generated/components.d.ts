import type { Schema, Struct } from '@strapi/strapi';

export interface GlobalFooter extends Struct.ComponentSchema {
  collectionName: 'components_global_footers';
  info: {
    description: '';
    displayName: 'footer';
    icon: 'apps';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    disclaimer: Schema.Attribute.Text;
    sections: Schema.Attribute.Component<'global.navigation-section', true>;
  };
}

export interface GlobalNavigation extends Struct.ComponentSchema {
  collectionName: 'components_global_navigations';
  info: {
    displayName: 'navigation';
    icon: 'code';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    panels: Schema.Attribute.Component<'global.navigation-panel', true>;
  };
}

export interface GlobalNavigationPanel extends Struct.ComponentSchema {
  collectionName: 'components_global_navigation_panels';
  info: {
    displayName: 'navigationPanel';
    icon: 'grid';
  };
  attributes: {
    icon: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.link', false>;
    links: Schema.Attribute.Component<'shared.link', true>;
    pushes: Schema.Attribute.Component<'global.navigation-push', true>;
    sections: Schema.Attribute.Component<'global.navigation-section', true>;
  };
}

export interface GlobalNavigationPush extends Struct.ComponentSchema {
  collectionName: 'components_global_navigation_pushes';
  info: {
    displayName: 'navigationPush';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface GlobalNavigationSection extends Struct.ComponentSchema {
  collectionName: 'components_global_navigation_sections';
  info: {
    displayName: 'navigationSection';
    icon: 'bulletList';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface GlobalSubscriptionForm extends Struct.ComponentSchema {
  collectionName: 'components_global_subscription_forms';
  info: {
    displayName: 'subscriptionForm';
    icon: 'paperPlane';
  };
  attributes: {
    buttonText: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    disclaimer: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_buttons';
  info: {
    description: '';
    displayName: 'button';
    icon: 'play';
  };
  attributes: {
    action: Schema.Attribute.Enumeration<['navigate', 'request-a-call']> &
      Schema.Attribute.DefaultTo<'navigate'>;
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String;
    link: Schema.Attribute.Component<'shared.link', false>;
    theme: Schema.Attribute.Enumeration<['light', 'dark']> &
      Schema.Attribute.DefaultTo<'light'>;
    type: Schema.Attribute.Enumeration<
      [
        'elevated',
        'filled',
        'filled_tonal',
        'outlined',
        'text',
        'icon',
        'segmented',
        'fab',
        'fab_extended',
      ]
    > &
      Schema.Attribute.DefaultTo<'filled'>;
  };
}

export interface SharedCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_cards';
  info: {
    description: '';
    displayName: 'card';
    icon: 'picture';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    title: Schema.Attribute.String;
  };
}

export interface SharedEdito extends Struct.ComponentSchema {
  collectionName: 'components_shared_editos';
  info: {
    description: '';
    displayName: 'edito';
    icon: 'feather';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    label: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    text: Schema.Attribute.RichText;
    theme: Schema.Attribute.Enumeration<['light', 'dark']> &
      Schema.Attribute.DefaultTo<'light'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'link';
    icon: 'link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
    target: Schema.Attribute.Enumeration<['_blank']>;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    description: '';
    displayName: 'listItem';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    icon: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    theme: Schema.Attribute.Enumeration<['light', 'dark']> &
      Schema.Attribute.DefaultTo<'light'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedMetaSocial extends Struct.ComponentSchema {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    description: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    socialNetwork: Schema.Attribute.Enumeration<['Facebook', 'Twitter']> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
  };
  attributes: {
    canonicalURL: Schema.Attribute.String;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.String & Schema.Attribute.Required;
    metaImage: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    metaRobots: Schema.Attribute.String;
    metaSocial: Schema.Attribute.Component<'shared.meta-social', true>;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    metaViewport: Schema.Attribute.String;
    structuredData: Schema.Attribute.JSON;
  };
}

export interface SlicesBestsellers extends Struct.ComponentSchema {
  collectionName: 'components_slices_bestsellers';
  info: {
    displayName: 'bestsellers';
    icon: 'dashboard';
  };
  attributes: {
    content: Schema.Attribute.Component<'shared.edito', true>;
    title: Schema.Attribute.String;
  };
}

export interface SlicesFlexibleBlocks extends Struct.ComponentSchema {
  collectionName: 'components_slices_flexible_blocks';
  info: {
    displayName: 'flexibleBlocks';
    icon: 'apps';
  };
  attributes: {
    content: Schema.Attribute.Component<'shared.list-item', true>;
    title: Schema.Attribute.String;
  };
}

export interface SlicesHero extends Struct.ComponentSchema {
  collectionName: 'components_slices_heroes';
  info: {
    displayName: 'hero';
    icon: 'stack';
  };
  attributes: {
    content: Schema.Attribute.Component<'shared.edito', false>;
    image: Schema.Attribute.Media<'images'>;
  };
}

export interface SlicesInfoBlock extends Struct.ComponentSchema {
  collectionName: 'components_slices_info_blocks';
  info: {
    description: '';
    displayName: 'infoBlock';
    icon: 'picture';
  };
  attributes: {
    content: Schema.Attribute.Component<'shared.edito', false>;
    image: Schema.Attribute.Media<'images'>;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'right'>;
  };
}

export interface SlicesMarkdown extends Struct.ComponentSchema {
  collectionName: 'components_slices_markdowns';
  info: {
    displayName: 'markdown';
    icon: 'file';
  };
  attributes: {
    content: Schema.Attribute.RichText;
    title: Schema.Attribute.String;
  };
}

export interface SlicesMosaic extends Struct.ComponentSchema {
  collectionName: 'components_slices_mosaics';
  info: {
    displayName: 'mosaic';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface SlicesPromotions extends Struct.ComponentSchema {
  collectionName: 'components_slices_promotions';
  info: {
    displayName: 'promotions';
    icon: 'apps';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.card', true>;
    title: Schema.Attribute.String;
  };
}

export interface SlicesRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'richText';
    icon: 'bold';
  };
  attributes: {
    content: Schema.Attribute.Blocks;
    title: Schema.Attribute.String;
  };
}

export interface SlicesSlider extends Struct.ComponentSchema {
  collectionName: 'components_slices_sliders';
  info: {
    displayName: 'slider';
    icon: 'stack';
  };
  attributes: {
    content: Schema.Attribute.Component<'shared.edito', true>;
    title: Schema.Attribute.String;
  };
}

export interface SlicesTitleWithThreeArticles extends Struct.ComponentSchema {
  collectionName: 'components_slices_title_with_three_articles';
  info: {
    displayName: 'titleWithThreeArticles';
    icon: 'chartBubble';
  };
  attributes: {
    articles: Schema.Attribute.Component<'shared.edito', true> &
      Schema.Attribute.SetMinMax<
        {
          max: 3;
          min: 3;
        },
        number
      >;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'global.footer': GlobalFooter;
      'global.navigation': GlobalNavigation;
      'global.navigation-panel': GlobalNavigationPanel;
      'global.navigation-push': GlobalNavigationPush;
      'global.navigation-section': GlobalNavigationSection;
      'global.subscription-form': GlobalSubscriptionForm;
      'shared.button': SharedButton;
      'shared.card': SharedCard;
      'shared.edito': SharedEdito;
      'shared.link': SharedLink;
      'shared.list-item': SharedListItem;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
      'slices.bestsellers': SlicesBestsellers;
      'slices.flexible-blocks': SlicesFlexibleBlocks;
      'slices.hero': SlicesHero;
      'slices.info-block': SlicesInfoBlock;
      'slices.markdown': SlicesMarkdown;
      'slices.mosaic': SlicesMosaic;
      'slices.promotions': SlicesPromotions;
      'slices.rich-text': SlicesRichText;
      'slices.slider': SlicesSlider;
      'slices.title-with-three-articles': SlicesTitleWithThreeArticles;
    }
  }
}
