/**
 * notebookCurriculumMatcher.js
 * Bridges Jupyter Notebook cells with the P101 localized curriculum,
 * connecting notebook lecture sections (such as Prof. Jade Cao's Module 6.1)
 * directly to Tony Gaddis's "Starting Out with Python" (6th Ed.) textbook references,
 * "The Why" pedagogical breakdowns, RAM mental models, and real-world analogies.
 */

// Explicit mapping rules for known lecture notebooks
const LECTURE_NOTEBOOK_RULES = [
  // Module 6.2: Classes, Part 2: Connecting Classes (Inheritance & Composition) (Prof. Jade Cao)
  {
    matcher: (name, id) => /(6\.2|class2|classes[_\s-]*2|inheritance|composition)/i.test(name || '') || id === 'prof-cao-module-6-2',
    chapterNum: 10,
    sectionRules: [
      // 10.1: Inheritance, Subclasses, super(), Method Overriding ("IS-A")
      {
        sectionNum: '10.1',
        sectionId: '10-1',
        triggers: [
          /1\.\s*Warm-Up/i,
          /2\.\s*Why\s*Inheritance/i,
          /3\.\s*Inheritance\s*=\s*[“"]IS\s*A[”"]/i,
          /4\.\s*Your\s*First\s*Child\s*Class/i,
          /5\.\s*Inheritance\s*Is\s*More\s*Than\s*Saving\s*Typing/i,
          /6\.\s*The\s*Child\s*Needs\s*Extra\s*Data/i,
          /7\.\s*Understanding\s*`?super\(\)`?/i,
          /8\.\s*The\s*Child\s*Can\s*Add\s*New\s*Behavior/i,
          /9\.\s*Method\s*Overriding/i,
          /super\(\)\.__init__/i,
          /ElectricVehicle\(Vehicle\)/i,
          /EmailNotification\(Notification\)/i,
          /\bIS[- ]A\b/i,
          /overrid/i,
          /subclass/i,
          /parent\s*class/i
        ]
      },
      // 10.2: Composition, Aggregation & Objects Working Together ("HAS-A")
      {
        sectionNum: '10.2',
        sectionId: '10-2',
        triggers: [
          /10\.\s*Inheritance\s*Is\s*NOT\s*Every\s*Relationship/i,
          /11\.\s*Composition\s*=\s*[“"]HAS\s*A[”"]/i,
          /12\.\s*Inheritance\s*vs\.?\s*Composition/i,
          /13\.\s*Objects\s*Working\s*Together/i,
          /14\.\s*Design\s*Check/i,
          /15\.\s*Do\s*Classes\s*Need\s*Separate\s*Files/i,
          /16\.\s*Optional\s*Colab\s*Demo/i,
          /17\.\s*Knowledge\s*Check/i,
          /In-Class\s*Practice\s*—\s*Campus\s*Library\s*System/i,
          /Campus\s*Library/i,
          /\bHAS[- ]A\b/i,
          /LibraryItem/i,
          /self\.battery\s*=\s*Battery/i,
          /composition/i,
          /aggregation/i
        ]
      }
    ]
  },
  // Module 6.1: Classes, Part 1 (Prof. Jade Cao)
  {
    matcher: (name, id) => /(6\.1|class1|classes[_\s-]*1)/i.test(name || '') || (/(class|classes)/i.test(name || '') && !/6\.2|class2/i.test(name || '')) || id === 'prof-cao-module-6-1',
    chapterNum: 9,
    sectionRules: [
      // 9.1: Blueprint vs Instance, Allocation, __init__, self
      {
        sectionNum: '9.1',
        sectionId: '9-1',
        triggers: [
          /1\.\s*Functions\s*→\s*Classes/i,
          /2\.\s*We\s*Already\s*Know\s*One\s*Way\s*to\s*Model/i,
          /3\.\s*Class\s*vs\.?\s*Object/i,
          /4\.\s*Your\s*First\s*Class/i,
          /5\.\s*Four\s*Important\s*Words/i,
          /6\.\s*What\s*Happens\s*When\s*We\s*Create\s*an\s*Object/i,
          /7\.\s*The\s*Important\s*Line.*self\.name\s*=\s*name/i,
          /8\.\s*What\s*Is\s*`?self`?/i,
          /9\.\s*Attributes\s*Can\s*Start\s*from\s*Arguments/i,
          /Dog\(["']Milo["'],\s*3\)/i,
          /blueprint\s*vs\.?\s*instance/i,
          /mental\s*model.*Dog\s*object/i
        ]
      },
      // 9.2: Multiple Instances & Independent State
      {
        sectionNum: '9.2',
        sectionId: '9-2',
        triggers: [
          /10\.\s*Multiple\s*Instances\s*Have\s*Independent\s*State/i,
          /student1\s*=\s*Student/i,
          /independent\s*state/i,
          /multiple\s*objects.*independent/i,
          /Predict.*Student/i
        ]
      },
      // 9.3: Guarding Rules with Methods, Validation, Clamping
      {
        sectionNum: '9.3',
        sectionId: '9-3',
        triggers: [
          /11\.\s*Methods:\s*Functions\s*That\s*Belong/i,
          /12\.\s*Attribute\s*or\s*Method/i,
          /13\.\s*Three\s*Ways\s*to\s*Change\s*an\s*Attribute/i,
          /14\.\s*Methods\s*Can\s*Protect\s*Simple\s*Rules/i,
          /15\.\s*`?print\(\)`?\s*vs\.?\s*`?return`?/i,
          /17\.\s*Debugging\s*Classes/i,
          /guarding\s*business\s*rules/i,
          /read_pages/i,
          /current_page/i,
          /BankAccount/i
        ]
      },
      // 9.4: In-Class Lab: Pet Profile (State & Bounds)
      {
        sectionNum: '9.4',
        sectionId: '9-4',
        triggers: [
          /16\.\s*Design\s*a\s*Class\s*Before\s*Writing\s*It/i,
          /18\.\s*Knowledge\s*Check/i,
          /35[–-]40\s*minutes/i,
          /In-Class\s*Practice/i,
          /The\s*Pet\s*Profile/i,
          /Pet\(["']Luna["']/i,
          /is_tired/i,
          /energy\s*=\s*max\(0/i,
          /Smart\s*Lamp/i
        ]
      }
    ]
  },
  // Module 5.1 & 5.2: Functions & Modularity
  {
    matcher: (name) => /5\.1|5\.2|function/i.test(name || ''),
    chapterNum: 7,
    sectionRules: [
      { sectionNum: '7.1', sectionId: '7-1', triggers: [/def\s+\w+/, /parameters?\s*vs\s*arguments?/i, /void\s*function/i, /return\b/, /return\s*vs\s*print/i, /value-returning/i] },
      { sectionNum: '7.2', sectionId: '7-2', triggers: [/scope/i, /local\s*variable/i, /stack\s*frame/i, /\*args/, /\*\*kwargs/, /default\s*argument/i, /optional/i] }
    ]
  },
  // Module 4.1 & 4.2: While Loops & Workshops
  {
    matcher: (name) => /4\.1|4\.2|while/i.test(name || ''),
    chapterNum: 6,
    sectionRules: [
      { sectionNum: '6.1', sectionId: '6-1', triggers: [/while\s+/, /condition-controlled/i, /sentinel/i, /infinite\s*loop/i, /flag\b/i] },
      { sectionNum: '6.2', sectionId: '6-2', triggers: [/modulo/i, /%/, /nested/i, /workshop/i, /integrated/i] }
    ]
  },
  // Module 3.2: Dictionaries
  {
    matcher: (name) => /3\.2|dictionar/i.test(name || ''),
    chapterNum: 5,
    sectionRules: [
      { sectionNum: '5.1', sectionId: '5-1', triggers: [/\{.*:.*\}/, /key-value/i, /hash\s*table/i, /\.get\(/, /safe\s*lookup/i] },
      { sectionNum: '5.2', sectionId: '5-2', triggers: [/\.items\(\)/, /\.keys\(\)/, /\.values\(\)/, /nested\s*dict/i, /inventory/i] }
    ]
  },
  // Module 3.1: If Statements
  {
    matcher: (name) => /3\.1|if_statement/i.test(name || ''),
    chapterNum: 4,
    sectionRules: [
      { sectionNum: '4.1', sectionId: '4-1', triggers: [/\bif\s+/, /decision\s*structure/i, /and\b/, /or\b/, /not\b/, /boolean\s*logic/i, /membership/i, /\bin\s+/] },
      { sectionNum: '4.2', sectionId: '4-2', triggers: [/\belif\s+/, /\belse:/, /nested\s*if/i, /decision\s*chain/i] }
    ]
  },
  // Module 2.2: Working with Lists & For Loops
  {
    matcher: (name) => /2\.2|working_with_lists/i.test(name || ''),
    chapterNum: 3,
    sectionRules: [
      { sectionNum: '3.1', sectionId: '3-1', triggers: [/for\s+\w+\s+in\s+/, /iteration/i, /range\(/, /count-controlled/i, /accumulator/i, /total\s*\+=/] },
      { sectionNum: '3.2', sectionId: '3-2', triggers: [/slice/i, /\[\d*:\d*\]/, /tuple/i, /\.copy\(\)/, /copy/i] }
    ]
  },
  // Module 2.1: Intro to Lists
  {
    matcher: (name) => /2\.1|intro_to_lists/i.test(name || ''),
    chapterNum: 2,
    sectionRules: [
      { sectionNum: '2.1', sectionId: '2-1', triggers: [/\[.*\]/, /list\s*creation/i, /\[\s*-?\d+\s*\]/, /0-based\s*index/i, /negative\s*index/i, /\.append\(/, /\.insert\(/, /mutability/i] },
      { sectionNum: '2.2', sectionId: '2-2', triggers: [/\.pop\(/, /\.remove\(/, /del\s+/, /\.sort\(/, /\.reverse\(/, /reverse\s*=/i] }
    ]
  },
  // Module 1: Variables & Data Types
  {
    matcher: (name) => /01_|variables/i.test(name || ''),
    chapterNum: 1,
    sectionRules: [
      { sectionNum: '1.1', sectionId: '1-1', triggers: [/variable/i, /memory\s*slot/i, /name\s*error/i, /int\(/, /float\(/, /str\(/, /type\(/, /conversion/i] },
      { sectionNum: '1.2', sectionId: '1-2', triggers: [/f["'].*\{.*\}["']/, /f-string/i, /format/i, /strip\(/, /lower\(/, /upper\(/, /transformation/i, /immutable/i] }
    ]
  }
];

// Fallback topic detector for any custom or uploaded notebook (.ipynb)
const TOPIC_SIGNATURES = [
  {
    chapterNum: 10, // Module 6.2 (Inheritance & Composition)
    defaultSectionNum: '10.1',
    weight: (text) => {
      let score = 0;
      if (/super\(\)\.__init__/i.test(text)) score += 7;
      if (/\bclass\s+\w+\(\w+\):/i.test(text)) score += 6;
      if (/\b(inheritance|subclass|superclass|polymorphism|override|composition)\b/i.test(text)) score += 4;
      if (/\b(is-a|has-a)\b/i.test(text)) score += 4;
      if (/Battery\s*\(|ElectricVehicle/i.test(text)) score += 3;
      return score;
    }
  },
  {
    chapterNum: 9, // Module 6.1 (Classes & OOP)
    defaultSectionNum: '9.1',
    weight: (text) => {
      let score = 0;
      if (/\bclass\s+\w+/i.test(text)) score += 6;
      if (/__init__/i.test(text)) score += 5;
      if (/\bself\.\w+/i.test(text)) score += 5;
      if (/\b(blueprint|instance|attributes?|methods?|object-oriented)\b/i.test(text)) score += 3;
      if (/create\s+an\s+object/i.test(text)) score += 5;
      return score;
    }
  },
  {
    chapterNum: 7, // Module 5.1 & 5.2 (Functions)
    defaultSectionNum: '7.1',
    weight: (text) => {
      let score = 0;
      if (/\bdef\s+\w+\s*\(/i.test(text)) score += 5;
      if (/\breturn\b/i.test(text)) score += 4;
      if (/\b(parameters?|arguments?|stack\s*frame|scope)\b/i.test(text)) score += 3;
      return score;
    }
  },
  {
    chapterNum: 8, // Extended Ch 6 (File I/O & Exceptions)
    defaultSectionNum: '8.1',
    weight: (text) => {
      let score = 0;
      if (/with\s+open\s*\(/i.test(text)) score += 6;
      if (/try\s*:/i.test(text) && /except/i.test(text)) score += 6;
      if (/\b(FileNotFoundError|ValueError|read\(\)|write\(\))\b/i.test(text)) score += 4;
      return score;
    }
  },
  {
    chapterNum: 5, // Module 3.2 (Dictionaries)
    defaultSectionNum: '5.1',
    weight: (text) => {
      let score = 0;
      if (/\{[^}\n]+:[^}\n]+\}/.test(text)) score += 4;
      if (/\.(keys|values|items|get)\s*\(/i.test(text)) score += 4;
      if (/\b(dictionary|key-value|hash\s*table)\b/i.test(text)) score += 3;
      return score;
    }
  },
  {
    chapterNum: 6, // Module 4.1 & 4.2 (While Loops)
    defaultSectionNum: '6.1',
    weight: (text) => {
      let score = 0;
      if (/\bwhile\s+/i.test(text)) score += 5;
      if (/\b(sentinel|infinite\s*loop|flag)\b/i.test(text)) score += 4;
      return score;
    }
  },
  {
    chapterNum: 3, // Module 2.2 (For Loops)
    defaultSectionNum: '3.1',
    weight: (text) => {
      let score = 0;
      if (/\bfor\s+\w+\s+in\s+range\s*\(/i.test(text)) score += 5;
      if (/\bfor\s+\w+\s+in\s+/i.test(text)) score += 4;
      if (/\b(iteration|accumulator|tuple)\b/i.test(text)) score += 3;
      return score;
    }
  },
  {
    chapterNum: 2, // Module 2.1 (Lists)
    defaultSectionNum: '2.1',
    weight: (text) => {
      let score = 0;
      if (/\[\s*["'\w\d]/i.test(text)) score += 3;
      if (/\.(append|pop|remove|sort|reverse)\s*\(/i.test(text)) score += 4;
      if (/\b(list|indexing|mutability)\b/i.test(text)) score += 3;
      return score;
    }
  },
  {
    chapterNum: 4, // Module 3.1 (Conditionals)
    defaultSectionNum: '4.1',
    weight: (text) => {
      let score = 0;
      if (/\bif\s+.*:/i.test(text)) score += 4;
      if (/\belif\s+.*:/i.test(text) || /\belse\s*:/i.test(text)) score += 4;
      if (/\b(boolean|logical\s*operator)\b/i.test(text)) score += 3;
      return score;
    }
  },
  {
    chapterNum: 1, // Module 1 (Variables)
    defaultSectionNum: '1.1',
    weight: (text) => {
      let score = 0;
      if (/f["'].*\{.*\}["']/i.test(text)) score += 4;
      if (/\b(type\(|int\(|float\(|str\()\b/i.test(text)) score += 3;
      return score;
    }
  }
];

/**
 * Resolves whether a cell should display the "The Why & Gaddis Textbook Reference" companion.
 * 
 * @param {Object} params
 * @param {Object} params.cell - The notebook cell object { cell_type, source }
 * @param {number} params.cellIndex - Zero-indexed cell number
 * @param {Object} params.notebook - The active notebook
 * @param {Array} params.chapters - Array of localized chapters from chaptersData.js
 * @returns {Object|null} Match result with chapter, section, and pedagogical metadata, or null.
 */
export function resolveTextbookBridgeForCell({ cell, cellIndex, notebook, chapters }) {
  if (!cell || !chapters || chapters.length === 0) return null;

  const rawSource = Array.isArray(cell.source) ? cell.source.join('') : String(cell.source || '');
  const trimmed = rawSource.trim();
  if (!trimmed) return null;

  const notebookName = notebook?.name || '';
  const notebookId = notebook?.id || '';

  // 1. Check Explicit Lecture Notebook Rules
  const lectureRule = LECTURE_NOTEBOOK_RULES.find(rule => rule.matcher(notebookName, notebookId));

  if (lectureRule) {
    const targetChapter = chapters.find(c => c.num === lectureRule.chapterNum);
    if (targetChapter) {
      // Find matching section in this chapter
      for (const sRule of lectureRule.sectionRules) {
        const matchesTrigger = sRule.triggers.some(trigger => trigger.test(rawSource));
        if (matchesTrigger) {
          const targetSection = targetChapter.sections?.find(
            s => s.num === sRule.sectionNum || s.id === sRule.sectionId
          ) || targetChapter.sections?.[0];

          if (targetSection) {
            return buildMatchPayload(targetChapter, targetSection, 'exact_lecture');
          }
        }
      }
    }
  }

  // 2. For Markdown Cells with Headings (#, ##, ###) or Key Question Formats
  const isMarkdownHeading = cell.cell_type === 'markdown' && (
    trimmed.startsWith('#') ||
    trimmed.startsWith('##') ||
    trimmed.startsWith('###') ||
    /^\d+\.\s+[A-Z]/m.test(trimmed) ||
    /^(question|consider|mental model|what happens|how to)/i.test(trimmed)
  );

  // For code cells, only match if it contains prominent structural signatures (e.g. class Dog, def)
  const isEligibleCode = cell.cell_type === 'code' && (
    /\bclass\s+\w+/i.test(trimmed) ||
    /\bdef\s+\w+\s*\(/i.test(trimmed) ||
    /with\s+open\s*\(/i.test(trimmed)
  );

  if (!isMarkdownHeading && !isEligibleCode) {
    return null;
  }

  // 3. Fallback Topic Signature Matching
  let highestScore = 0;
  let bestCandidate = null;

  for (const sig of TOPIC_SIGNATURES) {
    const score = sig.weight(rawSource);
    if (score > highestScore && score >= 4) {
      highestScore = score;
      bestCandidate = sig;
    }
  }

  if (bestCandidate) {
    const targetChapter = chapters.find(c => c.num === bestCandidate.chapterNum);
    if (targetChapter) {
      const targetSection = targetChapter.sections?.find(
        s => s.num === bestCandidate.defaultSectionNum
      ) || targetChapter.sections?.[0];

      if (targetSection) {
        return buildMatchPayload(targetChapter, targetSection, 'topic_signature');
      }
    }
  }

  return null;
}

function buildMatchPayload(chapter, section, matchType) {
  return {
    matched: true,
    matchType,
    chapterNum: chapter.num,
    moduleCode: chapter.code_module,
    chapterTitle: chapter.title,
    sectionId: section.id,
    sectionNum: section.num,
    sectionTitle: section.title,
    why: section.why,
    concept: section.concept,
    pitfall: section.pitfall,
    bookRef: section.book_ref || null,
    breakdown: section.breakdown || null,
    deepDive: section.deep_dive || null
  };
}
