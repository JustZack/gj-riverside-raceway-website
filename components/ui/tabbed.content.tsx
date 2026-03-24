import { useState, ReactNode } from 'react';
import Card from './card';

export interface Tab {
  label: string;
  content: ReactNode;
  color: string;
}

export default function TabbedContent({
  tabs,
  initialTab = 0,
  className = '',
  style = {},
}: {
  tabs: Tab[];
  initialTab?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [selected, setSelected] = useState(initialTab);

  return (
    <Card
      className={`w-full flex flex-col min-w-0 ${className}`}
      borderRadius={16}
      shadow={true}
      style={style}
      backgroundColor="#fff"
    >
      <div className="flex rounded-t-xl border-b border-gray-300 w-full overflow-hidden">
        {tabs.map((tab, idx) => (
          <button
            key={tab.label}
            className={
              `flex-1 px-4 py-2 -mb-px border-b-4 transition-colors duration-200 font-semibold focus:outline-none ` +
              `${tab.color}` +
              (selected === idx
                ? ` border-blue-700 bg-white`
                : ` hover:bg-gray-100 cursor-pointer`)
            }
            onClick={() => setSelected(idx)}
            type="button"
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="p-4 w-full min-w-0">
        {tabs[selected]?.content}
      </div>
    </Card>
  );
}
