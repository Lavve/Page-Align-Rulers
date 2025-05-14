chrome.action.onClicked.addListener(async (tab) => {
  // Inject content.js if not already injected
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: ["content.js"]
    },
    () => {
      // After injection, send the toggle message
      chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_CROSSHAIR" });
    }
  );
});