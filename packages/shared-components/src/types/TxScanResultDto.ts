import { CheckDto, CheckStatusDto } from "@shared-types";

export interface TxScanResultDto {
  status: CheckStatusDto;
  url: string | null;
  checks: CheckDto[];
}
