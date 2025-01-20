import { ComponentProps, forwardRef } from "react";

import { InfoIcon } from "../../assets";

type PropsType =
    | {
          label: string;
          error: null | string;
      } & Omit<ComponentProps<"input">, "className">;

export default forwardRef<HTMLInputElement, PropsType>(function Input(
    { label, error, ...rest },
    ref
) {
    return (
        <label className="grid gap-2">
            <span className="text-lg">{label}</span>
            <input
                ref={ref}
                {...rest}
                className="cursor-pointer text-lg px-4 py-2.5 bg-white bg-opacity-10 rounded-xl border-2 border-neutral-500 outline outline-2 outline-offset-[3px] outline-transparent transition-all duration-200 hover:bg-opacity-50 focus:outline-neutral-500 focus-visible:outline-neutral-500"
            />
            {error && (
                <span className="mt-1 flex items-center justify-start gap-1 text-orange-700 text-sm">
                    <InfoIcon className="w-4 h-4" /> {error}
                </span>
            )}
        </label>
    );
});
