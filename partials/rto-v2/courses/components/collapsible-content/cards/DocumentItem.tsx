'use client'

import { useRef, useState } from "react";
import { CheckCircle2, Edit, Eye, Upload } from "lucide-react";
import { Button } from "@components/ui/button";
import { PuffLoader } from "react-spinners";

export function DocumentItem({
    title,
    description,
    fileType,
    multiple = false,
    onUpload,
    onEdit,
    isUploaded,
    isUploading,
    uploadedFiles = [],
    Icon,
}: any) {
    const uploadRef = useRef<HTMLInputElement>(null);
    const editRef = useRef<HTMLInputElement>(null);
    const [viewDropdown, setViewDropdown] = useState(false);

    const handleView = (fileUrl: string) => {
        const viewerUrl = `https://docs.google.com/gview?url=${encodeURIComponent(fileUrl)}&embedded=true`;
        window.open(viewerUrl, "_blank");
    };

    return (
        <div className="border rounded-xl w-full p-4 bg-gray-50 hover:bg-accent/10 transition">
            <div className="flex gap-2">
                <div className="bg-orange-100 size-8 rounded-md flex items-center justify-center">
                    <Icon size={15} className="text-orange-400" />
                </div>

                <div>
                    <h3 className="font-medium text-sm">{title}</h3>
                    {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}

                    {isUploaded ? (
                        <div className="text-xs mt-2">
                            <div className="flex items-center gap-1 text-muted-foreground">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                <span className="truncate">{uploadedFiles.length} file(s) uploaded</span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-xs text-muted-foreground mt-2">Not uploaded yet</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 mt-4">
                {!isUploaded ? (
                    <>
                        <input
                            ref={uploadRef}
                            type="file"
                            accept={fileType}
                            multiple={multiple}
                            onChange={(e) => onUpload(e.target.files!)}
                            className="hidden"
                        />
                        <Button
                            size="sm"
                            className="gap-2 h-8 w-full"
                            onClick={() => uploadRef.current?.click()}
                        >
                            {isUploading ? <PuffLoader size={20} /> : <><Upload className="h-3.5 w-3.5" /> Upload</>}
                        </Button>
                    </>
                ) : (
                    <>
                        {/* VIEW BUTTON */}
                        <div className="relative flex-1">
                            {uploadedFiles.length === 1 ? (
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="gap-2 h-8 w-full flex justify-center"
                                    onClick={() => handleView(uploadedFiles[0])}
                                >
                                    <Eye className="h-3.5 w-3.5" />
                                    View
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-2 h-8 w-full flex justify-between"
                                        onClick={() => setViewDropdown((prev) => !prev)}
                                    >
                                        <Eye className="h-3.5 w-3.5" />
                                        View
                                    </Button>

                                    {viewDropdown && (
                                        <div className="absolute z-50 mt-1 w-full bg-white border rounded shadow-lg">
                                            {uploadedFiles.map((file: string, idx: number) => (
                                                <button
                                                    key={idx}
                                                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-xs truncate"
                                                    onClick={() => handleView(file)}
                                                >
                                                    File {idx + 1}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {/* EDIT BUTTON */}
                        <input
                            ref={editRef}
                            type="file"
                            accept={fileType}
                            multiple={multiple}
                            onChange={(e) => onEdit(e.target.files!)}
                            className="hidden"
                        />
                        <Button
                            size="sm"
                            variant="outline"
                            className="gap-2 h-8"
                            onClick={() => editRef.current?.click()}
                            disabled={isUploading}
                        >
                            {isUploading ? <PuffLoader size={20} /> : <Edit className="h-3.5 w-3.5" />}
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
