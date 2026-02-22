// WhatsApp Bot Service for automated health conversations
class WhatsAppBotService {
  constructor() {
    this.webhookUrl = "https://api.vytal.ng/whatsapp/webhook";
    this.verifyToken = "vytal-health-bot-2024";
    this.activeSessions = new Map();
    this.messageQueue = [];
    this.processing = false;
  }

  // Handle incoming WhatsApp messages
  async handleIncomingMessage(message) {
    const { from, body, type } = message;

    // Get or create session
    let session = this.activeSessions.get(from) || {
      phone: from,
      step: "main",
      data: {},
      lastInteraction: new Date(),
    };

    // Process message based on session step
    let response = "";

    switch (session.step) {
      case "main":
        response = this.getMainMenu();
        session.step = "menu";
        break;

      case "menu":
        response = this.handleMenuSelection(body, session);
        break;

      case "bp_systolic":
        response = this.handleBPSystolic(body, session);
        break;

      case "bp_diastolic":
        response = this.handleBPDiastolic(body, session);
        break;

      case "glucose":
        response = this.handleGlucose(body, session);
        break;

      case "medication_name":
        response = this.handleMedicationName(body, session);
        break;

      case "medication_time":
        response = this.handleMedicationTime(body, session);
        break;

      case "symptom":
        response = this.handleSymptom(body, session);
        break;

      case "appointment_date":
        response = this.handleAppointmentDate(body, session);
        break;

      case "appointment_time":
        response = this.handleAppointmentTime(body, session);
        break;

      case "ai_chat":
        response = this.handleAIChat(body, session);
        break;

      default:
        response = this.getMainMenu();
        session.step = "menu";
    }

    // Update session
    session.lastInteraction = new Date();
    this.activeSessions.set(from, session);

    // Queue response
    await this.queueMessage(from, response);

    return { status: "processed" };
  }

  getMainMenu() {
    return `👋 Welcome to VYTAL Health Bot!

What would you like to do today?

1️⃣ *Emergency Services* - 🚨
2️⃣ *Log Health Data* - 📊
3️⃣ *Medication Reminders* - 💊
4️⃣ *Find Hospitals* - 🏥
5️⃣ *Check Symptoms* - 🔍
6️⃣ *Talk to AI* - 🤖
7️⃣ *Appointments* - 📅
8️⃣ *Health Tips* - 💡

Reply with the number of your choice.`;
  }

  handleMenuSelection(input, session) {
    switch (input) {
      case "1":
        return this.getEmergencyMenu();
      case "2":
        session.step = "health_menu";
        return this.getHealthMenu();
      case "3":
        session.step = "medication_menu";
        return this.getMedicationMenu();
      case "4":
        session.step = "hospital_menu";
        return this.getHospitalMenu();
      case "5":
        session.step = "symptom";
        session.data.symptoms = [];
        return "Please describe your symptoms. You can list multiple symptoms separated by commas.\n\nExample: headache, fever, cough";
      case "6":
        session.step = "ai_chat";
        return "🤖 I'm your AI health assistant. Ask me any health question!\n\nExample: What helps with high blood pressure?";
      case "7":
        session.step = "appointment_menu";
        return this.getAppointmentMenu();
      case "8":
        return this.getHealthTips();
      default:
        return "❌ Invalid choice. Please reply with a number from 1-8.";
    }
  }

  getEmergencyMenu() {
    return `🚨 *Emergency Services*

1️⃣ Request Ambulance
2️⃣ Nearest Hospital
3️⃣ Emergency Contacts
4️⃣ First Aid Guide
0️⃣ Back to Main Menu

Reply with your choice.`;
  }

  getHealthMenu() {
    return `📊 *Log Health Data*

1️⃣ Blood Pressure
2️⃣ Blood Sugar
3️⃣ Weight/BMI
4️⃣ Symptoms
5️⃣ Medications Taken
0️⃣ Back

What would you like to log?`;
  }

  getMedicationMenu() {
    return `💊 *Medication Reminders*

1️⃣ Add Medication
2️⃣ View Today's Meds
3️⃣ Mark as Taken
4️⃣ Refill Reminders
5️⃣ Medication History
0️⃣ Back

Choose an option:`;
  }

  getHospitalMenu() {
    return `🏥 *Find Hospitals*

1️⃣ Nearest to me
2️⃣ By LGA
3️⃣ With Blood Bank
4️⃣ With ICU
5️⃣ 24/7 Emergency
6️⃣ Pharmacy Open Now
0️⃣ Back

How can I help you find a hospital?`;
  }

  getAppointmentMenu() {
    return `📅 *Appointments*

1️⃣ Schedule Appointment
2️⃣ View Upcoming
3️⃣ Reschedule
4️⃣ Cancel
5️⃣ Appointment History
0️⃣ Back

Select an option:`;
  }

