import { Button } from '@components/buttons';
import { CommonApi } from '@queries';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { PulseLoader } from 'react-spinners';

export const ReportListModal = ({ onClose }: any) => {


    return (
        <>

            <div className="bg-[#00000050] w-full h-screen flex items-center justify-center fixed top-0 left-0 z-40">
                <div className="bg-white h-[80vh] overflow-auto custom-scrollbar rounded-2xl flex flex-col items-center gap-y-2 shadow-xl min-w-[450px] px-6 py-2">
                    <div className="flex justify-end w-full">
                        <FaTimes
                            className="text-gray-500 hover:text-red-500 cursor-pointer"
                            onClick={() => {
                                onClose && onClose();
                            }}
                        />

                    </div>
                    <p>
                        lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed euismod, nisl nec aliquam aliquam, nunc nisl
                        tincidunt nunc, eget aliquam nisl lorem eu nunc. Sed
                        euismod, nisl nec aliquam aliquam, nunc nisl tincidunt
                    </p>

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

        </>
    );
};
