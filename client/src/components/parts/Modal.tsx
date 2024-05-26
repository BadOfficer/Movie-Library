import { FC } from "react"

interface Props {
    children: JSX.Element
}

const Modal: FC<Props> = ({children}) => {
    return <div className="fixed w-full h-full bottom-0 top-0 right-0 left-0 flex justify-center items-center bg-dark-gray/75 z-50">
                <div className="bg-light-gray p-3 rounded-xl sm:p-9 max-h-[600px] overflow-auto">
                    {children}
                </div>
            </div>
}

export default Modal