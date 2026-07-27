// src/data/speakingExams.js
export const speakingExams = {
  "SPK-001": {
    title: "Speaking Test 1",
    parts: {
      part1: { 
        title: "Introduction", 
        duration: 300, 
        questions: ["What is your name?", "Where are you from?"] 
      },
      part2: { 
        cueCard: "Describe an important book you have read.",
        prepTime: 60, 
        speakTime: 120 
      },
      part3: { 
        title: "Discussion", 
        duration: 300, 
        questions: ["Why do some books become popular?", "Do you think books will disappear?"] 
      }
    }
  },
  "SPK-002": {
    title: "Speaking Test 2",
    parts: {
      part1: { 
        title: "Introduction", 
        duration: 300, 
        questions: ["Do you work or study?", "What do you like about your city?"] 
      },
      part2: { 
        cueCard: "Describe a person who inspired you.",
        prepTime: 60, 
        speakTime: 120 
      },
      part3: { 
        title: "Discussion", 
        duration: 300, 
        questions: ["How can teachers influence students?", "Is technology changing education?"] 
      }
    }
  }
};