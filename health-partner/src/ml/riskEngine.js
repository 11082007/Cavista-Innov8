/**
 * Risk Scoring Engine for VYTAL Health
 * Evaluates patient logs (Glucose, Blood Pressure) and assigns risk scores.
 */

// Glucose thresholds (mg/dL) - Assuming fasting or general target for diabetics
const GLUCOSE_THRESHOLDS = {
  SLIGHTLY_HIGH: 140, // 140-180
  VERY_HIGH: 180, // > 180
};

// Blood Pressure thresholds
const BP_THRESHOLDS = {
  STAGE_1_SYS: 130, // 130-139
  STAGE_1_DIA: 80, // 80-89
  STAGE_2_SYS: 140, // >= 140
  STAGE_2_DIA: 90, // >= 90
};

export const calculateRisk = (glucoseLogs = [], bpLogs = []) => {
  let score = 0;
  let abnormalDays = 0;
  let reasons = [];

  // Sort logs by date descending (newest first)
  const sortedGlucose = [...glucoseLogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const sortedBP = [...bpLogs].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // Get most recent log to score baseline
  const recentGlucose = sortedGlucose[0]?.value;
  const recentBP = sortedBP[0]; // { systolic, diastolic }

  // 1. Glucose Scoring
  if (recentGlucose !== undefined) {
    if (recentGlucose >= GLUCOSE_THRESHOLDS.VERY_HIGH) {
      score += 5;
      reasons.push(
        `Recent glucose (${recentGlucose} mg/dL) is very high (+5 pts).`
      );
    } else if (recentGlucose >= GLUCOSE_THRESHOLDS.SLIGHTLY_HIGH) {
      score += 2;
      reasons.push(
        `Recent glucose (${recentGlucose} mg/dL) is slightly high (+2 pts).`
      );
    } else {
      // Normal -> 0 pts
    }
  }

  // 2. Blood Pressure Scoring
  if (recentBP) {
    const { systolic, diastolic } = recentBP;
    let bpScore = 0;
    if (
      systolic >= BP_THRESHOLDS.STAGE_2_SYS ||
      diastolic >= BP_THRESHOLDS.STAGE_2_DIA
    ) {
      bpScore = 6;
      reasons.push(
        `Blood pressure (${systolic}/${diastolic}) indicates Stage 2 Hypertension (+6 pts).`
      );
    } else if (
      systolic >= BP_THRESHOLDS.STAGE_1_SYS ||
      diastolic >= BP_THRESHOLDS.STAGE_1_DIA
    ) {
      bpScore = 3;
      reasons.push(
        `Blood pressure (${systolic}/${diastolic}) indicates Stage 1 Hypertension (+3 pts).`
      );
    }
    score += bpScore;
  }

  // 3. Consistency (3+ days abnormal) +5 points
  // For the demo, let's look at the last 5 logs. If 3 or more are abnormal, we flag consistency.
  let abnormalCount = 0;
  let sumLast5 = 0;
  let sumPrev5 = 0;
  
  const recentGlucoseSet = sortedGlucose.slice(0, 5);
  const previousGlucoseSet = sortedGlucose.slice(5, 10);

  // Check how many of the last up to 5 logs were abnormal
  recentGlucoseSet.forEach((log) => {
    if (log.value >= GLUCOSE_THRESHOLDS.SLIGHTLY_HIGH) {
      abnormalCount++;
    }
    sumLast5 += Number(log.value);
  });

  if (abnormalCount >= 3) {
    score += 5;
    reasons.push(`Sustained abnormal readings for 3+ logs (+5 pts).`);
  }

  // Calculate Trend Percentage (e.g. increase over last period)
  let trendMessage = null;
  if (recentGlucoseSet.length > 0 && previousGlucoseSet.length > 0) {
    previousGlucoseSet.forEach(log => sumPrev5 += Number(log.value));
    const avgRecent = sumLast5 / recentGlucoseSet.length;
    const avgPrev = sumPrev5 / previousGlucoseSet.length;
    
    if (avgRecent > avgPrev) {
        const percentIncrease = (((avgRecent - avgPrev) / avgPrev) * 100).toFixed(1);
        trendMessage = `Your ${recentGlucoseSet.length}-log average glucose has increased by ${percentIncrease}%.`;
    }
  } else if (recentGlucoseSet.length >= 3) {
      // Fallback if not enough data for period diff: just average the last few.
      const avgRecent = (sumLast5 / recentGlucoseSet.length).toFixed(0);
      trendMessage = `Your recent average glucose is ${avgRecent} mg/dL.`;
  } else {
      trendMessage = recentGlucose ? `Your recent glucose is ${recentGlucose} mg/dL.` : null;
  }

  // Calculate Final Risk Level
  let level = "Low";
  let color = "bg-green-100 text-green-800 border-green-200"; // Low
  let panelColor = "from-emerald-50 to-teal-100";
  let explanation = "Your readings are stable. Keep up the good work!";

  if (score >= 11) {
    level = "High";
    color = "bg-red-100 text-red-800 border-red-200";
    panelColor = "from-orange-100 to-red-100";
    // Construct dynamic AI explanation for High Risk
    explanation = `${trendMessage ? trendMessage + " " : ""}Sustained elevation increases risk of complications. We recommend immediate medical review.`;
  } else if (score >= 6) {
    level = "Medium";
    color = "bg-orange-100 text-orange-800 border-orange-200";
    panelColor = "from-yellow-50 to-orange-100";
    explanation = `${trendMessage ? trendMessage + " " : ""}Your risk has increased. We recommend monitoring closely and consulting if this persists.`;
  }

  return {
    score,
    level,
    color,
    panelColor,
    reasons,
    trendMessage,
    explanation,
  };
};
