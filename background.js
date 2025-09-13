// Create context menu when extension installs/updates
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarizePR",
    title: "Summarize PR with DeepSeek",
    contexts: ["link"],
    documentUrlPatterns: ["https://github.com/*/*/pull/*"]
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "summarizePR") return;

  // Load stored settings
  const { deepseekApiKey, summaryType } = await chrome.storage.local.get([
    "deepseekApiKey",
    "summaryType"
  ]);

  if (!deepseekApiKey) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => alert("⚠️ Please set your DeepSeek API key in the extension popup.")
    });
    return;
  }

  // Step 1: Get PR context from content script
  chrome.tabs.sendMessage(
    tab.id,
    { action: "scrapePRContext", linkUrl: info.linkUrl },
    async (context) => {
      if (chrome.runtime.lastError) return console.error(chrome.runtime.lastError.message);

      // Step 2: Show "fetching" modal
      chrome.tabs.sendMessage(tab.id, {
        action: "showSummaryModal",
        summary: "⏳ Fetching PR summary from DeepSeek..."
      });

      try {
        // Step 3: Fetch repo page HTML
        const urlParts = info.linkUrl.split("/");
        const repoUrl = `https://github.com/${urlParts[3]}/${urlParts[4]}`;
        const repoHtml = await fetch(repoUrl).then(res => res.text());

        // Step 4: Parse repo HTML in content script
        const parsedRepo = await new Promise((resolve) => {
          chrome.tabs.sendMessage(tab.id, { action: "parseRepoHTML", html: repoHtml }, (resp) => {
            resolve(resp || { repoAbout: "" });
          });
        });
        const repoAbout = parsedRepo.repoAbout || "";

        // Step 5: Fetch link HTML
        const linkHtml = await fetch(info.linkUrl).then(res => res.text());

        // Step 6: Parse link HTML in content script
        const linkMeta = await new Promise((resolve) => {
          chrome.tabs.sendMessage(tab.id, { action: "parseLinkHTML", html: linkHtml }, (resp) => {
            resolve(resp || { linkTitle: "", linkDescription: "", linkBody: "" });
          });
        });

        // Step 7: Build DeepSeek prompt
        let user_prompt = "";
        if(summaryType === "snippet") {
          user_prompt = linkMeta.linkTitle + " " + linkMeta.linkDescription;
          chrome.tabs.sendMessage(tab.id, { action: "showSummaryModal", summary: user_prompt });
          return;
        } else if(summaryType === "LLM") {
          user_prompt = linkMeta.linkBody;
          console.log("LLM prompt:", user_prompt);
        } else if(summaryType === "AILinkPreviewer") {
          user_prompt = `Pull request title: ${context.prTitle}
                          Pull request description: ${context.prDescription}

                          Repository title: ${context.repoName}
                          Repository about: ${repoAbout}
                          Link body being analyzed: ${linkMeta.linkBody}`;
        }

        // Step 8: Call DeepSeek API
        const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${deepseekApiKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            model: "deepseek-chat",
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant tasked with writing a concise summary of content referenced in a GitHub pull request. The reference is to an external webpage, and your goal is to summarize the most relevant part of the content based on the pull request context, helping developers understand it without opening the link.

                            You will always be provided with:

                                Pull request title
                                Pull request description
                                Repository title
                                Repository description
                                link body

                            Your Task:
                            Use the following reasoning steps before writing the final summary:

                              1. Identify the main purpose of the pull request using its title and description.
                              2. Examine the webpage content to find sections most relevant to that purpose.
                              3. Compare against patch details or changed files to understand the implementation focus.
                              4. Determine the core insight or fact from the webpage that supports or explains the PR’s purpose.
                              5. Write a 1-sentence summary of that insight. Ensure the summary:

                                    Is standalone and factual
                                    Is phrased as if it’s part of the pull request itself
                                    Avoids references to external links or hosting

                            Important: Output only the final 1-sentence summary, with no explanation, no headings, and no formatting.`
              },
              { role: "user", content: user_prompt }
            ],
            temperature: 0.2
          })
        });

        const data = await response.json();
        const summary = data.choices?.[0]?.message?.content || "⚠️ No summary returned from DeepSeek.";

        // Step 9: Show final summary modal
        chrome.tabs.sendMessage(tab.id, { action: "showSummaryModal", summary });

      } catch (err) {
        console.error("Error in fetching/parsing/calling DeepSeek:", err);
        chrome.tabs.sendMessage(tab.id, { action: "showSummaryModal", summary: "❌ Error fetching summary." });
      }
    }
  );
});


