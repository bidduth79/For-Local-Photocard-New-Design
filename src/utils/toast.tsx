import toast from 'react-hot-toast';
import { CheckCircle, XCircle, AlertTriangle, Info, X, Loader2 } from 'lucide-react';
import React from 'react';

const ToastContent = ({ t, title, message, type, icon: Icon, colorClass, bgClass, borderClass, spin }: any) => (
  <div
    className={`${
      t.visible ? 'animate-enter' : 'animate-leave'
    } max-w-md w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5 border-l-4 ${borderClass}`}
  >
    <div className="flex-1 w-0 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5">
          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${bgClass}`}>
            <Icon className={`h-6 w-6 ${colorClass} ${spin ? 'animate-spin' : ''}`} />
          </div>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {title}
          </p>
          {message && typeof message === 'string' && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200 dark:border-slate-700">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-500 hover:bg-gray-50 dark:hover:bg-slate-700 focus:outline-none"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  </div>
);

export const showToast = {
  success: (title: string, messageOrOptions?: string | { id?: string }, options?: { id?: string }) => {
    const message = typeof messageOrOptions === 'string' ? messageOrOptions : undefined;
    const opts = typeof messageOrOptions === 'object' ? messageOrOptions : options;
    toast.custom((t) => (
      <ToastContent
        t={t}
        title={title}
        message={message}
        type="success"
        icon={CheckCircle}
        colorClass="text-emerald-500"
        bgClass="bg-emerald-100 dark:bg-emerald-900/30"
        borderClass="border-emerald-500"
      />
    ), { duration: 3000, id: opts?.id });
  },
  error: (title: string, messageOrOptions?: string | { id?: string }, options?: { id?: string }) => {
    const message = typeof messageOrOptions === 'string' ? messageOrOptions : undefined;
    const opts = typeof messageOrOptions === 'object' ? messageOrOptions : options;
    toast.custom((t) => (
      <ToastContent
        t={t}
        title={title}
        message={message}
        type="error"
        icon={XCircle}
        colorClass="text-red-500"
        bgClass="bg-red-100 dark:bg-red-900/30"
        borderClass="border-red-500"
      />
    ), { duration: 4000, id: opts?.id });
  },
  warning: (title: string, messageOrOptions?: string | { id?: string }, options?: { id?: string }) => {
    const message = typeof messageOrOptions === 'string' ? messageOrOptions : undefined;
    const opts = typeof messageOrOptions === 'object' ? messageOrOptions : options;
    toast.custom((t) => (
      <ToastContent
        t={t}
        title={title}
        message={message}
        type="warning"
        icon={AlertTriangle}
        colorClass="text-amber-500"
        bgClass="bg-amber-100 dark:bg-amber-900/30"
        borderClass="border-amber-500"
      />
    ), { duration: 3000, id: opts?.id });
  },
  info: (title: string, messageOrOptions?: string | { id?: string }, options?: { id?: string }) => {
    const message = typeof messageOrOptions === 'string' ? messageOrOptions : undefined;
    const opts = typeof messageOrOptions === 'object' ? messageOrOptions : options;
    toast.custom((t) => (
      <ToastContent
        t={t}
        title={title}
        message={message}
        type="info"
        icon={Info}
        colorClass="text-blue-500"
        bgClass="bg-blue-100 dark:bg-blue-900/30"
        borderClass="border-blue-500"
      />
    ), { duration: 3000, id: opts?.id });
  },
  loading: (title: string, messageOrOptions?: string | { id?: string }, options?: { id?: string }) => {
    const message = typeof messageOrOptions === 'string' ? messageOrOptions : undefined;
    const opts = typeof messageOrOptions === 'object' ? messageOrOptions : options;
    toast.custom((t) => (
      <ToastContent
        t={t}
        title={title}
        message={message}
        type="loading"
        icon={Loader2}
        colorClass="text-indigo-500"
        bgClass="bg-indigo-100 dark:bg-indigo-900/30"
        borderClass="border-indigo-500"
        spin={true}
      />
    ), { duration: Infinity, id: opts?.id });
  }
};
