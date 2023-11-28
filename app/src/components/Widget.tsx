import { IconMode } from "./Icon";
import styles from "./Widget.module.css";
import State from "./State";
import { StateType } from "./State";
import { createSignal, onCleanup, onMount, useContext } from "solid-js";
import { AppContext } from "./AppProvider";
import {
  WidgetConfig,
  WidgetType,
  isInfoWidget,
  isFritzboxPhone,
  generateTopic,
  Device,
  isShelly,
} from "./Widget.utils";
import { Subscription, map } from "rxjs";
import PhoneInfo from "./widget/info/PhoneInfo";
import ToggleButton from "./ToggleButton";
import Button from "./Button";
import Modal from "./Modal";
import { phoneRing$ } from "./widget/info/PhoneInfo.ovservables";
import PhoneHistory from "./widget/info/PhoneHistory";
import WidgetDetails from "./widget/details/WidgetDetails";
import WidgetHeader from "./widget/WidgetHeader";

export interface IWidget {
  onClick?: () => void;
  config: WidgetConfig<WidgetType, Device>;
}

export default function Widget(props: IWidget) {
  const { mqtt } = useContext(AppContext);
  const subscription: Subscription = new Subscription();

  const isInfo = isInfoWidget(props.config.type);
  const config = props.config;
  const id = `${props.config.name}-${props.config.type}-${props.config.device}`;

  const [connected, setConnected] = createSignal<IconMode>("warning");
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

  const showModal = () =>
    (document.getElementById(id) as HTMLDialogElement).showModal();

  const closeModal = () =>
    (document.getElementById(id) as HTMLDialogElement).close();

  onMount(() => {
    Object.values(config.topics).map((topic) =>
      mqtt?.subscribe(generateTopic(config.id, topic))
    );
    subscription.add(connected$.subscribe());

    if (isFritzboxPhone(config)) {
      subscription.add(
        phoneRing$(mqtt!, config, (ring, phoneNumber) => {
          setPhoneNumber(ring ? phoneNumber : "");
          if (ring) {
            showModal();
          } else {
            closeModal();
          }
        }).subscribe()
      );
    }
  });

  onCleanup(() => {
    Object.values(config.topics).map((topic) =>
      mqtt?.unsubcribe(generateTopic(config.id, topic))
    );
    subscription?.unsubscribe();
  });

  const renderModal = () => {
    if (isFritzboxPhone(config)) {
      return (
        <PhoneInfo
          config={config}
          mode="incomingCall"
          phoneNumber={phoneNumber()}
        />
      );
    } else if (isShelly(config)) {
      return (
        <WidgetDetails
          config={config}
          values={{
            connected: true,
            uptime: 500,
            state: "connecting",
            value: 45,
          }}
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
        onClick={() => !isFritzboxPhone(config) && showModal()}
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
          <WidgetHeader
            mode={connected()}
            name={config.name}
            position={config.position}
          />
          <div>
            {isFritzboxPhone(config) && <PhoneHistory config={config} />}
            {!isInfo && <State state={state().state} value={state().value} />}
          </div>
        </div>
        {!isInfo && (
          <div class={styles.quickIncludes}>{renderQuickIncludes()}</div>
        )}
      </div>
      <Modal id={id}>{renderModal()}</Modal>
    </>
  );
}
