interface NameAndDescriptionProps {
  name: string
  description: string
}

const NameAndDescription = ({ name, description }: NameAndDescriptionProps) => {
  return (
    <div className="flex flex-col bg-gray-800 justify-end opacity-80 p-2">
      <div className="flex justify-end text-white text-base sm:text-xl font-bold mt-2 mb-2">
        {name}
      </div>
      <div className="flex justify-end text-white text-xs sm:text-sm mt-3 mb-3">
        {description}
      </div>
    </div>
  )
}

export default NameAndDescription
