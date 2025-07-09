import { openai } from '@utils'
import { NextResponse } from 'next/server'

export async function ReWritePhrase(request: { text: string }) {
    try {
        // Parse the request body
        const { text } = request

        // Validate input
        if (!text || typeof text !== 'string') {
            return NextResponse.json(
                { error: 'Text is required and must be a string' },
                { status: 400 }
            )
        }

        if (text.length > 5000) {
            return NextResponse.json(
                { error: 'Text is too long. Maximum 5000 characters allowed.' },
                { status: 400 }
            )
        }

        // Check if OpenAI API key is configured
        if (!process.env.NEXT_PUBLIC_OPENAI_API_KEY) {
            return NextResponse.json(
                { error: 'OpenAI API key not configured' },
                { status: 500 }
            )
        }

        // Create the completion using OpenAI Functions
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini', // or 'gpt-4' if you prefer
            messages: [
                {
                    role: 'system',
                    content: `You are a grammar correction assistant. Your task is to:
1. Fix all grammar mistakes
2. Improve sentence structure and clarity
3. Correct spelling errors
4. Enhance readability while maintaining the original meaning
5. Return only the corrected text without explanations
6. If i send you in points so write in points
7. If i send you in paragraphs so write in paragraphs

Keep the tone and style similar to the original text.`,
                },
                {
                    role: 'user',
                    content: text,
                },
            ],
            functions: [
                {
                    name: 'correct_grammar',
                    description:
                        'Correct grammar mistakes and improve text quality',
                    parameters: {
                        type: 'object',
                        properties: {
                            corrected_text: {
                                type: 'string',
                                description:
                                    'The corrected and improved version of the input text',
                            },
                            changes_made: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                },
                                description:
                                    'List of main improvements made (optional)',
                            },
                        },
                        required: ['corrected_text'],
                    },
                },
            ],
            function_call: { name: 'correct_grammar' },
            temperature: 0.3,
            max_tokens: 2000,
        })

        // Extract the function call result
        const functionCall = completion.choices[0]?.message?.function_call

        if (!functionCall || functionCall.name !== 'correct_grammar') {
            throw new Error('Invalid response from OpenAI')
        }

        const result = JSON.parse(functionCall.arguments)

        if (!result.corrected_text) {
            throw new Error('No corrected text received')
        }

        // Return the corrected text
        return NextResponse.json({
            correctedText: result.corrected_text,
            changesMade: result.changes_made || [],
        })
    } catch (error) {
        console.error('Error in grammar correction API:', error)

        // Handle specific OpenAI errors
        if (error instanceof Error) {
            if (error.message.includes('API key')) {
                return NextResponse.json(
                    { error: 'Invalid API key' },
                    { status: 401 }
                )
            }

            if (
                error.message.includes('quota') ||
                error.message.includes('billing')
            ) {
                return NextResponse.json(
                    { error: 'API quota exceeded' },
                    { status: 429 }
                )
            }
        }

        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
