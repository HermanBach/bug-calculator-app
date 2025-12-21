import { BugType } from "../enums/BugType.enum"
export interface IBugTemplate {
    id: string,
    type: BugType,
    parameters: Record<string, string>
}