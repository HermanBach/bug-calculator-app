import { BugTestCase } from "./IBugTestCase.entity";
export interface Bug {
    id: string,
    name: string,
    jsCode: string,
    testCases: BugTestCase[]
}