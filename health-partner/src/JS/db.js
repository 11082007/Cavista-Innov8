// import Dexie from "dexie";

// export const db = new Dexie("HealthPartnerDB");
// db.version(1).stores({
//   // ++id is the primary key
//   hospitals:
//     "++id, name, lga, antiVenom, blood, phone, ambulance, insuranceHelp",
//   syncQueue: "++id, type, data, status", // Outbox for offline updates
// });

// JS/db.js - IndexedDB setup with Dexie (since you're using it)
import Dexie from "dexie";

export const db = new Dexie("HealthPartnerDB");

db.version(1).stores({
  hospitals: "++id, name, lga, lastUpdated",
  resources: "++id, hospitalId, type, bloodType, quantity, updatedAt",
  syncQueue: "++id, type, data, status, timestamp, retryCount",
  settings: "key, value",
});

db.version(2).stores({
  hospitals: "++id, name, lga, lastUpdated, hasBlood, hasICU, hasAntiVenom",
  resources:
    "++id, hospitalId, type, bloodType, quantity, updatedAt, isCritical",
  syncQueue: "++id, type, data, status, timestamp, retryCount, priority",
  settings: "key, value",
});

// Initialize with sample data if empty
export const initializeDatabase = async () => {
  const count = await db.hospitals.count();
  if (count === 0) {
    await seedDatabase();
  }
};

// Hospital operations
export const hospitalOps = {
  async getAll() {
    return await db.hospitals.toArray();
  },

  async getByLGA(lga) {
    return await db.hospitals.where("lga").equals(lga).toArray();
  },

  async getWithResources() {
    const hospitals = await db.hospitals.toArray();
    const hospitalsWithResources = await Promise.all(
      hospitals.map(async (hospital) => {
        const resources = await db.resources
          .where("hospitalId")
          .equals(hospital.id)
          .toArray();
        return { ...hospital, resources };
      }),
    );
    return hospitalsWithResources;
  },

  async updateHospital(id, updates) {
    await db.hospitals.update(id, { ...updates, lastUpdated: Date.now() });

    // Queue for sync
    await syncOps.addToQueue({
      type: "UPDATE_HOSPITAL",
      data: { id, updates },
      priority: 1,
    });
  },
};

// Resource operations
export const resourceOps = {
  async updateResource(hospitalId, resourceType, data) {
    // Check if resource exists
    const existing = await db.resources
      .where({ hospitalId, type: resourceType })
      .first();

    if (existing) {
      await db.resources.update(existing.id, {
        ...data,
        updatedAt: Date.now(),
        isCritical: data.quantity < (data.criticalLevel || 3),
      });
    } else {
      await db.resources.add({
        hospitalId,
        type: resourceType,
        ...data,
        updatedAt: Date.now(),
        isCritical: data.quantity < (data.criticalLevel || 3),
      });
    }

    // Queue for sync with high priority
    await syncOps.addToQueue({
      type: "UPDATE_RESOURCE",
      data: { hospitalId, resourceType, ...data },
      priority: 2, // Higher priority for resource updates
    });

    // Update hospital lastUpdated
    await db.hospitals.update(hospitalId, { lastUpdated: Date.now() });
  },

  async getBloodInventory(hospitalId) {
    return await db.resources.where({ hospitalId, type: "blood" }).toArray();
  },

  async getCriticalResources() {
    return await db.resources.where("isCritical").equals(1).toArray();
  },
};

// Sync queue operations
export const syncOps = {
  async addToQueue(item) {
    await db.syncQueue.add({
      ...item,
      status: "pending",
      timestamp: Date.now(),
      retryCount: 0,
    });
  },

  async getPending() {
    return await db.syncQueue.where("status").equals("pending").toArray();
  },

  async markComplete(id) {
    await db.syncQueue.update(id, { status: "completed" });
  },

  async markFailed(id, error) {
    const item = await db.syncQueue.get(id);
    const retryCount = (item.retryCount || 0) + 1;

    if (retryCount >= 3) {
      await db.syncQueue.update(id, {
        status: "failed",
        error: error.message,
        retryCount,
      });
    } else {
      await db.syncQueue.update(id, {
        status: "pending",
        retryCount,
        lastError: error.message,
      });
    }
  },

  async clearCompleted() {
    await db.syncQueue.where("status").equals("completed").delete();
  },
};

// Settings operations
export const settingsOps = {
  async get(key) {
    const setting = await db.settings.get(key);
    return setting?.value;
  },

  async set(key, value) {
    await db.settings.put({ key, value });
  },
};
