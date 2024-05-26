import { ChangeEvent, FC, useState } from "react"

interface Props {
    initialValue: string;
    name: string;
    title: string;
    required?: boolean;
    type?: "text" | "email"
}

const SettingsInput: FC<Props> = ({ initialValue, name, title, required = false, type="text" }) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    return (
        <div>
            <input type={type} className="text-main p-0 text-dark-gray px-2.5 py-2 w-80 lg:min-w-96 rounded-md" placeholder={title} value={inputValue} name={name} onChange={handleChangeValue} required={required} />
        </div>
    );
}

export default SettingsInput;
