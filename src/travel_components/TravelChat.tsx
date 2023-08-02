import { selectShowChat, setShowChat } from '../slices/travelChatSlice'
import { useDispatch, useSelector } from 'react-redux'

const TravelChat = () => {
  const showChat = useSelector(selectShowChat)

  const dispatch = useDispatch()

  return (
    <div>
      <div className="absolute bottom-8 right-8 z-10">
        {!showChat && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 md:py-3 px-4 md:px-10 rounded-xl shadow"
            onClick={() => dispatch(setShowChat(true))}
          >
            <div className="text-base sm:text-lg md:text-xl">
              Trippy AI에게 더 물어보기
            </div>
          </button>
        )}
      </div>
    </div>
  )
}

export default TravelChat
