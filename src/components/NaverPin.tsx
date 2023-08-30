import Image from 'next/image'

export interface NaverPinProps {
  type?: 'attraction' | 'restaurant'
  name?: string | undefined | null
  clicked?: boolean
  hover?: boolean
}

const NaverPin = (props: NaverPinProps) => {
  // console.log(props)
  return (
    <div className={`relative flex flex-col `}>
      <div
        className={`flex flex-row  rounded-3xl ${
          props.clicked ? 'bg-blue-600' : 'bg-white'
        } border-solid border-blue-600 border-2 p-2`}
      >
        <div
          className={`inline-block h-6 w-6 rounded-full ring-2 ring-white ${
            props.clicked ? 'bg-white' : 'bg-blue-600'
          } `}
        >
          <Image
            src={
              props.clicked === true
                ? '/assets/iconizer-placeholder.svg'
                : '/assets/placeholder (1).png'
            }
            alt="pin"
            width={20}
            height={20}
            className="object-cover w-full h-full p-1"
          />
        </div>
        <div
          className={`flex flex-col ml-2 mr-1 ${
            props.clicked
              ? 'text-white font-bold'
              : props.hover
              ? 'text-blue-600 font-bold'
              : 'font-semibold'
          } `}
        >
          {props.name}
        </div>
      </div>
      <div className="h-1">
        <div
          className={`absolute left-5 bottom-0 rotate-45 w-2.5 h-2.5 ${
            props.clicked ? 'bg-blue-600' : 'bg-white'
          } border-solid border-blue-600
      border-b-2 border-r-2`}
        ></div>
      </div>
    </div>
  )
}

export default NaverPin
