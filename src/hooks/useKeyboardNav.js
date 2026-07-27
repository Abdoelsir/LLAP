import { useEffect } from 'react';

/**
 * useKeyboardNav
 * Handles global IELTS navigation shortcuts.
 */
export const useKeyboardNav = (onNext, onPrevious) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore if user is typing in a text input or textarea
      if (['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;

      switch (event.key) {
        case 'ArrowRight':
          if (onNext) onNext();
          break;
        case 'ArrowLeft':
          if (onPrevious) onPrevious();
          break;
        case 'Escape':
          // Reserved for closing modals/dialogs
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrevious]);
};