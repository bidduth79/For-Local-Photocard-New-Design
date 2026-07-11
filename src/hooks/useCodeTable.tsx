import React, { useMemo } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Key, AlertCircle, CheckCircle2, Copy, Trash2 } from 'lucide-react';
import { ActivationCode } from '../services/codeService';
import { UserProfile } from '../services/authService';

const columnHelper = createColumnHelper<ActivationCode>();

export const useCodeTable = (
  codes: ActivationCode[],
  users: UserProfile[],
  language: 'bn' | 'en',
  onCopy: (code: string) => void,
  onDelete: (code: string) => void
) => {
  const columns = useMemo(() => [
    columnHelper.accessor('code', {
      header: 'Code',
      cell: (info) => {
        const code = info.row.original;
        let isExpired = false;
        if (code.isUsed && code.usedAt) {
          const expireDate = new Date(code.usedAt);
          expireDate.setMonth(expireDate.getMonth() + (code.durationMonths || 1));
          isExpired = expireDate.getTime() < Date.now();
        }
        
        let colorClass = 'text-gray-900 dark:text-white bg-gray-100 dark:bg-slate-800';
        let iconColor = 'text-indigo-500';
        
        if (isExpired) {
            colorClass = 'text-red-900 dark:text-red-200 bg-red-100 dark:bg-red-900/30';
            iconColor = 'text-red-500';
        } else if (code.isUsed) {
            colorClass = 'text-yellow-900 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-900/30';
            iconColor = 'text-yellow-600';
        }

        return (
          <div className={`flex items-center gap-2 font-mono text-sm font-medium px-3 py-1.5 rounded-lg w-fit ${colorClass}`}>
            <Key className={`w-4 h-4 ${iconColor}`} />
            {info.getValue()}
          </div>
        );
      },
    }),
    columnHelper.accessor('durationMonths', {
      header: 'Duration',
      cell: (info) => `${info.getValue() || 1} ${language === 'bn' ? 'মাস' : 'Months'}`,
    }),
    columnHelper.accessor('isUsed', {
      header: 'Status',
      cell: (info) => {
        const code = info.row.original;
        let isExpired = false;
        if (code.isUsed && code.usedAt) {
          const expireDate = new Date(code.usedAt);
          expireDate.setMonth(expireDate.getMonth() + (code.durationMonths || 1));
          isExpired = expireDate.getTime() < Date.now();
        }

        if (isExpired) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
              <AlertCircle className="w-3.5 h-3.5" />
              Expired
            </span>
          );
        } else if (code.isUsed) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
              Used
            </span>
          );
        } else {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Active
            </span>
          );
        }
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created At',
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.display({
      id: 'expiresAt',
      header: 'Expires At',
      cell: (info) => {
        const code = info.row.original;
        let expiresAt = '-';
        let isExpired = false;
        if (code.isUsed && code.usedAt) {
          const expireDate = new Date(code.usedAt);
          expireDate.setMonth(expireDate.getMonth() + (code.durationMonths || 1));
          expiresAt = expireDate.toLocaleDateString();
          isExpired = expireDate.getTime() < Date.now();
        }
        return (
          <span className={isExpired ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400'}>
            {expiresAt}
          </span>
        );
      },
    }),
    columnHelper.accessor('usedBy', {
      header: 'Used By',
      cell: (info) => {
        const code = info.row.original;
        const usedByUser = users.find(u => u.uid === code.usedBy);
        const usedByDisplay = usedByUser?.email || (code.usedBy ? `${code.usedBy.substring(0, 8)}...` : '-');
        
        return code.usedBy ? (
          <span className="truncate max-w-[150px] inline-block" title={usedByUser?.email || code.usedBy}>
            {usedByDisplay}
          </span>
        ) : '-';
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        return (
        <div className="flex gap-2">
          <button
            onClick={() => onCopy(info.row.original.code)}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
            title="Copy Code"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(info.row.original.code)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete Code"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )},
    }),
  ], [language, users, onCopy, onDelete]);

  const table = useReactTable({
    data: codes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
};
