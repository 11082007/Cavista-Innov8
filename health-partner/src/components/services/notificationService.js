// class NotificationService {
//   constructor() {
//     this.permission = null;
//     this.notifications = [];
//     this.init();
//   }

//   async init() {
//     if (!("Notification" in window)) {
//       console.log("This browser does not support notifications");
//       return;
//     }

//     this.permission = Notification.permission;

//     if (this.permission !== "granted" && this.permission !== "denied") {
//       await this.requestPermission();
//     }
//   }

//   async requestPermission() {
//     try {
//       this.permission = await Notification.requestPermission();
//       return this.permission === "granted";
//     } catch (error) {
//       console.error("Error requesting notification permission:", error);
//       return false;
//     }
//   }

//   async sendNotification(title, options = {}) {
//     if (this.permission !== "granted") {
//       const granted = await this.requestPermission();
//       if (!granted) return;
//     }

//     const defaultOptions = {
//       icon: "/icons/icon-192x192.png",
//       badge: "/icons/icon-72x72.png",
//       vibrate: [200, 100, 200],
//       ...options,
//     };

//     try {
//       const notification = new Notification(title, defaultOptions);

//       notification.onclick = (event) => {
//         event.preventDefault();
//         if (options.url) {
//           window.focus();
//           window.location.href = options.url;
//         }
//       };

//       this.notifications.push({
//         id: Date.now(),
//         title,
//         options: defaultOptions,
//         timestamp: new Date().toISOString(),
//       });

//       return notification;
//     } catch (error) {
//       console.error("Error sending notification:", error);
//     }
//   }

//   // Health reminders
//   sendMedicationReminder(medication) {
//     this.sendNotification("💊 Medication Reminder", {
//       body: `Time to take ${medication.name} (${medication.dosage})`,
//       tag: "medication",
//       url: "/health-seeker/medications",
//     });
//   }

//   sendBPReminder() {
//     this.sendNotification("❤️ Blood Pressure Check", {
//       body: "Time to log your blood pressure reading",
//       tag: "bp-check",
//       url: "/health-seeker/bp-log",
//     });
//   }

//   sendGlucoseReminder() {
//     this.sendNotification("🩸 Blood Sugar Check", {
//       body: "Time to check your blood glucose level",
//       tag: "glucose-check",
//       url: "/health-seeker/glucose-log",
//     });
//   }

//   // Emergency alerts
//   sendEmergencyAlert(hospital, ambulance) {
//     this.sendNotification("🚨 Emergency Alert", {
//       body: `Ambulance dispatched from ${hospital}. ETA: ${ambulance.eta}`,
//       tag: "emergency",
//       url: "/health-seeker/emergency",
//       requireInteraction: true,
//     });
//   }

//   // Critical alerts
//   sendCriticalBPAlert(reading) {
//     this.sendNotification("⚠️ Critical BP Alert", {
//       body: `Your blood pressure is ${reading.systolic}/${reading.diastolic}. Seek medical attention.`,
//       tag: "critical-bp",
//       url: "/health-seeker/bp-log",
//       requireInteraction: true,
//     });
//   }

//   sendCriticalGlucoseAlert(reading) {
//     this.sendNotification("⚠️ Critical Glucose Alert", {
//       body: `Your blood glucose is ${reading.value} mg/dL. Take immediate action.`,
//       tag: "critical-glucose",
//       url: "/health-seeker/glucose-log",
//       requireInteraction: true,
//     });
//   }

//   // Appointment reminders
//   sendAppointmentReminder(appointment) {
//     const timeUntil = this.getTimeUntil(appointment.datetime);
//     this.sendNotification("📅 Appointment Reminder", {
//       body: `${appointment.title} at ${appointment.hospital} in ${timeUntil}`,
//       tag: "appointment",
//       url: "/health-seeker/appointments",
//     });
//   }

