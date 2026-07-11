import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { RefreshCw } from 'lucide-react';
import { UserProfile } from '../../services/authService';
import { useUserTable } from '../../hooks/useUserTable';

interface UserTableProps {
  users: UserProfile[];
  language: 'bn' | 'en';
  loading: boolean;
  onToggleBlock: (uid: string, isBlocked: boolean) => void;
  onDelete: (uid: string) => void;
  hasMore: boolean;
  onLoadMore: () => void;
  loadingMore: boolean;
}

export const UserTable: React.FC<UserTableProps> = ({ 
  users, language, loading, onToggleBlock, onDelete, hasMore, onLoadMore, loadingMore 
}) => {
  const table = useUserTable(users, language, onToggleBlock, onDelete);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden shadow-sm flex flex-col h-full">
      <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-gray-50 dark:bg-slate-800/90 backdrop-blur z-10 shadow-sm">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="border-b border-gray-200 dark:border-slate-800">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-800">
            {loading && users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-4 text-sm">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div className="p-4 border-t border-gray-200 dark:border-slate-800 flex justify-center bg-gray-50 dark:bg-slate-800/50">
          <button
            onClick={onLoadMore}
            disabled={loadingMore}
            className="px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {loadingMore ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
              </>
            ) : (
              language === 'bn' ? 'আরও লোড করুন' : 'Load More'
            )}
          </button>
        </div>
      )}
    </div>
  );
};
