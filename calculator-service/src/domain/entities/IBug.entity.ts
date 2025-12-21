import { IBugTestCase } from "./IBugTestCase.entity"
import { BugType } from "../enums/BugType.enum"

export interface IBug {
    id: string;
    name: string;
    description: string;
    code: string;
    testCases: IBugTestCase[];
    type: BugType;
    isActive: boolean;
    createdAt: Date;
}