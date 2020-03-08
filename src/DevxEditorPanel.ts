'use strict';

import * as path from 'path';
import * as vscode from 'vscode';
//import { configurationSettings } from './globals/enums';

export class DevxEditorPanel {
    public static currentPanel: DevxEditorPanel | undefined;

    private static readonly viewType: string = 'DevxEditor';
   // private static readonly extensionPrefix: string = 'vscode-devx-editor';

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionPath: string;
    private _disposables: vscode.Disposable[] = [];
    private _currentEditor: vscode.TextEditor;

    private constructor(extensionPath: string, column: vscode.ViewColumn) {
        this._extensionPath = extensionPath;
        this._currentEditor = vscode.window.activeTextEditor;
        this._panel = vscode.window.createWebviewPanel(DevxEditorPanel.viewType, "devx editor", column, {
            enableScripts: true,
            localResourceRoots: [
               // vscode.Uri.file(path.join(this._extensionPath, 'DevxEditor'))
                vscode.Uri.file(path.join(this._extensionPath, 'asset'))
            ]
        });
        this._panel.webview.html = this.getHtmlForWebview(this._extensionPath);

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

        this._panel.webview.onDidReceiveMessage(message => {
            if (this._currentEditor) {
                this._currentEditor.edit(editBuilder => {
                    const range: vscode.Range = new vscode.Range(
                        this._currentEditor.document.positionAt(0),
                        this._currentEditor.document.positionAt(this._currentEditor.document.getText().length)
                    );

                    editBuilder.replace(range, message.json);
                });
            }
        });

        vscode.window.onDidChangeActiveTextEditor(() => this.onActiveEditorChanged());
        vscode.workspace.onDidSaveTextDocument(() => this.onDocumentChanged());

        this.onActiveEditorChanged();
    }

    // tslint:disable-next-line:function-name
    public static CreateOrShow(extensionPath: string): void {
        const column = vscode.ViewColumn.Three;
        //const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration(this.extensionPrefix);
       // const theme: string = config.get(configurationSettings.theme);

        if (DevxEditorPanel.currentPanel) {
            DevxEditorPanel.currentPanel._panel.reveal(column);
        } else {
            DevxEditorPanel.currentPanel = new DevxEditorPanel(extensionPath, column);
        }
    }

