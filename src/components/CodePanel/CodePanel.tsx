import { useState, useEffect } from "react";
import { Button } from "../Button";
import { Copy, Play } from "lucide-react";
import { copyToClipboard } from "../../utils/clipboard";
import { cn } from "../../utils/cn";

export interface CodePanelProps {
  generatedCSS: string;
  onCSSChange?: (css: string) => void;
  language?: "css" | "scss" | "less";
  className?: string;
  allowEditing?: boolean;
  title?: string;
}

export function CodePanel({
  generatedCSS,
  onCSSChange,
  language = "css",
  className,
  allowEditing = true,
  title = "Generated CSS",
}: CodePanelProps) {
  const [editableCSS, setEditableCSS] = useState(generatedCSS || "");
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  // Update editable CSS when generated CSS changes
  useEffect(() => {
    setEditableCSS(generatedCSS || "");
  }, [generatedCSS]);

  const handleCopyCSS = async () => {
    try {
      await copyToClipboard(editableCSS || "");
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

  return (
    <div
      className={cn(
        "bg-surface-1 rounded-lg border border-border shadow-sm",
        className
      )}
    >
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="flex items-center gap-2">
            {allowEditing && editableCSS !== generatedCSS && (
              <Button onClick={handleApplyChanges} size="sm" variant="default">
                <Play size={14} className="mr-1" />
                Apply
              </Button>
            )}
            <Button
              onClick={handleCopyCSS}
              size="sm"
              variant="ghost"
              disabled={!editableCSS || (editableCSS || "").trim().length === 0}
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
        {allowEditing && (
          <div className="text-sm text-muted-foreground mb-4">
            Edit the CSS below to experiment with your styles. Click "Apply" to
            see changes in the preview.
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
    </div>
  );
}
