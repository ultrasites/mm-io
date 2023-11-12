import { useI18n } from "@amoutonbrady/solid-i18n";
import Icon from "../../Icon";
import styles from "./PhoneInfo.module.css";
import { createSignal, onCleanup, onMount, useContext } from "solid-js";
import { Subscription, combineLatest, map } from "rxjs";
import { WidgetConfig, generateTopic } from "../../Widget.utils";
import { AppContext } from "../../AppProvider";

export interface IPhoneInfo {
  config: WidgetConfig<"PHONE", "Fritzbox">;
}

//TODO analyse and implement "activeCall" with duration programatically

export default function PhoneInfo(props: IPhoneInfo) {
  const [t] = useI18n();
  const { mqtt } = useContext(AppContext);

  const subscription: Subscription = new Subscription();

  const [phoneNumber, setPhoneNumber] = createSignal<string | undefined>(
    undefined
  );

  const [mode, setMode] = createSignal<
    "incomingCall" | "activeCall" | undefined
  >(undefined);

  const phoneRing$ = combineLatest([
    mqtt!.observe<boolean>(
      generateTopic(props.config.id, props.config.topics.ring)
    ),
    mqtt!.observe<string>(
      generateTopic(props.config.id, props.config.topics.ringNumber)
    ),
  ]).pipe(
    map(([ring, phoneNumber]) => {
      if (ring) {
        setPhoneNumber(phoneNumber);
        setMode("incomingCall");
      } else {
        setPhoneNumber(undefined);
        setMode(undefined);
      }
    })
  );

  onMount(() => {
    subscription.add(phoneRing$.subscribe());
  });

  onCleanup(() => {
    subscription.unsubscribe();
  });
  return (
    <>
      {mode() && (
        <div class={styles.phoneInfo}>
          <div>
            <Icon
              icon="phone"
              mode={mode() === "activeCall" ? "success" : "error"}
              style="solid"
              size="big"
            />
          </div>
          <div>
            <div
              classList={{
                [styles.error]: mode() === "incomingCall",
                [styles.success]: mode() === "activeCall",
              }}
            >
              {t(mode() === "activeCall" ? "activeCall" : "incomingCall")}
            </div>
            <div class={styles.phoneNumber}>{phoneNumber()}</div>
          </div>
        </div>
      )}
    </>
  );
}
