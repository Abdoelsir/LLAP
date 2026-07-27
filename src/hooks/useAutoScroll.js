import { useEffect } from 'react';

/**
 * useAutoScroll
 * Automatically scrolls the DOM element into view when its ID 
 * matches the activeQuestionId in the ExamContext.
 */
export const useAutoScroll = (activeQuestionId) => {
  useEffect(() => {
    if (activeQuestionId) {
      const element = document.getElementById(`q-${activeQuestionId}`);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }
  }, [activeQuestionId]);
};