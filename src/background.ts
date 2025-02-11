
chrome.runtime.onMessage.addListener(async function(request) {
  if (request.run) {
    const tab = await getCurrentTab();

    if (!tab) {
      return;
    }

    if (tab.url?.includes('talks.croc.ru')) {
      chrome.scripting.executeScript({
        target: { tabId: tab?.id! },
        files: ['js/injection.js'],
      });
    }
  }
});

async function getCurrentTab() {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}
