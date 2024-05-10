import { ChangeEvent, FC } from "react"

interface FormInputProps {
    fieldName: string;
    value: string;
    onChange: (value: string) => void;
}

const FormInput: FC<FormInputProps> = ({ fieldName, value, onChange }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    return <div>
        <input type="text" className="text-main p-0 text-dark-gray px-2.5 py-2 min-w-96 rounded-md" placeholder={fieldName} value={value} onChange={handleChange}/>
    </div>
}

export  default FormInput