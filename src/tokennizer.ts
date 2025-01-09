// // import { Registry, parseRawGrammar, INITIAL } from "vscode-textmate";
// // import type vscodeTextmate from "vscode-textmate";
// // import { loadWASM, OnigScanner, OnigString } from "vscode-oniguruma";


// // import * as vscode from "vscode";

// // const PLISTS = {
// //   "source.asp.vb.net":
// //     "https://raw.githubusercontent.com/textmate/asp.vb.net.tmbundle/master/Syntaxes/ASP%20VB.net.plist",
// //   "source.js":
// //     "https://raw.githubusercontent.com/textmate/javascript.tmbundle/master/Syntaxes/JavaScript.plist",
// //   "source.ruby":
// //     "https://raw.githubusercontent.com/textmate/ruby.tmbundle/master/Syntaxes/Ruby.plist",
// //   "source.c":
// //     "https://raw.githubusercontent.com/textmate/c.tmbundle/master/Syntaxes/C.plist"
// // };
// // const cache = {};
// // async function getPlist(scopeName: string) {
// //   if (!cache[scopeName]) {
// //     cache[scopeName] = await fetch(PLISTS[scopeName]).then((response) => response.text());
// //     cache[scopeName] = await fetch(PLISTS[scopeName]).then((response) => response.text());
// //   }
// //   return cache[scopeName];
// // }

// // let onigurumaLib: vscodeTextmate.IOnigLib | null = null;

// // async function getOniguruma(): Promise<vscodeTextmate.IOnigLib> {
// //   if (onigurumaLib) {
// //     return onigurumaLib;
// //   }
// //   const res = await fetch("https://unpkg.com/vscode-oniguruma@1.5.1/release/onig.wasm");
// //   await loadWASM(await res.arrayBuffer());
// //   onigurumaLib = {
// //     createOnigScanner(patterns: string[]) {
// //       return new OnigScanner(patterns);
// //     },
// //     createOnigString(str: string) {
// //       return new OnigString(str);
// //     }
// //   };
// //   return onigurumaLib;
// // }

// // async function getRegistry() {
// //   return new Registry({
// //     onigLib: getOniguruma(),
// //     async loadGrammar(scopeName: string) {
// //       if (PLISTS[scopeName]) {
// //         const data = await getPlist(scopeName);
// //         return parseRawGrammar(data);
// //       }
// //       return null;
// //     }
// //   });
// // }


// export async function showTokens(document: vscode.TextDocument) {
//   const registry = await getRegistry();
//   const grammar = await registry.loadGrammar("source.c");

//   if (!grammar) return [];
//   const tokens: SimpleTextmateToken[] = [];
//   for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
//     const line = document.lineAt(lineNumber);
//     const lineResult = grammar.tokenizeLine(line.text, INITIAL);
//     for (const token of lineResult.tokens) {
//       tokens.push({
//         text: line.text.substring(token.startIndex, token.endIndex),
//         type: token.scopes[token.scopes.length - 1],
//       });
//     }
//   }
//   console.log("tokens: ", tokens);
//   return tokens;
// }
// // // import * as vscodeTextmate from "vscode-textmate";
// // // import type { } from "vscode-textmate";
// // // import { loadWASM, OnigScanner, OnigString } from "vscode-oniguruma";
// // // import * as vscode from "vscode";
// // // import * as fs from "fs";
// // // // import * as onig from "../../node_modules/vscode-oniguruma/release/onig.wasm";

// // // export default class Tokenizer {
// // //   grammar?: vscodeTextmate.IGrammar | null
// // //   onigurumaLib: vscodeTextmate.IOnigLib | null;
// // //   // plists: {
// // //   //   "source.c": string
// // //   // }
// // //   constructor(public _extensionUri: vscode.Uri) {
// // //     // this.plists["source.c"] = vscode.Uri.joinPath(_extensionUri, "media", "c.plist").fsPath;
// // //     this.onigurumaLib = null;
// // //     this.init();
// // //   }
// // //   async init() {
// // //     const registry = await this.getRegistry();
// // //     this.grammar = await registry.loadGrammar("source.c");
// // //   }
// // //   private async getOniguruma(): Promise<vscodeTextmate.IOnigLib> {
// // //     const res = await fetch("https://unpkg.com/vscode-oniguruma@1.5.1/release/onig.wasm");
// // //     await loadWASM(await res.arrayBuffer());
// // //     const onigurumaLib = {
// // //       createOnigScanner(patterns: string[]) { return new OnigScanner(patterns) },
// // //       createOnigString(str: string) { return new OnigString(str) }
// // //     };
// // //     return onigurumaLib;
// // //   }

// // //   async getRegistry() {
// // //     const extensionUri = this._extensionUri
// // //     return new vscodeTextmate.Registry({
// // //       onigLib: this.getOniguruma(),
// // //       async loadGrammar(scopeName: string) {
// // //         // if (this.plist[scopeName]) {
// // //         if (scopeName == "source.c") {
// // //           const data = fs.readFileSync(vscode.Uri.joinPath(extensionUri, "media", "c.plist").path).toString();
// // //           return vscodeTextmate.parseRawGrammar(data);
// // //         }
// // //         return null;
// // //       }
// // //     });

// // //   }
// // //   getTokens(document: vscode.TextDocument) {
// // //     if (!this.grammar) return [];
// // //     const grammar = this.grammar;
// // //     // for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
// // //     //   const line = document.lineAt(lineNumber);
// // //     //   const lineResult = this.grammar.tokenizeLine(line.text, vscodeTextmate.INITIAL);
// // //     // }
// // //     return document.getText().split("\n")
// // //       .filter((x) => x)
// // //       .map((line) => {
// // //         const tokenizeResult = grammar.tokenizeLine(line, vscodeTextmate.INITIAL);
// // //         return {
// // //           line,
// // //           tokens: tokenizeResult.tokens.map((token) => {
// // //             const tokenText = line.substring(token.startIndex, token.endIndex);
// // //             return {
// // //               token: tokenText,
// // //               scopes: token.scopes.join(" > ")
// // //             };
// // //           })
// // //         };
// // //       });
// // //   }
// // // }