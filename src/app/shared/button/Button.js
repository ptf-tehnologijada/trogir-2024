import "./Button.scss";

export default function Button(props) {
  return (
    <>
      <button
        data-testid={"c-button"}
        className={`c-button c-button--${props.type ? props.type : "primary"}`}
        onClick={props.onClick}
      >
        {props.text}
      </button>
    </>
  );
}
