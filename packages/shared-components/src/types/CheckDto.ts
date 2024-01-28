export enum CheckStatusDto {
  NA = "NA",
  KO = "KO",
  WARNING = "WARNING",
  OK = "OK",
}

export interface CheckDto {
  name: string;
  status: CheckStatusDto;
  compareFrom: any;
  compareTo: any;
  message: string;
}
