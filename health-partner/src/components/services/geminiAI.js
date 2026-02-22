// // Gemini AI integration for health analysis
// class GeminiAIService {
//   constructor() {
//     this.apiKey = import.meta.env.VITE_GEMINI_API_KEY;
//     this.apiUrl =
//       "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
//   }

//   async analyzeSymptoms(symptoms, userData) {
//     const prompt = `
//       As a medical AI assistant, analyze these symptoms:
//       Symptoms: ${symptoms.join(", ")}
//       Patient Age: ${userData.age}
//       Patient Gender: ${userData.gender}
//       Duration: ${userData.duration}
//       Severity: ${userData.severity}
//       Existing Conditions: ${userData.conditions?.join(", ") || "None"}

//       Provide:
//       1. Possible conditions with probability percentages
//       2. Urgency level (low/medium/high/emergency)
//       3. Recommendations for next steps
//       4. When to seek medical attention

//       Format as JSON response.
//     `;

//     return this.callGemini(prompt);
//   }

//   async analyzeGeneticRisk(familyTree) {
//     const prompt = `
//       As a genetic counselor AI, analyze this family tree:
//       ${JSON.stringify(familyTree, null, 2)}

//       For each genetic condition present:
//       1. Identify inheritance pattern (autosomal dominant, autosomal recessive, X-linked)
//       2. Calculate probability for offspring
//       3. Recommend genetic testing if appropriate
//       4. Provide carrier screening recommendations

//       Format as JSON response.
//     `;

//     return this.callGemini(prompt);
//   }

//   async predictHealthRisks(userData, readings) {
//     const prompt = `
//       As a preventive health AI, analyze these health readings:
//       User Profile: ${JSON.stringify(userData)}
//       Recent Readings: ${JSON.stringify(readings.slice(0, 30))}

//       Predict:
//       1. 30-day health risk score (0-100)
//       2. Potential complications to watch for
//       3. Lifestyle recommendations
//       4. When to schedule next check-up
//       5. Early warning signs to monitor

//       Format as JSON response.
//     `;

//     return this.callGemini(prompt);
//   }

//   async explainMedicalTerm(term) {
//     const prompt = `
//       Explain this medical term in simple language: "${term}"

//       Include:
//       1. Simple definition
//       2. Common symptoms
//       3. Typical treatments
//       4. When to see a doctor
//       5. Prevention tips

//       Format as JSON response.
//     `;

//     return this.callGemini(prompt);
//   }

//   async generateHealthTips(condition, userData) {
//     const prompt = `
//       Generate personalized health tips for:
//       Condition: ${condition}
//       Patient Age: ${userData.age}
//       Gender: ${userData.gender}
//       Lifestyle: ${userData.lifestyle || "Not specified"}

//       Provide:
//       1. Daily management tips
//       2. Dietary recommendations
//       3. Exercise suggestions
//       4. Warning signs to watch
//       5. Medication reminders

//       Format as JSON response.
//     `;

//     return this.callGemini(prompt);
//   }

//   async analyzeMedicationInteraction(medications) {
//     const prompt = `
//       Analyze potential interactions between these medications:
//       ${medications.map((m) => `- ${m.name} ${m.dosage}`).join("\n")}

//       Check for:
//       1. Known drug interactions
//       2. Side effect combinations
//       3. Contraindications
//       4. Timing recommendations
//       5. Food interactions

//       Format as JSON response.
//     `;

//     return this.callGemini(prompt);
//   }

