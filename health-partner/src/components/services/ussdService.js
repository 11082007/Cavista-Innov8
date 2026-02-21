// USSD Service for users without smartphones
class USSDService {
  constructor() {
    this.ussdCode = "*347#"; // Example USSD short code
    this.activeSessions = new Map();
    this.menuTree = {
      main: {
        prompt: `CON Welcome to VYTAL Health
1. Emergency Services
2. Check Health
3. Find Hospital
4. Medication Info
5. Health Tips
6. Talk to AI
0. Exit`,
        handlers: {
          1: "emergency",
          2: "healthCheck",
          3: "findHospital",
          4: "medication",
          5: "healthTips",
          6: "aiChat",
          0: "exit",
        },
      },
      emergency: {
        prompt: `CON Emergency Services:
1. Request Ambulance
2. Nearest Hospital
3. Emergency Contacts
4. First Aid Guide
0. Back`,
        handlers: {
          1: "requestAmbulance",
          2: "nearestHospital",
          3: "emergencyContacts",
          4: "firstAid",
          0: "main",
        },
      },
      healthCheck: {
        prompt: `CON Health Check:
1. Blood Pressure
2. Blood Sugar
3. BMI Calculator
4. Symptom Check
0. Back`,
        handlers: {
          1: "bpCheck",
          2: "sugarCheck",
          3: "bmiCalc",
          4: "symptomCheck",
          0: "main",
        },
      },
      findHospital: {
        prompt: `CON Find Hospital:
1. By LGA
2. Nearest to me
3. With Blood Bank
4. With ICU
5. With Pharmacy
0. Back`,
        handlers: {
          1: "hospitalByLGA",
          2: "nearestHospital",
          3: "hospitalWithBlood",
          4: "hospitalWithICU",
          5: "hospitalWithPharmacy",
          0: "main",
        },
      },
      medication: {
        prompt: `CON Medication Info:
1. Check Availability
2. Price Check
3. Alternatives
4. Side Effects
5. Dosage Info
0. Back`,
        handlers: {
          1: "medAvailability",
          2: "medPrice",
          3: "medAlternatives",
          4: "medSideEffects",
          5: "medDosage",
          0: "main",
        },
      },
      healthTips: {
        prompt: `CON Health Tips:
1. Hypertension
2. Diabetes
3. Sickle Cell
4. General Wellness
5. Diet & Exercise
0. Back`,
        handlers: {
          1: "tipHypertension",
          2: "tipDiabetes",
          3: "tipSickleCell",
          4: "tipGeneral",
          5: "tipDiet",
          0: "main",
        },
      },
    };
  }

  processUSSDRequest(sessionId, phoneNumber, input) {
    let session = this.activeSessions.get(sessionId) || {
      step: "main",
      data: {},
      phoneNumber,
    };

    let response = "";
    let menu = this.menuTree[session.step];

    if (!menu) {
      session.step = "main";
      menu = this.menuTree.main;
    }

    // Handle input
    if (input !== undefined) {
      const handler = menu.handlers ? menu.handlers[input] : null;
      if (handler) {
        if (handler === "exit") {
          this.activeSessions.delete(sessionId);
          return "END Thank you for using VYTAL. Stay healthy!";
        }
        session.step = handler;
        menu = this.menuTree[handler];
        response = menu ? menu.prompt : this.getHandlerPrompt(handler, session);
      } else {
        response = this.handleCustomInput(input, session);
      }
    } else {
      // First time - show main menu
      response = this.menuTree.main.prompt;
    }

    this.activeSessions.set(sessionId, session);
    return response;
  }

  handleCustomInput(input, session) {
    switch (session.step) {
      case "bpCheck":
        return this.handleBPInput(input, session);
      case "sugarCheck":
        return this.handleSugarInput(input, session);
      case "bmiCalc":
        return this.handleBMIInput(input, session);
      case "requestAmbulance":
        return this.handleAmbulanceRequest(input, session);
      case "nearestHospital":
        return this.handleNearestHospital(input, session);
      case "hospitalByLGA":
        return this.handleHospitalByLGA(input, session);
      case "medAvailability":
        return this.handleMedAvailability(input, session);
      case "symptomCheck":
        return this.handleSymptomCheck(input, session);
      case "aiChat":
        return this.handleAIChat(input, session);
      default:
        session.step = "main";
        return this.menuTree.main.prompt;
    }
  }

