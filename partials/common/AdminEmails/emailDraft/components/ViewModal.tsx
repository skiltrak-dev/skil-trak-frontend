import { Button } from '@components/buttons';
import { CommonApi } from '@queries';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { PulseLoader } from 'react-spinners';

export const ViewModal = ({ id, onClose }: any) => {
    const [keyMatched, setKeyMatched] = useState(false);
    const { data, isLoading, isError } = CommonApi.Messages.useGetTemplate(id, {
        skip: !id,
    })

    return (
        <>
            {/* {isOpen && ( */}
            {isLoading ? (
                <PulseLoader
                    color="white"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                    size={6}
                />
            ) : (
                <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                    <div className="bg-white h-[80vh] overflow-auto custom-scrollbar rounded-2xl flex flex-col items-center gap-y-6 shadow-xl min-w-[450px] px-6 py-4">
                        <div className="flex justify-end w-full">
                            <FaTimes
                                className="text-gray-500 hover:text-red-500 cursor-pointer"
                                onClick={() => {
                                    onClose && onClose();
                                }}
                            />
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p className="text-lg font-semibold">{data?.subject}</p>
                            {/* <p className="">{data?.content}</p> */}
                            <div
                                className="block mr-6 text-gray-500 max-w-[400px]"
                                dangerouslySetInnerHTML={{
                                    __html: data?.content,
                                }}
                            />
                        </div>

                        <div className="flex gap-x-4 items-center">
                            <Button
                                text="Close"
                                variant="secondary"
                                onClick={() => {
                                    onClose && onClose();
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
            {/* )} */}
        </>
    );
};
