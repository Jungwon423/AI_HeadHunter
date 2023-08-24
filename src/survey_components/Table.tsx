// SimpleTable.tsx

import React, { ReactNode } from 'react'

interface SimpleTableProps {
  header: string[]
  data: ReactNode[][]
}

const SimpleTable: React.FC<SimpleTableProps> = ({ header, data }) => {
  return (
    <table className="table-auto w-full text-center border-collapse">
      <thead className="bg-stone-50 rounded-sm">
        <tr>
          {header.map((columnTitle, index) => (
            <th
              key={index}
              className="border-none p-2 font-medium text-gray-500"
            >
              {columnTitle}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className="bg-white">
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="border-none p-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SimpleTable
