'use strict';
import * as vscode from 'vscode';
import { DevxEditorPanel } from './DevxEditorPanel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
// tslint:disable-next-line:export-name
export function activate(context: vscode.ExtensionContext): void {

    const startCommand = vscode.commands.registerCommand('vscode-devx-editor.start', () => {
        DevxEditorPanel.CreateOrShow(context.extensionPath);
    });

    context.subscriptions.push(startCommand);
}
