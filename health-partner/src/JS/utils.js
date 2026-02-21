// Utility functions for VYTAL Health Platform

/**
 * Get user conditions from localStorage
 * @returns {Array} Array of user conditions
 */
export const getUserConditions = () => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      return user.conditions || [];
    }
    return [];
  } catch (error) {
    console.error("Error getting user conditions:", error);
    return [];
  }
};

/**
 * Get user data from localStorage
 * @returns {Object|null} User data object or null
 */
export const getUserData = () => {
  try {
    const userData = localStorage.getItem("userData");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error getting user data:", error);
    return null;
  }
};

/**
 * Save user data to localStorage
 * @param {Object} userData - User data to save
 */
export const saveUserData = (userData) => {
  try {
    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};

/**
 * Get user role from localStorage
 * @returns {string} User role
 */
export const getUserRole = () => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      return user.role || "viewer";
    }
    return "viewer";
  } catch (error) {
    console.error("Error getting user role:", error);
    return "viewer";
  }
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem("userData");
};

/**
 * Get user's primary condition
 * @returns {string|null} Primary condition or null
 */
export const getPrimaryCondition = () => {
  try {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const user = JSON.parse(userData);
      return (
        user.primaryCondition || (user.conditions && user.conditions[0]) || null
      );
    }
    return null;
  } catch (error) {
    console.error("Error getting primary condition:", error);
    return null;
  }
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Format time to readable string
 * @param {string|Date} time - Time to format
 * @returns {string} Formatted time
 */
export const formatTime = (time) => {
  const d = new Date(time);
  return d.toLocaleTimeString("en-NG", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Calculate time ago from timestamp
 * @param {string|number} timestamp - Timestamp
 * @returns {string} Time ago string
 */
export const timeAgo = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return "just now";
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }

  return formatDate(past);
};

/**
 * Calculate distance between two coordinates
 * @param {Object} coord1 - First coordinate {lat, lng}
 * @param {Object} coord2 - Second coordinate {lat, lng}
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (coord1, coord2) => {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const toRad = (value) => {
  return (value * Math.PI) / 180;
};

/**
 * Get nearest hospitals based on user location
 * @param {Array} hospitals - List of hospitals
 * @param {Object} userLocation - User location {lat, lng}
 * @param {number} limit - Number of hospitals to return
 * @returns {Array} Sorted hospitals by distance
 */
export const getNearestHospitals = (hospitals, userLocation, limit = 5) => {
  if (!userLocation || !hospitals.length) return hospitals;

  const withDistance = hospitals.map((hospital) => ({
    ...hospital,
    distance: calculateDistance(
      userLocation,
      hospital.coordinates || { lat: 6.5244, lng: 3.3792 }, // Default to Lagos
    ),
  }));

  return withDistance.sort((a, b) => a.distance - b.distance).slice(0, limit);
};

/**
 * Request ambulance service
 * @param {Object} location - User location
 * @param {string} emergencyType - Type of emergency
 * @returns {Promise} Ambulance request response
 */
export const requestAmbulance = async (location, emergencyType) => {
  // In production, this would call your API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: "Ambulance dispatched",
        eta: "8 minutes",
        ambulanceId: "AMB-" + Math.floor(Math.random() * 10000),
      });
    }, 2000);
  });
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate phone number (Nigerian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
  const re = /^(\+234|0)[7-9][0-1]\d{8}$/;
  return re.test(phone.replace(/\s/g, ""));
};

/**
 * Format phone number to Nigerian format
 * @param {string} phone - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("234")) {
    return (
      "+" +
      cleaned.slice(0, 3) +
      " " +
      cleaned.slice(3, 6) +
      " " +
      cleaned.slice(6)
    );
  }
  if (cleaned.startsWith("0")) {
    return (
      "+234 " +
      cleaned.slice(1, 4) +
      " " +
      cleaned.slice(4, 7) +
      " " +
      cleaned.slice(7)
    );
  }
  return phone;
};

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Generate random ID
 * @returns {string} Random ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object} Grouped object
 */
export const groupBy = (array, key) => {
  return array.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
};

/**
 * Calculate average of array
 * @param {Array} numbers - Array of numbers
 * @returns {number} Average value
 */
export const average = (numbers) => {
  if (!numbers.length) return 0;
  const sum = numbers.reduce((acc, val) => acc + val, 0);
  return sum / numbers.length;
};

/**
 * Get BP status based on reading
 * @param {number} systolic - Systolic pressure
 * @param {number} diastolic - Diastolic pressure
 * @returns {Object} BP status
 */
export const getBPStatus = (systolic, diastolic) => {
  if (systolic > 180 || diastolic > 120) {
    return {
      category: "Hypertensive Crisis",
      color: "red",
      message: "DANGER! Seek immediate medical attention!",
      action: "emergency",
    };
  }
  if (systolic > 140 || diastolic > 90) {
    return {
      category: "High BP Stage 2",
      color: "orange",
      message: "High - Consult your doctor within 24 hours",
      action: "warning",
    };
  }
  if (systolic > 130 || diastolic > 80) {
    return {
      category: "High BP Stage 1",
      color: "yellow",
      message: "Elevated - Monitor closely",
      action: "caution",
    };
  }
  if (systolic < 90 || diastolic < 60) {
    return {
      category: "Low BP",
      color: "blue",
      message: "Low - Stay hydrated, monitor symptoms",
      action: "caution",
    };
  }
  return {
    category: "Normal",
    color: "green",
    message: "Normal - Good job!",
    action: "good",
  };
};

/**
 * Get glucose status based on reading
 * @param {number} glucose - Glucose reading
 * @param {string} timeOfDay - Time of day (fasting, beforeMeal, afterMeal, bedtime)
 * @returns {Object} Glucose status
 */
export const getGlucoseStatus = (glucose, timeOfDay = "fasting") => {
  const ranges = {
    fasting: { min: 70, max: 100, target: "70-100" },
    beforeMeal: { min: 70, max: 110, target: "70-110" },
    afterMeal: { min: 100, max: 140, target: "<140" },
    bedtime: { min: 100, max: 140, target: "100-140" },
  };

  const range = ranges[timeOfDay] || ranges.fasting;

  if (glucose < 54) {
    return {
      category: "Severe Hypoglycemia",
      color: "red",
      message: "CRITICAL! Eat 15g carbs immediately!",
      action: "emergency",
    };
  }
  if (glucose < range.min) {
    return {
      category: "Hypoglycemia",
      color: "orange",
      message: `Low - Target: ${range.target}`,
      action: "warning",
    };
  }
  if (glucose > 250) {
    return {
      category: "Severe Hyperglycemia",
      color: "red",
      message: "CRITICAL! Check ketones, contact doctor!",
      action: "emergency",
    };
  }
  if (glucose > range.max) {
    return {
      category: "Hyperglycemia",
      color: "yellow",
      message: `High - Target: ${range.target}`,
      action: "caution",
    };
  }
  return {
    category: "Normal",
    color: "green",
    message: `Normal - Target: ${range.target}`,
    action: "good",
  };
};
