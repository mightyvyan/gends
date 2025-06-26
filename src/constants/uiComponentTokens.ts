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
    defaultValue: 'color-blue-500',
    examples: ['Submit', 'Save', 'Continue']
  },
  {
    id: 'primary-button-hover',
    name: 'Primary Button - Hover',
    description: 'Background color for primary buttons when hovered',
    category: 'Buttons',
    defaultValue: 'color-blue-600',
    examples: ['Submit:hover', 'Save:hover']
  },
  {
    id: 'primary-button-pressed',
    name: 'Primary Button - Pressed',
    description: 'Background color for primary buttons when pressed/active',
    category: 'Buttons',
    defaultValue: 'color-blue-700',
    examples: ['Submit:active', 'Save:active']
  },
  {
    id: 'primary-button-disabled',
    name: 'Primary Button - Disabled',
    description: 'Background color for disabled primary buttons',
    category: 'Buttons',
    defaultValue: 'color-gray-300',
    examples: ['Disabled submit button']
  },
  {
    id: 'primary-button-text',
    name: 'Primary Button - Text',
    description: 'Text color for primary buttons',
    category: 'Buttons',
    defaultValue: 'color-white-500',
    examples: ['Button label text']
  },

  // Secondary Button
  {
    id: 'secondary-button-idle',
    name: 'Secondary Button - Idle',
    description: 'Background color for secondary buttons in their default state',
    category: 'Buttons',
    defaultValue: 'color-gray-100',
    examples: ['Cancel', 'Back', 'Skip']
  },
  {
    id: 'secondary-button-hover',
    name: 'Secondary Button - Hover',
    description: 'Background color for secondary buttons when hovered',
    category: 'Buttons',
    defaultValue: 'color-gray-200',
    examples: ['Cancel:hover', 'Back:hover']
  },
  {
    id: 'secondary-button-pressed',
    name: 'Secondary Button - Pressed',
    description: 'Background color for secondary buttons when pressed',
    category: 'Buttons',
    defaultValue: 'color-gray-300',
    examples: ['Cancel:active', 'Back:active']
  },
  {
    id: 'secondary-button-border',
    name: 'Secondary Button - Border',
    description: 'Border color for secondary buttons',
    category: 'Buttons',
    defaultValue: 'color-gray-400',
    examples: ['Outlined buttons']
  },
  {
    id: 'secondary-button-text',
    name: 'Secondary Button - Text',
    description: 'Text color for secondary buttons',
    category: 'Buttons',
    defaultValue: 'color-gray-700',
    examples: ['Secondary button labels']
  },

  // Link Button
  {
    id: 'link-button-text',
    name: 'Link Button - Text',
    description: 'Text color for link-style buttons',
    category: 'Buttons',
    defaultValue: 'color-blue-500',
    examples: ['Learn more', 'View details']
  },
  {
    id: 'link-button-hover',
    name: 'Link Button - Hover',
    description: 'Text color for link buttons when hovered',
    category: 'Buttons',
    defaultValue: 'color-blue-600',
    examples: ['Link:hover state']
  },

  // Text Input
  {
    id: 'text-input-background',
    name: 'Text Input - Background',
    description: 'Background color for text input fields',
    category: 'Text Input',
    defaultValue: 'color-white-500',
    examples: ['Email input', 'Name field', 'Search box']
  },
  {
    id: 'text-input-border',
    name: 'Text Input - Border',
    description: 'Border color for text input fields',
    category: 'Text Input',
    defaultValue: 'color-gray-300',
    examples: ['Input field borders']
  },
  {
    id: 'text-input-focus-border',
    name: 'Text Input - Focus Border',
    description: 'Border color for focused text input fields',
    category: 'Text Input',
    defaultValue: 'color-blue-500',
    examples: ['Active input field']
  },
  {
    id: 'text-input-text',
    name: 'Text Input - Text',
    description: 'Text color for input field content',
    category: 'Text Input',
    defaultValue: 'color-gray-900',
    examples: ['User typed text']
  },
  {
    id: 'text-input-placeholder',
    name: 'Text Input - Placeholder',
    description: 'Color for placeholder text in input fields',
    category: 'Text Input',
    defaultValue: 'color-gray-400',
    examples: ['Enter your email...']
  },

  // Radio Button
  {
    id: 'radio-button-background',
    name: 'Radio Button - Background',
    description: 'Background color for radio button circles',
    category: 'Radio',
    defaultValue: 'color-white-500',
    examples: ['Radio button background']
  },
  {
    id: 'radio-button-border',
    name: 'Radio Button - Border',
    description: 'Border color for radio button circles',
    category: 'Radio',
    defaultValue: 'color-gray-300',
    examples: ['Radio button outline']
  },
  {
    id: 'radio-button-selected',
    name: 'Radio Button - Selected',
    description: 'Color for selected radio button indicator',
    category: 'Radio',
    defaultValue: 'color-blue-500',
    examples: ['Selected radio button dot']
  },
  {
    id: 'radio-button-hover',
    name: 'Radio Button - Hover',
    description: 'Border color for radio buttons when hovered',
    category: 'Radio',
    defaultValue: 'color-blue-300',
    examples: ['Radio button hover state']
  },
  {
    id: 'radio-button-text',
    name: 'Radio Button - Text',
    description: 'Text color for radio button labels',
    category: 'Radio',
    defaultValue: 'color-gray-700',
    examples: ['Radio button label text']
  },
];

export const UI_COMPONENT_CATEGORIES = [
  'Buttons',
  'Text Input',
  'Radio',
];