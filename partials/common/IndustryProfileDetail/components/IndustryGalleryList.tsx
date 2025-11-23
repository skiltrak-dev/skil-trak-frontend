import { IndustryGalleryCard } from '../card'

export const IndustryGalleryList = ({ gallery }: { gallery: any }) => {
    return (
        <div className="max-w-3xl mx-auto ">
            <div className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden">
                {/* Header */}

                {/* List */}
                <div className="divide-y divide-gray-300">
                    {gallery?.map((gal: any, index: number) => (
                        <IndustryGalleryCard
                            key={gal?.id}
                            index={index}
                            gal={gal}
                        />
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    )
}
