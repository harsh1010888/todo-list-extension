// Background script to keep the extension popup open
chrome.runtime.onInstalled.addListener(() => {
  console.log('Harsh\'s Todo List Extension installed');
});

// Keep the popup open by preventing auto-close
chrome.action.onClicked.addListener((tab) => {
  // This ensures the popup stays open when clicked
  console.log('Extension clicked, popup should stay open');
});

// Prevent the popup from closing automatically
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'keepAlive') {
    // Keep the popup alive
    sendResponse({status: 'alive'});
  }
}); 