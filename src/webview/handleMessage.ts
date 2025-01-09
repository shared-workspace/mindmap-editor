import { MessageFromVScode } from "../ExtensionMessageAPI";

class HandleMessageFromVScode {
  constructor() { }
  run(msg: MessageFromVScode) {
    switch (msg) {
      default:
        console.log("Alert: Got Undefined Message From VScode");
        return;
      case "connected":
        console.log("VScode is connected to Extension");
        break;
      case "VScode here":
        console.log("VScode here is connected to Extension");
        break;
      case "code":
        console.log();
        break;
      
    }
  }
}
export const handleMessageFromVScode = new HandleMessageFromVScode();