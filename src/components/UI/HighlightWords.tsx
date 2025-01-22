export default function HighlightWords({ children }: { children: string }) {
    const words = children.split(" ");
    return words.map((word, i) => (
        <span
            key={`${i}-${word}`}
            className="bg-gradient-to-r from-orange-500 to-white text-transparent bg-clip-text"
        >
            {word}
            {i < words.length - 1 ? " " : null}
        </span>
    ));
}
