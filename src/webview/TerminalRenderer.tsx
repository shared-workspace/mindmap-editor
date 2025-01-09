import React from "react";
import dep from "./dep.png";
import { useStateManagerContext } from "./TerminalStateManager";
import { useHandlerContext } from "./TerminalHandler";
export default function App(){
  const StateManager = useStateManagerContext();
  const Handler = useHandlerContext();
  if (!(StateManager && Handler)) return;
  React.useEffect(() => {
    console.clear();
    console.log("log testing");
    return () => {}
  }, []);
  return <>
    <div 
      className="terminal text-white h-full bg-black py-1 px-3 font-consolas"
      onKeyDownCapture={Handler.handleKeybord}
    >  
      {/* <img src={dep} alt="no able to use public folder" /> */}
      <div className="info-line">FileName here ! did no change</div>
      {StateManager.PreviousLine.value}
      <span className="input-left" style={{ whiteSpace: 'pre' }}>{StateManager.CurrentLineChar.left.value}</span>
      <input
        type="text"
        ref={StateManager.terminal}
        className={`"input-cursor text-red-500 border-none outline-none w-[1px] caret-white ${StateManager.TerminalFocus.value ? "bg-white" : "bg-transparent"}`}
        onChange={Handler.handleKeyInput}
      />
      <span className="input-right" style={{ whiteSpace: 'pre' }}>{StateManager.CurrentLineChar.right.value}</span>
    </div>
  </>;
}
