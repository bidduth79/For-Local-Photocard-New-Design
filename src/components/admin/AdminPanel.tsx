import React from 'react';
import { Shield, Key, Copy, CheckCircle2, RefreshCw, Plus, UserPlus, Mail, Lock, Users, Clock, AlertCircle, XCircle, Ban, Trash2, KeyRound, Download, MapPin, Calendar, Search, Filter } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';
import { CodeTable } from './CodeTable';
import { UserTable } from './UserTable';

interface AdminPanelProps {
  language: 'bn' | 'en';
}

const AdminPanel: React.FC<AdminPanelProps> = ({ language }) => {
  const {
    users,
    loading,
    loadingMoreCodes,
    hasMoreCodes,
    loadingUsers,
    loadingMoreUsers,
    hasMoreUsers,
    generating,
    activeTab,
    setActiveTab,
    durationMonths,
    setDurationMonths,
    codeSearch,
    setCodeSearch,
    codeFilter,
    setCodeFilter,
    email,
    setEmail,
    password,
    setPassword,
    creatingUser,
    registeredUsers,
    anonymousUsers,
    totalDownloads,
    filteredCodes,
    handleToggleBlock,
    handleDeleteUser,
    handleResetPassword,
    handleDeleteCode,
    handleGenerateCode,
    handleCreateUser,
    copyToClipboard,
    fetchCodes,
    fetchUsers,
    codeToDelete,
    setCodeToDelete,
    confirmDeleteCode,
    userToDelete,
    setUserToDelete,
    confirmDeleteUser,
  } = useAdmin(language);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
            <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {language === 'bn' ? 'এডমিন প্যানেল' : 'Admin Panel'}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              {language === 'bn' ? 'অ্যাক্টিভেশন কোড ও ইউজার ম্যানেজমেন্ট' : 'Activation Code & User Management'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{users.length}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{language === 'bn' ? 'সর্বমোট ইউজার' : 'Total Users'}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{registeredUsers.length}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{language === 'bn' ? 'রেজিস্টার্ড ইউজার' : 'Registered Users'}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">{anonymousUsers.length}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{language === 'bn' ? 'অ্যানোনিমাস ইউজার' : 'Anonymous Users'}</span>
        </div>
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalDownloads}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">{language === 'bn' ? 'সর্বমোট ডাউনলোড' : 'Total Downloads'}</span>
        </div>
      </div>

      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-800 pb-px overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveTab('codes')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'codes'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t border-l border-r border-gray-200 dark:border-slate-800 -mb-px'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Key className="w-4 h-4" />
          {language === 'bn' ? 'অ্যাক্টিভেশন কোড' : 'Activation Codes'}
        </button>
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'users'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t border-l border-r border-gray-200 dark:border-slate-800 -mb-px'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Users className="w-4 h-4" />
          {language === 'bn' ? `ইউজার লিস্ট (${registeredUsers.length})` : `Users (${registeredUsers.length})`}
        </button>
        <button
          onClick={() => setActiveTab('anonymous')}
          className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'anonymous'
              ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 border-t border-l border-r border-gray-200 dark:border-slate-800 -mb-px'
              : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          }`}
        >
          <Shield className="w-4 h-4" />
          {language === 'bn' ? `অ্যানোনিমাস ইউজার (${anonymousUsers.length})` : `Anonymous (${anonymousUsers.length})`}
        </button>
      </div>

      {activeTab === 'codes' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Create User Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <UserPlus className="text-indigo-500" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {language === 'bn' ? 'প্রিমিয়াম ইউজার তৈরি করুন' : 'Create Premium User'}
            </h3>
          </div>
          
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'bn' ? 'ইমেইল এড্রেস' : 'Email Address'}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                  placeholder="user@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {language === 'bn' ? 'পাসওয়ার্ড' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={creatingUser}
              className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {creatingUser ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <UserPlus className="w-5 h-5" />
              )}
              {language === 'bn' ? 'ইউজার তৈরি করুন' : 'Create User'}
            </button>
          </form>
        </div>

        {/* Generate Code Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-center items-center text-center">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-full mb-4">
            <Key className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {language === 'bn' ? 'অ্যাক্টিভেশন কোড জেনারেটর' : 'Activation Code Generator'}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm">
            {language === 'bn' 
              ? 'ইউজারদের প্রিমিয়াম এক্সেস দেওয়ার জন্য কোড তৈরি করুন।' 
              : 'Generate codes to give users premium access.'}
          </p>
          
          <div className="w-full mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
              {language === 'bn' ? 'মেয়াদ নির্বাচন করুন' : 'Select Duration'}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[1, 3, 6, 12].map((months) => (
                <button
                  key={months}
                  onClick={() => setDurationMonths(months)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-colors border ${
                    durationMonths === months
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-900/30 dark:border-indigo-800 dark:text-indigo-300'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-gray-300 dark:hover:bg-slate-700'
                  }`}
                >
                  {months} {language === 'bn' ? 'মাস' : 'Months'}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerateCode}
            disabled={generating}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {generating ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
            {language === 'bn' ? 'নতুন কোড তৈরি করুন' : 'Generate New Code'}
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={language === 'bn' ? "কোড বা ইমেইল দিয়ে খুঁজুন..." : "Search by code or email..."}
            value={codeSearch}
            onChange={(e) => setCodeSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 dark:text-white"
          />
        </div>
        <div className="flex bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-xl p-1 overflow-x-auto">
          {(['all', 'active', 'used', 'expired'] as const).map(filter => (
            <button
              key={filter}
              onClick={() => setCodeFilter(filter)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors whitespace-nowrap ${
                codeFilter === filter 
                  ? 'bg-gray-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
              }`}
            >
              {language === 'bn' 
                ? (filter === 'all' ? 'সব' : filter === 'active' ? 'অ্যাক্টিভ' : filter === 'used' ? 'ব্যবহৃত' : 'মেয়াদোত্তীর্ণ')
                : filter}
            </button>
          ))}
        </div>
      </div>

      <CodeTable
        codes={filteredCodes}
        users={users}
        language={language}
        loading={loading}
        onCopy={copyToClipboard}
        onDelete={(code) => setCodeToDelete(code)}
        hasMore={hasMoreCodes}
        onLoadMore={() => fetchCodes(true)}
        loadingMore={loadingMoreCodes}
      />
        </>
      ) : (
        <UserTable
          users={activeTab === 'users' ? registeredUsers : anonymousUsers}
          language={language}
          loading={loadingUsers}
          onToggleBlock={handleToggleBlock}
          onDelete={(uid) => setUserToDelete(uid)}
          hasMore={hasMoreUsers}
          onLoadMore={() => fetchUsers(true)}
          loadingMore={loadingMoreUsers}
        />
      )}

      {/* Code Delete Modal */}
      {codeToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-xl border border-gray-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'bn' ? 'কোড ডিলিট করবেন?' : 'Delete Code?'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {language === 'bn' 
                ? 'আপনি কি নিশ্চিত যে আপনি এই কোডটি ডিলিট করতে চান? এই কাজ বাতিল করা যাবে না।' 
                : 'Are you sure you want to delete this code? This action cannot be undone.'}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setCodeToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={confirmDeleteCode}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {language === 'bn' ? 'ডিলিট করুন' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Delete Modal */}
      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm shadow-xl border border-gray-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {language === 'bn' ? 'ইউজার ডিলিট করবেন?' : 'Delete User?'}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              {language === 'bn' 
                ? 'আপনি কি নিশ্চিত যে আপনি এই ইউজারটি ডিলিট করতে চান? এই কাজ বাতিল করা যাবে না।' 
                : 'Are you sure you want to delete this user? This action cannot be undone.'}
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setUserToDelete(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
              >
                {language === 'bn' ? 'ডিলিট করুন' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
