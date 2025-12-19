import { BugTestCase } from "./IBugTestCase.entity";
export interface IBugData {
    name: string,
    description?: string;   // "Adds 1 to number 4"
    jsCode: string;         // "(r) => r === 4 ? 5 : r"
    testCases: BugTestCase[]; // [{action: "2+2", expected: "4", actual: "5"}]
  
    // Для UI багов
    cssCode?: string;       // "button.plus { opacity: 0.5; }"
    behaviorChange?: string; // "Button doesn't respond to clicks"
}