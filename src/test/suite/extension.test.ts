import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as coqfmt from "../../extension";

suite("Extension Test Suite", () => {
    vscode.window.showInformationMessage("Start all tests.");

    test("Format", () => {
        vscode.workspace
            .openTextDocument("coq-files/in.v")
            .then((doc) => vscode.window.showTextDocument(doc))
            .then((editor) => {
                coqfmt.format(editor.document).then((res) => {
                    vscode.workspace
                        .openTextDocument("coq-files/out.v")
                        .then((doc) => {
                            assert.strictEqual(res, doc.getText());
                        });
                });
            });
    });

    test("Sample test", () => {
        assert.strictEqual(-1, [1, 2, 3].indexOf(5));
        assert.strictEqual(-1, [1, 2, 3].indexOf(0));
    });
});
