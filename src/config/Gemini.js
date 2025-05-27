
// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
    GoogleGenAI,
  } from '@google/genai';
  
  async function main(prompt) {
    const ai = new GoogleGenAI({
      apiKey: "AIzaSyBqv2mQjduADGBRRwJqHRmxAamw2_PnExQ",
    });
    const config = {
      responseMimeType: 'text/plain',
    };
    const model = 'gemma-3n-e4b-it';
    const contents = [
      {
        role: 'user',
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });
    console.log(response.text)
    return response.text
  }
  
  export default main;
  
