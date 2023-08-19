import * as child_process from "child_process";
import * as vscode from "vscode";

export function activate(_: vscode.ExtensionContext) {
    vscode.languages.registerDocumentRangeFormattingEditProvider("coq", {
        provideDocumentRangeFormattingEdits(
            document: vscode.TextDocument,
            range: vscode.Range,
        ): vscode.ProviderResult<vscode.TextEdit[]> {
            const config = vscode.workspace.getConfiguration("coqfmt");

            const workspaceFullPath = vscode.workspace.getWorkspaceFolder(
                document.uri,
            )?.uri.fsPath;

            try {
                const cmd = "coqfmt ".concat(config.get("args", ""));

                const formatted = child_process
                    .execSync(cmd, {
                        input: document.getText(range),
                        cwd: workspaceFullPath,
                    })
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
