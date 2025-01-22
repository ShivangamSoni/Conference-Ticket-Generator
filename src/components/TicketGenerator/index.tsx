import { useState } from "react";

import Form, { FormData } from "./Form";
import Ticket from "./Ticket";
import { generateId } from "../../utils/generateId";

export type UserData = FormData & { id: number };

export default function TicketGenerator() {
    const [userData, setUserData] = useState<UserData | null>();

    return !userData ? (
        <Form onSubmit={(data) => setUserData({ ...data, id: generateId() })} />
    ) : (
        <Ticket data={userData} />
    );
}