    public dispose(): void {
        DevxEditorPanel.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private getJson(): string {
        let json: string = "";
        if (this._currentEditor) {
            json = this._currentEditor.document.getText();
        }
        return json;
    }

    private onActiveEditorChanged(): void {
        if (vscode.window.activeTextEditor) {
            this._currentEditor = vscode.window.activeTextEditor;
            const json: string = this.getJson();
            this._panel.webview.postMessage({ json: json });
        }
    }

    private onDocumentChanged(): void {
        const json: string = this.getJson();
        this._panel.webview.postMessage({ json: json });
    }

    private getHtmlForWebview(extensionPath: string): string {

        const indexScriptPathOnDisk = vscode.Uri.file(path.join(extensionPath, 'asset/schema', 'index.js'));
        const indexScriptUri = indexScriptPathOnDisk.with({ scheme: 'vscode-resource' });

        const  brutusinJsonFormsOnDisk = vscode.Uri.file(path.join(extensionPath, 'asset/brutusin_json_forms/js', 'brutusin-json-forms.js'));
        const brutusinJsonFormsUri = brutusinJsonFormsOnDisk.with({ scheme: 'vscode-resource' });

        const  schemaDxDataGridOnDisk = vscode.Uri.file(path.join(extensionPath, 'asset/schema/dxDataGrid', 'sch-devxtream.js'));
        const schemaDxDataGridUri = schemaDxDataGridOnDisk.with({ scheme: 'vscode-resource' });

        const  schemaDxFormOnDisk = vscode.Uri.file(path.join(extensionPath, 'asset/schema/dxForm', 'sch-devxtream.js'));
        const schemaDxFormUri = schemaDxFormOnDisk.with({ scheme: 'vscode-resource' });

        const brutusinJsonFormsCssOnDisk  = vscode.Uri.file(path.join(extensionPath, 'asset/brutusin_json_forms/css', 'brutusin-json-forms.css'));
        const brutusinJsonFormsCssUri = brutusinJsonFormsCssOnDisk.with({ scheme: 'vscode-resource' });

        const dxCommonCssOnDisk = vscode.Uri.file(path.join(extensionPath, 'asset/cdndevexpress', 'dx.common.css'));
        const dxCommonCssUri = dxCommonCssOnDisk.with({ scheme: 'vscode-resource' });

        const dxightCssOnDisk = vscode.Uri.file(path.join(extensionPath, 'asset/cdndevexpress', 'dx.light.css'));
        const dxightCssUri = dxightCssOnDisk.with({ scheme: 'vscode-resource' });
        const dxAllJsOnDisk = vscode.Uri.file(path.join(extensionPath, 'asset/cdndevexpress', 'dx.all.js'));
        const dxAllJsUri = dxAllJsOnDisk.with({ scheme: 'vscode-resource' });


        return `
        <html>

        <head>
          <link rel="stylesheet" href='${brutusinJsonFormsCssUri}' />
          <link rel='stylesheet' href='${dxCommonCssUri}'>
          <link rel='stylesheet' href='${dxightCssUri}'>
          <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
          <style>
          .flex-container {
            /* display: flex;*/
             background-color: DodgerBlue;
           }

           .flex-container > div {
             background-color: #f1f1f1;
            /*
             margin: 10px;
             padding: 20px;
             */
             font-size: 12px;
           }
           #json-forms-container{
             resize: both;
             height: 500px;
               width: 100%;
               overflow: scroll;

           }
           .demo-container{
               width: 100%;
               resize: both;
           }
          </style>
        </head>

        <body onload="devexpdesigner.run('json-forms-container');">
          <button onclick="devexpdesigner.apply()" type="button">apply</button>
          <button onclick="devexpdesigner.run('json-forms-container','dxDataGrid')" type="button">dxDataGrid</button>
          <button onclick="devexpdesigner.run('json-forms-container','dxForm')" type="button">dxForm</button>


          <div class="w3-bar w3-black">
            <button  class="w3-bar-item w3-button tabbtn" onclick="devexpdesigner.opentab(event,'json-forms-container')">form</button>
            <button class="w3-bar-item w3-button tabbtn" onclick="devexpdesigner.opentab(event,'periview')">periview</button>
            <button class="w3-bar-item w3-button tabbtn" onclick="devexpdesigner.opentab(event,'json')">json</button>
          </div>
          <div class="flex-container">
            <div id='json-forms-container' class="tab" style="display: none;"></div>
            <div id="periview" class="dx-viewport demo-container tab" style="display: none;">
              <div id="form">
              </div>
            </div>
            <div id='json' class="tab" style="display: none;">
              <textarea id='textareajson' class="w3-input w3-border" ></textarea>
              <button onclick="devexpdesigner.loadJson()" type="button">load json</button>
            </div>
          </div>
          <button onclick="devexpdesigner.apply()" type="button">apply</button>
          <script>
          var schema = new Object();
          </script>
          <script src="${brutusinJsonFormsUri}"></script>
          <script src="${schemaDxDataGridUri}"></script>
          <script src="${schemaDxFormUri }"></script>
          <!-- partial -->
          <script src='https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/cldrjs/0.4.4/cldr.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/cldrjs/0.4.4/cldr/event.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/cldrjs/0.4.4/cldr/supplemental.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/cldrjs/0.4.4/cldr/unresolved.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize/message.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize/number.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize/currency.min.js'></script>
          <script src='https://cdnjs.cloudflare.com/ajax/libs/globalize/1.1.1/globalize/date.min.js'></script>
          <script src='${dxAllJsUri}'></script>
          <script src="${indexScriptUri}"></script>
        </body>

        </html>
        `;
    }
}
