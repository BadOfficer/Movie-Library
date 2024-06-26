import { FC } from "react"

interface Props {
    type?: string;
    name: string;
    fieldLabel: string;
    placeholder?: string;
    value?: any
    handleChange?: ((arg: any) => void) | (() => void)
    id?: number | string;
    el: "input" | "textarea" | "number";
    required?: boolean;
}

const TitledInput: FC<Props> = ({type, name, fieldLabel, placeholder, value, handleChange, id, el, required = false}) => {
    return <label className={`flex gap-2.5 text-lg capitalize ${el === 'input' ? "items-center" : "items-start"}`}>
                <span className="flex-1 max-w-28 sm:max-w-full">{fieldLabel}</span>
                {el !== "textarea" ? (
                    <input type={type} name={name} className="text-main p-0 text-dark-gray w-40 px-1 py-2 lg:min-w-96 rounded-md"
                    placeholder={placeholder} 
                    value={value}
                    onChange={handleChange} maxLength={255} required={required} />
                ) : (
                    <textarea name={name} className="text-main p-0 text-dark-gray px-1 sm:px-2.5 py-2 w-40 lg:min-w-96 rounded-md min-h-36 resize-none" 
                            placeholder={placeholder} 
                            value={value}
                            onChange={handleChange} maxLength={1000} required={required} />
                )}
                <input type="hidden" name="id" value={id}/>
            </label>
}

export default TitledInput;