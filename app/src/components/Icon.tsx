import styles from "./Icon.module.css";

export type IconMode = "success" | "warning" | "error" | "default";
export type IconType = "wifi";
export type IconStyle = "regular" | "solid";

export interface IIcon {
  mode: IconMode;
  icon: IconType;
  style: IconStyle;
}

export default function Icon(props: IIcon) {
  return (
    <div
      classList={{
        "fa-regular": props.style === "regular",
        "fa-solid": props.style === "solid",
        "fa-wifi": props.icon === "wifi",
        [styles.success]: props.mode === "success",
        [styles.warning]: props.mode === "warning",
        [styles.error]: props.mode === "error"
      }}
    ></div>
  );
}