//   // Screening reminders
//   sendScreeningReminder(type, dueDate) {
//     const reminders = {
//       "pap-smear": {
//         title: "🎗️ Pap Smear Reminder",
//         body: "Your annual Pap smear is due soon",
//       },
//       mammogram: {
//         title: "🎀 Mammogram Reminder",
//         body: "Time to schedule your mammogram",
//       },
//       psa: {
//         title: "👨 PSA Test Reminder",
//         body: "Your prostate screening is due",
//       },
//     };

//     const reminder = reminders[type] || {
//       title: "🔔 Health Screening",
//       body: `Your ${type} screening is due`,
//     };

//     this.sendNotification(reminder.title, {
//       body: reminder.body,
//       tag: `screening-${type}`,
//       url: "/health-seeker/screenings",
//     });
//   }

//   // Resource alerts
//   sendBloodAvailabilityAlert(hospital, bloodType, quantity) {
//     this.sendNotification("🩸 Blood Available", {
//       body: `${hospital} has ${quantity} units of ${bloodType} blood available`,
//       tag: "blood-update",
//       url: "/marketplace",
//     });
//   }

//   sendRareMedicationAlert(medication, hospital) {
//     this.sendNotification("💊 Rare Medication Alert", {
//       body: `${medication} is now available at ${hospital}`,
//       tag: "medication-update",
//       url: "/health-seeker/medication",
//     });
//   }

//   // System notifications
//   sendSyncComplete() {
//     this.sendNotification("✅ Sync Complete", {
//       body: "Your health data has been synced successfully",
//       tag: "sync",
//     });
//   }

//   sendOfflineMode() {
//     this.sendNotification("📴 Offline Mode", {
//       body: "You are offline. Changes will sync when connection returns.",
//       tag: "offline",
//     });
//   }

//   // Utility
//   getTimeUntil(datetime) {
//     const diff = new Date(datetime) - new Date();
//     const hours = Math.floor(diff / (1000 * 60 * 60));
//     const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

//     if (hours > 24) {
//       const days = Math.floor(hours / 24);
//       return `${days} day${days > 1 ? "s" : ""}`;
//     }
//     if (hours > 0) {
//       return `${hours} hour${hours > 1 ? "s" : ""}`;
//     }
//     return `${minutes} minute${minutes > 1 ? "s" : ""}`;
//   }

//   // Get notification history
//   getNotificationHistory(limit = 50) {
//     return this.notifications.slice(-limit);
//   }

//   // Clear notifications
//   clearNotifications() {
//     this.notifications = [];
//   }
// }

// export const notificationService = new NotificationService();
class NotificationService {
  constructor() {
    this.permission = null;
    this.notifications = [];
    this.init();
  }

  async init() {
    if (!("Notification" in window)) {
      console.log("This browser does not support notifications");
      return;
    }

    this.permission = Notification.permission;

    if (this.permission !== "granted" && this.permission !== "denied") {
      await this.requestPermission();
    }
  }

  async requestPermission() {
    try {
      this.permission = await Notification.requestPermission();
      return this.permission === "granted";
    } catch (error) {
      console.error("Error requesting notification permission:", error);
      return false;
    }
  }

