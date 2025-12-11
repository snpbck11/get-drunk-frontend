import { IOrganization } from "@/entities/organization";

export interface IGetOrganizationsRequest {
  page: number;
  limit: number;
}

export interface IGetOrganizationsResponse {
  items: IOrganization[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface IGetOrganizationByInnResponse {
  suggestions: [{ data: { emails: string[]; phones: string[] } }];
}
