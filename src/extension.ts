import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    async function unsanitizeClipboardContent(): Promise<string> {
        let clipboardText = await vscode.env.clipboard.readText();
        if (!clipboardText) {
            vscode.window.showWarningMessage('Clipboard is empty!');
            return '';
        }

        let replacements: { [key: string]: string } = vscode.workspace.getConfiguration('sanitize-keywords').get('replacements', {});
        let reversedReplacements: { [key: string]: string } = {};

        for (let key in replacements) {
            reversedReplacements[replacements[key]] = key;
        }

        let sortedKeys = Object.keys(reversedReplacements).sort().reverse();
        let restoredText = clipboardText;

        for (let key of sortedKeys) {
            let regex = new RegExp(key, 'gi');
            restoredText = restoredText.replace(regex, reversedReplacements[key]);
        }

        return restoredText;
    }

    let disposable = vscode.commands.registerCommand('sanitize-keywords.replaceAndCopy', async () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found!');
            return;
        }
        
        
        let document = editor.document;
        let selectedText = editor.selection.isEmpty ? document.getText() : document.getText(editor.selection);

        let replacements: { [key: string]: string } = vscode.workspace.getConfiguration('sanitize-keywords').get('replacements', {});
        let sortedKeys = Object.keys(replacements).sort();

        if (!sortedKeys.length) {
            vscode.window.showWarningMessage('No configuration section found and no keywords to replace.');
            return;
        }

        let replacedText = selectedText;
        for (let key of sortedKeys) {
            let regex = new RegExp(key, 'gi');
            replacedText = replacedText.replace(regex, replacements[key]);
        }

        vscode.env.clipboard.writeText(replacedText);

        const showSanitizeNotification = vscode.workspace.getConfiguration('sanitize-keywords').get('showSanitizeNotification', false);
        if (showSanitizeNotification) {
            vscode.window.showInformationMessage('Content sanitized and copied to clipboard.');
        }
    });

    let restoreDisposable = vscode.commands.registerCommand('sanitize-keywords.restoreFromClipboard', async () => {
        let restoredText = await unsanitizeClipboardContent();
        if (!restoredText) return;

        let editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found!');
            return;
        }

        await editor.edit(editBuilder => {
            if (!editor) {
                vscode.window.showWarningMessage('No active editor found!');
                return;
            }
            if (editor.selection.isEmpty) {
                editBuilder.insert(editor.selection.start, restoredText);
            } else {
                editBuilder.replace(editor.selection, restoredText);
            }
        });

        vscode.env.clipboard.writeText(restoredText);
        
        const showUnsanitizeNotification = vscode.workspace.getConfiguration('sanitize-keywords').get('showUnsanitizeNotification', false);
        if (showUnsanitizeNotification) {
            vscode.window.showInformationMessage('Content unsanitized.');
        }
    });
    
    let copyUnsanitizedDisposable = vscode.commands.registerCommand('sanitize-keywords.copyUnsanitized', async () => {
        let restoredText = await unsanitizeClipboardContent();
        if (!restoredText) return;

        vscode.env.clipboard.writeText(restoredText);
        
        const showUnsanitizeNotification = vscode.workspace.getConfiguration('sanitize-keywords').get('showUnsanitizeNotification', false);
        if (showUnsanitizeNotification) {
            vscode.window.showInformationMessage('Content unsanitized and copied to clipboard.');
        }
    });
    
    context.subscriptions.push(disposable);
    context.subscriptions.push(restoreDisposable);
    context.subscriptions.push(copyUnsanitizedDisposable);
}

export function deactivate() {}
