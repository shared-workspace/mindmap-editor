import React from "react";

export default function Kali(){
    const [isFocused, setFocus] = React.useState<boolean>(false);
    const terminal = React.createRef<HTMLInputElement>();

    const handleKeybord = (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        console.log(e.key);
        switch (e.key) { }
    }
    
    return <>
        <div
            className={`terminal font-consolas h-full pt-2 pl-3 bg-black`}
            onKeyDown={handleKeybord}
        >
            <div id="info-line">
                <span className="text-green-500">┌──&#40;</span>
                <span className=" text-blue-500 font-bold">kali㉿</span>
                <span className=" text-blue-500 font-bold">kali</span>
                <span className=" text-green-500">&#41;-&#91;</span>
                <span className=" text-white">~/workspace/mine</span>
                <span className=" text-green-500">&#93;</span>
            </div>
            <div className="input-line text-white">
                <span className=" text-green-500">└─$ </span>
                <span className="output-text"></span>
                <span className="input-text">
                    {/* <span className={`input-bar border-white border-[0.1px]
            ${isFocused ? "bg-white" : "bg-transparent"}
          `}>.</span> */}
                    <input type="text" name="" id="" className={`input-bar w-3 h-5 pl-3  border-white border-[0.1px]
            ${isFocused ? "bg-white" : "bg-transparent"}
          `} ref={terminal} />
                </span>
            </div>
        </div>
    </>
}