export interface ITGCControl {
  id: string;
  applicationName: string;
  caNumber: string;
  controlActivity: string;
  isAppApplicable: boolean;
  isOSApplicable: boolean;
  isDBApplicable: boolean;
}

export interface ITGCApplicability {
  id: string;
  applicationName: string;
  controls: string[]; // Array of CA numbers
}