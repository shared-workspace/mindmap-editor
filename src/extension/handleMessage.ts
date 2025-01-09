import { MessageFromWebView } from "../ExtensionMessageAPI";

class HandleMessageFromWebView {
  constructor(){}
  run(msg: MessageFromWebView){
    switch(msg){
      default: 
        console.log("Alert: Got Undefined Message");
        return;
      case "connected": 
        console.log("WebView is connected to Extension");
        break;
      case "WebView here":
        console.log("WebView is connected to Extension");
        break;
    }
  }
} 
export const handleMessageFromWebView = new HandleMessageFromWebView();