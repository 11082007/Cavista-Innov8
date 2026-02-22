import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VytalAIChatbot = ({ riskScore }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Get user condition dynamically
  const user = JSON.parse(localStorage.getItem('vytal-user') || '{}');
  const condition = user.condition || 'general';

  const getInitialMessage = () => {
    switch(condition) {
      case 'hypertension': return "Hello! I'm Vytal AI. I noticed your blood pressure readings have been consistent this week. How are you feeling today?";
      case 'diabetes': return "Hello! I'm Vytal AI. Remember to track your post-meal glucose today. Need help analyzing a recent meal?";
      case 'sickle-cell': return "Hello! I'm Vytal AI. Hydration is key today. Are you experiencing any joint pain or fatigue?";
      case 'cancer': return "Hello! I'm Vytal AI. I'm here to support your oncology journey. Do you have any new symptoms to log today?";
      case 'reproductive': return "Hello 🌸. I'm Vytal AI. I'm tracking your cycle phases. How is your energy level today?";
      case 'allergies': return "Hello! I'm Vytal AI. Have you encountered any new environmental or food triggers today?";
      default: return "Hello! I'm Vytal AI, your 24/7 Intelligent Health Assistant. How can I help you today?";
    }
  };

  const [messages, setMessages] = useState([
    { sender: 'ai', text: getInitialMessage() }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    // Simulate AI response based on slide 8 logic
    setTimeout(() => {
      let aiResponse = "I'm monitoring your data. It looks stable! Keep up the good habits.";

      // Dynamic fallback based on condition if no keywords hit
      if (condition === 'hypertension') aiResponse = "Your BP trends are stable today. Remember to avoid high-sodium meals.";
      if (condition === 'diabetes') aiResponse = "Your glucose variance is within 10% of your target. Great job managing your carbs today!";
      if (condition === 'sickle-cell') aiResponse = "I've noted that. Please ensure you drink at least 1 more liter of water this afternoon.";
      if (condition === 'reproductive') aiResponse = "Noted. Your symptoms align with your current luteal phase. I recommend magnesium-rich foods today.";
      
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('risk') || lowerInput.includes('score')) {
        aiResponse = "Your blood pressure has remained above 140/90 for 4 consecutive days. This increases your stroke risk. A clinician has been notified. Please consult one within 48 hours.";
      } else if (lowerInput.includes('allergy') || lowerInput.includes('reaction')) {
        aiResponse = "I've analyzed your logs. You logged 'swollen palms' shortly after consuming peanuts. I recommend an elimination period for confirmation.";
      } else if (lowerInput.includes('emergency') || lowerInput.includes('hospital')) {
        aiResponse = "I am routing you to the nearest hospital with an available ICU bed and Oxygen tank. Opening the Critical Resource Hub now.";
        setTimeout(() => navigate('/marketplace?resource=icu'), 2500);
      } else if (lowerInput.includes('genetic') || lowerInput.includes('family')) {
        aiResponse = "Based on your family tree, I've detected a hemophilia carrier line on your father's side. An X-Linked Recessive inheritance carries a 50% probability for males.";
      }

      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-80 sm:w-96 rounded-2xl shadow-2xl border border-purple-100 overflow-hidden mb-4 flex flex-col animate-fadeIn" style={{ height: '450px' }}>
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-800 to-purple-600 p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-inner">
                V
              </div>
              <div>
                <h3 className="text-white font-bold">VYTAL AI</h3>
                <p className="text-purple-200 text-xs text-left">24/7 Intelligent Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-purple-200 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-purple-50/30 space-y-4">
             {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-purple-600 text-white rounded-tr-sm' 
                      : 'bg-white border border-purple-100 text-gray-800 rounded-tl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
             ))}
             <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-purple-100 flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask VYTAL AI..." 
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 transition-all"
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className="bg-teal-500 hover:bg-teal-400 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-colors shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transform hover:scale-105 transition-all duration-300 ${isOpen ? 'bg-gray-800 text-white' : 'bg-gradient-to-tr from-purple-700 to-purple-500 text-white animate-bounce'}`}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z"/><path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1"/></svg>
        )}
      </button>
    </div>
  );
};

export default VytalAIChatbot;
