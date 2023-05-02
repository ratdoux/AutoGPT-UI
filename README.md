AutoGPT-UI
AutoGPT-UI is an Electron app that acts as a wrapper around the original Auto-GPT repository, which was created by Significant-Gravitas. It is currently built with electron-react-boilerplate and is only available for Windows. However, support for Linux and macOS is in the works.

Prerequisites
Make sure you have the original Auto-GPT repository. The application expects a folder structure like:
scss
Copy code
--BASE
  |- Auto-GPT
  |- AutoGPT-UI
If your Auto-GPT folder has a different name, please modify the run.bat script accordingly.

Installation
Clone the AutoGPT-UI repository:
bash
Copy code
git clone https://github.com/yourusername/AutoGPT-UI.git
Run the run.bat script to add the necessary files and modify the Auto-GPT\run.bat script to function properly.

Open the AutoGPT-UI folder and start the app:

bash
Copy code
cd AutoGPT-UI
npm install
npm start
Usage
Currently, the classic mode is the only way to use the application, but more modes are coming soon.

Settings
Inside the settings tab, you can:

Change the font by using a Google Fonts URL.

Modify the following lists for parsing the output:

Info String List: Catches all prerequisites and will not be shown inside the chat. A popup that shows the contents of this list will be added in the future.
Atomic Actions: Parses atomic actions (e.g., 'Thinking', 'using browser', etc.).
Return List: Cuts the string on this character, returns a new line, and adds the character to the previous string.
Example: With '.', "Hello. How are you." becomes:
sql
Copy code
Hello.
How are you.
Return List Next Line: Cuts the string on this character, returns a new line, and adds the character to the current string.
Example: With '.', "Hello. How are you." becomes:
sql
Copy code
Hello
.How are you
.
Coming Soon
Linux and macOS support
Additional ways to use the application
License
This project is licensed under the MIT License.