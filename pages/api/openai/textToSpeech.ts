import { openai } from '@utils'
import { NextResponse } from 'next/server'

export async function TextToSpeech(request: any) {
    try {
        const { text } = request

        if (!text) {
            return NextResponse.json(
                { error: 'Text is required' },
                { status: 400 }
            )
        }

        const response = await openai.audio.speech.create({
            model: 'tts-1', // or "tts-1-hd" for higher quality
            voice: 'alloy', // Options: alloy, echo, fable, onyx, nova, shimmer
            input: text,
        })

        // Convert the response to a buffer
        const buffer = Buffer.from(await response.arrayBuffer())

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': 'attachment; filename=speech.mp3',
            },
        })
    } catch (error) {
        console.error('Error generating speech:', error)
        return NextResponse.json(
            { error: 'Failed to generate speech' },
            { status: 500 }
        )
    }
}
