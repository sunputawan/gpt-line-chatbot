import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const chatCompletion = async (text) => {
    try { 
        const response = await openai.chat.completions.create({
            model: process.env.GPT_MODEL,
            messages: [
                { role: 'user', content: String(text) },
            ],
        });

        // console.log(response.choices[0].message.content);
        return response.choices[0].message.content;
    } catch (error) {
        console.log("Error: ", error);
        return "GPT is unavailable now.\nPlease contact Sun!"
    }
};
