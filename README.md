# AutoGPT-UI

AutoGPT-UI is an Electron app that acts as a wrapper around the original Auto-GPT repository, which was created by Significant-Gravitas. 

It is currently built with electron-react-boilerplate and is only available for Windows. However, support for Linux and macOS is in the works.

It uses websocketd to wrap around the original Auto-GPT repo, you do not need to modify anything inside the repo, and updating the Auto-GPT repo via git pull should work as usual.

[Auto-GPT](https://github.com/Significant-Gravitas/Auto-GPT)

[electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)

[websocketd](https://github.com/joewalnes/websocketd)

## Prerequisites

- Make sure you have the original Auto-GPT repository. The application expects a folder structure like:
	
		-BASEFOLDER
			-Auto-GPT
			-AutoGPT-UI
			

If your Auto-GPT folder has a different name, please modify the `run.bat` script accordingly.

## Installation

1. Clone the AutoGPT-UI repository:

2. Run the run.bat script inside AutoGPT-UI


### Mac/Linux

If you are on mac or linux and want to use this before I get around to adding those scripts, look at run.bat to see how you would run this on either platform, but basically: 

1. Figure out where to get you platform specific websocketd executable

2. Run websocketd directly inside the Auto-GPT folder

```
websocketd --address=localhost --loglevel=debug --binary=true --port=8080 run.bat
```

3. Inside AutoGPT-UI

```
npm install
npm start
```

## Usage
Currently, the classic mode is the only way to use the application, but more modes are coming soon.

## Settings
### Inside the settings tab, you can:

Change the font by using a Google Fonts URL.

### Modify the following lists for parsing the output:

Info String List: Catches all prerequisites and will not be shown inside the chat. A popup that shows the contents of this list will be added in the future.


Atomic Actions: Parses atomic actions (e.g., 'Thinking', 'using browser', etc.).


Return List: Cuts the string on this character, returns a new line, and adds the character to the previous string.


	Example: With '.', "Hello. How are you." becomes:
	Hello.
	How are you.
	

Return List Next Line: Cuts the string on this character, returns a new line, and adds the character to the current string.


	Example: With '.', "Hello. How are you." becomes:
	Hello
	.How are you
	.
		
## Coming Soon
Linux and macOS support

Additional ways to use the application

## Disclaimer

A lot is wrong with the code and a lot needs to be done, this version is sort of a first draft without any polishing.

Feel free to code review, do pull requests and all that makes open source the good stuff.

**I have not tested continous mode, I am unsure if disconnecting stops the Auto-GPT process or merely disconnects from the websocket.**

I am not responsible for any oopsies
