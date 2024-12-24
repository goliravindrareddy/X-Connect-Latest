export interface EntityDetails {
  id: string;
  projectId: string;
  serialNumber: number;
  entityName: string;
  location: string;
  country: string;
  region: string;
  applicationName: string;
  isScoped: boolean;
  itgcRequired: boolean;
}