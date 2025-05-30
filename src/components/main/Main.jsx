import React, { useContext, useState } from 'react'
import "./Main.css"
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const {input,setInput,onSent,recentPrompts,showResult,loading,resultData} = useContext(Context)

  return (
    <div className='main'>
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">
            {!showResult
            ?
                <>
                    <div className="greet">
                        <p><span>Hello, Dev.</span></p>
                        <p>How can i Help you today</p>
                    </div>
                    <div className="cards">
                        <div className="card">
                            <p>Suggest beautifull place to see on an upcoming road trip</p>
                            <img src={assets.compass_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Briefly summerize the concept: Urban planing</p>
                            <img src={assets.bulb_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Brainstorm team bonding activities to our work retreat</p>
                            <img src={assets.message_icon} alt="" />
                        </div>
                        <div className="card">
                            <p>Improve the readablity of the following code</p>
                            <img src={assets.code_icon} alt="" />
                        </div>
                    </div>
                </>
                :<div className='result'>
                    <div className="result-title">
                        <img src={assets.user_icon} alt="" />
                        <p>{recentPrompts}</p>
                    </div>
                    <div className="result-data">
                        <img src={assets.gemini_icon} alt="" />
                        {loading?
                        <div className='loader'>
                            <hr />
                            <hr />
                            <hr />
                        </div>:<p dangerouslySetInnerHTML={{__html:resultData}}></p>
                        }
                    </div>
                </div>
             }
            
            <div className="main-bottom">
                <div className="search-box">
                    <input type="text" value={input} onChange={(e)=>setInput(e.target.value)} placeholder='Enter the prompt here'/>
                    <div>
                        <img src={assets.gallery_icon} alt=""></img>
                        <img src={assets.mic_icon} alt=""></img>
                        <img onClick={()=>onSent()} src={assets.send_icon} alt=""></img>
                    </div>
                </div>
                <p className='bottom-info'>
                    Gemini may display inaccurate info,including about people,so double-check its responses.your Privacy and Gemini Apps
                </p>
            </div>
        </div>
    </div>
  )
}

export default Main