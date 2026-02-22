// IndexedDB setup for offline storage
const DB_NAME = "vytal-db";
const DB_VERSION = 1;

class VytalDB {
  constructor() {
    this.db = null;
    this.initDB();
  }

  async initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = (event) => {
        console.error("Database error:", event.target.error);
        reject("Failed to open database");
      };

      request.onsuccess = (event) => {
        this.db = event.target.result;
        console.log("Database initialized successfully");
        resolve(this.db);
      };

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Users store
        if (!db.objectStoreNames.contains("users")) {
          const userStore = db.createObjectStore("users", { keyPath: "id" });
          userStore.createIndex("email", "email", { unique: true });
          userStore.createIndex("role", "role", { unique: false });
        }

        // Health readings store
        if (!db.objectStoreNames.contains("readings")) {
          const readingsStore = db.createObjectStore("readings", {
            keyPath: "id",
            autoIncrement: true,
          });
          readingsStore.createIndex("userId", "userId", { unique: false });
          readingsStore.createIndex("type", "type", { unique: false });
          readingsStore.createIndex("date", "date", { unique: false });
        }

        // Hospitals store
        if (!db.objectStoreNames.contains("hospitals")) {
          const hospitalStore = db.createObjectStore("hospitals", {
            keyPath: "id",
          });
          hospitalStore.createIndex("lga", "lga", { unique: false });
          hospitalStore.createIndex("name", "name", { unique: false });
        }

        // Inventory store
        if (!db.objectStoreNames.contains("inventory")) {
          const inventoryStore = db.createObjectStore("inventory", {
            keyPath: "hospitalId",
          });
        }

        // Sync queue
        if (!db.objectStoreNames.contains("syncQueue")) {
          const syncStore = db.createObjectStore("syncQueue", {
            keyPath: "id",
            autoIncrement: true,
          });
          syncStore.createIndex("status", "status", { unique: false });
          syncStore.createIndex("timestamp", "timestamp", { unique: false });
        }

        // Medications store
        if (!db.objectStoreNames.contains("medications")) {
          const medStore = db.createObjectStore("medications", {
            keyPath: "id",
            autoIncrement: true,
          });
          medStore.createIndex("name", "name", { unique: false });
          medStore.createIndex("condition", "condition", { unique: false });
        }

        // Emergency contacts
        if (!db.objectStoreNames.contains("emergencyContacts")) {
          const contactStore = db.createObjectStore("emergencyContacts", {
            keyPath: "id",
            autoIncrement: true,
          });
        }

        // Settings
        if (!db.objectStoreNames.contains("settings")) {
          db.createObjectStore("settings", { keyPath: "key" });
        }
      };
    });
  }

  // Generic CRUD operations
  async add(storeName, data) {
    const tx = this.db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    return store.add(data);
  }

  async get(storeName, key) {
    const tx = this.db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.get(key);
  }

  async getAll(storeName) {
    const tx = this.db.transaction(storeName, "readonly");
    const store = tx.objectStore(storeName);
    return store.getAll();
  }

  async put(storeName, data) {
    const tx = this.db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    return store.put(data);
  }

  async delete(storeName, key) {
    const tx = this.db.transaction(storeName, "readwrite");
    const store = tx.objectStore(storeName);
    return store.delete(key);
  }

  // User operations
  async saveUser(user) {
    return this.put("users", user);
  }

  async getUser(id) {
    return this.get("users", id);
  }

  async getUsersByRole(role) {
    const tx = this.db.transaction("users", "readonly");
    const store = tx.objectStore("users");
    const index = store.index("role");
    return index.getAll(role);
  }

  // Health readings
  async saveReading(reading) {
    reading.timestamp = Date.now();
    return this.add("readings", reading);
  }

  async getReadings(userId, type, limit = 30) {
    const tx = this.db.transaction("readings", "readonly");
    const store = tx.objectStore("readings");
    const index = store.index("userId");
    const readings = await index.getAll(userId);

    return readings
      .filter((r) => !type || r.type === type)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  // Hospitals
  async saveHospitals(hospitals) {
    const tx = this.db.transaction("hospitals", "readwrite");
    const store = tx.objectStore("hospitals");

    hospitals.forEach((hospital) => {
      store.put(hospital);
    });

    return tx.complete;
  }

  async getHospitalsByLGA(lga) {
    const tx = this.db.transaction("hospitals", "readonly");
    const store = tx.objectStore("hospitals");
    const index = store.index("lga");
    return index.getAll(lga);
  }

  // Inventory
  async updateInventory(hospitalId, inventory) {
    return this.put("inventory", {
      hospitalId,
      ...inventory,
      lastUpdated: Date.now(),
    });
  }

  async getInventory(hospitalId) {
    return this.get("inventory", hospitalId);
  }

  // Sync queue
  async addToSyncQueue(item) {
    item.status = "pending";
    item.timestamp = Date.now();
    item.retryCount = 0;
    return this.add("syncQueue", item);
  }

  async getPendingSync() {
    const tx = this.db.transaction("syncQueue", "readonly");
    const store = tx.objectStore("syncQueue");
    const index = store.index("status");
    return index.getAll("pending");
  }

  async markSyncComplete(id) {
    const tx = this.db.transaction("syncQueue", "readwrite");
    const store = tx.objectStore("syncQueue");
    const item = await store.get(id);
    if (item) {
      item.status = "completed";
      return store.put(item);
    }
  }

  async markSyncFailed(id, error) {
    const tx = this.db.transaction("syncQueue", "readwrite");
    const store = tx.objectStore("syncQueue");
    const item = await store.get(id);
    if (item) {
      item.retryCount++;
      item.lastError = error;
      if (item.retryCount >= 3) {
        item.status = "failed";
      }
      return store.put(item);
    }
  }

  // Settings
  async getSetting(key) {
    const tx = this.db.transaction("settings", "readonly");
    const store = tx.objectStore("settings");
    const result = await store.get(key);
    return result ? result.value : null;
  }

  async setSetting(key, value) {
    return this.put("settings", { key, value });
  }

  // Clear all data
  async clearAll() {
    const stores = [
      "users",
      "readings",
      "hospitals",
      "inventory",
      "syncQueue",
      "medications",
      "emergencyContacts",
    ];
    const tx = this.db.transaction(stores, "readwrite");

    stores.forEach((storeName) => {
      const store = tx.objectStore(storeName);
      store.clear();
    });

    return tx.complete;
  }
}

export const vytalDB = new VytalDB();
