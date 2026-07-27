import TFNG_Renderer from './renderers/TFNG_Renderer';
import MultipleChoice_Renderer from './renderers/MultipleChoice_Renderer';
import SentenceCompletion_Renderer from './renderers/SentenceCompletion_Renderer';
import SummaryCompletionOptions_Renderer from './renderers/SummaryCompletionOptions_Renderer';

/**
 * RendererRegistry
 * Centralized mapping for the QuestionRenderer factory.
 * Ensure all renderer files are correctly located in src/components/renderers/
 */
const RendererRegistry = {
  'True / False / Not Given': TFNG_Renderer,
  'Multiple Choice': MultipleChoice_Renderer,
  'Sentence Completion': SentenceCompletion_Renderer,
  'Short Answer': SentenceCompletion_Renderer,
  'Summary Completion': SentenceCompletion_Renderer,
  'Summary Completion (Options)': SummaryCompletionOptions_Renderer,
  'YES / NO / NOT GIVEN': TFNG_Renderer,
  'Matching Information': MultipleChoice_Renderer, // Reuses choice-selection pattern for paragraph matching (A-F)
};

export default RendererRegistry;