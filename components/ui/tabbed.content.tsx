import { useState, ReactNode } from 'react';
import Card from './card';

export interface Tab {
  label: string;
  content: ReactNode;
  color: string;
  tabUnderlineColor?: string;
}

export default function TabbedContent({
  tabs,
  initialTab = 0,
  className = '',
  style = {},
  backgroundColor = '#fff',
}: {
  tabs: Tab[];
  initialTab?: number;
  className?: string;
  style?: React.CSSProperties;
  backgroundColor?: string;
}) {
  const [selected, setSelected] = useState(initialTab);

  return (
    <Card
      className={`w-full flex flex-col min-w-0 ${className}`}
      borderRadius={16}
      shadow={true}
      style={style}
      backgroundColor={backgroundColor}
    >
      <div className="flex w-full overflow-hidden">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            style={{ background: backgroundColor }}
            className={
              `flex-1 px-2 py-1 -mb-px border-b-3 cursor-pointer`
              + ` transition-colors duration-200 font-semibold focus:outline-none ` +
              (selected === idx
                ? `${tab.color} ${tab.tabUnderlineColor ? tab.tabUnderlineColor : tab.color.replace('text-', 'border-b-') } bg-white`
                : `border-transparent hover:bg-gray-100`)
            }
            onClick={() => setSelected(idx)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4 w-full min-w-0">
        {tabs[selected]?.content}
      </div>
    </Card>
  );
}
