Thank you for downloading AILinkPreviewer, below is the step to setup the extension

1. download the source code from the GitHub repository (https://github.com/c4rtune/AILinkPreviewer)
2. unzip the AILinkPreviewer-main folder
3. Open google chrome and go to manage extension
4. Enable Developer mode
5. click on Load unpacked
6. select the AILinkPreviewer-main folder

Once complete you should be able to see a new extension when clicking on extension button in google (top right that looks like jigsaw puzzle). To use AILinkPreviewer, first click on the extension button and click on AILinkPreviewer. This will open up a small box on the top right. From here input your DeepSeek API key in to the textbox and select from the dropdownlist to choose which kind of summaries you'd like to use. Once finish, press the save button. Next, navigate to any github pull request page and right click on a link. After performing a right click, a context menu should show up. Click on the AILinkPreviewer: Summarize Link and a modal will show up. Please wait for a few seconds for DeepSeek to generate a summary. Once the summary show up, if you are done reading press the close button to close the modal.


Link to the tools demonstration: https://www.youtube.com/watch?v=h2qH4RtrB3E
___________________________________________________
<h2>USE CASE example</h2>

<img width="2560" height="1440" alt="Screenshot 2025-10-30 105424" src="https://github.com/user-attachments/assets/708ce66a-38f3-49b3-92e6-75a3113b5f30" />

We have provide an example use case for our AILinkPreviewer. In this use case we can see that the pull request reference https://https://en.wikipedia.org/wiki/Just-noticeable_difference. The link redirect user to a wikipedia page which can be time consuming to read all of it content. By using AILinkPreviewer, we can summarize the content of this website to a short and concise paragraph. 

AILinkPreviewer offer 3 different type of summarization being Contextual LLM, Non-Contextual LLM, and metadata-based snippets which can be select from the extension widget on the top right of the browser

<img width="613" height="395" alt="Screenshot 2025-10-29 132552" src="https://github.com/user-attachments/assets/063a8ea5-cb40-476f-9bd3-e3240d3ed29c" />

Once a summary type have been selected, code reviewer can right click the link they wishs to summrize and press the AILinkPreviewer: Summarization link option.

<img width="1602" height="650" alt="Screenshot 2025-10-30 105445" src="https://github.com/user-attachments/assets/27363763-5ac6-4891-bb20-dd6b34f65cf8" />

Using https://https://en.wikipedia.org/wiki/Just-noticeable_difference as an example, here are the summaries for all 3 type.

Contextual LLM
<img width="1167" height="611" alt="Screenshot 2025-10-30 105512" src="https://github.com/user-attachments/assets/5341046b-68c8-42a5-a163-ab382e6368a2" />

Non-Contextual LLM
<img width="1213" height="515" alt="Screenshot 2025-10-30 105531" src="https://github.com/user-attachments/assets/ffee7e4e-99af-4517-9221-c3f98fff0466" />

metadata-based snippets
<img width="1380" height="542" alt="Screenshot 2025-10-30 105555" src="https://github.com/user-attachments/assets/0a6504d8-2533-4ebd-a47b-5466f67f6ab2" />


From the three provided screenshots, we can see that the Contextual LLM generates a summary that not only condenses the content but also provides meaningful context about the information. This level of depth and precision is especially beneficial for code reviewers, as it helps them understand the underlying logic and saves time otherwise spent on extensive reading.
___________________________________________________
<h2>Privacy Notice</h2>

AILinkPreviewer collects and transmits limited contextual information for the purpose of generating link previews through a connected Large Language Model (LLM) API.

<h3>Data Sent</h3>

The data transmitted to the LLM API varies based on where the link appears. When a link is included in a pull request, the transmitted data includes the pull request title and description, the repository name and description, and metadata from the linked page such as its title, description, and body. When a link appears in a comment, the same information is sent, along with the full text of the comment body.

<h3>Data Handling</h3>

No redaction, anonymization, or content filtering is applied prior to transmission. The extracted information, together with the API key provided by the user, is sent to the configured LLM endpoint for processing.

<h3>Deployment and Hosting</h3>

AILinkPreviewer can be installed and executed locally or within an on-premise environment. However, the application relies on remote LLM API calls for content analysis and preview generation. Users requiring complete data isolation should configure an LLM endpoint that aligns with their organization’s privacy, compliance, and security policies.



