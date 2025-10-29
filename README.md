Thank you for downloading AILinkPreviewer, below is the step to setup the extension

1. download the source code from the GitHub repository (https://github.com/c4rtune/AILinkPreviewer)
2. unzip the AILinkPreviewer-main folder
3. Open google chrome and go to manage extension
4. Enable Developer mode
5. click on Load unpacked
6. select the AILinkPreviewer-main folder

Once complete you should be able to see a new extension when clicking on extension button in google (top right that looks like jigsaw puzzle). To use AILinkPreviewer, first click on the extension button and click on AILinkPreviewer. This will open up a small box on the top right. From here input your DeepSeek API key in to the textbox and select from the dropdownlist to choose which kind of summaries you'd like to use. Once finish, press the save button. Next, navigate to any github pull request page and right click on a link. After performing a right click, a context menu should show up. Click on the AILinkPreviewer: Summarize Link and a modal will show up. Please wait for a few seconds for DeepSeek to generate a summary. Once the summary show up, if you are done reading press the close button to close the modal.


Link to the tools demonstration: https://www.youtube.com/watch?v=h2qH4RtrB3E

USE CASE example

<img width="2560" height="1440" alt="Screenshot 2025-10-29 132357" src="https://github.com/user-attachments/assets/ffba14cb-19b4-41cc-bd31-98143d9e3aa6" />

We have provide an example use case for our AILinkPreviewer. In this use case we can see that the pull request point the user to https://doc.qt.io/archives/qt-5.15/qmetaobject.html#connectSlotsByName for more information. The link redirect user to a documentation page qt-5.15 which can be time consuming to read all of it content. By using AILinkPreviewer, we can summarize the content of this website to a short and concise paragraph. 

AILinkPreviewer offer 3 different type of summarization being Contextual LLM, Non-Contextual LLM, and metadata-based snippets which can be select from the extension widget on the top right of the browser

<img width="613" height="395" alt="Screenshot 2025-10-29 132552" src="https://github.com/user-attachments/assets/063a8ea5-cb40-476f-9bd3-e3240d3ed29c" />

Once a summary type have been selected, code reviewer can right click the link they wishs to summrize and press the AILinkPreviewer: Summarization link option.

<img width="2560" height="1440" alt="Screenshot 2025-10-29 132625" src="https://github.com/user-attachments/assets/a4de9b95-6fbc-4e44-9ad0-7631abb7c431" />

Using  https://doc.qt.io/archives/qt-5.15/qmetaobject.html#connectSlotsByName as an example, here are the summaries for all 3 type.

Contextual LLM
<img width="1812" height="992" alt="Screenshot 2025-10-29 132639" src="https://github.com/user-attachments/assets/533c372d-6ddd-487a-82c5-5ed9567cd535" />

Non-Contextual LLM
<img width="1859" height="894" alt="Screenshot 2025-10-29 132657" src="https://github.com/user-attachments/assets/9b469e01-b8f5-4f5c-8de9-0dd2045f09ae" />

metadata-based snippets
<img width="1933" height="863" alt="Screenshot 2025-10-29 132722" src="https://github.com/user-attachments/assets/fa0eeac3-8b11-4181-9148-19422da8b535" />

From the three provided screenshots, we can observe that the Contextual LLM generates the most detailed and technically comprehensive summary. This level of depth and precision is particularly beneficial for code reviewers, as it helps them understand the underlying logic, and save time wasted on reading.