  async sendNotification(title, options = {}) {
    if (this.permission !== "granted") {
      const granted = await this.requestPermission();
      if (!granted) return;
    }

    const defaultOptions = {
      icon: "/icons/icon-192x192.png",
      badge: "/icons/icon-72x72.png",
      vibrate: [200, 100, 200],
      ...options,
    };

    try {
      const notification = new Notification(title, defaultOptions);

      notification.onclick = (event) => {
        event.preventDefault();
        if (options.url) {
          window.focus();
          window.location.href = options.url;
        }
      };

      this.notifications.push({
        id: Date.now(),
        title,
        options: defaultOptions,
        timestamp: new Date().toISOString(),
      });

      return notification;
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  }

  // Health reminders
  sendMedicationReminder(medication) {
    this.sendNotification("💊 Medication Reminder", {
      body: `Time to take ${medication.name} (${medication.dosage})`,
      tag: "medication",
      url: "/health-seeker/medications",
    });
  }

  sendBPReminder() {
    this.sendNotification("❤️ Blood Pressure Check", {
      body: "Time to log your blood pressure reading",
      tag: "bp-check",
      url: "/health-seeker/bp-log",
    });
  }

  sendGlucoseReminder() {
    this.sendNotification("🩸 Blood Sugar Check", {
      body: "Time to check your blood glucose level",
      tag: "glucose-check",
      url: "/health-seeker/glucose-log",
    });
  }

  // Emergency alerts
  sendEmergencyAlert(hospital, ambulance) {
    this.sendNotification("🚨 Emergency Alert", {
      body: `Ambulance dispatched from ${hospital}. ETA: ${ambulance.eta}`,
      tag: "emergency",
      url: "/health-seeker/emergency",
      requireInteraction: true,
    });
  }

  // Critical alerts
  sendCriticalBPAlert(reading) {
    this.sendNotification("⚠️ Critical BP Alert", {
      body: `Your blood pressure is ${reading.systolic}/${reading.diastolic}. Seek medical attention.`,
      tag: "critical-bp",
      url: "/health-seeker/bp-log",
      requireInteraction: true,
    });
  }

  sendCriticalGlucoseAlert(reading) {
    this.sendNotification("⚠️ Critical Glucose Alert", {
      body: `Your blood glucose is ${reading.value} mg/dL. Take immediate action.`,
      tag: "critical-glucose",
      url: "/health-seeker/glucose-log",
      requireInteraction: true,
    });
  }

  // Appointment reminders
  sendAppointmentReminder(appointment) {
    const timeUntil = this.getTimeUntil(appointment.datetime);
    this.sendNotification("📅 Appointment Reminder", {
      body: `${appointment.title} at ${appointment.hospital} in ${timeUntil}`,
      tag: "appointment",
      url: "/health-seeker/appointments",
    });
  }

  // Screening reminders
  sendScreeningReminder(type, dueDate) {
    const reminders = {
      "pap-smear": {
        title: "🎗️ Pap Smear Reminder",
        body: "Your annual Pap smear is due soon",
      },
      mammogram: {
        title: "🎀 Mammogram Reminder",
        body: "Time to schedule your mammogram",
      },
      psa: {
        title: "👨 PSA Test Reminder",
        body: "Your prostate screening is due",
      },
    };

    const reminder = reminders[type] || {
      title: "🔔 Health Screening",
      body: `Your ${type} screening is due`,
    };

    this.sendNotification(reminder.title, {
      body: reminder.body,
      tag: `screening-${type}`,
      url: "/health-seeker/screenings",
    });
  }

  // Resource alerts
  sendBloodAvailabilityAlert(hospital, bloodType, quantity) {
    this.sendNotification("🩸 Blood Available", {
      body: `${hospital} has ${quantity} units of ${bloodType} blood available`,
      tag: "blood-update",
      url: "/marketplace",
    });
  }

  sendRareMedicationAlert(medication, hospital) {
    this.sendNotification("💊 Rare Medication Alert", {
      body: `${medication} is now available at ${hospital}`,
      tag: "medication-update",
      url: "/health-seeker/medication",
    });
  }

  // System notifications
  sendSyncComplete() {
    this.sendNotification("✅ Sync Complete", {
      body: "Your health data has been synced successfully",
      tag: "sync",
    });
  }

  sendOfflineMode() {
    this.sendNotification("📴 Offline Mode", {
      body: "You are offline. Changes will sync when connection returns.",
      tag: "offline",
    });
  }

  // Utility
  getTimeUntil(datetime) {
    const diff = new Date(datetime) - new Date();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? "s" : ""}`;
    }
    if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    return `${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  // Get notification history
  getNotificationHistory(limit = 50) {
    return this.notifications.slice(-limit);
  }

  // Clear notifications
  clearNotifications() {
    this.notifications = [];
  }
}

export const notificationService = new NotificationService();
