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
  onlyPoints = false,
}) {
  const [isAdditionalOpen, setIsAdditionalOpen] = useState(false);

  return (
    <>
      <table>
        <thead>
          <tr>
            {isOnePerson ? <th>Fakultet</th> : <th>{tag}</th>}
            {isOnePerson && !onlyPoints && <th>Sportaš/ica</th>}
            {isOnePerson && <th>{!onlyPoints ? "Vrijeme" : "Bodovi"}</th>}
            {!isOnePerson && <th>W</th>}
            {!isOnePerson && !hideDraw && <th>D</th>}
            {!isOnePerson && <th>P</th>}
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <b>{!isOnePerson ? item.team : item.faculty}</b>
                    </td>
                    {isOnePerson && !onlyPoints && (
                      <td>
                        <b>{item.name}</b>
                      </td>
                    )}
                    {isOnePerson && <td>{item.time_solo}</td>}
                    {!isOnePerson && <td>{item.wins}</td>}
                    {!isOnePerson && !hideDraw && <td>{item.draws}</td>}
                    {!isOnePerson && <td>{item.points}</td>}
                  </tr>
                );
              })
            : [1, 2, 3, 4].map((item, index) => {
                return (
                  <tr key={index}>
                    <td>-</td>
                    {isOnePerson && <td></td>}
                    {isOnePerson && !onlyPoints && <td></td>}
                    {!isOnePerson && <td></td>}
                    {!isOnePerson && !hideDraw && <td></td>}
                    {!isOnePerson && <td></td>}
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
