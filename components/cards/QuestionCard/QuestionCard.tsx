export const QuestionCard = ({ children }: { children: any }) => {
    return (
        <div
            className=" bg-white shadow-xl p-2 rounded-2xl bg-cover bg-left-top"
            style={{
                backgroundImage: 'url(/images/blur.jpg)',
                // 'url(https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YWJzdHJhY3R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60)',
            }}
        >
            <div className="bg-white/25 p-2 rounded-xl shadow">
                <p className="text-md font-semibold text-orange-400">
                    Need Help?
                </p>
                <div className="flex justify-between">{children}</div>
            </div>
        </div>
    )
}
