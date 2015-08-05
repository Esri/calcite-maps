# Build Notes

## Alerts.scss

## Badges.scss

## Breadcrumbs.scss

## Buttons.scss

The .btn-default class text color and border are defined by the $link-color variable defined in the [scaffolding.scss](). By doing this, the default buttons will always match the default color for links.

Custom rule for .btn-link was written so that it will perform like .btn-default rather than just the default gray.

Default rounded corners are defined by the $border-radius-base variable in the [component.scss]().

## Carousel

## Code

## Colors

## Components

Default border radius on base, large and small variables have all been set to 0px (from 4px, 6px, 3px).

Other global variables that can been set in here include vertical padding, horizontal padding, line height, active component colors and carets.

## Containers.scss

## Dropdowns.scss

## Forms.scss

Variable $input-border is set to $Calcite_Gray_450 variable defined in [colors.scss]().

Variable $input-border-focus is set to $link-color variable defined in the [scaffolding.scss]().

Variable $input-color-placeholder is set to $Calcite_Gray_450 variable defined in [colors.scss]().

## Formstates.scss

## Grid.scss

## Header.scss

This is a custom module used for the standard Calcite header.

## Iconography.scss

## Jumbotraon.scss

## Labels.scss

## Listgroups.scss

Some custom sass was added to this module. I can't remember why. 

## Media.scss

## Modals.scss

## Navbar.scss

Slight changes have been made to the default navbar; height changed to 60px from 50px. The bootom margin has been set to 0px instead of a computed margin. A few colors have been altered, but should be set to use the color variables.

## Navs-Custom.scss

## Navs-Pills.scss

## Navs-Shared.scss

These are common variables used in Tabs, Pills and Custom. Changes have been made to $nav-link-padding and $nav-link-hover-bg.

## Navs-Tabs.scss

Changes have been made to $nav-tabs-border-color, $nav-tabs-link-hover-border-color and $nav-tabs-justified-link-border-color to make the tab nav in Calcite headers appear dark gray with slight transparency. $nav-tabs-active-link-hover-border-color has been set to $body-bg.

## Pager.scss

## Pagination.scss

## Panels.scss

## Popovers.scss

## Progressbars.scss

## Scaffolding.scss

Set global variables for Body-bg color, link color. Footer height is currently here, but maybe should be built out into separate sass files.

## Tables.scss

## Thumbnails.scss

## Tooltops.scss

## Type.scss

## Wells.scss

## Zindex.scss
