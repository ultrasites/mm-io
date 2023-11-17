import Icon, { IconMode } from "./Icon";
import styles from "./Widget.module.css";
import State from "./State";
import { StateType } from "./State";
import { createSignal, onCleanup, onMount, useContext } from "solid-js";
import { AppContext } from "./AppProvider";
import {
  WidgetConfig,
  WidgetType,
  isInfoWidget,
  isPhone,
  generateTopic,
  Device,
} from "./Widget.utils";
import { Subscription, map } from "rxjs";
import PhoneInfo from "./widget/info/PhoneInfo";
import ToggleButton from "./ToggleButton";
import Button from "./Button";
import Modal from "./Modal";
import { phoneRing$ } from "./widget/info/PhoneInfo.ovservables";
import PhoneHistory from "./widget/info/PhoneHistory";

export interface IWidget {
  onClick?: () => void;
  config: WidgetConfig<WidgetType, Device>;
}

export default function Widget(props: IWidget) {
  const { mqtt, event } = useContext(AppContext);
  const subscription: Subscription = new Subscription();

  const isInfo = isInfoWidget(props.config.type);
  const config = props.config;

  const [connected, setConnected] = createSignal<IconMode>("warning");
  const [modal, setModal] = createSignal<boolean>(false);
  const [state, setState] = createSignal<{ state: StateType; value?: string }>({
    state: "connecting",
  });
  const [phoneNumber, setPhoneNumber] = createSignal<string>("");

  const connected$ = mqtt!
    .observe<boolean>(generateTopic(config.id, config.topics.connected))
    .pipe(
      map((message) => {
        setConnected(message ? "success" : "error");
        setState({ state: message ? "idle" : "error" });
      })
    );

  onMount(() => {
    Object.values(config.topics).map((topic) =>
      mqtt?.subscribe(generateTopic(config.id, topic))
    );
    subscription.add(connected$.subscribe());

    if (isPhone(config)) {
      subscription.add(
        phoneRing$(mqtt!, config, (ring, phoneNumber) => {
          setPhoneNumber(ring ? phoneNumber : "");
          setModal(ring);
        }).subscribe()
      );
    }

    event?.on("showModal", (payload) => {
      console.log(payload);
      return setModal(payload);
    });
  });

  onCleanup(() => {
    Object.values(config.topics).map((topic) =>
      mqtt?.unsubcribe(generateTopic(config.id, topic))
    );
    subscription?.unsubscribe();
  });

  const renderModal = () => {
    if (isPhone(config)) {
      return (
        <PhoneInfo
          config={config}
          mode="incomingCall"
          phoneNumber={phoneNumber()}
        />
      );
    }
  };

  const renderQuickIncludes = () => {
    switch (config.type) {
      case "PLUG":
        return <ToggleButton onClick={async (_isActive) => {}} />;
      case "SHUTTER":
        return (
          <>
            <Button onClick={async () => {}}>
              <i class="fa-chevron-up fa-solid" />
            </Button>
            <Button onClick={async () => {}}>
              <i class="fa-chevron-down fa-solid" />
            </Button>
          </>
        );
      case "DIMMED_LIGHT":
        return <ToggleButton onClick={async (_isActive) => {}} />;
      case "GARAGE_GATE":
        return (
          <>
            <Button onClick={async () => {}}>
              <i class="fa-chevron-up fa-solid" />
            </Button>
            <Button onClick={async () => {}}>
              <i class="fa-chevron-down fa-solid" />
            </Button>
          </>
        );
    }
  };

  return (
    <>
      <div
        onClick={() => !isPhone(config) && setModal(true)}
        classList={{
          [styles.widget]: true,
          [styles.info]: isInfo,
        }}
      >
        <div
          classList={{
            [styles.content]: true,
            // [styles.infoContent]: isInfo,
            // [styles.actionContent]: !isInfo,
          }}
        >
          <div>
            <div>
              {config.name}{" "}
              <Icon icon="wifi" mode={connected()} style="solid" />
            </div>
            <div class={styles.position}>{config.position}</div>
          </div>
          <div>
            {isPhone(config) && <PhoneHistory config={config} />}
            {!isInfo && <State state={state().state} value={state().value} />}
          </div>
        </div>
        {!isInfo && (
          <div class={styles.quickIncludes}>{renderQuickIncludes()}</div>
        )}
      </div>
      {modal() && (
        <Modal onClickBackground={() => setModal(false)}>{renderModal()}</Modal>
      )}
    </>
  );
}
