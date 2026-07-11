import React, { useMemo } from 'react';
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Shield, Clock, AlertCircle, XCircle, Ban, Trash2, CheckCircle2 } from 'lucide-react';
import { UserProfile } from '../services/authService';

const columnHelper = createColumnHelper<UserProfile>();

export const useUserTable = (
  users: UserProfile[],
  language: 'bn' | 'en',
  onToggleBlock: (uid: string, isBlocked: boolean) => void,
  onDelete: (uid: string) => void
) => {
  const columns = useMemo(() => [
    columnHelper.display({
      id: 'user',
      header: 'User',
      cell: (info) => {
        const user = info.row.original;
        return (
          <div className="flex flex-col">
            <span className="font-medium text-gray-900 dark:text-white">
              {user.email || (user.isAnonymous ? 'Anonymous User' : 'Unknown')}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono mt-0.5">
              {user.uid}
            </span>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'role',
      header: 'Role',
      cell: (info) => {
        const user = info.row.original;
        if (user.isAdmin) {
          return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
              <Shield className="w-3 h-3" />
              Admin
            </span>
          );
        }
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
            user.isPremium 
              ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' 
              : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-400'
          }`}>
            {user.isPremium ? 'Premium' : 'Free'}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: 'activity',
      header: 'Activity & Location',
      cell: (info) => {
        const user = info.row.original;
        return (
          <div className="flex flex-col gap-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : 'Never'}
            </div>
            {user.location && (
              <div className="flex items-center gap-1.5">
                <span>📍</span>
                {user.location}
              </div>
            )}
          </div>
        );
      },
    }),
    columnHelper.accessor('downloadCount', {
      header: 'Downloads',
      cell: (info) => {
        const count = info.getValue() || 0;
        return (
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-900 dark:text-white">{count}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {language === 'bn' ? 'টি' : 'times'}
            </span>
          </div>
        );
      },
    }),
    columnHelper.display({
      id: 'status',
      header: 'Status',
      cell: (info) => {
        const user = info.row.original;
        let statusColor = 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-gray-400';
        let statusText = 'Free';
        let statusIcon = <Clock className="w-3.5 h-3.5" />;
        
        if (user.isBlocked) {
          statusColor = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
          statusText = 'Blocked';
          statusIcon = <Ban className="w-3.5 h-3.5" />;
        } else if (user.isAdmin) {
          statusColor = 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
          statusText = 'Admin';
          statusIcon = <Shield className="w-3.5 h-3.5" />;
        } else if (user.isPremium) {
          if (user.premiumExpiresAt) {
            const now = Date.now();
            const twoDaysMs = 2 * 24 * 60 * 60 * 1000;
            
            if (now > user.premiumExpiresAt) {
              statusColor = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
              statusText = 'Expired';
              statusIcon = <XCircle className="w-3.5 h-3.5" />;
            } else if (user.premiumExpiresAt - now <= twoDaysMs) {
              statusColor = 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
              statusText = 'Expiring Soon';
              statusIcon = <AlertCircle className="w-3.5 h-3.5" />;
            } else {
              statusColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
              statusText = 'Active';
              statusIcon = <CheckCircle2 className="w-3.5 h-3.5" />;
            }
          } else {
            statusColor = 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
            statusText = 'Active';
            statusIcon = <CheckCircle2 className="w-3.5 h-3.5" />;
          }
        }

        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
            {statusIcon}
            {statusText}
          </span>
        );
      },
    }),
    columnHelper.accessor('premiumExpiresAt', {
      header: 'Expires At',
      cell: (info) => {
        const val = info.getValue();
        return (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {val ? new Date(val).toLocaleDateString() : '-'}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: (info) => {
        const user = info.row.original;
        return (
        <div className="flex gap-2">
          {!user.isAdmin && (
            <button
              onClick={() => onToggleBlock(user.uid, !user.isBlocked)}
              className={`p-2 rounded-lg transition-colors ${
                user.isBlocked 
                  ? 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30' 
                  : 'text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-900/30'
              }`}
              title={user.isBlocked ? "Unblock User" : "Block User"}
            >
              <Ban className={`w-4 h-4 ${user.isBlocked ? 'opacity-50' : ''}`} />
            </button>
          )}
          <button
            onClick={() => onDelete(user.uid)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )},
    }),
  ], [language, onToggleBlock, onDelete]);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
};
