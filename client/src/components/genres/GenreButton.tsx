import { FC } from "react"

interface Props {
    type?: 'submit' | 'button',
    children: React.ReactNode,
    handleClick?: () => void

}

const GenreButton: FC<Props> = ({ type, children, handleClick }) => {
    return <button type={type} className="px-6 py-2 bg-light-yellow text-dark-gray rounded-xl hover:bg-dark-yellow" onClick={handleClick}>{
        children
    }</button>
}

export default GenreButton;