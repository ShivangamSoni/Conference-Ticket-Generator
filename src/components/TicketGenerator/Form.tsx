import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "../UI/Input";
import FileInput from "../UI/FileInput";
import Button from "../UI/Button";

const ALLOWED_TYPES = ["jpg", "jpeg", "png"];
const MAX_SIZE = 500;

const formSchema = z.object({
    file: z
        .custom<File | null>((file) => !!file, { message: "File is required" })
        .refine(
            (file) => {
                const fileType = file!.type.split("/")[1];
                return ALLOWED_TYPES.includes(fileType);
            },
            { message: `File must be of type: ${ALLOWED_TYPES.join(" ")}` }
        )
        .refine(
            (file) => {
                const size = file!.size / 1000;
                return size < MAX_SIZE;
            },
            { message: `File Size must not exceed ${MAX_SIZE}KB` }
        ),
    name: z.string().min(1, { message: "Name is Required" }),
    email: z
        .string()
        .min(1, { message: "Email is Required" })
        .email({ message: "Invalid Email" }),
    github: z
        .string()
        .min(1, { message: "GitHub Username is Required" })
        .regex(/^[a-zA-Z0-9-]+$/, {
            message:
                "GitHub username must be alphanumeric and can include hyphens",
        }),
});

type FormData = z.infer<typeof formSchema>;

export default function Form() {
    const {
        register,
        control,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            file: undefined,
        },
    });

    function onSubmit(data: FormData) {
        console.log(data);
    }

    return (
        <section className="grid gap-6 md:gap-8">
            <h2 className="sr-only">Conference Registration</h2>
            <p className="justify-self-center text-center text-3xl md:text-5xl max-w-screen-sm font-extrabold">
                Your Journey to Coding Conf 2025 starts Here!
            </p>
            <p className="text-center text-xl md:text-2xl text-neutral-300">
                Secure your spot at this year's biggest coding conference.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                <Controller
                    name="file"
                    control={control}
                    render={({ field }) => {
                        if (field.name === "file") {
                            const { value } = field;
                            return (
                                <FileInput
                                    file={value}
                                    label="Upload Avatar"
                                    info="Upload your photo (JPG or PNG, max size: 500KB)."
                                    error={
                                        (errors.file && errors.file.message) ??
                                        null
                                    }
                                    accept=".jpg,.jpeg,.png"
                                    onChange={(e) => {
                                        const file =
                                            e.target.files?.[0] ?? null;
                                        setValue("file", file, {
                                            shouldValidate: true,
                                        });
                                    }}
                                    onFileDrop={(file) =>
                                        setValue("file", file, {
                                            shouldValidate: true,
                                        })
                                    }
                                    onRemove={() =>
                                        setValue("file", null, {
                                            shouldValidate: true,
                                        })
                                    }
                                />
                            );
                        }
                        return <></>;
                    }}
                />

                <Input
                    label="Full Name"
                    error={(errors.name && errors.name.message) ?? null}
                    placeholder="John Doe"
                    {...register("name")}
                />
                <Input
                    label="Email Address"
                    error={(errors.email && errors.email.message) ?? null}
                    type="email"
                    placeholder="example@email.com"
                    {...register("email")}
                />
                <Input
                    label="GitHub Username"
                    error={(errors.github && errors.github.message) ?? null}
                    type="text"
                    placeholder="@yourUsername"
                    {...register("github")}
                />

                <Button variant="normal" type="submit">
                    Generate My Ticket
                </Button>
            </form>
        </section>
    );
}
