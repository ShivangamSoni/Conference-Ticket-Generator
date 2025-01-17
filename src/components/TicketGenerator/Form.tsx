import { useState } from "react";

import Input from "../UI/Input";
import FileInput from "../UI/FileInput";

const ALLOWED_TYPES = ["jpg", "jpeg", "png"];

export default function Form() {
    const [file, setFile] = useState<File | null>(null);

    return (
        <section className="grid gap-6 md:gap-8">
            <h2 className="sr-only">Conference Registration</h2>
            <p className="justify-self-center text-center text-3xl md:text-5xl max-w-screen-sm font-extrabold">
                Your Journey to Coding Conf 2025 starts Here!
            </p>
            <p className="text-center text-xl md:text-2xl text-neutral-300">
                Secure your spot at this year's biggest coding conference.
            </p>

            <form className="grid gap-4">
                <FileInput
                    file={file}
                    label="Upload Avatar"
                    info="Upload your photo (JPG or PNG, max size: 500KB)."
                    error={file ? file.name : "No File"}
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                            const fileType = file.type.split("/")[1];
                            if (!ALLOWED_TYPES.includes(fileType)) {
                                console.log("error: Type Not Supported");
                            }

                            const size = file.size / 1000;
                            if (size > 500) {
                                console.log("Error: File too big");
                            }

                            setFile(file);
                        }
                    }}
                />

                <Input
                    label="Full Name"
                    error={null}
                    type="text"
                    placeholder="John Doe"
                />
                <Input
                    label="Email Address"
                    error={null}
                    type="email"
                    placeholder="example@email.com"
                />
                <Input
                    label="GitHub Username"
                    error={null}
                    type="text"
                    placeholder="@yourUsername"
                />
            </form>
        </section>
    );
}
