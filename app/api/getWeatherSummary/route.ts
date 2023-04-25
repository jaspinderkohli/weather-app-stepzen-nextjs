import { NextResponse } from "next/server";
import { openai } from "@/openai";

export async function POST(request: Request) {
    // weathersummary is the name of the engine we created in StepZen
    const { weatherData } = await request.json();

    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        // model: "davinci",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: `Pretend you are a weather news presenter LIVE on televison. be energetic and enthusiastic. Introduce yourself as a AI weather reporter. State the city you are providing a summary for. The give todays weather only. Make it easy for the viewer to understand and know what to do to prepare for those weather conditions such as wear SPF if the UV is high etc. use the uv_index data provided to provide UV advice. Provide a joke regarding the weather. Assume the data camer from your team at the news office not from the user.`,
            },
            {
                role: 'user',
                content: ` Hi there, can I get a summary of todays weather, use the following data: ${JSON.stringify(weatherData)}`,
            },
        ]
    });

    const { data } = response;

    console.log("Data from OpenAI: ", data);

    return NextResponse.json(data.choices[0].message);
}