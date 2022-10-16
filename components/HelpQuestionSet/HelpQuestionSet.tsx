import { Typography } from '@components/Typography'
import Link from 'next/link'

interface HelpQuestion {
    text: string
    link: string
}
interface HelpQuestionSetProps {
    title: string
    questions: HelpQuestion[]
    smallHeading?: boolean
}
export const HelpQuestionSet = ({
    title,
    questions,
    smallHeading,
}: HelpQuestionSetProps) => {
    return (
        <div>
            {smallHeading ? (
                <Typography variant="muted" color="text-blue-800">
                    {title}
                </Typography>
            ) : (
                <Typography variant="label">{title}</Typography>
            )}

            <ul>
                {questions.map((question) => (
                    <li>
                        <Link href={question.link}>
                            <a className="text-blue-400 text-sm hover:text-blue-500">
                                {question.text}
                            </a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
