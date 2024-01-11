import "./AdminTable.scss";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { useState } from "react";
import Input from "../input/Input";
import Select from "../select/Select";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import Button from "../button/Button";
import {
  doc,
  setDoc,
  getFirestore,
  addDoc,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { FsContext } from "../../../../index";
import { useContext } from "react";
import { getAuth } from "firebase/auth";
import { entryModel } from "../../models/entryModel";
import { groups } from "../../constants/groupOptions";
import { matches } from "../../constants/matchOptions";
import ConfirmModal from "../confirmModal/ConfirmModal";

export default function AdminTable({ dataMapping, data, fetchFunction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [model, setModel] = useState(entryModel);
  const [selectedId, setSelectedId] = useState("");

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const matchOptions = matches;
  const groupOptions = groups;

  getAuth();

  console.log(data);

  const onChange = (e, propName) => {
    setModel({
      ...model,
      [propName]: propName !== "time" ? e.target.value : e,
    });
  };

  const submit = async () => {
    await addDoc(collection(db, "volleyball"), model);
    await resetModal();
  };

  const edit = (item) => {
    let model = { ...item, time: new Date(item.time.seconds * 1000) };
    setSelectedId(item.id);
    delete model.id;
    setModel(model);
    setIsOpen(true);
  };

  const openDelete = (id) => {
    setSelectedId(id);
    setIsConfirmOpen(true);
  };

  const editItem = async () => {
    await setDoc(doc(db, "volleyball", selectedId), model);
    await resetModal();
  };

  const deleteItem = async () => {
    await deleteDoc(doc(db, "volleyball", selectedId));
    setSelectedId("");
    setIsConfirmOpen(false);
    await fetchFunction();
  };

  const resetModal = async (skipFetching = false) => {
    setIsOpen(false);
    setModel({
      awayName: "",
      awayNum: "",
      groupNum: null,
      homeName: "",
      homeNum: "",
      matchNum: null,
      time: new Date(),
    });
    setSelectedId("");
    if (skipFetching) return;
    await fetchFunction();
  };

  const conditionalRow = (item, map) => {
    let row = ``;
    switch (map.key) {
      case "time":
        row = (
          <td key={`${item.id}${map.key}`}>
            {new Date(item[map.key].seconds * 1000).toLocaleString()}
          </td>
        );
        break;
      case "matchNum":
        row = (
          <td key={`${item.id}${map.key}`}>
            {
              matchOptions.find(
                (match) => match.id.toString() === item[map.key]
              )?.text
            }
          </td>
        );
        break;
      case "groupNum":
        row = (
          <td key={`${item.id}${map.key}`}>
            {
              groupOptions.find(
                (group) => group.id.toString() === item[map.key]
              )?.text
            }
          </td>
        );
        break;
      default:
        row = <td key={`${item.id}${map.key}`}>{item[map.key]}</td>;
    }
    return row;
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            {dataMapping &&
              dataMapping.map((map) => <th key={map.id}>{map.text}</th>)}
            <th align="center">
              <Button
                type="ternary"
                text="Kreiraj"
                onClick={() => setIsOpen(true)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => {
              return (
                <tr key={item.id}>
                  {dataMapping &&
                    dataMapping.map((map) => {
                      return conditionalRow(item, map);
                    })}
                  <td align="center">
                    <Button
                      type="secondary"
                      text="Uredi"
                      onClick={() => {
                        edit(item);
                      }}
                    />
                    <br></br>
                    <Button
                      type="danger"
                      text="Obriši"
                      onClick={() => openDelete(item.id)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <Modal
        open={isOpen}
        onClose={() => {
          resetModal(true);
        }}
        center
      >
        <div className="modal-container">
          <Input
            id={`home-name-input`}
            label={`Domaci`}
            placeholder={`Unesite naziv domaceg tima`}
            value={model.homeName}
            onChange={(e) => onChange(e, "homeName")}
          />
          <Input
            id={`away-name-input`}
            label={`Gostujuci`}
            placeholder={`Unesite naziv gostujuceg tima`}
            value={model.awayName}
            onChange={(e) => onChange(e, "awayName")}
          />
          <Input
            id={`home-points-input`}
            label={`Domaci poeni`}
            placeholder={`Unesite poene domaceg tima`}
            value={model.homeNum}
            onChange={(e) => onChange(e, "homeNum")}
          />
          <Input
            id={`away-points-input`}
            label={`Gostujuci poeni`}
            placeholder={`Unesite poene gostujuceg tima`}
            value={model.awayNum}
            onChange={(e) => onChange(e, "awayNum")}
          />
          <Select
            id={`match-num-select`}
            label={`Faza natjecanja`}
            options={matchOptions}
            value={model.matchNum}
            onChange={(e) => onChange(e, "matchNum")}
          />
          <Select
            id={`group-num-select`}
            label={`Grupa`}
            options={groupOptions}
            value={model.groupNum}
            onChange={(e) => onChange(e, "groupNum")}
          />
          <div className={`react-datetime-picker__container`}>
            <span>Pocetak utakmice:</span>
            <DateTimePicker
              onChange={(e) => onChange(e, "time")}
              value={model.time}
            />
          </div>
          <br></br>
        </div>
        <div className={`modal-action`}>
          <Button
            text={!selectedId ? "Kreiraj" : "Uredi"}
            onClick={!selectedId ? submit : editItem}
          />
        </div>
      </Modal>

      <ConfirmModal
        isConfirmOpen={isConfirmOpen}
        setIsConfirmOpen={setIsConfirmOpen}
        deleteItem={deleteItem}
      />
    </>
  );
}
