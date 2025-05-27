import { createContext, useState } from "react";
import main from "../config/Gemini";

export const Context = createContext();


const ContextProvider = (props) =>{

    const [input,setInput] = useState("")
    const [recentPrompts,setRecentPrompts] = useState("")
    const [prevPrompts,setPrepPrompts] = useState([])
    const [showResult,setShowResult] = useState(false)
    const [loading,setLoading] = useState(false)
    const [resultData,setResultData] = useState("") 

    const delayPara = (index,nextWord) =>{
        setTimeout(() => {
            setResultData(prev=>prev+nextWord)
        }, 75*index);
    }

    const newChat = () =>{
        setLoading(false)
        setShowResult(false)
    }

    const onSent = async (prompt) =>{
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if (prompt !== undefined){
            response = await main(prompt)
            setRecentPrompts(prompt)
        }
        else{
            setRecentPrompts(input)
            setPrepPrompts(prev=>[...prev,input])
            response = await main(input);
        }
        let responseArray = response.split("**");
        let newResponse = '';

        for (let i = 0; i < responseArray.length; i++) {
        if (i % 2 === 0) {
            newResponse += responseArray[i];
        } else {
            newResponse += "<b>" + responseArray[i] + "</b>"; 
        }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        let newResponseArray = newResponse2.split(' ')
        for(let i=0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i,nextWord+" ")
        }
        setLoading(false);
        setInput('');
    }

    const ContextValue = {
        prevPrompts,
        setPrepPrompts,
        onSent,
        setRecentPrompts,
        recentPrompts,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        newChat
    }
    return(
        <Context.Provider value={ContextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;