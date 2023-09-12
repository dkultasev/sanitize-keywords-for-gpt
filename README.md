# Safe COPY/PASTE Extension

## Overview
This Visual Studio Code extension helps users to safely copy and paste their code or text without sharing sensitive information inadvertently. It sanitizes predefined keywords with specified replacements before the content is copied to the clipboard, making it a useful tool for platforms like Chat-GPT, Stackoverflow, etc.

## Features
- **Safe Copy**: Quickly replace sensitive keywords with pre-defined replacements and copy the sanitized text to the clipboard.
- **Safe Paste**: Retrieve the original content from the clipboard by reverting the replaced words back to their initial form.
- **Safe Copy (unsanitized)**: Allows copying the text without sanitizing, maintaining the original content intact.

## Configuration
Define your replacement words in your VS Code `settings.json`:

```json
"sanitize-keywords.replacements": {
    "TechInc": "important_company",
    "sdlkjfcvl12;34": "password1",
    "Antonio": "John",
    "Banderas": "Smith",
    "antonio.banderas@sercretmail.com": "user1@email.com"
}
```
Additionally, configure the extension settings to control notifications displayed during the sanitize and unsanitize processes.

## Usage
1. Highlight the text you wish to sanitize in your editor. If nothing is selected, the entire content will be used.
2. Utilize the "Safe Copy" command to replace sensitive words and copy the sanitized text to the clipboard.
3. If you want to retrieve the original text, use the "Safe Paste" command.

For example you have following code snippet:

```python
function create_user(username, password, first_name, last_name, email, company):
    user = User(username, password, first_name, last_name, email, company)
    ...
    return user
```
and the log message
```
Error: ....
    at create_user (C:\Users\Antonio\Documents\project\src\user.py:12)
    at main (C:\Users\Antonio\Documents\project\src\main.py:34)
    Cannot connect to database with username: Antonio and password: sdlkjfcvl12;34
    ...
    Company name is incorrect: TechInc
    ...
Error: email should be unique. User with email antonio.banderas@sercretmail.com already exists
```

Upon highlighting the text and employing the "Safe Copy" command, the sanitized version available in your clipboard will be:

```python
function create_user(username, password, first_name, last_name, email, company):
    user = User(username, password, first_name, last_name, email, company)
    ...
    return user
```
and the log message
```
Error: ....
    at create_user (C:\Users\John\Documents\project\src\user.py:12)
    at main (C:\Users\John\Documents\project\src\main.py:34)
    Cannot connect to database with username: John and password: password1
    ...
    Company name is incorrect: important_company
    ...
Error: email should be unique. User with email John.Smith@sercretmail.com already exists
```
Feel safe and secure while sharing your code snippets with the "Safe COPY/PASTE" extension
