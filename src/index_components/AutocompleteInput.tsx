import React from 'react'
import { useForm } from 'react-hook-form'
import { useCombobox } from 'downshift'
import { useDispatch, useSelector } from 'react-redux'
import { setCity } from '../slices/travelInfoSlice'
import router from 'next/router'

type FormData = {
  searchText: string
}

type AutocompleteInputProps = {
  items: string[]
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  items,
}) => {
  const { register, handleSubmit, setValue, watch } = useForm<FormData>()

  const inputValue = watch('searchText', '')
  const combobox = useCombobox<string>({
    items,
    inputValue,
    onInputValueChange: ({ inputValue }) => {
      setValue('searchText', inputValue || '')
    },
    onSelectedItemChange: ({ selectedItem }) => {
      console.log(selectedItem)
    },
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  const filteredItems = items.filter((item) =>
    item.toLowerCase().startsWith(combobox.inputValue.toLowerCase()),
  )
  const dispatch = useDispatch()

  return (
    <div className="left-1/4 pt-10 relative w-1/2">
      {/* Input container */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex items-center justify-center bg-white border border-gray-200 rounded shadow-sm"
      >
        <input
          {...register('searchText')}
          {...combobox.getInputProps({ refKey: 'ref' })}
          className="flex-grow text-xs sm:text-sm lg:text-lg xl:text-xl px-4 py-2 text-gray-700 placeholder-gray-400 bg-white rounded-l-md focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
          placeholder="여행지를 입력하세요."
        />
        <button
          type="submit"
          className="text-xs sm:text-sm lg:text-lg xl:text-xl whitespace-nowrap bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
          onClick={() => {
            dispatch(setCity(inputValue))
            // router.push('/search')
            router.push('/survey')
          }}
        >
          검색
        </button>
      </form>
      {/* Autocomplete options */}
      <ul
        {...combobox.getMenuProps()}
        className={`${
          combobox.isOpen && filteredItems.length > 0
            ? 'border border-t-0 border-gray-200 rounded-b shadow-sm bg-white'
            : ''
        } absolute w-full mt-0.5`}
      >
        {combobox.isOpen &&
          filteredItems.map((item, index) => (
            <li
              {...combobox.getItemProps({ item, index })}
              key={item}
              className={`${
                combobox.highlightedIndex === index
                  ? 'bg-blue-200 text-gray-900 font-bold'
                  : 'text-gray-600 font-bold'
              } p-3 hover:bg-blue-200 cursor-pointer`}
            >
              {item}
            </li>
          ))}
      </ul>
    </div>
  )
}
