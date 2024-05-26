import { FC, useRef, useState } from 'react';

interface Props {
    inputName: string;
    title: string;
    acceptedFileTypes: string[];
}

const CustomFileInput: FC<Props> = ({ inputName, title, acceptedFileTypes }) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileName, setFileName] = useState("");

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    return (
        <div className="flex gap-2.5 items-center">
            <span className='capitalize text-lg'>{title}</span>
            <div className='flex-1 flex justify-center bg-white rounded-xl py-2.5 cursor-pointer text-dark-gray' onClick={handleButtonClick}>
                    Select File
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    name={inputName}
                    accept={acceptedFileTypes.join(',')}
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                />
            </div>
        </div>
    );
};

export default CustomFileInput;
