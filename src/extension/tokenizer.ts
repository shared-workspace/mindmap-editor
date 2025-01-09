import * as vscode from "vscode";
import * as fs from "fs";
// import * as path from "path";
import { Registry, parseRawGrammar, INITIAL, IGrammar } from "vscode-textmate";
import type vscodeTextmate from "vscode-textmate";
import { loadWASM, OnigScanner, OnigString } from "vscode-oniguruma";
interface Cache {
  "source.c"?: string
}
interface SimpleTextmateToken {
  text: string;
  type: string;
}
export default class Tokenizer {
  private _wasm: Uint8Array;
  private registry: Registry;
  private onigurumaLib: vscodeTextmate.IOnigLib | null = null;
  private PLISTs: Cache;
  private grammar: IGrammar;
  constructor(private _extensionUri: vscode.Uri){
    const wsamUri = vscode.Uri.joinPath(this._extensionUri, 'media', 'onig.wasm');
    // if (plist) this.PLISTs["source.c"] = plist;
    // this.PLISTs["source.c"] = fs.readFileSync(plitUri.fsPath)?.toString() || undefined;
    this._wasm = new Uint8Array(fs.readFileSync(wsamUri.fsPath).buffer);
    this.setRegistry();
  }

  private async getOniguruma(): Promise<vscodeTextmate.IOnigLib>  {
    if(this.onigurumaLib) return this.onigurumaLib;
    await loadWASM(this._wasm);
    this.onigurumaLib = {
      createOnigScanner(patterns: string[]) {
        return new OnigScanner(patterns);
      },
      createOnigString(str: string) {
        return new OnigString(str);
      }
    };
    return this.onigurumaLib;
  }

  private setRegistry() {
    const getPlist = (scopeName: string) => {
      if (scopeName == "source.c") {
        const plitUri = vscode.Uri.joinPath(this._extensionUri, 'media', 'c.plist');
        const plist = fs.readFileSync(plitUri.fsPath).toString() || undefined;
        return plist;
      } else if (scopeName == "source.objc") { 
        const plitUri = vscode.Uri.joinPath(this._extensionUri, 'media', 'objc.plist');
        const plist = fs.readFileSync(plitUri.fsPath).toString() || undefined;
        return plist;
      }
    }
    const onigurumaLib = this.getOniguruma();
    const loadGrammar = async (scopeName: string) => {
      const plist = getPlist(scopeName);
      if(plist) return parseRawGrammar(plist);
      return null;
    }
    this.registry = new Registry({
      onigLib: onigurumaLib,
      loadGrammar
    });
  }

  public async getTokens(scopeName: string, document: vscode.TextDocument){
    const grammar = await this.registry.loadGrammar(scopeName);
    const tokens: SimpleTextmateToken[] = [];
    if (grammar) {
      for (let lineNumber = 0; lineNumber < document.lineCount; lineNumber++) {
        const line = document.lineAt(lineNumber);
        const lineResult = grammar.tokenizeLine(line.text, INITIAL);
        for (const token of lineResult.tokens) {
          const text = line.text.substring(token.startIndex, token.endIndex);
          if (/\S/.test(text)) tokens.push({ text, type: token.scopes.pop() || "" });
        }
      }
      console.log("tokens: ", tokens);
    }
    return tokens;
  }
}