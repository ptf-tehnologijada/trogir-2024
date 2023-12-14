import "./Table.scss";

export default function Table({ data }) {
  return (
    <table>
      <thead>
        <tr>
          <th>S1</th>
          <th>Pobjeda</th>
          <th>Bodovi</th>
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item) => {
            return (
              <tr>
                <td>
                  <b>{item.faculty}</b>
                </td>
                <td>{item.wins}</td>
                <td>{item.points}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
