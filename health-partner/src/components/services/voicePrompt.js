// Voice Prompt Service for voice-activated interactions
class VoicePromptService {
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.recognition = null;
    this.isSpeaking = false;
    this.isListening = false;
    this.voices = [];
    this.audioContext = null;
    this.initVoices();
    this.initRecognition();
  }

  initVoices() {
    if (this.synthesis) {
      this.voices = this.synthesis.getVoices();
      if (this.synthesis.onvoiceschanged !== undefined) {
        this.synthesis.onvoiceschanged = () => {
          this.voices = this.synthesis.getVoices();
        };
      }
    }
  }

  initRecognition() {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = "en-US";
    }
  }

  // Speak text
  speak(text, options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.synthesis) {
        reject("Speech synthesis not supported");
        return;
      }

      // Cancel any ongoing speech
      if (this.isSpeaking) {
        this.synthesis.cancel();
      }

      const utterance = new SpeechSynthesisUtterance(text);

      // Set voice
      if (options.voice) {
        const selectedVoice = this.voices.find((v) => v.name === options.voice);
        if (selectedVoice) utterance.voice = selectedVoice;
      } else {
        // Prefer Nigerian English voice if available
        const nigerianVoice = this.voices.find(
          (v) => v.lang === "en-NG" || v.name.includes("Nigeria"),
        );
        if (nigerianVoice) utterance.voice = nigerianVoice;
      }

      // Set properties
      utterance.rate = options.rate || 1;
      utterance.pitch = options.pitch || 1;
      utterance.volume = options.volume || 1;
      utterance.lang = options.lang || "en-US";

      utterance.onstart = () => {
        this.isSpeaking = true;
      };

      utterance.onend = () => {
        this.isSpeaking = false;
        resolve();
      };

      utterance.onerror = (error) => {
        this.isSpeaking = false;
        reject(error);
      };

      this.synthesis.speak(utterance);
    });
  }

  // Listen for voice input
  listen(options = {}) {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject("Speech recognition not supported");
        return;
      }

      if (this.isListening) {
        this.recognition.stop();
      }

      this.recognition.lang = options.lang || "en-US";
      this.recognition.maxAlternatives = options.maxAlternatives || 1;

      this.recognition.onstart = () => {
        this.isListening = true;
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const confidence = event.results[0][0].confidence;
        this.isListening = false;
        resolve({ transcript, confidence });
      };

      this.recognition.onerror = (event) => {
        this.isListening = false;
        reject(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();

      // Auto-stop after timeout
      if (options.timeout) {
        setTimeout(() => {
          if (this.isListening) {
            this.recognition.stop();
            reject("Listening timeout");
          }
        }, options.timeout);
      }
    });
  }

  // Stop speaking
  stop() {
    if (this.synthesis && this.isSpeaking) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }

  // Stop listening
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Get available voices
  getVoices() {
    return this.voices;
  }

  // Check if speaking
  isCurrentlySpeaking() {
    return this.isSpeaking;
  }

  // Check if listening
  isCurrentlyListening() {
    return this.isListening;
  }

  // Play beep sound
  playBeep(type = "start") {
    if (!this.audioContext) {
      this.audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
    }

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    if (type === "start") {
      oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.1,
      );
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.1);
    } else if (type === "end") {
      oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.1,
      );
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.1);
    } else if (type === "error") {
      oscillator.frequency.setValueAtTime(300, this.audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        this.audioContext.currentTime + 0.3,
      );
      oscillator.start();
      oscillator.stop(this.audioContext.currentTime + 0.3);
    }
  }

  // Health prompts
  async promptBPReading() {
    await this.speak("Please say your systolic pressure, the top number");
    this.playBeep("start");

    try {
      const systolic = await this.listen({ timeout: 5000 });
      await this.speak(
        `You said ${systolic.transcript}. Now say your diastolic pressure, the bottom number`,
      );
      this.playBeep("start");

      const diastolic = await this.listen({ timeout: 5000 });
      await this.speak(`You said ${diastolic.transcript}`);

      return {
        systolic: parseInt(systolic.transcript),
        diastolic: parseInt(diastolic.transcript),
      };
    } catch (error) {
      this.playBeep("error");
      await this.speak("I didn't catch that. Please try again.");
      throw error;
    }
  }

  async promptGlucoseReading() {
    await this.speak("Please say your blood sugar level");
    this.playBeep("start");

    try {
      const result = await this.listen({ timeout: 5000 });
      await this.speak(`You said ${result.transcript}`);
      return parseInt(result.transcript);
    } catch (error) {
      this.playBeep("error");
      await this.speak("I didn't catch that. Please try again.");
      throw error;
    }
  }

  async promptMedicationReminder(medication) {
    await this.speak(
      `Time to take your ${medication.name}. Have you taken it? Say yes or no.`,
    );
    this.playBeep("start");

    try {
      const result = await this.listen({ timeout: 5000 });
      const answer = result.transcript.toLowerCase();

      if (
        answer.includes("yes") ||
        answer.includes("yeah") ||
        answer.includes("taken")
      ) {
        await this.speak("Great! I've recorded that.");
        return true;
      } else if (answer.includes("no") || answer.includes("not yet")) {
        await this.speak("Please take it now. Your health is important.");
        return false;
      } else {
        await this.speak("I didn't understand. Please take your medication.");
        return false;
      }
    } catch (error) {
      this.playBeep("error");
      await this.speak(
        "I couldn't hear you. Please remember to take your medication.",
      );
      throw error;
    }
  }

  async promptEmergency() {
    await this.speak(
      "Emergency detected. Say help if you need immediate assistance.",
    );
    this.playBeep("start");

    try {
      const result = await this.listen({ timeout: 10000 });
      if (result.transcript.toLowerCase().includes("help")) {
        await this.speak(
          "Dispatching emergency services to your location. Stay calm.",
        );
        return true;
      }
    } catch (error) {
      this.playBeep("error");
    }
    return false;
  }

  // Daily health summary
  async speakHealthSummary(summary) {
    let text = `Good ${this.getTimeOfDay()}. Here's your health summary. `;

    if (summary.bp) {
      text += `Your last blood pressure was ${summary.bp.systolic} over ${summary.bp.diastolic}. `;
    }

    if (summary.glucose) {
      text += `Your blood sugar was ${summary.glucose}. `;
    }

    if (summary.medications && summary.medications.length > 0) {
      const pending = summary.medications.filter((m) => !m.taken);
      if (pending.length > 0) {
        text += `You have ${pending.length} medications pending. `;
      }
    }

    if (summary.appointments && summary.appointments.length > 0) {
      text += `You have ${summary.appointments.length} appointment today. `;
    }

    text += "Stay healthy and have a great day!";

    await this.speak(text);
  }

  // Emergency instructions
  async speakEmergencyInstructions(type) {
    let instructions = "";

    switch (type) {
      case "highBP":
        instructions =
          "Your blood pressure is very high. Sit down, relax, and take slow deep breaths. If you have chest pain or difficulty breathing, call emergency services immediately.";
        break;
      case "lowBP":
        instructions =
          "Your blood pressure is low. Lie down and elevate your legs. Drink some water. If you feel dizzy or faint, seek help.";
        break;
      case "highSugar":
        instructions =
          "Your blood sugar is very high. Check for ketones if you have a meter. Drink water and take insulin if prescribed. Contact your doctor.";
        break;
      case "lowSugar":
        instructions =
          "Your blood sugar is low. Eat or drink 15 grams of fast-acting carbs immediately. Recheck in 15 minutes.";
        break;
      default:
        instructions =
          "Seek immediate medical attention. Call emergency services.";
    }

    await this.speak(instructions);
  }

  getTimeOfDay() {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 17) return "afternoon";
    return "evening";
  }
}

export const voicePrompt = new VoicePromptService();
