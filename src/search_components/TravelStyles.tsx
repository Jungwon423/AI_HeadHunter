import { useState } from 'react';
import TravelButton from './TravelButton';

type ITravelStylesProps = {
  selectedStyles: string[];
  onStylesClick: (style: string) => void;
  onRemoveStyle: (style: string) => void;
};

const TravelStyles = (props: ITravelStylesProps) => {
  const styles = [
    '체험·액티비티',
    'SNS 핫플레이스',
    '자연과 함께',
    '유명 관광지',
    '여유롭게 힐링',
    '문화·예술·역사',
    '관광보다 먹방',
    '쇼핑은 열정적으로',
  ];

  const handleStylesClick = (style: string) => {
    props.onStylesClick(style);
  };
  const removeStyle = (style: string) => {
    props.onRemoveStyle(style);
  };

  return (
    <div className="text-center">
      <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-gray-900">
        여행 스타일을 알려주세요!
      </h2>
      <div className="flex flex-wrap justify-center mt-6">
        {styles.map((style) => (
          <div key={style}>
            <TravelButton
              className={`m-2 text-xs sm:text-sm md:text-base ${
                props.selectedStyles.includes(style)
                  ? 'bg-gray-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
              onClick={() => handleStylesClick(style)}
            >
              {style}
            </TravelButton>
          </div>
        ))}
      </div>
      <div className="mt-6">
        {props.selectedStyles.map(
          (
            style, //추가되는 버튼
          ) => (
            <span
              key={style}
              className="inline-block text-xs sm:text-sm md:text-base bg-gray-200 rounded-full px-3 py-1 font-semibold text-gray-700 mr-2 mb-2"
            >
              {style}
              <button
                type="button"
                className="ml-2 text-gray-500 hover:text-gray-900" //제거 x버튼
                onClick={() => removeStyle(style)}
              >
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-8l-2.293-2.293a1 1 0 011.414-1.414L10 8.586l2.293-2.293a1 1 0 111.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          ),
        )}
      </div>
    </div>
  );
};

export { TravelStyles };