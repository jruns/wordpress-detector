'use strict';

// terms we will search in <head> to detect WordPress
const clues = ["wp-content", "wp-includes", "xmlrpc.php"]

// updates the icon in the toolbar
const updateIcon = (state, tabId = null) => {
  const path = state ? "icon_on_32.png" : "icon_off_32.png";
  chrome.browserAction.setIcon({ path, tabId })
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

  // get current tab's <head> and detect WordPress
  chrome.tabs.query({ active: true, currentWindow: true, url: ['about:newtab', '*://*/*'] }, function (tabs) {
    if ( tabs.length !== 0 ) {
      const tabId = tabs[0].id;
      chrome.tabs.sendMessage(tabId, { tabId: tabId, text: "send_head_inner" }, function (response) {
        detectWordPress( response?.response, response?.tabId )
      });
    }
  });
}

// listen for tab updates
chrome.tabs.onActivated.addListener(onTabUpdate)
chrome.tabs.onUpdated.addListener(onTabUpdate)
chrome.tabs.onCreated.addListener(onTabUpdate)
chrome.windows.onFocusChanged.addListener(onTabUpdate)
chrome.tabs.onRemoved.addListener(onTabUpdate)
chrome.tabs.onReplaced.addListener(onTabUpdate)