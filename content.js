console.log("✅ Content script loaded on:", window.location.href);

// Prevent duplicate listeners if reinjected
if (!window.__deepseekListenerAdded) {
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // Show modal
    if (msg.action === "showSummaryModal") {
      showSummaryModal(msg.summary);
      sendResponse({ status: "modal shown" });
    }

    // Scrape PR context from the page
    if (msg.action === "scrapePRContext") {
      const context = {};

      // Repo name
      const repoEl = document.querySelector('strong[itemprop="name"] a');
      context.repoName = repoEl ? repoEl.innerText.trim() : "";

      // PR title
      const titleEl = document.querySelector('span.js-issue-title') ||
                      document.querySelector('h1.gh-header-title .js-issue-title');
      context.prTitle = titleEl ? titleEl.innerText.trim() : "";

      // PR description (first comment body)
      const descEl = document.querySelector('.js-comment-body');
      context.prDescription = descEl ? descEl.innerText.trim() : "";

      // Find the link that was right-clicked
      const linkElements = Array.from(document.querySelectorAll('a'));
      const targetLink = linkElements.find(a => a.href === msg.linkUrl);

      if (targetLink) {
        let position = "Unknown";
        let commentBody = "";

        const reviewContainer = targetLink.closest('.review-comment');  // review comment
        const commentContainer = targetLink.closest('.js-comment');     // general comment

        if (descEl && descEl.contains(targetLink)) {
          position = "Description";
          commentBody = descEl.innerText.trim();
        } else if (reviewContainer) {
          position = "Review comment";
          const bodyEl = reviewContainer.querySelector('.js-comment-body');
          commentBody = bodyEl ? bodyEl.innerText.trim() : "";
        } else if (commentContainer) {
          position = "Comment";
          const bodyEl = commentContainer.querySelector('.js-comment-body');
          commentBody = bodyEl ? bodyEl.innerText.trim() : "";
        }

        context.linkPosition = position;
        context.linkCommentBody = commentBody;
      } else {
        context.linkPosition = "Unknown";
        context.linkCommentBody = "";
      }

      console.log("📦 Scraped PR context:", context);
      sendResponse(context);
      return true;
    }

    // Parse repository HTML for repoAbout
    if (msg.action === "parseRepoHTML") {
      const doc = new DOMParser().parseFromString(msg.html, "text/html");
      const aboutEl = doc.querySelector('p.f4.my-3') || doc.querySelector('meta[name="description"]');
      const repoAbout = aboutEl
        ? (aboutEl.tagName.toLowerCase() === "meta" ? aboutEl.content : aboutEl.innerText.trim())
        : "";
      sendResponse({ repoAbout });
      return true;
    }

    // Parse link HTML for metadata
    if (msg.action === "parseLinkHTML") {
      const doc = new DOMParser().parseFromString(msg.html, "text/html");

      const titleEl = doc.querySelector("title");
      const metaDesc = doc.querySelector('meta[name="description"]') || doc.querySelector('meta[property="og:description"]');
      const bodyEl = doc.querySelector("body");

      const linkMeta = {
        linkTitle: titleEl ? titleEl.innerText.trim() : "",
        linkDescription: metaDesc ? metaDesc.content.trim() : "",
        linkBody: bodyEl ? bodyEl.innerText.trim().substring(0, 1000) : ""
      };
      sendResponse(linkMeta);
      return true;
    }
  });

  window.__deepseekListenerAdded = true;
}

// Function to inject a modal
function showSummaryModal(summary) {
  // Remove old modal if it exists
  const existing = document.getElementById("deepseek-pr-summary-modal");
  if (existing) existing.remove();

  // Overlay
  const overlay = document.createElement("div");
  overlay.id = "deepseek-pr-summary-modal";
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100vw";
  overlay.style.height = "100vh";
  overlay.style.background = "rgba(0,0,0,0.6)";
  overlay.style.display = "flex";
  overlay.style.alignItems = "center";
  overlay.style.justifyContent = "center";
  overlay.style.zIndex = "999999";

  // Modal box
  const modal = document.createElement("div");
  modal.style.background = "#fff";
  modal.style.padding = "20px";
  modal.style.borderRadius = "8px";
  modal.style.width = "500px";
  modal.style.maxHeight = "70vh";
  modal.style.overflowY = "auto";
  modal.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
  modal.innerHTML = `
    <h2 style="margin-top:0; color:#333;">DeepSeek Summary</h2>
    <div style="color:#111; font-size:14px; line-height:1.5; white-space:pre-wrap;">
      ${summary}
    </div>
    <button id="closeModal" style="
      margin-top:15px;
      padding:8px 12px;
      background:#d73a49;
      color:#fff;
      border:none;
      border-radius:4px;
      cursor:pointer;
    ">Close</button>
  `;

  overlay.appendChild(modal);
  document.body.appendChild(overlay);

  // Close button
  document.getElementById("closeModal").onclick = () => overlay.remove();
}
