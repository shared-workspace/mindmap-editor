import React from "react";
export interface StateProps {
    terminal: React.RefObject<HTMLInputElement>
    TerminalFocus: {
        value: boolean
        set: React.Dispatch<React.SetStateAction<boolean>>
    }
    CurrentLineChar: {
        left: {
            value: string[]
            set: React.Dispatch<React.SetStateAction<string[]>>

        }
        right: {
            value: string[]
            set: React.Dispatch<React.SetStateAction<string[]>>
        }
    }
    Buffer: {
        in: {
            value: string[]
            set: React.Dispatch<React.SetStateAction<string[]>>
        }
        out: {
            value: string[]
            set: React.Dispatch<React.SetStateAction<string[]>>
        }
    }
    PreviousLine: {
        value: React.ReactNode[]
        set: React.Dispatch<React.SetStateAction<React.ReactNode[]>>
    }
}
const StateManagerContext = React.createContext<StateProps | undefined>(undefined);
export const useStateManagerContext=()=> {const Context=React.useContext(StateManagerContext);if(!Context) throw new Error("useStateManagerContext must be used within a StateManagerContextProvider");return Context;};
export const StateManagerContextProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const terminal = React.createRef<HTMLInputElement>();
    const [isFocused, setFocus] = React.useState<boolean>(false);
    const [charLeft, setCharLeft] = React.useState<string[]>([]);
    const [charRight, setCharRight] = React.useState<string[]>([]);
    const [inputBuffer, setInputBuffer] = React.useState<string[]>([]);
    const [outputBuffer, setOutputBuffer] = React.useState<string[]>([]);
    const [line, setLine] = React.useState<React.ReactNode[]>([]);

    const stateProps: StateProps = { 
        terminal,
        TerminalFocus: {
            value: isFocused,
            set: setFocus
        },
        CurrentLineChar: {
            left: {
                value: charLeft,
                set: setCharLeft
            },
            right: {
                value: charRight,
                set: setCharRight
            }
        },
        Buffer: {
            in: {
                value: inputBuffer,
                set: setInputBuffer
            },
            out: {
                value: outputBuffer,
                set: setOutputBuffer
            },
        },
        PreviousLine: {
            value: line,
            set: setLine
        },
    };
    React.useEffect(() => {
        if (!terminal.current) return; const k = terminal.current;
        window.addEventListener("focus", () => setFocus(true));
        window.addEventListener("blur", () => setFocus(false));
        window.addEventListener("click", () => k.focus());
        setTimeout(() => { }, 3_000);
        return () => {};
    }, []);
    return (
        <StateManagerContext.Provider value={stateProps}>
            {children}
        </StateManagerContext.Provider>
    );
};