import "./Select.scss";

export default function Select(props) {
  return (
    <>
      <div>
        <label htmlFor={props.id}>{props.label}:</label>
        <select
          id={props.id}
          className={"c-select"}
          data-testid={"c-select"}
          value={props.value}
          onChange={props.onChange}
          onKeyDown={props.onKeyDown}
        >
          {props.options &&
            props.options.map((option) => {
              return (
                <option key={option.id} value={option.id}>
                  {option.text}
                </option>
              );
            })}
        </select>
      </div>
    </>
  );
}
