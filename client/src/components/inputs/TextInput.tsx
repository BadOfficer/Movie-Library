import { ChangeEvent, FC } from "react"

interface TextInputProps {
    fieldName: string;
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

const TextInput: FC<TextInputProps> = ({ fieldName, value, onChange, required = false }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return <div>
        <input type="text" name="fieldName" className="text-main p-0 text-dark-gray px-2.5 py-2 w-80 lg:min-w-96 rounded-md" maxLength={255} placeholder={fieldName} value={value} onChange={handleChange} required={required}/>
    </div>
}

export  default TextInput