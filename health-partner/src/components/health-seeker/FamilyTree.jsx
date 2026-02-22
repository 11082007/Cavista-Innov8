import { useState } from "react";
// import { geminiAI } from "../../JS/geminiAI";
import { geminiAI } from "../services/geminiAI";

const FamilyTree = () => {
  const [familyMembers, setFamilyMembers] = useState([
    { id: 1, role: "self", name: "You", conditions: [], checked: true },
  ]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const geneticConditions = [
    {
      id: "sickle-cell",
      name: "Sickle Cell Disease",
      inheritance: "autosomal recessive",
      icon: "🔴",
      description: "Genetic blood disorder affecting hemoglobin",
    },
    {
      id: "cystic-fibrosis",
      name: "Cystic Fibrosis",
      inheritance: "autosomal recessive",
      icon: "🫁",
      description: "Affects lungs and digestive system",
    },
    {
      id: "hemophilia",
      name: "Hemophilia",
      inheritance: "x-linked recessive",
      icon: "🩸",
      description: "Bleeding disorder",
    },
    {
      id: "huntingtons",
      name: "Huntington's Disease",
      inheritance: "autosomal dominant",
      icon: "🧠",
      description: "Neurodegenerative disorder",
    },
    {
      id: "down-syndrome",
      name: "Down Syndrome",
      inheritance: "chromosomal",
      icon: "🧬",
      description: "Genetic condition caused by extra chromosome",
    },
    {
      id: "thalassemia",
      name: "Thalassemia",
      inheritance: "autosomal recessive",
      icon: "🩸",
      description: "Blood disorder affecting hemoglobin production",
    },
    {
      id: "color-blindness",
      name: "Color Blindness",
      inheritance: "x-linked recessive",
      icon: "🎨",
      description: "Difficulty distinguishing colors",
    },
    {
      id: "diabetes-type1",
      name: "Type 1 Diabetes",
      inheritance: "multifactorial",
      icon: "🩸",
      description: "Autoimmune condition affecting insulin production",
    },
    {
      id: "hypertension",
      name: "Hypertension",
      inheritance: "polygenic",
      icon: "❤️",
      description: "High blood pressure - genetic and environmental factors",
    },
  ];

  const addFamilyMember = () => {
    const newId = familyMembers.length + 1;
    setFamilyMembers([
      ...familyMembers,
      {
        id: newId,
        role: "relative",
        name: `Family Member ${newId}`,
        conditions: [],
        checked: false,
      },
    ]);
  };

  const removeFamilyMember = (id) => {
    setFamilyMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const updateMemberName = (id, name) => {
    setFamilyMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, name } : m)),
    );
  };

  const toggleCondition = (memberId, conditionId) => {
    setFamilyMembers((prev) =>
      prev.map((member) => {
        if (member.id === memberId) {
          const newConditions = member.conditions.includes(conditionId)
            ? member.conditions.filter((c) => c !== conditionId)
            : [...member.conditions, conditionId];
          return { ...member, conditions: newConditions };
        }
        return member;
      }),
    );
  };

  const calculateRisk = async () => {
    setLoading(true);
    try {
      const self = familyMembers.find((m) => m.role === "self");
      const relatives = familyMembers.filter((m) => m.role !== "self");

      const result = await geminiAI.analyzeGeneticRisk(self, relatives);
      setAnalysis(result);
    } catch (error) {
      console.error("Error analyzing genetic risk:", error);
    } finally {
      setLoading(false);
    }
  };

  const getInheritancePattern = (conditionId) => {
    const condition = geneticConditions.find((c) => c.id === conditionId);
    return condition?.inheritance || "unknown";
  };

  const getConditionIcon = (conditionId) => {
    const condition = geneticConditions.find((c) => c.id === conditionId);
    return condition?.icon || "🧬";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white mb-8">
        <h1 className="text-3xl font-bold mb-2">
          🧬 Family Tree Genetic Risk Calculator
        </h1>
        <p className="text-purple-100">
          AI-powered analysis of hereditary conditions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Family Tree Builder */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Build Your Family Tree</h2>
            <button
              onClick={addFamilyMember}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              + Add Family Member
            </button>
          </div>

          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {familyMembers.map((member, index) => (
              <div
                key={member.id}
                className="border-2 border-purple-100 rounded-xl p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 text-lg">
                        {member.role === "self" ? "👤" : "👥"}
                      </span>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          updateMemberName(member.id, e.target.value)
                        }
                        className="font-medium text-gray-900 bg-transparent border-b border-gray-300 focus:border-purple-500 outline-none"
                      />
                      <p className="text-xs text-gray-500">
                        {member.role === "self" ? "You (Proband)" : "Relative"}
                      </p>
                    </div>
                  </div>
                  {member.id !== 1 && (
                    <button
                      onClick={() => removeFamilyMember(member.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="mt-3">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Genetic Conditions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {geneticConditions.map((condition) => (
                      <button
                        key={condition.id}
                        onClick={() => toggleCondition(member.id, condition.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          member.conditions.includes(condition.id)
                            ? "bg-purple-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        title={condition.description}
                      >
                        {condition.icon} {condition.name}
                      </button>
                    ))}
                  </div>
                </div>

                {member.conditions.length > 0 && (
                  <div className="mt-3 p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-700">
                      <span className="font-medium">Inheritance patterns:</span>
                      {member.conditions.map((c) => {
                        const pattern = getInheritancePattern(c);
                        const icon = getConditionIcon(c);
                        return (
                          <span
                            key={c}
                            className="ml-2 px-2 py-0.5 bg-white rounded-full inline-flex items-center gap-1"
                          >
                            {icon} {pattern}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={calculateRisk}
            disabled={loading || familyMembers.length === 0}
            className="w-full mt-6 px-6 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>AI Analyzing Genetic Risk...</span>
              </div>
            ) : (
              "Calculate Genetic Risk"
            )}
          </button>
        </div>

        {/* AI Analysis Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            AI Genetic Risk Analysis
          </h2>

          {analysis ? (
            <div className="space-y-6">
              {/* Risk Summary */}
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6">
                <h3 className="font-semibold text-lg mb-3">Risk Summary</h3>
                <div className="space-y-4">
                  {analysis.risks?.map((risk, i) => (
                    <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">
                            {getConditionIcon(risk.condition)}
                          </span>
                          <span className="font-medium">{risk.condition}</span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            risk.probability > 70
                              ? "bg-red-100 text-red-700"
                              : risk.probability > 40
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-green-100 text-green-700"
                          }`}
                        >
                          {risk.probability}% probability
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {risk.explanation}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        Inheritance: {risk.inheritance}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Genetic Counseling Recommendations */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">
                  🧬 Genetic Counseling Recommendations
                </h3>
                <ul className="space-y-2">
                  {analysis.recommendations?.map((rec, i) => (
                    <li key={i} className="flex items-start space-x-2 text-sm">
                      <span className="text-purple-600">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Testing Suggestions */}
              <div className="bg-purple-50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">
                  🔬 Recommended Genetic Tests
                </h3>
                <div className="space-y-2">
                  {analysis.tests?.map((test, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center text-sm"
                    >
                      <span>{test.name}</span>
                      <span className="text-purple-600">
                        {test.recommendation}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carrier Screening */}
              {analysis.carrierScreening && (
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">
                    🧪 Carrier Screening Recommended
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {analysis.carrierScreening.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white text-blue-700 rounded-full text-sm"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Preventive Measures */}
              {analysis.preventiveMeasures && (
                <div className="bg-green-50 rounded-xl p-4">
                  <h3 className="font-semibold mb-2">🛡️ Preventive Measures</h3>
                  <ul className="space-y-1">
                    {analysis.preventiveMeasures.map((measure, i) => (
                      <li
                        key={i}
                        className="text-sm text-green-700 flex items-start gap-2"
                      >
                        <span>•</span>
                        {measure}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Inheritance Pattern Explanation */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold mb-2">
                  📚 Understanding Inheritance Patterns
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-900">
                      Autosomal Dominant:
                    </span>{" "}
                    50% chance if one parent has it. Affected individuals have
                    one copy of the mutated gene.
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">
                      Autosomal Recessive:
                    </span>{" "}
                    25% chance if both parents are carriers. Both copies of the
                    gene must be mutated.
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">X-Linked:</span>{" "}
                    Higher chance in males (who have one X chromosome), females
                    are typically carriers.
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">
                      Multifactorial:
                    </span>{" "}
                    Combination of genetic and environmental factors. Risk is
                    moderate but real.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4 animate-float">🧬</div>
              <p className="text-gray-500">
                Add family members and their conditions to see AI-powered
                genetic risk analysis
              </p>
              <p className="text-sm text-gray-400 mt-2">
                The AI will analyze inheritance patterns and calculate
                probabilities
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
        <p className="text-sm text-yellow-700 flex items-start gap-2">
          <span className="text-xl">⚠️</span>
          <span>
            This is an AI-powered risk assessment tool and should not replace
            professional genetic counseling. Always consult with a healthcare
            provider or genetic counselor for medical advice.
          </span>
        </p>
      </div>
    </div>
  );
};

export default FamilyTree;
