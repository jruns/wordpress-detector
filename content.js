chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
    if (msg.text === 'send_head_inner') {
        sendResponse(document.head.innerHTML);
    }
});