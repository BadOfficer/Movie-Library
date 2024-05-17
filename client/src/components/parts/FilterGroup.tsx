import { FC } from "react"
import CheckBox from "./CheckBox";

interface Props {
    name: string;
    data: string[];
    selectedItems: string[];
}

const FilterGroup: FC<Props> = ({ name, data, selectedItems }) => {
    return <div className="flex flex-col pl-6 mt-4">
            {data.map(item => (
                <CheckBox item={item} active={selectedItems.includes(item)} key={item} name={name}/>
            ))}
        </div>
}

export default FilterGroup;