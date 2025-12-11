import { TOrganizationTypes } from "@/entities/organization";
import { LucideIcon } from "lucide-react";

export interface ICategory {
  name: string;
  type: TOrganizationTypes;
  icon: LucideIcon;
  color: string;
  count: number;
}
