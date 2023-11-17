import { useI18n } from "@amoutonbrady/solid-i18n";
import Icon from "../../Icon";
import styles from "./PhoneInfo.module.css";
import { WidgetConfig } from "../../Widget.utils";

export interface IPhoneInfo {
  config: WidgetConfig<"PHONE", "Fritzbox">;
  mode: "incomingCall" | "activeCall";
  phoneNumber?: string;
}

//TODO analyse and implement "activeCall" with duration programatically

export default function PhoneInfo(props: IPhoneInfo) {
  const [t] = useI18n();

  return (
    <>
      {props.phoneNumber && (
        <div class={styles.phoneInfo}>
          <div>
            <Icon icon="phone" mode="success" style="solid" size="big" />
          </div>
          <div>
            <div
              classList={{
                // [styles.error]: props.mode === "incomingCall",
                [styles.success]: true,
              }}
            >
              {t(props.mode === "activeCall" ? "activeCall" : "incomingCall")}
            </div>
            <div class={styles.phoneNumber}>{props.phoneNumber}</div>
          </div>
        </div>
      )}
    </>
  );
}
