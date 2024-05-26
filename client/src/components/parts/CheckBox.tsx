import { FC, useState } from "react"

interface Props {
    active: boolean
    item: any
    name: string
}

const CheckBox: FC<Props> = ({ active, item, name }) => {
    const [selectedState, setSelectedState] = useState<boolean>(active);

    const handleClick = () => {
        setSelectedState(state => !state)
    }

    return <div className="flex items-center mb-4">
            <input type="checkbox" value={item} name={`${name}[]`} checked={selectedState} onChange={handleClick} className="w-4 h-4 text-dark-yellow rounded focus:ring-dark-yellow focus:ring-0 focus:ring-offset-0 bg-light-gray"/>
            <label htmlFor={name} className="ms-2 text-sm text-white">{item}</label>
        </div>
}

export default CheckBox;