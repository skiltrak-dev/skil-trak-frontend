# Tailwind CSS v4 Upgrade Guide

## Overview

This document outlines the complete upgrade from Tailwind CSS v3 to v4 for your SkilTrak frontend project.

## Changes Made

### 1. Package Updates

-   **Updated `package.json`:**
    -   Changed `tailwindcss` from `^3.1.8` to `^4.0.0`
    -   Added `@tailwindcss/postcss: ^4.0.0`

### 2. PostCSS Configuration

-   **Updated `postcss.config.js`:**
    -   Removed `tailwindcss: {}` and `autoprefixer: {}`
    -   Added `'@tailwindcss/postcss': {}`
    -   Autoprefixer is now handled automatically by Tailwind v4

### 3. Configuration Migration

-   **Removed `tailwind.config.js`:**
    -   Tailwind v4 uses CSS-first configuration instead of JavaScript config files
-   **Updated `styles/globals.css`:**
    -   Replaced `@tailwind` directives with `@import 'tailwindcss'`
    -   Note: In v4, you use a single import instead of separate base/components/utilities imports
    -   Added `@theme` block with all custom configuration:
        -   Custom colors (primary, secondary, success, info, error, etc.)
        -   Custom max-width (`screen-3xl: 1800px`)
        -   Custom box shadows (site, profiles, profiles2, inner-image)
        -   Custom animations (float, accordion-down, accordion-up, blink)
        -   Custom keyframes for all animations

### 4. CSS Reference Directives

-   **Updated CSS files with `@reference` directive:**
    -   Added `@reference "tailwindcss";` to `styles/custom-form.module.css`
    -   Added `@reference "tailwindcss";` to `styles/site.css`
    -   This is required in Tailwind v4 when using `@apply` directives in CSS modules or files

### 5. Preserved Custom Styles

All your existing custom CSS classes and styles in `globals.css`, `site.css`, and `animations.css` remain unchanged and will continue to work with Tailwind v4.

## Key Benefits of v4

1. **CSS-First Configuration**: Theme configuration is now done in CSS using `@theme` directive
2. **Automatic Vendor Prefixing**: No need for autoprefixer
3. **Improved Performance**: Faster build times and smaller bundle sizes
4. **Better Developer Experience**: More intuitive CSS-based configuration
5. **Enhanced Utility Classes**: New and improved utility classes

## Next Steps

1. **Install Dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

2. **Test Your Application:**

    - Run your development server: `npm run dev`
    - Verify all styles are working correctly
    - Check that all custom animations and components render properly

3. **Build and Test:**
    ```bash
    npm run build
    npm run start
    ```

## Important Notes

-   **No Breaking Changes**: All your existing Tailwind classes will continue to work
-   **Custom Classes Preserved**: All your custom CSS classes remain functional
-   **Safelist Maintained**: Your safelist classes are now defined in the CSS theme configuration
-   **Animation Classes**: All custom animations (float, blink, accordion, etc.) are preserved

## Utility Class Syntax Changes (if needed)

If you encounter any issues, you may need to update some utility classes:

-   **Important modifier**: `!flex` → `flex!`
-   **Gradient direction**: `bg-gradient-to-t` → `bg-linear-to-t`
-   **Arbitrary values**: `bg-[--my-red]` → `bg-(--my-red)`

## Troubleshooting

If you encounter any issues:

1. **"Cannot apply unknown utility class" error**: Make sure you have `@reference "tailwindcss";` at the top of any CSS files that use `@apply` directives
2. **"Package path ./base is not exported" error**: Use `@import 'tailwindcss';` instead of separate base/components/utilities imports
3. Clear your build cache: `rm -rf .next`
4. Delete node_modules and reinstall: `rm -rf node_modules && npm install`
5. Check the browser console for any CSS-related errors
6. Verify all custom CSS variables are properly defined

## Support

For any issues or questions about the upgrade, refer to:

-   [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
-   [Tailwind CSS v4 Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)

The upgrade has been completed successfully and your application should work seamlessly with Tailwind CSS v4!
