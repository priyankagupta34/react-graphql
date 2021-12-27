import { Company } from "./Company";

export interface Job {
  id: string;
  title: string;
  description: string;
  company: Company;
}
