// import dep from "../dep.png";
import * as vscode from 'vscode';
import { TerminalProvider } from './panelProvider';
import Tokenizer from './tokenizer';

export async function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "c-code-simulator" is now active!');
	const extensionUri = context.extensionUri;
	const subscriptions = context.subscriptions;
	const panelProvider = new TerminalProvider(extensionUri);
	const tokenizer = new Tokenizer(extensionUri)
	subscriptions.push(vscode.commands.registerCommand('simulator.helloWorld', () => {vscode.window.showInformationMessage('Hello World from c code simulator!');}));
	subscriptions.push(vscode.window.registerWebviewViewProvider('simulator.terminal', panelProvider));
	// panelProvider._test = true;
	subscriptions.push(vscode.commands.registerCommand('simulator.runCode', async () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor && activeEditor.document.languageId === 'c') {
			const document = activeEditor.document;
			const tokens = await tokenizer.getTokens("source.objc", document);
			console.log("tokens");
			console.log(tokens);
			// panelProvider.run(code);
		}
		if (activeEditor && activeEditor.document.languageId === 'objective-c') {
			const document = activeEditor.document;
			const tokens = await tokenizer.getTokens("source.objc", document);
			console.log("tokens");
			console.log(tokens);
			// panelProvider.run(code);
		}
	}));
}
export function deactivate() {}
