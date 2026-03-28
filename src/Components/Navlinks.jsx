import React, { useState } from 'react';
import { allNavData } from './AllNavData'; 

function Navlinks() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [hoveredGroupIndex, setHoveredGroupIndex] = useState(null);

  const navItems = allNavData.map(nav => nav.title);

  const chunkItems = (items, chunkSize = 7) => {
    const chunks = [];
    for (let i = 0; i < items.length; i += chunkSize) {
      chunks.push(items.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const renderNavData = () => {
    if (activeIndex === null) return null;

    const categoryCount = allNavData[activeIndex].categories.length;
    let gridCols = 1;
    let columnWidth = '400';

    if (categoryCount === 1) {
      gridCols = categoryCount;
      columnWidth = '400px';
    } else if (categoryCount === 2) {
      gridCols = 2;
      columnWidth = '1fr';
    } else if (categoryCount >= 3 && categoryCount <= 4) {
      gridCols = categoryCount;
      columnWidth = '1fr';
    } else if (categoryCount >= 5) {
      gridCols = 5;
      columnWidth = '1fr';
    }

    return (
      <div
        className={`grid grid-cols-${gridCols} gap-[40px] px-14 h-[470px] bg-[#2D2F3E] rounded-b-[32px] pt-10 overflow-y-auto`}
        style={{ gridTemplateColumns: `repeat(${gridCols}, ${columnWidth})` }}
      >
        {allNavData[activeIndex].categories.map((group, groupIndex) => {
          const itemChunks = chunkItems(group.links, 7);
          const isMultiColumn = group.links.length > 7;

          return (
            <div
              key={groupIndex}
              onMouseEnter={() => setHoveredGroupIndex(groupIndex)}
              onMouseLeave={() => setHoveredGroupIndex(null)}
              className="flex flex-col items-start justify-start w-full"
            >
              <button
                className={`duration-300 w-full text-left ${
                  hoveredGroupIndex === groupIndex
                    ? 'bg-[#ADDD1D]'
                    : 'bg-[#8188A180] hover:bg-[#ADDD1D]'
                } p-[16px] font-bold text-[1rem] font-pretendard`}
              >
                {group.heading}
              </button>

              <div className={`grid ${isMultiColumn ? 'grid-cols-2' : 'grid-cols-1'} gap-2 mt-2 w-full items-start`}>
                {itemChunks.map((chunk, chunkIndex) => (
                 <ul key={chunkIndex} className="pl-1 w-full">
                 {chunk.map((item, itemIndex) => (
                   <li
                     key={itemIndex}
                     className="duration-300 cursor-pointer min-h-[50px] font-pretendard text-[14px] py-2 text-white hover:text-[#11AC57] border-b-1 border-[#454F6F] flex items-center gap-2"
                   >
                     <span className="w-1 h-1 bg-white rounded-full" />
                     {item.label}
                   </li>
                 ))}
               </ul>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-screen relative">
      <div className="relative" onMouseLeave={() => setActiveIndex(null)}>
        <ul className="flex justify-center px-14 gap-[5rem] text-[#B1B7CC] border-b-1">
          {navItems.map((item, index) => (
            <li key={index} className="py-[1.7rem]">
              <a
                onMouseEnter={() => setActiveIndex(index)}
                className={`mx-3 pt-3 pb-1.5 mb-1 cursor-pointer hover:text-[#0A0046] hover:border-b-4 border-[#11AC57] hover:font-bold ${
                  activeIndex === index
                    ? 'text-[#0A0046] font-bold border-b-4 border-[#11AC57]'
                    : ''
                }`}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div
          className={`absolute left-0 top-full w-screen z-50 transition-all duration-300 transform ${
            activeIndex !== null ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
          }`}
        >
          {renderNavData()}
        </div>
      </div>
    </div>
  );
}

export default Navlinks;