const TabMenu: React.FC<{
  tabs: string[]
  activeTab: number
  onTabClick: (index: number) => void
}> = ({ tabs, activeTab, onTabClick }) => (
  <div className="flex justify-center space-x-2">
    {tabs.map((tab, index) => (
      <button
        key={tab}
        onClick={() => onTabClick(index)}
        className={`py-2 px-4 font-semibold cursor-pointer hover:text-black border-b-2 ${
          activeTab === index
            ? 'text-gray-700 border-black'
            : 'text-gray-500 border-transparent'
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
)

export default TabMenu
