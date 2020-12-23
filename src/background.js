'use strict';

// terms we will search <head> for to confirm WordPress
const clues = ["wp-content", "wp-includes"]

// reset icon
chrome.browserAction.setIcon({path: "icon_off_32.png"});

function iconOn() {
  chrome.browserAction.setIcon({path: "icon_on_32.png"});
}

function iconOff() {
  chrome.browserAction.setIcon({path: "icon_off_32.png"});
}

function changeIconState(state) {
  if (state == true) {
    iconOn();
  } else if (state == false) {
    iconOff();
  }
}

function detectWordPress(head) {
  console.log(head)
  if(!head || head == null || head === "") {
    return;
  }
  let matched = clues.some(v => head.includes(v))
  changeIconState(matched);
}

function requestHeadFromDOM() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "send_head_inner"}, function(response) {
      return response;
    });
  });
}

chrome.tabs.onActivated.addListener(function () {
  iconOff();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "send_head_inner"}, function(response) {
      detectWordPress(response);
    });
  });
});

chrome.tabs.onUpdated.addListener(function () {
  iconOff();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "send_head_inner"}, function(response) {
      detectWordPress(response);
    });
  });
});

chrome.tabs.onCreated.addListener(function () {
  iconOff();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "send_head_inner"}, function(response) {
      detectWordPress(response);
    });
  });
});

chrome.windows.onFocusChanged.addListener(function () {
  iconOff();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "send_head_inner"}, function(response) {
      detectWordPress(response);
    });
  });
});

chrome.tabs.onRemoved.addListener(function () {
  iconOff();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "send_head_inner"}, function(response) {
      detectWordPress(response);
    });
  });
});

chrome.tabs.onReplaced.addListener(function () {
  iconOff();
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {text: "send_head_inner"}, function(response) {
      detectWordPress(response);
    });
  });
});