import { useState, useEffect } from "react";
import { Button } from "../Button";
import { Copy, Eye, Code2, Play } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";
import { cn } from "../../utils/cn";

export interface CodePreviewPanelProps {
  generatedCSS: string;
  previewElement?: React.ReactNode;
  showPreview?: boolean;
  onCSSChange?: (css: string) => void;
  language?: "css" | "scss" | "less";
  className?: string;
  defaultTab?: "preview" | "code";
  allowEditing?: boolean;
}

export function CodePreviewPanel({
  generatedCSS,
  previewElement,
  showPreview = true,
  onCSSChange,
  language = "css",
  className,
  defaultTab = "preview",
  allowEditing = true,
}: CodePreviewPanelProps) {
  const [activeTab, setActiveTab] = useState<"preview" | "code">(defaultTab);
  const [editableCSS, setEditableCSS] = useState(generatedCSS);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  // Update editable CSS when generated CSS changes
  useEffect(() => {
    setEditableCSS(generatedCSS);
  }, [generatedCSS]);

  const handleCopyCSS = async () => {
    try {
      await copyToClipboard(editableCSS);
      setCopyStatus("copied");
      setTimeout(() => setCopyStatus("idle"), 2000);
    } catch {
      setCopyStatus("error");
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const handleCSSChange = (value: string) => {
    setEditableCSS(value);
    onCSSChange?.(value);
  };

  const handleApplyChanges = () => {
    onCSSChange?.(editableCSS);
  };

  const tabs = [
    ...(showPreview
      ? [
          {
            id: "preview",
            label: "Preview",
            icon: <Eye size={16} />,
          },
        ]
      : []),
    {
      id: "code",
      label: "Code",
      icon: <Code2 size={16} />,
    },
  ];

  return (
    <div
      className={cn(
        "bg-surface-1 rounded-lg border border-border shadow-sm",
        className
      )}
    >
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-1" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id as "preview" | "code")}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            {allowEditing &&
              activeTab === "code" &&
              editableCSS !== generatedCSS && (
                <Button
                  onClick={handleApplyChanges}
                  size="sm"
                  variant="default"
                >
                  <Play size={14} className="mr-1" />
                  Apply
                </Button>
              )}
            <Button
              onClick={handleCopyCSS}
              size="sm"
              variant="ghost"
              disabled={!editableCSS.trim()}
            >
              <Copy size={14} className="mr-1" />
              {copyStatus === "copied"
                ? "Copied!"
                : copyStatus === "error"
                  ? "Error"
                  : "Copy"}
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {activeTab === "preview" && showPreview && (
          <div className="bg-white dark:bg-gray-50 rounded-lg p-8 min-h-[300px] flex items-center justify-center shadow-sm border border-gray-200">
            {previewElement || (
              <div className="w-48 h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-medium">
                Preview Element
              </div>
            )}
          </div>
        )}

        {activeTab === "code" && (
          <div className="space-y-4">
            {allowEditing && (
              <div className="text-sm text-muted-foreground">
                Edit the CSS below to experiment with your styles. Click "Apply"
                to see changes in the preview.
              </div>
            )}
            <div className="relative group">
              {allowEditing ? (
                <textarea
                  value={editableCSS}
                  onChange={(e) => handleCSSChange(e.target.value)}
                  className="w-full h-[300px] bg-gray-900 text-gray-100 p-4 rounded text-sm font-mono border border-gray-700 resize-none focus:border-blue-500 focus:outline-none transition-colors"
                  spellCheck={false}
                  placeholder={`/* Your ${language.toUpperCase()} code here */`}
                />
              ) : (
                <pre
                  className="bg-gray-900 text-gray-100 p-4 rounded text-sm overflow-x-auto font-mono border border-gray-700 cursor-pointer transition-all hover:border-gray-600 min-h-[300px]"
                  onClick={handleCopyCSS}
                >
                  <code className="text-gray-100">
                    {editableCSS ? (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: editableCSS
                            .replace(
                              /([{}])/g,
                              '<span class="text-yellow-400">$1</span>'
                            )
                            .replace(
                              /(\/\*.*?\*\/)/g,
                              '<span class="text-gray-400">$1</span>'
                            )
                            .replace(
                              /([a-zA-Z-]+)(?=\s*:)/g,
                              '<span class="text-blue-300">$1</span>'
                            )
                            .replace(
                              /:\s*([^;]+)/g,
                              ': <span class="text-green-300">$1</span>'
                            )
                            .replace(
                              /(\.[\w-]+)/g,
                              '<span class="text-purple-300">$1</span>'
                            ),
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">
                        {`/* Configure the tool to generate ${language.toUpperCase()} */`}
                      </span>
                    )}
                  </code>
                </pre>
              )}

              {/* Status indicator for editing */}
              {allowEditing && editableCSS !== generatedCSS && (
                <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Modified
                </div>
              )}

              {/* Hover indicator for read-only */}
              {!allowEditing && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-800 text-gray-200 px-2 py-1 rounded text-xs flex items-center gap-1 pointer-events-none">
                  <Copy size={12} />
                  <span>
                    {copyStatus === "copied"
                      ? "Copied!"
                      : copyStatus === "error"
                        ? "Error"
                        : "Click to copy"}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
