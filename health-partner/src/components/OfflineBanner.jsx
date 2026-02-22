// components/OfflineBanner.jsx
const OfflineBanner = ({ isOnline, pendingCount, isSyncing }) => {
  if (isOnline && pendingCount === 0 && !isSyncing) return null;

  return (
    <div
      className={`sticky top-0 z-50 p-2 text-center text-sm font-medium ${
        !isOnline
          ? "bg-yellow-500 text-white"
          : isSyncing
            ? "bg-blue-500 text-white"
            : "bg-green-500 text-white"
      }`}
    >
      {!isOnline && (
        <span>
          📴 You're offline - Showing cached data. Changes will sync when
          connection returns.
        </span>
      )}
      {isOnline && isSyncing && (
        <span>🔄 Syncing changes... ({pendingCount} items remaining)</span>
      )}
      {isOnline && !isSyncing && pendingCount > 0 && (
        <span>
          ⏳ {pendingCount} change{pendingCount !== 1 ? "s" : ""} waiting to
          sync
        </span>
      )}
    </div>
  );
};

export default OfflineBanner;
