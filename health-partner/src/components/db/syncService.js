import { vytalDB } from "./indexedDB";

class SyncService {
  constructor() {
    this.syncInProgress = false;
    this.listeners = [];
    this.apiUrl = import.meta.env.VITE_API_URL || "https://api.vytal.ng/v1";
    this.setupNetworkListeners();
  }

  setupNetworkListeners() {
    window.addEventListener("online", () => {
      console.log("Back online - starting sync");
      this.notifyListeners("online");
      this.syncNow();
    });

    window.addEventListener("offline", () => {
      console.log("Offline - changes will be queued");
      this.notifyListeners("offline");
    });

    // Register for background sync
    if ("serviceWorker" in navigator && "SyncManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.sync.register("sync-updates");
      });
    }
  }

  addListener(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  notifyListeners(event, data = {}) {
    this.listeners.forEach((callback) => callback(event, data));
  }

  async queueUpdate(type, data) {
    const item = {
      type,
      data,
      timestamp: Date.now(),
    };

    await vytalDB.addToSyncQueue(item);
    this.notifyListeners("queued", { type, data });

    // Try immediate sync if online
    if (navigator.onLine) {
      this.syncNow();
    }

    return item;
  }

  async syncNow() {
    if (this.syncInProgress || !navigator.onLine) {
      console.log(
        "Sync skipped -",
        this.syncInProgress ? "already syncing" : "offline",
      );
      return;
    }

    this.syncInProgress = true;
    this.notifyListeners("sync-start");

    try {
      const pendingItems = await vytalDB.getPendingSync();

      if (pendingItems.length === 0) {
        this.syncInProgress = false;
        this.notifyListeners("sync-complete");
        return;
      }

      console.log(`Syncing ${pendingItems.length} items...`);

      for (const item of pendingItems) {
        try {
          await this.syncItem(item);
          await vytalDB.markSyncComplete(item.id);
          this.notifyListeners("sync-success", { id: item.id });
        } catch (error) {
          console.error("Sync failed for item:", item.id, error);
          await vytalDB.markSyncFailed(item.id, error.message);
          this.notifyListeners("sync-error", {
            id: item.id,
            error: error.message,
          });
        }
      }

      this.notifyListeners("sync-complete");
    } catch (error) {
      console.error("Sync process failed:", error);
      this.notifyListeners("sync-error", { error: error.message });
    } finally {
      this.syncInProgress = false;
    }
  }

  async syncItem(item) {
    const token = localStorage.getItem("authToken");

    switch (item.type) {
      case "blood-pressure":
        return this.syncBPReading(item.data, token);
      case "glucose":
        return this.syncGlucoseReading(item.data, token);
      case "medication":
        return this.syncMedication(item.data, token);
      case "hospital-inventory":
        return this.syncInventory(item.data, token);
      case "emergency-request":
        return this.syncEmergencyRequest(item.data, token);
      default:
        return this.syncGeneric(item, token);
    }
  }

  async syncBPReading(data, token) {
    const response = await fetch(`${this.apiUrl}/readings/bp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`BP sync failed: ${response.status}`);
    }

    return response.json();
  }

  async syncGlucoseReading(data, token) {
    const response = await fetch(`${this.apiUrl}/readings/glucose`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Glucose sync failed: ${response.status}`);
    }

    return response.json();
  }

  async syncMedication(data, token) {
    const response = await fetch(`${this.apiUrl}/medications/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Medication sync failed: ${response.status}`);
    }

    return response.json();
  }

  async syncInventory(data, token) {
    const response = await fetch(
      `${this.apiUrl}/hospitals/${data.hospitalId}/inventory`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data.inventory),
      },
    );

    if (!response.ok) {
      throw new Error(`Inventory sync failed: ${response.status}`);
    }

    return response.json();
  }

  async syncEmergencyRequest(data, token) {
    const response = await fetch(`${this.apiUrl}/emergency/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Emergency request failed: ${response.status}`);
    }

    return response.json();
  }

  async syncGeneric(item, token) {
    const response = await fetch(`${this.apiUrl}/sync`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(item),
    });

    if (!response.ok) {
      throw new Error(`Sync failed: ${response.status}`);
    }

    return response.json();
  }

  async getSyncStatus() {
    const pending = await vytalDB.getPendingSync();
    return {
      isOnline: navigator.onLine,
      isSyncing: this.syncInProgress,
      pendingCount: pending.length,
      lastSync: await vytalDB.getSetting("lastSync"),
    };
  }
}

export const syncService = new SyncService();
