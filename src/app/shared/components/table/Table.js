import "./Table.scss";
import Button from "../button/Button";
import { useState } from "react";
import ResultCard from "../resultCard/ResultCard";
import Modal from "react-responsive-modal";

export default function Table({
  data,
  matches,
  tag,
  isOnePerson = false,
  showAdditional = false,
  hideDraw = false,
}) {
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);

  return (
    <>
      <table>
        <thead>
          <tr>
            {isOnePerson ? <th>Fakultet</th> : <th>{tag}</th>}
            {isOnePerson && <th>Sportaš/ica</th>}
            {isOnePerson && <th>Vrijeme</th>}
            {!isOnePerson && <th>W</th>}
            {!isOnePerson && !hideDraw && <th>D</th>}
            {!isOnePerson && <th>P</th>}
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
                  {!isOnePerson && !hideDraw && <td>{item.draws}</td>}
                  {!isOnePerson && <td>{item.points}</td>}
                </tr>
              );
            })}
        </tbody>
      </table>
      {showAdditional && (
        <div className="c-additional__action">
          <Button
            type="secondary"
            text={"Prikaži utakmice"}
            onClick={() => setIsAdditionalOpen(true)}
          ></Button>
        </div>
      )}

      <Modal open={isAdditionalOpen} onClose={() => setIsAdditionalOpen(false)}>
        <div className="c-additional__modal">
          {matches &&
            matches.map((match) => (
              <ResultCard key={match.id} data={match}></ResultCard>
            ))}
        </div>
      </Modal>
    </>
  );
}