  handleBPSystolic(input, session) {
    const systolic = parseInt(input);
    if (isNaN(systolic) || systolic < 50 || systolic > 250) {
      return "❌ Please enter a valid systolic number (50-250).";
    }

    session.data.systolic = systolic;
    session.step = "bp_diastolic";
    return "✅ Got it. Now enter your *diastolic* pressure (lower number):";
  }

  handleBPDiastolic(input, session) {
    const diastolic = parseInt(input);
    if (isNaN(diastolic) || diastolic < 30 || diastolic > 150) {
      return "❌ Please enter a valid diastolic number (30-150).";
    }

    const systolic = session.data.systolic;
    let analysis = this.analyzeBP(systolic, diastolic);

    // Clear session data
    delete session.data.systolic;
    session.step = "menu";

    return `📊 *Blood Pressure Reading*

Systolic: ${systolic}
Diastolic: ${diastolic}

${analysis}

${this.getBPAnalysis(systolic, diastolic)}

Reply *menu* to return to main menu.`;
  }

  handleGlucose(input, session) {
    const glucose = parseInt(input);
    if (isNaN(glucose) || glucose < 20 || glucose > 600) {
      return "❌ Please enter a valid glucose level (20-600 mg/dL).";
    }

    let analysis = this.analyzeGlucose(glucose);
    session.step = "menu";

    return `🩸 *Blood Sugar Reading*

Glucose: ${glucose} mg/dL

${analysis}

Reply *menu* to return to main menu.`;
  }

  handleMedicationName(input, session) {
    session.data.medName = input;
    session.step = "medication_time";
    return "What time do you take this medication? (e.g., 08:00, 20:00)";
  }

  handleMedicationTime(input, session) {
    const time = input;
    session.data.medTime = time;

    // Save medication reminder
    const reminder = {
      name: session.data.medName,
      time: time,
      phone: session.phone,
    };

    // Save to database (in production)

    delete session.data.medName;
    delete session.data.medTime;
    session.step = "menu";

    return `✅ Reminder set for *${session.data.medName}* at ${time}.

You'll receive daily reminders at this time.

Reply *menu* for main menu.`;
  }

  handleSymptom(input, session) {
    const symptoms = input.split(",").map((s) => s.trim());

    // Simple analysis
    let analysis = this.analyzeSymptoms(symptoms);

    session.step = "menu";

    return `🔍 *Symptom Analysis*

Symptoms: ${symptoms.join(", ")}

${analysis}

⚠️ *Note*: This is not a medical diagnosis. Please consult a healthcare provider.

Reply *menu* for main menu.`;
  }

  handleAppointmentDate(input, session) {
    session.data.apptDate = input;
    session.step = "appointment_time";
    return "What time would you prefer? (e.g., 10:00, 14:30)";
  }

  handleAppointmentTime(input, session) {
    const time = input;
    const date = session.data.apptDate;

    // Schedule appointment (in production)

    delete session.data.apptDate;
    session.step = "menu";

    return `✅ *Appointment Scheduled*

Date: ${date}
Time: ${time}

You'll receive a reminder 24 hours before.

Reply *menu* for main menu.`;
  }

  handleAIChat(input, session) {
    // Simple AI responses
    const responses = {
      headache:
        "🤖 Common causes: stress, dehydration, eye strain. Rest, hydrate, and consider pain relief if severe.",
      fever:
        "🤖 Rest, hydrate, monitor temperature. If above 39°C or persistent, see doctor.",
      "blood pressure":
        "🤖 Monitor regularly. Maintain healthy diet, exercise, reduce salt and stress.",
      diabetes:
        "🤖 Monitor blood sugar, take medication as prescribed, follow diet plan.",
      malaria:
        "🤖 Common symptoms: fever, chills, headache. See doctor for proper diagnosis and treatment.",
      covid:
        "🤖 Watch for: fever, cough, loss of taste/smell. Test if symptoms appear.",
    };

    let answer =
      "🤖 I understand you're asking about " +
      input +
      ". For accurate medical advice, please consult a healthcare provider.";

    for (const [key, value] of Object.entries(responses)) {
      if (input.toLowerCase().includes(key)) {
        answer = value;
        break;
      }
    }

    return answer + "\n\nAsk another question or reply *menu* for main menu.";
  }

  getHealthTips() {
    return `💡 *Daily Health Tips*

1️⃣ *Hypertension*: Reduce salt, exercise 30 mins daily
2️⃣ *Diabetes*: Monitor blood sugar, eat balanced meals
3️⃣ *Heart Health*: Walk 10,000 steps daily
4️⃣ *Mental Health*: Take breaks, meditate 10 mins
5️⃣ *Sleep*: 7-8 hours nightly

Reply *menu* for more options.`;
  }

  analyzeBP(systolic, diastolic) {
    if (systolic > 180 || diastolic > 120) {
      return "🚨 *CRITICAL* - Seek immediate medical attention!";
    } else if (systolic > 140 || diastolic > 90) {
      return "⚠️ *High* - Consult your doctor within 24 hours";
    } else if (systolic > 130 || diastolic > 80) {
      return "📈 *Elevated* - Monitor closely";
    } else if (systolic < 90 || diastolic < 60) {
      return "📉 *Low* - Stay hydrated, monitor symptoms";
    } else {
      return "✅ *Normal* - Great job!";
    }
  }

