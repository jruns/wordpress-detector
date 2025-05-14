# wordpress-detector
A simple browser extension notifying of a WordPress site in your current tab.

## Firefox Installation instructions
1. Download a release xpi file from this github repo
2. Go to `about:addons`
3. Click the gear icon next to the "Manage Your Extensions" heading
4. Select "Install Add-on From File..." and select the release file you downloaded
5. Pin the extension to the Toolbar

## Chrome Installation instructions
1. Download the `src` folder from this github repo
2. Go to `chrome://extensions/`
3. Activate "Developer mode"
4. Click the "Load unpacked" button
5. Select the `src` folder you saved locally
6. Pin the extension to the Toolbar

## ToDo
1. Correctly set the toolbar icon when multiple windows are open and focus switches between them.
2. Find any WordPress sites that miss the head check (like sites using a CDN), and add body checks to match those as well.

## Credits
Forked from https://github.com/bensaine/wordpress-detector
