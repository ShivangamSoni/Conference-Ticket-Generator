import { FormData } from "./Form";

export default function Ticket({ data }: { data: FormData }) {
    console.log(data);
    return (
        <>
            <p>Ticket</p>

            <div className="whitespace-pre">{JSON.stringify(data)}</div>
        </>
    );
}
