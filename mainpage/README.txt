Learning with Ms. Karen — S3 upload package

Contents
- index.html: website markup.
- styles.css: website styling and responsive layouts.
- script.js: class data, search, calendar, booking links, forms, and navigation.
- README.txt: these instructions; you do not need to upload this file.

Upload
1. Extract this ZIP on your computer.
2. Upload index.html, styles.css, and script.js together to the root of your website S3 bucket, not the ZIP itself.
3. For CloudFront, set the default root object to index.html.
4. If replacing an existing CloudFront website, invalidate /* so visitors receive the updated HTML, CSS, and JavaScript.

This package contains static website files. It does not configure your AWS bucket, CloudFront distribution, HTTPS certificate, or domain DNS.

Editing
Edit page content in index.html and styling in styles.css. In script.js, update SITE_CONFIG.squareUrl with your production Square Appointments URL. Edit CLASS_DATA to update the shared class schedule used by the search, calendar, and upcoming listings.

Existing limitations preserved
- Square booking uses a demonstration placeholder URL.
- Contact and private-event inquiry forms show confirmation messages but do not transmit or store submissions. Connect a form service or backend before relying on these inquiries.
- Review class dates, locations, and contact information before launch.

No build step or dependency installation is required.
