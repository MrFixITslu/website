# VISION79 DESIGN GUIDELINES

## Brand Identity System

### Brand Personality
- **Professional yet approachable**: We maintain high standards while being accessible to small businesses
- **Innovative and forward-thinking**: We embrace cutting-edge AI technology with practical applications
- **Trustworthy and reliable**: We build long-term relationships based on results and transparency
- **Local expertise with global standards**: We understand Caribbean business needs with world-class solutions

### Brand Voice
- **Confident but not arrogant**: We know our capabilities but remain humble
- **Technical but human**: We explain complex AI concepts in simple terms
- **Success-oriented**: We focus on outcomes and business growth
- **Local and personal**: We emphasize our St. Lucia roots and personal service

## Color Palette

### Primary Colors
- **Primary Blue** `#1a365d`: Deep professional blue for trust and stability
- **Secondary Blue** `#3182ce`: Vibrant blue for CTAs and highlights
- **Accent Orange** `#f97316`: Energetic orange for calls-to-action
- **Success Green** `#059669`: Success states and positive outcomes

### Neutral Colors
- **Dark Gray** `#1f2937`: Text and headings
- **Medium Gray** `#6b7280`: Secondary text
- **Light Gray** `#f3f4f6`: Backgrounds and borders
- **White** `#ffffff`: Primary backgrounds

### Semantic Colors
- **Error** `#dc2626`: Form errors and warnings
- **Warning** `#d97706`: Important notices
- **Info** `#2563eb`: Information and links

## Typography System

### Font Family
- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, sans-serif

### Font Weights
- **Normal**: 400 (Body text)
- **Medium**: 500 (Accent text, labels)
- **Semibold**: 600 (Subheadings, buttons)
- **Bold**: 700 (Headings, emphasis)

### Type Scale
- **Heading 1**: 3.5rem (56px) - Bold
- **Heading 2**: 2.5rem (40px) - Bold
- **Heading 3**: 2rem (32px) - Semibold
- **Heading 4**: 1.5rem (24px) - Semibold
- **Body Large**: 1.25rem (20px) - Normal
- **Body Medium**: 1.1rem (18px) - Normal
- **Body Small**: 1rem (16px) - Normal

## Spacing System

### Scale
- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

### Usage
- Component padding: `md` to `xl`
- Section spacing: `2xl` to `3xl`
- Element gaps: `sm` to `lg`
- Text margins: `xs` to `md`

## Border Radius

### Scale
- **sm**: 0.25rem (4px) - Small elements
- **md**: 0.5rem (8px) - Buttons, inputs
- **lg**: 1rem (16px) - Cards, containers
- **xl**: 1.5rem (24px) - Large components

## Shadows

### Scale
- **sm**: `0 1px 2px 0 rgba(0, 0, 0, 0.05)` - Subtle elevation
- **md**: `0 4px 6px -1px rgba(0, 0, 0, 0.1)` - Cards, buttons
- **lg**: `0 10px 15px -3px rgba(0, 0, 0, 0.1)` - Elevated components
- **xl**: `0 20px 25px -5px rgba(0, 0, 0, 0.1)` - Hero elements

## Animation System

### Transitions
- **Fast**: 0.15s ease - Hover states
- **Normal**: 0.3s ease - Standard interactions
- **Slow**: 0.5s ease - Page transitions
- **Bounce**: cubic-bezier(0.68, -0.55, 0.265, 1.55) - CTAs

### Keyframes
- **fadeInUp**: Content entrance animations
- **fadeInLeft/Right**: Side entrance animations
- **scaleIn**: Modal and overlay animations
- **slideInUp**: Bottom sheet animations
- **pulse**: Loading and attention states
- **shimmer**: Loading placeholders

## Component Library

### Buttons

#### Primary Button
```css
.btn-primary {
    background: var(--gradient-primary);
    color: var(--color-white);
    padding: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-bounce);
}
```

#### Secondary Button
```css
.btn-secondary {
    background: var(--color-white);
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    padding: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-bounce);
}
```

#### Accent Button
```css
.btn-accent {
    background: var(--gradient-accent);
    color: var(--color-white);
    padding: var(--spacing-md) var(--spacing-xl);
    border-radius: var(--radius-lg);
    font-weight: var(--font-weight-medium);
    transition: all var(--transition-bounce);
}
```

### Cards

#### Service Card
```css
.service-card {
    background: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-xl);
    transition: all var(--transition-bounce);
    border: 1px solid rgba(31, 41, 55, 0.1);
    position: relative;
    overflow: hidden;
}

.service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: var(--gradient-primary);
    transform: scaleX(0);
    transition: transform var(--transition-normal);
}

.service-card:hover::before {
    transform: scaleX(1);
}
```

