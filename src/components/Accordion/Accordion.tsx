import * as React from "react";
import { cn } from "../../utils/cn";

export type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  defaultOpenId?: string;
  allowMultiple?: boolean;
  className?: string;
};

export function Accordion({
  items,
  defaultOpenId,
  allowMultiple = false,
  className,
}: AccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(
    defaultOpenId ? [defaultOpenId] : []
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  };

  return (
    <div className={cn("space-y-2", className)}>
      {items.map(({ id, title, content }) => {
        const isOpen = openItems.includes(id);
        return (
          <div key={id} className="border border-border rounded">
            <h3>
              <button
                id={`accordion-header-${id}`}
                aria-controls={`accordion-panel-${id}`}
                aria-expanded={isOpen}
                onClick={() => toggleItem(id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggleItem(id);
                  }
                }}
                className={cn(
                  "w-full flex justify-between items-center px-4 py-2 text-left focus:outline-none",
                  isOpen
                    ? "bg-accent text-accent-foreground"
                    : "bg-bg text-text"
                )}
              >
                {title}
                <span
                  className={cn(
                    "ml-2 transform transition-transform duration-200",
                    isOpen ? "rotate-90" : "rotate-0"
                  )}
                >
                  ▶
                </span>
              </button>
            </h3>
            <div
              id={`accordion-panel-${id}`}
              role="region"
              aria-labelledby={`accordion-header-${id}`}
              className={cn(
                "overflow-hidden transition-all duration-200 ease-in-out",
                isOpen ? "max-h-96 p-4" : "max-h-0 p-0"
              )}
            >
              {isOpen && <div>{content}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
