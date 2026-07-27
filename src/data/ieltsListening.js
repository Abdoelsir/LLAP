// src/data/ieltsListening.js

export const listeningLessons = {
  "1": {
    lessonId: "IELTS-L-001",
    title: "Ordering Food at a Restaurant",
    level: "Foundation",
    // Layer 1 & 2: Header and Pre-Listening
    objectives: ["Understand menu items", "Practice ordering phrases"],
    vocabulary: ["Menu", "Bill", "Waiter", "Reservation", "Dessert", "Tip"],
    
    // Layer 3: Audio & Transcript
    audioUrl: "/audio/lesson1.mp3",
    transcript: "Waiter: Good evening. Do you have a reservation? ...",
    
    // Layer 4: Activities
    activities: {
      prediction: ["What do you see on a restaurant menu?", "Why do people leave a tip?"],
      generalListening: [
        { id: 1, question: "What is the conversation mainly about?", options: ["Booking a hotel", "Ordering food"], answer: "Ordering food" }
      ],
      detailListening: [
        { id: 2, question: "What does the customer order first?", answer: "A glass of water" }
      ],
      languageFocus: ["I'd like to order...", "Could I have...", "Anything else?"],
      shadowing: "Listen to the waiter's greeting and repeat with the same intonation.",
      reflection: "How did your prediction compare to the actual dialogue?"
    }
  },
  "2": {
    lessonId: "IELTS-L-002",
    title: "Airport Check-in",
    level: "Foundation",
    objectives: ["Identify flight information", "Practice baggage rules"],
    vocabulary: ["Boarding pass", "Gate", "Terminal", "Carry-on"],
    audioUrl: "/audio/lesson2.mp3",
    transcript: "Agent: May I see your passport please? ...",
    activities: {
      prediction: ["What documents do you need for a flight?"],
      generalListening: [
        { id: 1, question: "What is the customer's destination?", options: ["London", "New York"], answer: "London" }
      ],
      detailListening: [],
      languageFocus: ["Window or aisle?", "Here is my passport."],
      shadowing: "Practice the check-in dialogue with a partner.",
      reflection: "What new expressions did you learn?"
    }
  }
};