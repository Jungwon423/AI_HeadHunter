import DraggableScrollbar from './DraggableScrollbar'

const TabMenu: React.FC<{
  tabs: string[]
  activeTab: number
  onTabClick: (index: number) => void
}> = ({ tabs, activeTab, onTabClick }) => (
  <div className="flex overflow-x-auto whitespace-nowrap no-scrollbar">
    <DraggableScrollbar>
      <div className="flex justify-center space-x-2 py-2">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => onTabClick(index)}
            className={`relative px-4 font-semibold cursor-pointer hover:text-black ${
              activeTab === index ? 'text-gray-700' : 'text-gray-500'
            }`}
          >
            {tab}
            {activeTab === index && (
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-[70%] h-0.5 bg-black"></span>
            )}
          </button>
        ))}
      </div>
    </DraggableScrollbar>
  </div>
)

export default TabMenu
