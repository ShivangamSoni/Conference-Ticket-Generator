import { useState } from "react";

import Form, { FormData } from "./Form";
import Ticket from "./Ticket";

export default function TicketGenerator() {
    const [userData, setUserData] = useState<FormData | null>(null);
    return !userData ? (
        <Form onSubmit={setUserData} />
    ) : (
        <Ticket data={userData} />
    );
}
