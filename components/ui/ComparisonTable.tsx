import { cn } from '@/lib/utils';

export interface ComparisonTableProps {
  headers: string[];
  rows: Array<{ label: string; values: Array<string | boolean> }>;
  className?: string;
}

export default function ComparisonTable({ headers, rows, className }: ComparisonTableProps) {
  return (
    <div className={cn('overflow-x-auto rounded-xl border border-gray-200 bg-white', className)}>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-gray-50 text-gray-700">
            <th className="px-4 py-3">Feature</th>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-t border-gray-200">
              <td className="px-4 py-3 font-medium text-gray-900">{r.label}</td>
              {r.values.map((v, i) => (
                <td key={i} className="px-4 py-3 text-gray-700">
                  {typeof v === 'boolean' ? (
                    <span className={cn('inline-block h-2 w-2 rounded-full', v ? 'bg-green-500' : 'bg-gray-300')} aria-label={v ? 'Yes' : 'No'} />
                  ) : (
                    v
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

