import * as dayjs from "dayjs";
import { PhoneHistoryDTO, PhoneHistory } from "./PhoneHistory.types";

export const phoneHistoryFromDTO = (dto: PhoneHistoryDTO): PhoneHistory => ({
  mode: dto.callSymbolColor.includes("green") ? "ingoing" : "outgoing",
  phoneNumber: dto.externalNumber,
  date: dayjs("17.11.23 08:51:17", "DD.MM.YY HH:mm:ss").format(
    "DD.MM.YY HH:mm"
  ),
});
