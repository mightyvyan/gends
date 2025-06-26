export interface UIComponentToken {
  id: string;
  name: string;
  description: string;
  category: string;
  defaultValue?: string;
  examples?: string[];
}

export const UI_COMPONENT_TOKENS: UIComponentToken[] = [
  // Primary Button
  {
    id: 'primary-button-idle',
    name: 'Primary Button - Idle',
    description: 'Background color for primary buttons in their default state',
    category: 'Buttons',
    defaultValue: 'blue-500',
    examples: ['Submit', 'Save', 'Continue']
  },
  {
    id: 'primary-button-hover',
    name: 'Primary Button - Hover',
    description: 'Background color for primary buttons when hovered',
    category: 'Buttons',
    defaultValue: 'blue-600',
    examples: ['Submit:hover', 'Save:hover']
  },
  {
    id: 'primary-button-pressed',
    name: 'Primary Button - Pressed',
    description: 'Background color for primary buttons when pressed/active',
    category: 'Buttons',
    defaultValue: 'blue-700',
    examples: ['Submit:active', 'Save:active']
  },
  {
    id: 'primary-button-disabled',
    name: 'Primary Button - Disabled',
    description: 'Background color for disabled primary buttons',
    category: 'Buttons',
    defaultValue: 'neutral-100',
    examples: ['Disabled submit button']
  },
  {
    id: 'primary-button-text',
    name: 'Primary Button - Text',
    description: 'Text color for primary buttons',
    category: 'Buttons',
    defaultValue: 'neutral-0',
    examples: ['Button label text']
  },
  {
    id: 'primary-button-disabled-text',
    name: 'Primary Button - Disabled Text',
    description: 'Text color for disabled primary buttons',
    category: 'Buttons',
    defaultValue: 'neutral-400',
    examples: ['Disabled button text']
  },

  // Secondary Button
  {
    id: 'secondary-button-idle',
    name: 'Secondary Button - Idle',
    description: 'Background color for secondary buttons in their default state',
    category: 'Buttons',
    defaultValue: 'neutral-0',
    examples: ['Cancel', 'Back', 'Skip']
  },
  {
    id: 'secondary-button-hover',
    name: 'Secondary Button - Hover',
    description: 'Background color for secondary buttons when hovered',
    category: 'Buttons',
    defaultValue: 'neutral-50',
    examples: ['Cancel:hover', 'Back:hover']
  },
  {
    id: 'secondary-button-pressed',
    name: 'Secondary Button - Pressed',
    description: 'Background color for secondary buttons when pressed',
    category: 'Buttons',
    defaultValue: 'neutral-100',
    examples: ['Cancel:active', 'Back:active']
  },
  {
    id: 'secondary-button-border',
    name: 'Secondary Button - Border',
    description: 'Border color for secondary buttons',
    category: 'Buttons',
    defaultValue: 'neutral-300',
    examples: ['Outlined buttons']
  },
  {
    id: 'secondary-button-text',
    name: 'Secondary Button - Text',
    description: 'Text color for secondary buttons',
    category: 'Buttons',
    defaultValue: 'neutral-700',
    examples: ['Secondary button labels']
  },

  // Link Button
  {
    id: 'link-button-background',
    name: 'Link Button - Background',
    description: 'Background color for link-style buttons',
    category: 'Buttons',
    defaultValue: 'transparent',
    examples: ['Text links', 'Navigation links']
  },
  {
    id: 'link-button-text',
    name: 'Link Button - Text',
    description: 'Text color for link-style buttons',
    category: 'Buttons',
    defaultValue: 'blue-500',
    examples: ['Learn more', 'View details']
  },
  {
    id: 'link-button-hover',
    name: 'Link Button - Hover',
    description: 'Text color for link buttons when hovered',
    category: 'Buttons',
    defaultValue: 'blue-600',
    examples: ['Link:hover state']
  },

  // Form Inputs
  {
    id: 'text-input-background',
    name: 'Text Input - Background',
    description: 'Background color for text input fields',
    category: 'Forms',
    defaultValue: 'neutral-0',
    examples: ['Email input', 'Name field', 'Search box']
  },
  {
    id: 'text-input-border',
    name: 'Text Input - Border',
    description: 'Border color for text input fields',
    category: 'Forms',
    defaultValue: 'neutral-300',
    examples: ['Input field borders']
  },
  {
    id: 'text-input-focus-border',
    name: 'Text Input - Focus Border',
    description: 'Border color for focused text input fields',
    category: 'Forms',
    defaultValue: 'blue-500',
    examples: ['Active input field']
  },
  {
    id: 'text-input-text',
    name: 'Text Input - Text',
    description: 'Text color for input field content',
    category: 'Forms',
    defaultValue: 'neutral-900',
    examples: ['User typed text']
  },
  {
    id: 'text-input-placeholder',
    name: 'Text Input - Placeholder',
    description: 'Color for placeholder text in input fields',
    category: 'Forms',
    defaultValue: 'neutral-400',
    examples: ['Enter your email...']
  },

  // Navigation Tabs
  {
    id: 'tab-selected-background',
    name: 'Tab - Selected Background',
    description: 'Background color for the active/selected tab',
    category: 'Navigation',
    defaultValue: 'blue-500',
    examples: ['Active tab in navigation']
  },
  {
    id: 'tab-selected-text',
    name: 'Tab - Selected Text',
    description: 'Text color for the active/selected tab',
    category: 'Navigation',
    defaultValue: 'neutral-0',
    examples: ['Active tab label']
  },
  {
    id: 'tab-inactive-background',
    name: 'Tab - Inactive Background',
    description: 'Background color for inactive tabs',
    category: 'Navigation',
    defaultValue: 'neutral-100',
    examples: ['Unselected tabs']
  },
  {
    id: 'tab-inactive-text',
    name: 'Tab - Inactive Text',
    description: 'Text color for inactive tabs',
    category: 'Navigation',
    defaultValue: 'neutral-600',
    examples: ['Unselected tab labels']
  },
  {
    id: 'tab-hover-background',
    name: 'Tab - Hover Background',
    description: 'Background color for tabs when hovered',
    category: 'Navigation',
    defaultValue: 'neutral-200',
    examples: ['Tab hover state']
  },

  // Status Colors
  {
    id: 'success-background',
    name: 'Success - Background',
    description: 'Background color for success states and messages',
    category: 'Status',
    defaultValue: 'green-50',
    examples: ['Success alerts', 'Completed states']
  },
  {
    id: 'success-text',
    name: 'Success - Text',
    description: 'Text color for success messages',
    category: 'Status',
    defaultValue: 'green-700',
    examples: ['Success message text']
  },
  {
    id: 'success-border',
    name: 'Success - Border',
    description: 'Border color for success elements',
    category: 'Status',
    defaultValue: 'green-200',
    examples: ['Success alert borders']
  },
  {
    id: 'warning-background',
    name: 'Warning - Background',
    description: 'Background color for warning states and messages',
    category: 'Status',
    defaultValue: 'orange-50',
    examples: ['Warning alerts', 'Caution states']
  },
  {
    id: 'warning-text',
    name: 'Warning - Text',
    description: 'Text color for warning messages',
    category: 'Status',
    defaultValue: 'orange-700',
    examples: ['Warning message text']
  },
  {
    id: 'error-background',
    name: 'Error - Background',
    description: 'Background color for error states and messages',
    category: 'Status',
    defaultValue: 'red-50',
    examples: ['Error alerts', 'Failed states']
  },
  {
    id: 'error-text',
    name: 'Error - Text',
    description: 'Text color for error messages',
    category: 'Status',
    defaultValue: 'red-700',
    examples: ['Error message text']
  },

  // General UI
  {
    id: 'page-background',
    name: 'Page - Background',
    description: 'Main background color for pages',
    category: 'Layout',
    defaultValue: 'neutral-0',
    examples: ['Page background', 'Main content area']
  },
  {
    id: 'card-background',
    name: 'Card - Background',
    description: 'Background color for cards and panels',
    category: 'Layout',
    defaultValue: 'neutral-0',
    examples: ['Content cards', 'Modal backgrounds']
  },
  {
    id: 'card-border',
    name: 'Card - Border',
    description: 'Border color for cards and panels',
    category: 'Layout',
    defaultValue: 'neutral-200',
    examples: ['Card outlines', 'Panel borders']
  },
  {
    id: 'divider-color',
    name: 'Divider - Color',
    description: 'Color for dividers and separators',
    category: 'Layout',
    defaultValue: 'neutral-200',
    examples: ['Section dividers', 'List separators']
  },
];

export const UI_COMPONENT_CATEGORIES = [
  'Buttons',
  'Forms',
  'Navigation',
  'Status',
  'Layout',
];