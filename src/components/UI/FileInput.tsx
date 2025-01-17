import { ComponentProps, useId } from "react";
import { InfoIcon, UploadIcon } from "../../assets";

type PropsType = {
    label: string;
    error: null | string;
    info: null | string;
    file: File | null;
} & Omit<ComponentProps<"input">, "type" & "className">;

export default function FileInput({
    label,
    file,
    error,
    info,
    ...rest
}: PropsType) {
    const id = useId();
    const fileInputId = `${id}-file`;

    return (
        <div>
            <input id={fileInputId} className="hidden" type="file" {...rest} />
            <div className="grid gap-2">
                <span className="text-lg">{label}</span>

                {!file ? (
                    <label
                        htmlFor={fileInputId}
                        tabIndex={1}
                        className="group flex flex-col items-center justify-center gap-4 text-xl md:text-2xl text-neutral-300 bg-white bg-opacity-10 cursor-pointer p-4 md:p-8 border-2 border-neutral-500 border-dashed rounded-xl outline outline-2 outline-offset-[3px] outline-transparent transition-all duration-200 hover:bg-opacity-50 focus:outline-neutral-500 focus-visible:outline-neutral-500"
                    >
                        <UploadIcon className="w-10 h-10 p-1 border rounded-xl shadow-md bg-white bg-opacity-20 group-hover:bg-opacity-50" />
                        Drag and drop or click to upload
                    </label>
                ) : (
                    <div className="group flex flex-col items-center justify-center gap-4 text-xl md:text-2xl text-neutral-300 bg-white bg-opacity-10 cursor-pointer p-4 md:p-8 border-2 border-neutral-500 border-dashed rounded-xl outline outline-2 outline-offset-[3px] outline-transparent transition-all duration-200 hover:bg-opacity-50 focus:outline-neutral-500 focus-visible:outline-neutral-500">
                        <img
                            src={URL.createObjectURL(file)}
                            className="w-32 h-32 aspect-square rounded-xl object-cover overflow-hidden"
                            alt=""
                        />
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
