import { IBug } from "../entities/IBug.entity";
import { IBugTemplate } from "../entities/IBugTemplate.entity";

export interface IBugFactory {
    createFromTemplate(template: IBugTemplate): IBug
}