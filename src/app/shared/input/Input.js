import "./Input.scss";

export default function Input(props) {
  return (
    <>
      <input
        className={"c-input"}
        data-testid={"c-input"}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
      />
    </>
  );
}
