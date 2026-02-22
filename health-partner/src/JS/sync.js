// JS/sync.js - Handle offline sync
import { db, syncOps } from "./db";

class SyncService {
  constructor() {
    this.isSyncing = false;
    this.listeners = [];
    this.apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000/api";
    this.setupNetworkListeners();
  }

  setupNetworkListeners() {
    window.addEventListener("online", () => {
      console.log("Back online! Checking sync queue...");
      this.handleOnline();
      this.notifyListeners("online");
    });

    window.addEventListener("offline", () => {
      console.log(
        "You are offline - changes will sync when connection returns",
      );
      this.notifyListeners("offline");
    });
  }

  async handleOnline() {
    // This is the function from your App.jsx
    console.log("Back online! Checking sync queue...");

    // Grab all pending updates from your Dexie outbox
    const pendingUpdates = await syncOps.getPending();

    if (pendingUpdates.length > 0) {
      this.notifyListeners("sync-start", { count: pendingUpdates.length });
      await this.processSyncQueue(pendingUpdates);
    }
  }

  async processSyncQueue(pendingUpdates) {
    this.isSyncing = true;

    for (const item of pendingUpdates) {
      try {
        console.log(`Syncing item: ${item.type}`, item.data);

        // Send to server
        const response = await this.sendToServer(item);

        if (response.ok) {
          await syncOps.markComplete(item.id);
          this.notifyListeners("sync-success", { id: item.id });
        } else {
          throw new Error(`Server error: ${response.status}`);
        }
      } catch (error) {
        console.error(`Failed to sync item ${item.id}:`, error);
        await syncOps.markFailed(item.id, error);
        this.notifyListeners("sync-error", {
          id: item.id,
          error: error.message,
        });
      }
    }

    // Clean up completed items
    await syncOps.clearCompleted();

    this.isSyncing = false;
    this.notifyListeners("sync-complete");
  }

  async sendToServer(item) {
    const token = localStorage.getItem("authToken");

    switch (item.type) {
      case "UPDATE_RESOURCE":
        return fetch(`${this.apiUrl}/resources/update`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item.data),
        });

      case "UPDATE_HOSPITAL":
        return fetch(`${this.apiUrl}/hospitals/${item.data.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(item.data.updates),
        });

      default:
        throw new Error(`Unknown sync type: ${item.type}`);
    }
  }

  // Listen for sync events
  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  notifyListeners(event, data = {}) {
    this.listeners.forEach((callback) => callback(event, data));
  }

  // Manual sync trigger
  async syncNow() {
    if (navigator.onLine && !this.isSyncing) {
      const pending = await syncOps.getPending();
      await this.processSyncQueue(pending);
    }
  }

  getStatus() {
    return {
      isOnline: navigator.onLine,
      isSyncing: this.isSyncing,
      pendingCount: 0, // You'd get this from db
    };
  }
}

export const syncService = new SyncService();
