// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as child_process from "child_process";
import { runInThisContext } from "vm";
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(_: vscode.ExtensionContext) {
    vscode.languages.registerDocumentRangeFormattingEditProvider("coq", {
        provideDocumentRangeFormattingEdits(
            document: vscode.TextDocument,
            range: vscode.Range
        ): vscode.ProviderResult<vscode.TextEdit[]> {
            try {
                const formatted = child_process
                    .execSync("coqfmt", { input: document.getText(range) })
                    .toString();

                return [vscode.TextEdit.replace(range, formatted)];
            } catch (e: any) {
                vscode.window.showErrorMessage(
                    `Failed to format the code: ${e.message}`
                );

                return [];
            }
        },
    });
}
