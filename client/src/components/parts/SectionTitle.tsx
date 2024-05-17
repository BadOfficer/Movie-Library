import { FC } from "react"

interface Props {
    children: string
}

const SectionTitle: FC<Props> = ({ children }) => {
    return <div className="flex flex-col gap-1 uppercase">
        <h2 className="text-2xl text-white font-semibold">
            {children}
            <span className="block w-full h-0.5 bg-dark-yellow"></span>
        </h2>
        
    </div>
}

export default SectionTitle;