import { LogoFullIcon } from "./assets";

export default function App() {
    return (
        <main className="w-screen h-screen font-primary text-neutral-0 main__bg flex flex-col items-center py-12 px-2 sm:py-16 sm:px-4 lg:py-20 lg:px-8">
            <header>
                <h1 className="sr-only">Coding Conf</h1>
                <LogoFullIcon aria-hidden className="" />
            </header>
            Content
        </main>
    );
}
