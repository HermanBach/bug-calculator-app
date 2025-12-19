import { BugType } from "../enums/BugType.enum"
export interface BugTemplate {
    id: string,
    type: BugType,
    parameters: Record<string, string>
}