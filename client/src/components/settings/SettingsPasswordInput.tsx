import { ChangeEvent, FC, useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface Props {
    initialValue: string;
    name: string;
    title: string;
}

const SettingsPasswordInput: FC<Props> = ({ initialValue, name, title }) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const handleChangeValue = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const [showPassword, setShowPassword] = useState(false);

    const handleSetPassword = () => {
        setShowPassword(state => !state);
    }

    return (
        <div className="relative">
            <input type={showPassword ? 'text' : 'password'} name={name} className="text-main p-0 text-dark-gray px-2.5 py-2 w-80 lg:min-w-96 rounded-md" placeholder={title} value={inputValue} onChange={handleChangeValue}/>
                <div className="absolute centeredY right-2.5 text-light-gray cursor-pointer">
                    {showPassword ? (
                        <span onClick={handleSetPassword}><FaRegEyeSlash size={20}/></span>
                    ) : (
                        <span onClick={handleSetPassword}><FaRegEye size={20}/></span>
                    )}
                </div>
        </div>
    );
}

export default SettingsPasswordInput;
