interface InputProps {
    readonly id: string;
    readonly name: string;
    readonly type?: "text" | "email" | "password" | "number";
    readonly placeholder?: string;
    readonly value?: string;
    readonly defaultValue?: string;
    readonly required?: boolean;
    readonly disabled?: boolean;
    readonly onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
    id,
    name,
    type = "text",
    placeholder,
    value,
    defaultValue,
    required,
    disabled,
    onChange,
}: InputProps) {
    return (
        <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            required={required}
            disabled={disabled}
            onChange={onChange}
            className="input-base"
        />
    );
}
