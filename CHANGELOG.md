# Changelog

## Refactor

- Split the existing single-file site into `index.html`, `css/style.css`, and `js/script.js`.
- Preserved the existing sections and their IDs: `#services`, `#gallery`, `#why`, `#about`, and `#quote`.
- Replaced the hero's striped treatment with a full-bleed project image and dark readability overlay.
- Added a slim trust strip for verified registration and Gauteng service-area facts.
- Restyled services as responsive cards with inline steelwork icons, hover states, and working in-place detail controls.
- Added a uniform responsive gallery grid and keyboard, swipe, close, previous, and next lightbox behavior.
- Made the header sticky and compact on scroll, added a mobile hamburger menu, and hid duplicate text from the logo header.
- Added subtle scroll reveal behavior that disables automatically for reduced-motion preferences.
- Preserved smooth anchor scrolling and added offset accommodation for the sticky header.
- Updated the section rhythm, alternating surfaces, and mobile spacing at small, tablet, and desktop widths.
- Removed the stray Trusted materials sentence.
- Moved the About founder/company story request behind a TODO comment and removed visible placeholder copy.
- Added keyboard-operable tabs with arrow-key navigation and complete ARIA tab semantics.
- Replaced the quote mailto control with a Netlify Forms submission flow, honeypot, client validation, status messaging, and thank-you state.
- Preserved the WhatsApp button and prefilled project enquiry, with accessible popup controls and Escape-key dismissal.
- Added favicon, canonical URL, and LocalBusiness JSON-LD structured data.
- Added `robots.txt` and `sitemap.xml`.
- Added WebP versions of project images with original JPEG fallbacks and explicit image dimensions/loading attributes.
- Added skip-to-content, focus states, semantic landmarks, labelled form controls, and reduced-motion support.
- Restored the original WhatsApp phone icon on the floating button and popup avatar.
- Rebalanced the desktop section heading sizes and widened the Why Us content area to keep the heading on a single line at desktop widths.

## TODOs / content still needed

- Supply an approved founder/company story for the About section.
- Provide an exact phone number, street address, or postal address only if the existing footer details should be expanded or corrected.
- Confirm whether the WhatsApp number and prefilled message should remain unchanged.
- Provide any approved certifications or standards copy if it becomes available; none has been invented on the site.
