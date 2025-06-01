'use strict';

// terms we will search in <head> to detect WordPress
const clues = ["wp-content", "wp-includes"]

// updates the icon in the toolbar
const updateIcon = (state, tabId = null) => {
  const path = state ? "icon_on_32.png" : "icon_off_32.png";
  const title = state ? "WordPress Detector (detected)" : "WordPress Detector (not detected)";
  chrome.browserAction.setIcon({ path, tabId })
  chrome.browserAction.setTitle({ title, tabId })
}

// detect wordpress in a pages <head>
const detectWordPress = (head, tabId) => {
  if ( typeof head !== "undefined" ) {
    const state = head && head != null && head !== "" && clues.some(v => head.includes(v))
    updateIcon( state, tabId )
  }
}

const onTabUpdate = (activeInfo) => {
  // reset
  updateIcon(false, activeInfo.tabId)

  // get each window's active tab's <head> and detect WordPress
  chrome.tabs.query({ active: true, windowType: 'normal', url: ['*://*/*'] }, function (tabs) {
    tabs.forEach( function( tab, index, arr ) {
      const tabId = tab.id;
      chrome.tabs.sendMessage(tabId, { tabId: tabId, text: "send_head_inner" }, function (response) {
        detectWordPress( response?.response, response?.tabId )
      });
    });
  });
}

// listen for tab updates
chrome.tabs.onActivated.addListener(onTabUpdate)
chrome.tabs.onUpdated.addListener(onTabUpdate)
chrome.windows.onFocusChanged.addListener(onTabUpdate)