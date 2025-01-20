import { ComponentProps, useId, useRef, useState } from "react";
import { InfoIcon, UploadIcon } from "../../assets";
import Button from "./Button";

type PropsType = {
    label: string;
    error: null | string;
    info: null | string;
    file: File | null;
    onFileDrop: (file: File | null) => void;
    onRemove: () => void;
} & Omit<ComponentProps<"input">, "type" & "className">;

export default function FileInput({
    label,
    file,
    error,
    info,
    onFileDrop,
    onRemove,
    ...rest
}: PropsType) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const id = useId();
    const fileInputId = `${id}-file`;
    const [isFileDrag, setIsFileDrag] = useState(false);

    const fileContainer =
        "group flex flex-col items-center justify-center gap-4 text-xl md:text-2xl text-neutral-300 bg-white bg-opacity-10 cursor-pointer p-4 md:p-8 border-2 border-neutral-500 border-dashed rounded-xl outline outline-2 outline-offset-[3px] outline-transparent transition-all duration-200";

    return (
        <div>
            <div className="grid gap-2">
                <span className="text-lg">{label}</span>

                <input
                    id={fileInputId}
                    className="hidden"
                    type="file"
                    ref={inputRef}
                    {...rest}
                />

                {!file ? (
                    <label
                        htmlFor={fileInputId}
                        tabIndex={1}
                        className={`${fileContainer} hover:bg-opacity-50 focus:outline-neutral-500 focus-visible:outline-neutral-500`}
                        onDragOver={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setIsFileDrag(true);
                        }}
                        onDragEnd={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setIsFileDrag(false);
                        }}
                        onDrop={(e) => {
                            e.preventDefault();
                            setIsFileDrag(false);
                            if (e.dataTransfer.items) {
                                const item = e.dataTransfer.items[0];
                                if (item.kind === "file") {
                                    const file = item.getAsFile();
                                    onFileDrop(file);
                                }
                            }
                        }}
                    >
                        <UploadIcon
                            className={`w-10 h-10 p-1 border rounded-xl shadow-md bg-white bg-opacity-20 group-hover:bg-opacity-50 ${
                                isFileDrag ? "animate-bounce" : ""
                            }`}
                        />
                        Drag and drop or click to upload
                    </label>
                ) : (
                    <div className={fileContainer}>
                        <img
                            src={URL.createObjectURL(file)}
                            className="w-32 h-32 aspect-square rounded-xl object-cover overflow-hidden"
                            alt=""
                        />
                        <div className="flex items-center justify-center gap-2 md:gap-4">
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={onRemove}
                            >
                                Remove Image
                            </Button>
                            <Button
                                variant="ghost"
                                type="button"
                                onClick={() => {
                                    inputRef?.current?.click();
                                }}
                            >
                                Change Image
                            </Button>
                        </div>
                    </div>
                )}

                {info && (
                    <span className="mt-1 flex items-center justify-start gap-1 text-neutral-500 text-sm">
                        <InfoIcon className="w-4 h-4" /> {info}
                    </span>
                )}
                {error && (
                    <span className="mt-1 flex items-center justify-start gap-1 text-orange-700 text-sm">
                        <InfoIcon className="w-4 h-4" /> {error}
                    </span>
                )}
            </div>
        </div>
    );
}
