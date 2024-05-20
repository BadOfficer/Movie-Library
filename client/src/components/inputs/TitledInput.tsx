import { FC } from "react"

interface Props {
    type?: string;
    name: string;
    fieldLabel: string;
    placeholder?: string;
    value?: any
    handleChange?: ((arg: any) => void) | (() => void)
    id?: number | string;
    el: "input" | "textarea";
}

const TitledInput: FC<Props> = ({type, name, fieldLabel, placeholder, value, handleChange, id, el}) => {
    return <label htmlFor={name} className={`flex gap-2.5 text-lg capitalize ${el === 'input' ? "items-center" : "items-start"}`}>
                <span className="flex-1">{fieldLabel}</span>
                {el === "input" ? (
                    <input type={type} name={name} className="text-main p-0 text-dark-gray px-2.5 py-2 min-w-96 rounded-md"
                    placeholder={placeholder} 
                    value={value}
                    onChange={handleChange} />
                ) : (
                    <textarea name={name} className="text-main p-0 text-dark-gray px-2.5 py-2 min-w-96 rounded-md min-h-48 resize-none" 
                            placeholder={placeholder} 
                            value={value}
                            onChange={handleChange} />
                )}
                <input type="hidden" name="id" value={id}/>
            </label>
}

export default TitledInput;