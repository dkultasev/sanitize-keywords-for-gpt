# Sanitize Keywords extension

## Overview
This Visual Studio Code extension allows users to sanitize sensitive information from their code or text quickly. By replacing pre-defined keywords with their specified replacements, you can ensure that confidential information is not inadvertently shared when pasting content elsewhere.

## Features
- **Replace and Copy to Clipboard**: Quickly replace sensitive keywords and copy the sanitized text to the clipboard.
- **Undo Replacement from Clipboard**: Revert the replaced text in the clipboard back to its original form.

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

## Usage
1. Highlight the text you wish to sanitize in your editor. If nothing is selected, the entire content will be used.
2. Use the "Sanitize keywords" command to replace and copy the sanitized text.
3. To undo a previous replacement, use the "Undo Sanitize" command.

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

By highlighting the text and using the "Sanitize keywords" command, you will get the following text in your clipboard:

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
