import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-2">
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="text-[#0072C6] hover:underline"
                >
                  {item.label}
                </button>
              ) : (
                <span className={isLast ? 'text-[#1D1D1B]' : 'text-[#6C6C6C]'}>
                  {item.label}
                </span>
              )}
              {!isLast && <ChevronRight className="w-4 h-4 text-[#6C6C6C]" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
