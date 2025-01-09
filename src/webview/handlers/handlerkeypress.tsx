import React from "react";
import { StateProps } from "../TerminalStateManager";
export const handlekeypress = (e: React.KeyboardEvent<HTMLDivElement>, StateManager: StateProps) => {
    const { value: charLeft, set: setCharLeft } = StateManager.CurrentLineChar.left;
    const { value: charRight, set: setCharRight } = StateManager.CurrentLineChar.right;
    let ch: string;
    switch (e.key) {
        case "ArrowUp":
            break;
        case "ArrowLeft":
            ch = charLeft[charLeft.length - 1];
            if (ch && ch != "") setCharLeft((prev) => prev.slice(0, -1)), setCharRight((prev) => [ch, ...prev]);
            break;
        case "ArrowRight":
            ch = charRight[0];
            if (ch && ch != "") setCharLeft((prev) => [...prev, ch]), setCharRight((prev) => prev.slice(1));
            break;
        case "ArrowDown":
            break;
        case "Shift":
            break;
        case "Control":
            break;
        case "Alt":
            break;
        case "Tab":
            e.preventDefault();
            setCharLeft((prev) => [...prev, ' ', ' ', ' ', ' ']);
            break;
        case "Backspace":
            if (charLeft.length === 0) return;
            setCharLeft((prev) => prev.slice(0, -1));
            break;
        case "Enter":
            let l = [...charLeft, ...charRight];
            if (l.length === 0) return;
            StateManager.PreviousLine.set((prev) => [...prev, <span style={{ whiteSpace: 'pre' }}>{l}</span>, <br />]);
            setCharLeft([]); setCharRight([]);
            StateManager.Buffer.in.set((prev) => [...prev, ...l.join('').split(' ').filter(Boolean)])
            break;
        case "Delete":
            if (charRight.length === 0) return;
            setCharRight((prev) => prev.slice(1));
            break;
        default: ;
    }
}