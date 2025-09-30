import { cn } from "../../utils/cn";

export interface PreviewPanelProps {
  children?: React.ReactNode;
  className?: string;
  title?: string;
}

export function PreviewPanel({
  children,
  className,
  title = "Preview",
}: PreviewPanelProps) {
  return (
    <div
      className={cn(
        "bg-surface-1 rounded-lg border border-border shadow-sm",
        className
      )}
    >
      <div className="border-b border-border px-6 py-4">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-6">
        <div className="bg-white dark:bg-gray-50 rounded-lg p-8 min-h-[300px] flex items-center justify-center shadow-sm border border-gray-200">
          {children || (
            <div className="w-48 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-medium">
              Preview Element
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