  analyzeGlucose(glucose) {
    if (glucose < 54) {
      return "🚨 *CRITICAL LOW* - Eat 15g carbs immediately!";
    } else if (glucose < 70) {
      return "⚠️ *Low* - Have a snack and recheck in 15 mins";
    } else if (glucose > 250) {
      return "🚨 *CRITICAL HIGH* - Check ketones, contact doctor";
    } else if (glucose > 180) {
      return "⚠️ *High* - Monitor closely";
    } else {
      return "✅ *Normal* - Good control!";
    }
  }

  analyzeSymptoms(symptoms) {
    const criticalSymptoms = [
      "chest pain",
      "difficulty breathing",
      "unconscious",
      "severe bleeding",
    ];
    const hasCritical = symptoms.some((s) =>
      criticalSymptoms.includes(s.toLowerCase()),
    );

    if (hasCritical) {
      return "🚨 *URGENT* - Seek immediate medical attention!\n\nCall emergency services now.";
    }

    if (
      symptoms.some((s) =>
        ["fever", "cough", "sore throat"].includes(s.toLowerCase()),
      )
    ) {
      return "🤒 Possible respiratory infection. Rest, hydrate, monitor temperature.";
    }

    if (
      symptoms.some((s) => ["headache", "dizziness"].includes(s.toLowerCase()))
    ) {
      return "🤕 Check blood pressure. Rest and stay hydrated.";
    }

    return "Monitor symptoms. Consult doctor if they persist or worsen.";
  }

  getBPAnalysis(systolic, diastolic) {
    let advice = [];

    if (systolic > 140) {
      advice.push("• Reduce salt intake");
      advice.push("• Exercise regularly");
      advice.push("• Limit alcohol");
    }

    if (diastolic > 90) {
      advice.push("• Manage stress");
      advice.push("• Maintain healthy weight");
      advice.push("• Take medication as prescribed");
    }

    if (advice.length > 0) {
      return "*Recommendations:*\n" + advice.join("\n");
    }

    return "Keep up the healthy habits!";
  }

  // Queue message for sending
  async queueMessage(to, text) {
    this.messageQueue.push({ to, text });

    if (!this.processing) {
      this.processQueue();
    }
  }

  // Process message queue
  async processQueue() {
    if (this.messageQueue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const message = this.messageQueue.shift();

    try {
      // In production, send to WhatsApp API
      console.log(`Sending to ${message.to}: ${message.text}`);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.error("Failed to send message:", error);
      // Requeue on failure
      this.messageQueue.unshift(message);
    }

    // Process next message
    setTimeout(() => this.processQueue(), 500);
  }

  // Send proactive reminders
  async sendMedicationReminder(phone, medication) {
    const message = `💊 *Medication Reminder*

Time to take *${medication.name}* (${medication.dosage})

Reply:
✅ *1* - Taken
❌ *2* - Snooze (30 mins)
❌ *3* - Skip

Stay healthy! 💚`;

    await this.queueMessage(phone, message);
  }

  async sendAppointmentReminder(phone, appointment) {
    const message = `📅 *Appointment Reminder*

You have an appointment tomorrow:
🏥 ${appointment.hospital}
👨‍⚕️ Dr. ${appointment.doctor}
🕐 ${appointment.time}

Reply *1* to confirm
Reply *2* to reschedule`;

    await this.queueMessage(phone, message);
  }

  async sendHealthTip(phone, condition) {
    const tips = {
      hypertension:
        "💚 *Tip for Hypertension*\n\nTry the DASH diet: fruits, vegetables, whole grains, low-fat dairy. Reduce sodium to 1500mg/day.",
      diabetes:
        "💙 *Tip for Diabetes*\n\nMonitor blood sugar before meals. Aim for 80-130 mg/dL. Stay hydrated with water.",
      sicklecell:
        "❤️ *Tip for Sickle Cell*\n\nStay hydrated! Drink 8-10 glasses of water daily. Avoid extreme temperatures.",
    };

    const message =
      tips[condition] ||
      "💚 *Daily Health Tip*\n\nTake a 30-minute walk today. Stay active, stay healthy!";
    await this.queueMessage(phone, message);
  }

  async sendEmergencyAlert(phone, type) {
    const message = `🚨 *EMERGENCY ALERT*

${type} detected. Do you need help?

Reply *HELP* immediately for assistance.
Reply *OK* if you're fine.`;

    await this.queueMessage(phone, message);
  }

  // Clean up stale sessions
  cleanupSessions() {
    const now = new Date();
    for (const [phone, session] of this.activeSessions) {
      const hoursSinceInteraction =
        (now - session.lastInteraction) / (1000 * 60 * 60);
      if (hoursSinceInteraction > 24) {
        this.activeSessions.delete(phone);
      }
    }
  }
}

export const whatsappBot = new WhatsAppBotService();
