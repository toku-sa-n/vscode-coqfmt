import * as child_process from "child_process";
import * as vscode from "vscode";

export function activate(_: vscode.ExtensionContext) {
    vscode.languages.registerDocumentRangeFormattingEditProvider("coq", {
        provideDocumentRangeFormattingEdits(
            document: vscode.TextDocument,
            range: vscode.Range,
        ): vscode.ProviderResult<vscode.TextEdit[]> {
            try {
                const formatted = child_process
                    .execSync("coqfmt", { input: document.getText(range) })
                    .toString();

                return [vscode.TextEdit.replace(range, formatted)];
            } catch (e: any) {
                vscode.window.showErrorMessage(
                    `Failed to format the code: ${e.message}`,
                );

                return [];
            }
        },
    });
}
