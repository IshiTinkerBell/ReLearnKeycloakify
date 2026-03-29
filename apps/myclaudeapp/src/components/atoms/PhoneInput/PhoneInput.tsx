interface PhoneInputProps {
    readonly id: string;
    readonly name: string;
    readonly value: string;
    readonly onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    readonly disabled?: boolean;
}

export function PhoneInput({ id, name, value, onChange, disabled }: PhoneInputProps) {
    return (
        <div className="flex items-center border border-line bg-surface rounded-[6px] overflow-hidden w-full">
            <span className="flex items-center gap-1 pl-3 pr-2 py-[0.625rem] text-fg-muted border-r border-line text-sm shrink-0 select-none">
                🇺🇸 <span>+1</span>
            </span>
            <input
                id={id}
                name={name}
                type="tel"
                value={value}
                onChange={onChange}
                disabled={disabled}
                placeholder="(555) 000-0000"
                className="flex-1 px-3 py-[0.625rem] bg-transparent outline-none text-fg placeholder:text-fg-muted text-[0.9375rem]"
            />
        </div>
    );
}
