
import Image from 'next/image'

interface surveyButtonProps {
    text: string
    img: string
    // alt: string
    // className: string
    onClick: () => void,
}

const surveyButton = (props: surveyButtonProps) => { 
        

        const src : string = '/assets/icons/극장.png'

        return (
            <div>
                <button className="border-2 border-gray-500 p-5 rounded-lg flex flex-col items-center justify-center">
                    <div className="mb-1">
                        <Image
                                                src={src }
                            alt="대체_텍스트"
                            width={120}
                            height={120}
                        />
                    </div>
                    <span>극장</span>
                </button>
            </div>
        )
}

export default surveyButton;