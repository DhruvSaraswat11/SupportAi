import usermodel from "@/model/usermodel";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { connectDb } from "@/lib/Db";

export async function POST(req: NextRequest) {
    try {
        const { message, ownerId } = await req.json()
        console.log(message, ownerId)
        if (!message || !ownerId) {
            return NextResponse.json({
                message: " message and ownerId is required "
            }, { status: 400 })
        }
        await connectDb()
        const setting = await usermodel.findOne({ ownerId })
        if (!setting) {
            return NextResponse.json({
                message: " chatboy is not configured yet "
            }, { status: 400 })
        }

        const knowledge = `
        businessName - ${setting.businessName} 
         supportEmail - ${setting.supportEmail} 
        knowledge - ${setting.knowledge} `
        const prompt = `You are a professional Customer Support AI.

You will receive:

**Customer Question:**

 text
{ ${message} }


**Business Info:**

text
{ ${knowledge} }


### Instructions

* Read the customer's question carefully.
* Find the relevant information from the knowledge base.
* Answer clearly, professionally, and politely.
* Keep the response concise but complete.
* If the answer requires steps, use numbered or bullet points.
* If multiple knowledge entries are relevant, combine them into one clear answer.
* **Only use the provided knowledge base. Do not make up information.**
* If the knowledge base doesn't contain the answer, reply:
* 

  > "I'm sorry, I couldn't find enough information in our knowledge base to answer your question. Please contact our support team for further assistance."
* If the question is unclear, ask for clarification instead of guessing.
*Give answer in english only until the user will not request you
### Output Format

**Answer:**
(Provide the final customer-friendly response.)
`



        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API });

        const interaction = await ai.interactions.create({
            model: "gemini-3.5-flash",
            input: prompt,
        });

        const response = NextResponse.json(interaction.output_text)
        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "POST , OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type");

        return response
      

    } catch (error) {
        const response = NextResponse.json({
            message: ` chat error ${error} `
        }, { status: 500 })

        response.headers.set("Access-Control-Allow-Origin", "*");
        response.headers.set("Access-Control-Allow-Methods", "POST , OPTIONS");
        response.headers.set("Access-Control-Allow-Headers", "Content-Type");
        return response
    }
}



export async function OPTIONS() {
  const response = new NextResponse(null, {
    status: 204,
  });

  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}