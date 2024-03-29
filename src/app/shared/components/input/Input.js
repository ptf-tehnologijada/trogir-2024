import "./Input.scss";

export default function Input(props) {
  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.label}:</label>
        <input
          id={props.id}
          className={"c-input"}
          data-testid={"c-input"}
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
          checked={props.checked}
        />
      </div>
    </>
  );
}
