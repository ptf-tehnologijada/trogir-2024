import "./Table.scss";

export default function Table({ data, isOnePerson = false }) {
  return (
    <table>
      <thead>
        <tr>
          {isOnePerson ? <th>Fakultet</th> : <th>G1</th>}
          {isOnePerson && <th>Sportaš/ica</th>}
          {isOnePerson && <th>Vrijeme</th>}
          {!isOnePerson && <th>Pobjeda</th>}
          {!isOnePerson && <th>Neriješeno</th>}
          {!isOnePerson && <th>Bodovi</th>}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <b>{item.team}</b>
                </td>
                {isOnePerson && (
                  <td>
                    <b>{item.name}</b>
                  </td>
                )}
                {isOnePerson && <td>{item.time}</td>}
                {!isOnePerson && <td>{item.wins}</td>}
                {!isOnePerson && <td>{item.draws}</td>}
                {!isOnePerson && <td>{item.points}</td>}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
