import { useState } from 'react'

interface ChatScreenProps {
  onClose: () => void
}

const ChatScreen: React.FC<ChatScreenProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<string[]>([])
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setMessages([...messages, inputValue])
    setInputValue('')
  }

  return (
    <div className="fixed bottom-2 right-2 w-96 h-96 bg-white border border-gray-300 rounded-lg shadow-lg">
      <div className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded-tl-lg">
        <h2 className="text-lg font-bold">Trippy AI</h2>
        <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="py-2 roundedlg overflow-y-auto flex-grow">
        {messages.map((message, index) => (
          <div key={index} className="mb-2 px-10 font-bold ">
            {message}
          </div>
        ))}
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="flex-shrink-0 flex items-end px-4 py-2 rounded-bl-lg"
        style={{ position: 'absolute', bottom: 0, width: '100%' }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="flex-1 border border-gray-300 rounded-xl py-2 px-4 mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
        >
          Send
        </button>
      </form>
    </div>
  )
}

export default ChatScreen
