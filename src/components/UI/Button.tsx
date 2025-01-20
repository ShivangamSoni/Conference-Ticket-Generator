import { ComponentProps } from "react";

type PropsType = {
    variant: "ghost" | "normal";
} & Omit<ComponentProps<"button">, "className">;

export default function Button({ variant, ...props }: PropsType) {
    const className =
        variant === "ghost"
            ? "text-sm md:text-base px-2 py-1 rounded-md text-neutral-300 bg-white bg-opacity-10 outline outline-2 outline-offset-[3px] outline-transparent transition-all duration-200 hover:bg-opacity-50 focus:outline-neutral-500 focus-visible:outline-neutral-500"
            : "bg-orange-500 text-neutral-900 font-extrabold text-xl md:text-2xl p-4 rounded-xl border-b-[6px] border-transparent outline outline-2 outline-transparent outline-offset-[3px] hover:bg-orange-700 hover:border-b-orange-500 focus:outline-neutral-500 focus-visible:outline-neutral-500";
    return <button className={className} {...props} />;
}
