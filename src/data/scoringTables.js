// src/data/scoringTables.js

/**
 * SOURCE: Cambridge IELTS Official Practice Tests & Public Band Score Guidance
 * PURPOSE: Educational approximation only. Operational IELTS scores may vary.
 * REVIEWED: 2026
 */

export const scoringTables = {
  listening: {
    metadata: { version: "Cambridge Standard", lastReviewed: "2026", maxRawScore: 40 },
    conversion: [
      { raw: 40, band: 9.0 }, { raw: 39, band: 8.5 }, { raw: 37, band: 8.0 },
      { raw: 35, band: 7.5 }, { raw: 32, band: 7.0 }, { raw: 30, band: 6.5 },
      { raw: 26, band: 6.0 }, { raw: 23, band: 5.5 }, { raw: 18, band: 5.0 },
      { raw: 15, band: 4.5 }, { raw: 12, band: 4.0 }, { raw: 0, band: 0.0 }
    ]
  },
  readingAcademic: {
    metadata: { version: "Cambridge Standard", lastReviewed: "2026", maxRawScore: 40 },
    conversion: [
      { raw: 40, band: 9.0 }, { raw: 39, band: 8.5 }, { raw: 38, band: 8.5 },
      { raw: 37, band: 8.0 }, { raw: 36, band: 8.0 }, { raw: 35, band: 7.5 },
      { raw: 34, band: 7.5 }, { raw: 33, band: 7.0 }, { raw: 32, band: 7.0 },
      { raw: 30, band: 6.5 }, { raw: 27, band: 6.0 }, { raw: 23, band: 5.5 },
      { raw: 19, band: 5.0 }, { raw: 15, band: 4.5 }, { raw: 13, band: 4.0 },
      { raw: 0, band: 0.0 }
    ]
  },
  bandDescriptors: {
    "9.0": "Expert user. Has fully operational command of the language: appropriate, accurate and fluent with complete understanding.",
    "8.5": "Very good user. Fully operational command with only occasional unsystematic inaccuracies.",
    "8.0": "Very good user. Fully operational command with only occasional unsystematic inaccuracies and inappropriate usage.",
    "7.5": "Good user. Operational command of the language though with occasional inaccuracies, inappropriate usage and misunderstandings.",
    "7.0": "Good user. Operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations.",
    "6.5": "Competent user. Generally effective command of the language despite some inaccuracies, inappropriacies and misunderstandings.",
    "6.0": "Competent user. Has generally effective command of the language despite some inaccuracies, inappropriacies and misunderstandings.",
    "5.5": "Modest user. Has partial command of the language, coping with overall meaning in most situations, though is likely to make many mistakes.",
    "5.0": "Modest user. Has partial command of the language, coping with overall meaning in most situations, though is likely to make many mistakes.",
    "4.5": "Limited user. Able to use the language in familiar situations but has problems with understanding and expression.",
    "4.0": "Limited user. Basic competence is limited to familiar situations."
  }
};