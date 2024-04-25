import "./ResultCard.scss";

export default function ResultCard({ data }) {
  return (
    <div className="c-result-card">
      <div className="c-result-card__header">
        <p className="c-result-card__header-text">
          {data
            ? new Date(data.time.seconds * 1000).toLocaleString([], {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "-"}
        </p>
      </div>
      <div className="c-result-card__result">
        {data ? (
          <p
            className={
              Number(data.homeNum) > Number(data.awayNum)
                ? "c-result-card__result--winner"
                : ""
            }
          >
            {data.homeName}: {data.homeNum}
          </p>
        ) : (
          <p>{"Domaci"}: -</p>
        )}
        {data ? (
          <p
            className={
              Number(data.homeNum) < Number(data.awayNum)
                ? "c-result-card__result--winner"
                : ""
            }
          >
            {data.awayName}: {data.awayNum}
          </p>
        ) : (
          <p>{"Gosti"}: -</p>
        )}
      </div>
    </div>
  );
}
