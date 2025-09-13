// Load saved settings
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["deepseekApiKey", "summaryType"], (data) => {
    if (data.deepseekApiKey) {
      document.getElementById("apiKey").value = data.deepseekApiKey;
    }
    if (data.summaryType) {
      document.getElementById("summaryType").value = data.summaryType;
    }
  });
});

// Save settings
document.getElementById("saveBtn").addEventListener("click", () => {
  const apiKey = document.getElementById("apiKey").value;
  const summaryType = document.getElementById("summaryType").value;

  chrome.storage.local.set(
    { deepseekApiKey: apiKey, summaryType: summaryType },
    () => {
      document.getElementById("status").textContent = "Settings saved!";
      setTimeout(() => {
        document.getElementById("status").textContent = "";
      }, 2000);
    }
  );
});
