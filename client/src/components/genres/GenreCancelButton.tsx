import { FC } from "react"

interface Props {
    type?: 'submit' | 'button',
    children: React.ReactNode,
    handleClick?: () => void

}

const GenreCancelButton: FC<Props> = ({ type, children, handleClick }) => {
    return <button type={type} className="py-[8px] px-6 border-2 border-dark-yellow rounded-xl text-light-yellow hover:bg-dark-yellow hover:text-dark-gray" 
                    onClick={handleClick}>{
        children
    }</button>
}

export default GenreCancelButton;