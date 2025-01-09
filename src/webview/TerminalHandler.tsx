import React from "react";
import { useStateManagerContext } from "./TerminalStateManager";
import { handlekeypress } from "./handlers/handlerkeypress";
interface HandlerProps { 
    preventDefault: (e: React.MouseEvent) => void
    handleKeybord: (e: React.KeyboardEvent<HTMLDivElement>) => void
    handleKeyInput: (e: React.ChangeEvent<HTMLInputElement>) => void
}
const HandlerContext = React.createContext<HandlerProps | undefined>(undefined);
export const useHandlerContext=()=> {const Context=React.useContext(HandlerContext);if(!Context) throw new Error("useHandlerContext must be used within a HandlerContextProvider");return Context;};
export const HandlerContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const StateManager = useStateManagerContext();
    if (!StateManager) return;
    const handlerProps: HandlerProps = { 
        preventDefault: (e: React.MouseEvent) => { e.preventDefault(); },
        handleKeybord: (e: React.KeyboardEvent<HTMLDivElement>) => handlekeypress( e, StateManager),
        handleKeyInput: (e: React.ChangeEvent<HTMLInputElement>) => {
            let ch = e.target.value; e.target.value = "";
            if (ch != "") StateManager.CurrentLineChar.left.set((prev) => [...prev, ch]);
        }
    };
    React.useEffect(()=>{
        window.addEventListener("message", (message)=>{
            const data = message.data;
        })
    }, []);
    return (
        <HandlerContext.Provider value={handlerProps}>
            {children}
        </HandlerContext.Provider>
    );
};