//   async callGemini(prompt) {
//     try {
//       const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           contents: [
//             {
//               parts: [
//                 {
//                   text: prompt,
//                 },
//               ],
//             },
//           ],
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Gemini API error: ${response.status}`);
//       }

//       const data = await response.json();
//       return this.parseGeminiResponse(data);
//     } catch (error) {
//       console.error("Gemini AI error:", error);
//       return this.getFallbackResponse(prompt);
//     }
//   }

//   parseGeminiResponse(data) {
//     try {
//       const text = data.candidates[0].content.parts[0].text;
//       // Extract JSON from response
//       const jsonMatch = text.match(/\{[\s\S]*\}/);
//       if (jsonMatch) {
//         return JSON.parse(jsonMatch[0]);
//       }
//       return { text };
//     } catch (error) {
//       console.error("Error parsing Gemini response:", error);
//       return { error: "Failed to parse response" };
//     }
//   }

//   getFallbackResponse(prompt) {
//     // Fallback responses when AI is unavailable
//     if (prompt.includes("symptoms")) {
//       return {
//         possibleConditions: [
//           { name: "Common Cold", probability: 60 },
//           { name: "Flu", probability: 30 },
//           { name: "Allergies", probability: 10 },
//         ],
//         urgency: "low",
//         recommendations: [
//           "Rest and stay hydrated",
//           "Monitor symptoms for 24-48 hours",
//           "Consult doctor if symptoms worsen",
//         ],
//       };
//     }

//     if (prompt.includes("genetic")) {
//       return {
//         risks: [
//           {
//             condition: "Sickle Cell Trait",
//             probability: 25,
//             inheritance: "autosomal recessive",
//           },
//         ],
//         recommendations: [
//           "Consider genetic counseling",
//           "Discuss with family doctor",
//           "Review family health history",
//         ],
//       };
//     }

//     return {
//       message: "AI service temporarily unavailable",
//       fallback: true,
//     };
//   }
// }

// export const geminiAI = new GeminiAIService();

// Gemini AI service for genetic analysis and health insights

class GeminiAIService {
  constructor() {
    this.apiKey = import.meta.env.VITE_GEMINI_API_KEY || "demo-key";
    this.apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";
    this.useMock = !import.meta.env.VITE_GEMINI_API_KEY; // Use mock if no API key
  }

  async analyzeGeneticRisk(self, relatives) {
    // If no API key, return mock data
    if (this.useMock) {
      return this.getMockGeneticAnalysis(self, relatives);
    }

    const prompt = `
      As a genetic counselor AI, analyze this family tree for genetic disorders:

      PROBAND (Patient):
      - Conditions: ${self.conditions.join(", ") || "None"}
      
      FAMILY MEMBERS:
      ${relatives.map((r) => `- ${r.role || "Relative"}: ${r.conditions.join(", ") || "No conditions"}`).join("\n")}

      For each genetic condition present:
      1. Identify the inheritance pattern (autosomal dominant, autosomal recessive, X-linked)
      2. Calculate the probability of passing it to offspring
      3. Recommend appropriate genetic tests
      4. Provide carrier screening recommendations
      5. List preventive measures

      Format the response as JSON with the following structure:
      {
        "risks": [
          {
            "condition": "string",
            "probability": number,
            "inheritance": "string",
            "explanation": "string"
          }
        ],
        "recommendations": ["string"],
        "tests": [
          {
            "name": "string",
            "recommendation": "string"
          }
        ],
        "carrierScreening": ["string"],
        "preventiveMeasures": ["string"]
      }
    `;

    try {
      const response = await this.callGemini(prompt);
      return this.parseGeneticResponse(response);
    } catch (error) {
      console.error("Gemini AI error:", error);
      return this.getMockGeneticAnalysis(self, relatives);
    }
  }

  async analyzeSymptoms(symptoms, userData) {
    if (this.useMock) {
      return this.getMockSymptomAnalysis(symptoms, userData);
    }

    const prompt = `
      As a medical AI assistant, analyze these symptoms:
      
      Symptoms: ${symptoms.join(", ")}
      Age: ${userData.age}
      Gender: ${userData.gender}
      Duration: ${userData.duration}
      Severity: ${userData.severity}
      Existing Conditions: ${userData.existingConditions?.join(", ") || "None"}

      Provide:
      1. Possible conditions with probability percentages
      2. Urgency level (low/medium/high/emergency)
      3. Recommended next steps
      4. When to seek medical attention
      5. Home care suggestions

      Format as JSON.
    `;

    try {
      const response = await this.callGemini(prompt);
      return this.parseSymptomResponse(response);
    } catch (error) {
      return this.getMockSymptomAnalysis(symptoms, userData);
    }
  }

  async predictHealthRisks(userData, readings) {
    if (this.useMock) {
      return this.getMockHealthRiskPrediction(userData, readings);
    }

    const prompt = `
      As a preventive health AI, analyze these health readings:
      
      User Profile: Age ${userData.age}, Gender ${userData.gender}, Conditions: ${userData.conditions?.join(", ") || "None"}
      
      Recent Health Data:
      ${JSON.stringify(readings.slice(0, 30))}

      Predict:
      1. 30-day health risk score (0-100)
      2. Potential complications to monitor
      3. Lifestyle recommendations
      4. Next check-up timeline
      5. Early warning signs

      Format as JSON.
    `;

    try {
      const response = await this.callGemini(prompt);
      return this.parseRiskResponse(response);
    } catch (error) {
      return this.getMockHealthRiskPrediction(userData, readings);
    }
  }

  async callGemini(prompt) {
    try {
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 32,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE",
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      return this.parseGeminiResponse(data);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      throw error;
    }
  }

  parseGeminiResponse(data) {
    try {
      const text = data.candidates[0].content.parts[0].text;
      // Extract JSON from response (it might be wrapped in markdown code blocks)
      const jsonMatch =
        text.match(/```json\n([\s\S]*?)\n```/) ||
        text.match(/```\n([\s\S]*?)\n```/) ||
        text.match(/\{[\s\S]*\}/);

      if (jsonMatch) {
        const jsonStr = jsonMatch[1] || jsonMatch[0];
        return JSON.parse(jsonStr);
      }
      return { text };
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      return { error: "Failed to parse response" };
    }
  }

  // Mock data for genetic analysis
  getMockGeneticAnalysis(self, relatives) {
    const conditions = self.conditions || [];
    const hasSickleCell = conditions.includes("sickle-cell");
    const hasDiabetes = conditions.includes("diabetes");
    const hasHypertension = conditions.includes("hypertension");

    const risks = [];

    if (hasSickleCell) {
      risks.push({
        condition: "Sickle Cell Disease",
        probability: 25,
        inheritance: "Autosomal Recessive",
        explanation:
          "If both parents are carriers, each child has a 25% chance of having sickle cell disease, 50% chance of being a carrier, and 25% chance of being unaffected.",
      });
    }

    if (hasDiabetes) {
      risks.push({
        condition: "Type 2 Diabetes",
        probability: 40,
        inheritance: "Multifactorial",
        explanation:
          "Type 2 diabetes has a strong genetic component but also depends on lifestyle factors. Children have 40% chance if one parent has it.",
      });
    }

    if (hasHypertension) {
      risks.push({
        condition: "Hypertension",
        probability: 35,
        inheritance: "Polygenic",
        explanation:
          "Essential hypertension has multiple genetic and environmental factors. Risk increases with family history.",
      });
    }

    return {
      risks: risks.length
        ? risks
        : [
            {
              condition: "No Genetic Conditions Detected",
              probability: 0,
              inheritance: "N/A",
              explanation:
                "Based on the provided family history, no significant genetic risks were identified.",
            },
          ],
      recommendations: [
        "Maintain regular health check-ups",
        "Keep a detailed family health history",
        "Consider lifestyle modifications to reduce disease risk",
        "Discuss any concerns with your healthcare provider",
      ],
      tests: [
        {
          name: "Genetic Counseling",
          recommendation: "Recommended for family planning",
        },
        {
          name: "Carrier Screening",
          recommendation: "Consider before pregnancy",
        },
      ],
      carrierScreening: [
        "Sickle Cell Trait",
        "Cystic Fibrosis",
        "Tay-Sachs Disease",
      ],
      preventiveMeasures: [
        "Regular exercise (30 mins daily)",
        "Healthy balanced diet",
        "Annual health screenings",
        "Stress management techniques",
      ],
    };
  }

  getMockSymptomAnalysis(symptoms, userData) {
    const hasFever = symptoms.some((s) => s.toLowerCase().includes("fever"));
    const hasCough = symptoms.some((s) => s.toLowerCase().includes("cough"));
    const hasHeadache = symptoms.some((s) =>
      s.toLowerCase().includes("headache"),
    );
    const hasChestPain = symptoms.some((s) =>
      s.toLowerCase().includes("chest"),
    );

    let urgency = "low";
    let urgentCare = false;

    if (hasChestPain) {
      urgency = "emergency";
      urgentCare = true;
    } else if (hasFever && hasCough) {
      urgency = "medium";
    }

    return {
      possibleConditions: [
        {
          name:
            hasFever && hasCough
              ? "Upper Respiratory Infection"
              : "Common Cold",
          probability: 65,
          urgency: urgency,
          recommendations: [
            "Rest and stay hydrated",
            "Monitor temperature",
            "Use over-the-counter pain relief if needed",
          ],
        },
        {
          name: hasHeadache ? "Tension Headache" : "Seasonal Allergies",
          probability: 25,
          urgency: "low",
          recommendations: [
            "Rest in a quiet, dark room",
            "Stay hydrated",
            "Consider OTC pain relief",
          ],
        },
        {
          name: "Influenza",
          probability: 10,
          urgency: "medium",
          recommendations: [
            "Rest and isolate",
            "Hydrate well",
            "Consult doctor if symptoms worsen",
          ],
        },
      ],
      urgentCare: urgentCare,
      recommendations: [
        "Monitor symptoms for 24-48 hours",
        "Rest and stay hydrated",
        "Take temperature regularly",
        "Seek medical attention if symptoms worsen",
      ],
      disclaimer:
        "This is an AI-generated analysis and not a medical diagnosis. Please consult a healthcare professional.",
    };
  }

  getMockHealthRiskPrediction(userData, readings) {
    const lastReading = readings[0];
    let riskScore = 50;

    if (lastReading) {
      if (lastReading.type === "bp") {
        if (lastReading.systolic > 140) riskScore += 20;
        if (lastReading.systolic > 180) riskScore += 30;
      }
      if (lastReading.type === "glucose") {
        if (lastReading.value > 180) riskScore += 15;
        if (lastReading.value > 250) riskScore += 25;
      }
    }

    return {
      riskScore: Math.min(riskScore, 100),
      complications: [
        "Monitor blood pressure regularly",
        "Watch for signs of hyperglycemia",
        "Maintain healthy lifestyle habits",
      ],
      recommendations: [
        "Schedule check-up within 3 months",
        "Continue daily monitoring",
        "Maintain medication schedule",
        "Exercise 30 minutes daily",
      ],
      nextCheckup: "3 months",
      warningSigns: [
        "Severe headache",
        "Chest pain",
        "Shortness of breath",
        "Dizziness",
      ],
    };
  }

  parseGeneticResponse(response) {
    // Handle different response formats
    if (response.risks) return response;
    return this.getMockGeneticAnalysis({ conditions: [] }, []);
  }

  parseSymptomResponse(response) {
    if (response.possibleConditions) return response;
    return this.getMockSymptomAnalysis([], {});
  }

  parseRiskResponse(response) {
    if (response.riskScore) return response;
    return this.getMockHealthRiskPrediction({}, []);
  }
}

export const geminiAI = new GeminiAIService();
