'use strict';

// terms we will search in <head> to detect WordPress
const clues = {
  head: [ "wp-content", "wp-includes", "xmlrpc.php" ]
}

// updates the icon in the toolbar
const updateIcon = (state) => {
  const path = state ? "icon_on_32.png" : "icon_off_32.png";
  chrome.browserAction.setIcon({ path })
}

// detect wordpress in a pages <head>
const detectWordPress = (head) => {
  if ( typeof head !== "undefined" ) {
    updateIcon(head && head != null && head !== "" && clues.head.some(v => head.includes(v)))
  }
}

const onTabUpdate = () => {
  // reset
  updateIcon(false)

  // get current tab's <head> and detect WordPress
  chrome.tabs.query({ active: true, currentWindow: true, url: '*://*/*' }, function (tabs) {
    if ( tabs.length !== 0 ) {
      chrome.tabs.sendMessage(tabs[0].id, { text: "send_head_inner" }, function (response) {
        detectWordPress(response)
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