### Forms

#### Input Fields
```css
.form-input {
    width: 100%;
    padding: var(--spacing-md);
    border: 2px solid var(--color-light);
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-family: var(--font-family);
    transition: all var(--transition-fast);
    background: var(--color-white);
}

.form-input:focus {
    outline: none;
    border-color: var(--color-secondary);
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}
```

## Layout System

### Grid System
- **Mobile First**: Single column on mobile
- **Tablet**: 2 columns for medium screens
- **Desktop**: 3-4 columns for large screens
- **Gap**: Consistent `var(--spacing-lg)` between grid items

### Container
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--spacing-lg);
}
```

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Accessibility Guidelines

### WCAG 2.1 AA Compliance
- **Color Contrast**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Focus Indicators**: Clear focus states for all interactive elements
- **Keyboard Navigation**: All functionality accessible via keyboard
- **Screen Reader Support**: Proper ARIA labels and semantic HTML

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

## Logo Usage

### Logo Variations
1. **Horizontal**: Primary logo for headers and business cards
2. **Vertical**: Stacked version for narrow spaces
3. **Icon**: Circular badge for favicons and social media

### Logo Guidelines
- **Minimum Size**: 32px height for digital, 0.5" for print
- **Clear Space**: Equal to the height of the "V" in VISION
- **Background**: White or light backgrounds preferred
- **Color**: Primary gradient or solid primary blue

## Icon System

### Service Icons
- **AI/ML**: Neural network representation
- **Automation**: Process flow diagram
- **Analytics**: Chart with data points
- **Chatbot**: Speech bubble with dots
- **Data Processing**: Document with lines
- **Integration**: Connected circles

### Icon Guidelines
- **Style**: Rounded rectangles with primary gradient
- **Size**: 80px for service cards, 40px for features
- **Stroke**: 2px white stroke for contrast
- **Padding**: 12px border radius for consistency

## Content Guidelines

### Headlines
- **Primary**: Clear, benefit-focused, under 60 characters
- **Secondary**: Supporting details, under 120 characters
- **Tone**: Professional but approachable

### Body Copy
- **Length**: 2-3 sentences per paragraph
- **Tone**: Conversational, educational
- **Focus**: Benefits and outcomes, not just features

### CTAs
- **Primary**: "Book Free Consultation" or "Get Started"
- **Secondary**: "Learn More" or "View Services"
- **Tone**: Action-oriented, benefit-focused

## Implementation Checklist

### Design System
- [ ] CSS custom properties defined
- [ ] Typography scale implemented
- [ ] Color palette applied consistently
- [ ] Spacing system used throughout
- [ ] Animation system integrated
- [ ] Component library created

### Accessibility
- [ ] Color contrast ratios tested
- [ ] Focus states implemented
- [ ] Keyboard navigation functional
- [ ] Screen reader compatibility verified
- [ ] Reduced motion preferences respected

### Responsive Design
- [ ] Mobile-first approach implemented
- [ ] Breakpoints defined and tested
- [ ] Touch targets sized appropriately
- [ ] Content hierarchy maintained across devices

### Performance
- [ ] Images optimized and compressed
- [ ] CSS minified for production
- [ ] Font loading optimized
- [ ] Animation performance tested

## File Structure

```
design-system/
├── design-system.css      # Complete design system
├── brand-assets.svg       # Logo and icon assets
├── DESIGN_GUIDELINES.md   # This documentation
└── components/
    ├── buttons.css        # Button variations
    ├── cards.css          # Card components
    ├── forms.css          # Form elements
    └── navigation.css     # Navigation components
```

## Usage Examples

### Adding a New Component
1. Define the component in the design system
2. Create CSS using design tokens
3. Test across different screen sizes
4. Verify accessibility compliance
5. Document in this guide

### Updating Brand Colors
1. Update CSS custom properties
2. Test contrast ratios
3. Update all gradient definitions
4. Verify across all components
5. Update brand assets if needed

## Maintenance

### Regular Reviews
- **Monthly**: Check for accessibility compliance
- **Quarterly**: Review and update design tokens
- **Annually**: Complete brand audit and refresh

### Version Control
- Track all design system changes
- Document breaking changes
- Maintain changelog for updates
- Test thoroughly before deployment

---

*This design system ensures consistency, accessibility, and scalability across all Vision79 digital touchpoints.*
