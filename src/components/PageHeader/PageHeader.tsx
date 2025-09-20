import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  breadcrumbs,
  className = ''
}: PageHeaderProps) {
  return (
    <div className={`mb-8 ${className}`}>
      {/* Title and Icon */}
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white">
            {icon}
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-text">{title}</h1>
          {subtitle && (
            <p className="text-text-muted">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs}
    </div>
  );
}