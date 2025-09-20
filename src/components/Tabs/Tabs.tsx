import * as React from "react";
import { cn } from "../../utils/cn";

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultTabId?: string;
  className?: string;
};

export function Tabs({ tabs, defaultTabId, className }: TabsProps) {
  const [activeTab, setActiveTab] = React.useState(defaultTabId ?? tabs[0]?.id);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTab);
    if (currentIndex === -1) return;

    let newIndex = currentIndex;
    if (e.key === "ArrowRight") {
      newIndex = (currentIndex + 1) % tabs.length;
      setActiveTab(tabs[newIndex].id);
    } else if (e.key === "ArrowLeft") {
      newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      setActiveTab(tabs[newIndex].id);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="flex border-b border-border"
        onKeyDown={handleKeyDown}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={cn(
              "px-4 py-2 text-sm font-medium focus:outline-none",
              activeTab === tab.id
                ? "border-b-2 border-accent text-accent"
                : "text-text hover:text-accent"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {tabs.map(
        (tab) =>
          activeTab === tab.id && (
            <div
              key={tab.id}
              id={`panel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              className="p-4"
            >
              {tab.content}
            </div>
          )
      )}
    </div>
  );
}
