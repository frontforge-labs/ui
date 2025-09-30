import { Button } from "../Button";
import { PageHeader } from "../PageHeader";
import { ToolControlPanel } from "../ToolControlPanel";
import { PreviewPanel } from "../PreviewPanel";
import { CodePanel } from "../CodePanel";
import { RotateCcw, Download, ExternalLink } from "lucide-react";
import { cn } from "../../utils/cn";

export interface ToolLayoutProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  children: React.ReactNode;
  generatedCSS: string;
  onReset?: () => void;
  onCSSChange?: (css: string) => void;
  showPreview?: boolean;
  previewElement?: React.ReactNode;
  controlsTitle?: string;
  controlsGridCols?: "auto" | 1 | 2 | 3;
  allowCSSEditing?: boolean;
  className?: string;
  iconBgClassName?: string;
}

export function ToolLayout({
  title,
  description,
  icon,
  breadcrumbs,
  children,
  generatedCSS,
  onReset,
  onCSSChange,
  showPreview = true,
  previewElement,
  controlsTitle = "Controls",
  controlsGridCols = "auto",
  allowCSSEditing = true,
  className,
  iconBgClassName,
}: ToolLayoutProps) {
  return (
    <div className={cn("max-w-7xl mx-auto p-6", className)}>
      {/* Header */}
      <PageHeader
        title={title}
        subtitle={description}
        icon={icon}
        breadcrumbs={breadcrumbs}
        iconBgClassName={iconBgClassName}
      />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Controls Panel */}
        <div className="xl:col-span-1">
          <ToolControlPanel title={controlsTitle} gridCols={controlsGridCols}>
            {children}

            {/* Action Buttons - Full Width */}
            <div className="col-span-full space-y-3 pt-4 border-t border-border">
              {onReset && (
                <Button
                  onClick={onReset}
                  variant="secondary"
                  className="w-full"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </Button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Button variant="ghost" size="sm">
                  <Download size={14} className="mr-1" />
                  Export
                </Button>
                <Button variant="ghost" size="sm">
                  <ExternalLink size={14} className="mr-1" />
                  Share
                </Button>
              </div>
            </div>
          </ToolControlPanel>
        </div>

        {/* Preview & Code Panels */}
        <div className="xl:col-span-2 space-y-6">
          {/* Preview Panel */}
          {showPreview && <PreviewPanel>{previewElement}</PreviewPanel>}

          {/* Code Panel */}
          <CodePanel
            generatedCSS={generatedCSS}
            onCSSChange={onCSSChange}
            allowEditing={allowCSSEditing}
          />
        </div>
      </div>
    </div>
  );
}