  handleBPInput(input, session) {
    if (!session.data.bpStep) {
      session.data.bpStep = "systolic";
      return `CON Enter your systolic pressure (upper number):`;
    }

    if (session.data.bpStep === "systolic") {
      session.data.systolic = input;
      session.data.bpStep = "diastolic";
      return `CON Enter your diastolic pressure (lower number):`;
    }

    if (session.data.bpStep === "diastolic") {
      const systolic = parseInt(session.data.systolic);
      const diastolic = parseInt(input);

      let result = "";
      if (systolic > 180 || diastolic > 120) {
        result = `END 🚨 CRITICAL: Your BP is very high (${systolic}/${diastolic})
Please seek immediate medical attention!
Emergency: 112 or 911`;
      } else if (systolic > 140 || diastolic > 90) {
        result = `END ⚠️ High BP: ${systolic}/${diastolic}
Consult a doctor within 24 hours.
Avoid salt and stress.`;
      } else if (systolic < 90 || diastolic < 60) {
        result = `END ⚠️ Low BP: ${systolic}/${diastolic}
Stay hydrated and eat regularly.
Consult doctor if symptoms persist.`;
      } else {
        result = `END ✅ Normal BP: ${systolic}/${diastolic}
Great job! Keep monitoring regularly.`;
      }

      // Clear session data
      delete session.data.bpStep;
      delete session.data.systolic;

      return result;
    }
  }

  handleSugarInput(input, session) {
    const glucose = parseInt(input);

    if (isNaN(glucose)) {
      return `CON Invalid input. Please enter a number:`;
    }

    let result = "";
    if (glucose < 54) {
      result = `END 🚨 CRITICAL: Blood sugar very low (${glucose} mg/dL)
Eat 15g fast-acting carbs immediately!
Seek medical help if no improvement.`;
    } else if (glucose < 70) {
      result = `END ⚠️ Low blood sugar (${glucose} mg/dL)
Eat a snack and recheck in 15 minutes.`;
    } else if (glucose > 250) {
      result = `END 🚨 CRITICAL: Blood sugar very high (${glucose} mg/dL)
Check for ketones and contact doctor.
Stay hydrated.`;
    } else if (glucose > 180) {
      result = `END ⚠️ High blood sugar (${glucose} mg/dL)
Monitor closely and take medication as prescribed.`;
    } else {
      result = `END ✅ Normal blood sugar (${glucose} mg/dL)
Good control! Keep it up.`;
    }

    return result;
  }

  handleBMIInput(input, session) {
    if (!session.data.bmiStep) {
      session.data.bmiStep = "weight";
      return `CON Enter your weight in kg:`;
    }

    if (session.data.bmiStep === "weight") {
      session.data.weight = parseFloat(input);
      session.data.bmiStep = "height";
      return `CON Enter your height in cm:`;
    }

    if (session.data.bmiStep === "height") {
      const weight = session.data.weight;
      const height = parseFloat(input) / 100; // convert to meters
      const bmi = weight / (height * height);

      let category = "";
      let advice = "";

      if (bmi < 18.5) {
        category = "Underweight";
        advice = "Try to gain weight healthily. Consult a nutritionist.";
      } else if (bmi < 25) {
        category = "Normal weight";
        advice = "Maintain healthy diet and exercise.";
      } else if (bmi < 30) {
        category = "Overweight";
        advice = "Consider diet and exercise plan.";
      } else {
        category = "Obese";
        advice = "Consult a doctor for weight management.";
      }

      return `END Your BMI: ${bmi.toFixed(1)}
Category: ${category}
${advice}`;
    }
  }

  handleAmbulanceRequest(input, session) {
    // Simulate finding nearest ambulance
    const hospitals = [
      { name: "LUTH", distance: "2.3km", eta: "5 mins" },
      { name: "Gbagada General", distance: "3.1km", eta: "7 mins" },
      { name: "Ikeja Medical", distance: "4.5km", eta: "10 mins" },
    ];

    const nearest = hospitals[0];

    return `END 🚑 Ambulance dispatched!
Hospital: ${nearest.name}
ETA: ${nearest.eta}
Distance: ${nearest.distance}
Ambulance: LAG-2345
Track via SMS: *347#1

Stay calm. Help is on the way!`;
  }

  handleNearestHospital(input, session) {
    const hospitals = [
      {
        name: "Lagos University Teaching Hospital",
        distance: "2.3km",
        address: "Idi-Araba",
        phone: "0800-LUTH",
      },
      {
        name: "Gbagada General Hospital",
        distance: "3.1km",
        address: "Gbagada Phase 2",
        phone: "0800-GGH",
      },
      {
        name: "Ikeja Medical Centre",
        distance: "4.5km",
        address: "Ikeja",
        phone: "0800-IMC",
      },
    ];

    let response = "END Nearest Hospitals:\n";
    hospitals.forEach((h, i) => {
      response += `${i + 1}. ${h.name}\n`;
      response += `   📍 ${h.distance}\n`;
      response += `   📞 ${h.phone}\n`;
    });
    response += "\nReply with hospital number for details";

    return response;
  }

