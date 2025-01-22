import { UserData } from ".";
import { GitHubIcon, LogoFullIcon } from "../../assets";
import HighlightWords from "../UI/HighlightWords";

export default function Ticket({
    data: { id, name, email, github, file },
}: {
    data: UserData;
}) {
    const img_url = !file
        ? "/images/image-avatar.jpg"
        : URL.createObjectURL(file);

    return (
        <section className="grid gap-6 justify-items-center md:gap-8">
            <h2 className="text-center text-3xl md:text-5xl max-w-screen-sm font-extrabold">
                Congrats, <HighlightWords>{name}</HighlightWords>! Your ticket
                is ready.
            </h2>
            <p className="max-w-96 text-center text-xl md:text-2xl text-neutral-300">
                We've emailed your ticket to{" "}
                <span className="text-orange-500">{email}</span> and will send
                updates in the run up to the event.
            </p>

            <article className="mt-10 md:mt-12 grid relative">
                <img
                    src="/images/pattern-ticket.svg"
                    alt=""
                    className="row-start-1 -row-end-1 col-start-1 -col-end-1 pointer-events-none"
                />
                <div className="w-4/5 flex flex-col justify-between p-4 md:p-8 row-start-1 -row-end-1 col-start-1 -col-end-1">
                    <div>
                        <h3 className="sr-only">Coding Conference</h3>
                        <LogoFullIcon aria-hidden />
                        <p className="md:text-lg pl-12 pt-2 text-neutral-300">
                            Jan 31, 2025 / Austin, TX
                        </p>
                    </div>

                    <figure className="flex items-end gap-2">
                        <img
                            src={img_url}
                            className="w-12 h-12 md:w-24 md:h-24 rounded-xl"
                            alt=""
                        />
                        <figcaption className="flex flex-col">
                            <span className="text-lg md:text-3xl">{name}</span>
                            <span className="flex items-center gap-0.5 text-sm md:text-lg text-neutral-300">
                                <GitHubIcon aria-hidden className="w-5 h-5" />@
                                {github}
                            </span>
                        </figcaption>
                    </figure>
                </div>

                <span className="flex items-center justify-center absolute top-0 right-0 h-full w-1/5">
                    <span className="rotate-90 text-3xl md:text-4xl text-neutral-500">
                        #{id}
                    </span>
                </span>
            </article>
        </section>
    );
}
