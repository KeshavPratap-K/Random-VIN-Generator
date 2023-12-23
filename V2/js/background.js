chrome.runtime.onStartup.addListener(function() {
    storage.storage.local.clear()
   })