  handleHospitalByLGA(input, session) {
    if (!session.data.lga) {
      return `CON Enter your LGA (e.g., Ikeja, Surulere, Kosofe):`;
    }

    // Mock hospitals by LGA
    const hospitalsByLGA = {
      ikeja: [
        { name: "LUTH", distance: "2.3km", available: "24/7" },
        { name: "Ikeja Medical", distance: "1.5km", available: "24/7" },
      ],
      surulere: [
        { name: "Surulere General", distance: "1.8km", available: "24/7" },
      ],
      kosofe: [
        { name: "Gbagada General", distance: "2.1km", available: "24/7" },
      ],
    };

    const lga = input.toLowerCase();
    const hospitals = hospitalsByLGA[lga] || [];

    if (hospitals.length === 0) {
      return `END No hospitals found in ${input}. Try another LGA.`;
    }

    let response = `END Hospitals in ${input}:\n`;
    hospitals.forEach((h, i) => {
      response += `${i + 1}. ${h.name}\n`;
      response += `   📍 ${h.distance}\n`;
      response += `   🕐 ${h.available}\n`;
    });

    return response;
  }

  handleMedAvailability(input, session) {
    if (!session.data.medication) {
      return `CON Enter medication name (e.g., Insulin, Hydroxyurea):`;
    }

    const med = input;
    // Mock availability
    const hospitals = [
      { name: "LUTH", quantity: "45 units", price: "₦2,500" },
      { name: "Gbagada General", quantity: "23 units", price: "₦2,800" },
      { name: "Ikeja Medical", quantity: "12 units", price: "₦2,600" },
    ];

    let response = `END ${med} availability:\n`;
    hospitals.forEach((h, i) => {
      response += `${i + 1}. ${h.name}\n`;
      response += `   📦 ${h.quantity}\n`;
      response += `   💰 ${h.price}\n`;
    });

    return response;
  }

  handleSymptomCheck(input, session) {
    if (!session.data.symptoms) {
      session.data.symptoms = [];
      return `CON Enter your symptoms (one by one):
Enter symptom or 0 when done:`;
    }

    if (input !== "0") {
      session.data.symptoms.push(input);
      return `CON Symptom added. Enter another symptom or 0 when done:`;
    }

    // Simple symptom analysis
    const symptoms = session.data.symptoms;
    let advice = "";

    if (
      symptoms.some((s) =>
        ["fever", "cough", "sore throat"].includes(s.toLowerCase()),
      )
    ) {
      advice = "Possible cold/flu. Rest, hydrate, monitor temperature.";
    } else if (
      symptoms.some((s) =>
        ["chest pain", "shortness of breath"].includes(s.toLowerCase()),
      )
    ) {
      advice = "⚠️ URGENT: Seek immediate medical attention!";
    } else if (
      symptoms.some((s) => ["headache", "dizziness"].includes(s.toLowerCase()))
    ) {
      advice = "Check blood pressure. Rest and stay hydrated.";
    } else {
      advice = "Monitor symptoms. Consult doctor if they persist.";
    }

    delete session.data.symptoms;
    return `END Based on your symptoms:
${advice}

For emergency, call 112 or 911.`;
  }

  handleAIChat(input, session) {
    if (!session.data.chatStep) {
      session.data.chatStep = 1;
      return `CON Ask me any health question:
(e.g., "What helps with headache?")`;
    }

    // Simple AI responses
    const responses = {
      headache:
        "Common causes: stress, dehydration, eye strain. Rest, hydrate, and consider pain relief if severe.",
      fever:
        "Rest, hydrate, monitor temperature. If above 39°C or persistent, see doctor.",
      "blood pressure":
        "Monitor regularly. Maintain healthy diet, exercise, reduce salt and stress.",
      diabetes:
        "Monitor blood sugar, take medication as prescribed, follow diet plan.",
      default: "Consult your healthcare provider for personalized advice.",
    };

    const question = input.toLowerCase();
    let answer = responses.default;

    for (const [key, value] of Object.entries(responses)) {
      if (question.includes(key)) {
        answer = value;
        break;
      }
    }

    return `END 🤖 AI Response:
${answer}

Ask another question by starting a new session.`;
  }

  getHandlerPrompt(handler, session) {
    switch (handler) {
      case "requestAmbulance":
        return `CON Confirm ambulance request:
1. Yes, dispatch ambulance
2. No, go back
0. Main menu`;
      case "emergencyContacts":
        return `END Emergency Contacts:
Police: 112
Ambulance: 911
Fire: 112
NEMA: 0800-123-4567

Save these numbers!`;
      case "firstAid":
        return `END First Aid Tips:
1. Bleeding: Apply pressure
2. Burns: Cool with water
3. Choking: Heimlich maneuver
4. CPR: 30 compressions, 2 breaths

For emergencies, call 112`;
      case "tipHypertension":
        return `END Hypertension Tips:
1. Reduce salt intake
2. Exercise regularly
3. Limit alcohol
4. Stop smoking
5. Manage stress
6. Monitor BP daily`;
      case "tipDiabetes":
        return `END Diabetes Tips:
1. Monitor blood sugar
2. Take medication on time
3. Healthy eating
4. Regular exercise
5. Foot care
6. Regular check-ups`;
      default:
        return this.menuTree.main.prompt;
    }
  }
}

export const ussdService = new USSDService();
