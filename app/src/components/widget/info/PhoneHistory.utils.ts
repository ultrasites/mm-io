import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export interface PhoneHistoryDTO {
  date: string;
  externalNumber: string;
  callSymbolColor: string;
}

export interface PhoneHistory {
  date: string;
  phoneNumber: string;
  mode: "ingoing" | "outgoing";
}

export const phoneHistoryFromDTO = (dto: PhoneHistoryDTO): PhoneHistory => ({
  mode: dto.callSymbolColor.includes("green") ? "ingoing" : "outgoing",
  phoneNumber: dto.externalNumber,
  date: dayjs("17.11.23 08:51:17", "DD.MM.YY HH:mm:ss").format(
    "DD.MM.YY HH:mm"
  ),
});
