import { Input } from "@/components/atoms/Input/Input";

interface FormFieldProps {
    readonly id: string;
    readonly name: string;
    readonly label: string;
    readonly type?: "text" | "email" | "password" | "number";
    readonly placeholder?: string;
    readonly error?: string;
    readonly required?: boolean;
}

export function FormField({
    id,
    name,
    label,
    type = "text",
    placeholder,
    error,
    required,
}: FormFieldProps) {
    return (
        <div className="flex flex-col gap-1">
            <label
                htmlFor={id}
                className="text-sm font-medium text-fg"
            >
                {label}
                {required && (
                    <span className="text-red-500 ml-1" aria-hidden="true">
                        *
                    </span>
                )}
            </label>
            <Input
                id={id}
                name={name}
                type={type}
                placeholder={placeholder}
                required={required}
            />
            {error && (
                <span className="text-xs text-red-500" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
}
