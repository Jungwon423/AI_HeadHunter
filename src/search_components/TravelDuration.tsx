// components/TravelDurationInput.tsx
import React, { useState, useEffect } from "react";

interface TravelDurationProps {
  onDurationChange: (value: number) => void;
}

const TravelDuration: React.FC<TravelDurationProps> = ({ onDurationChange }) => {
  const [inputValue, setInputValue] = useState<number | null>(null);
  const [durationText, setDurationText] = useState("");

  useEffect(() => {
    if (inputValue !== null && inputValue > 1) {
      const nights = inputValue - 1;
      setDurationText(`${nights}박 ${inputValue}일`);
    } else if(inputValue === 1){
        setDurationText('당일여행')
    } else {
      setDurationText("");
    }
    onDurationChange(inputValue || 0);
  }, [inputValue]);

  return (
    <div className="text-center py-20">
      <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
      여행 기간을 알려주세요
      </h2>
      <div className="flex flex-wrap justify-center mt-6">
      <input
        type="number"
        value={inputValue || ""}
        onChange={(e) => setInputValue(parseInt(e.target.value))}
        min="1"
        placeholder="일 수 입력"
      />
      <div className="w-16 px-1 py-1 rounded-md bg-indigo-500 flex items-center text-center ">
                  <span className="flex text-center text-white text-xs ml-2">
                  {durationText}
                  </span>
                </div>
      </div>
    </div>
  );
};

export default TravelDuration;
