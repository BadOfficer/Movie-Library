import { ChangeEvent, FC, useState } from "react"
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";



interface PasswordInputProps {
    value: string,
    onChange: (value: string) => void,
    required?: boolean;
}

const PasswordInput: FC<PasswordInputProps> = ({ value, onChange, required = false }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const [showPassword, setShowPassword] = useState(false);

    const handleSetPassword = () => {
        setShowPassword(state => !state);
    }

    return <div className="relative">
                <input type={showPassword ? 'text' : 'password'} maxLength={40} className="text-main p-0 text-dark-gray px-2.5 py-2 w-80 lg:min-w-96 rounded-md" placeholder="Password" value={value} onChange={handleChange} required={required}/>
                <div className="absolute centeredY right-2.5 text-light-gray cursor-pointer">
                    {showPassword ? (
                        <span onClick={handleSetPassword}><FaRegEyeSlash size={20}/></span>
                    ) : (
                        <span onClick={handleSetPassword}><FaRegEye size={20}/></span>
                    )}
                </div>
            </div>
}

export default PasswordInput