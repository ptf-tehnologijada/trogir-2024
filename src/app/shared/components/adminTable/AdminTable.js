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
import { types } from "../../constants/typeOptions";
import ConfirmModal from "../confirmModal/ConfirmModal";
import { entryModelSoloSport } from "../../models/entryModelSoloSport";

export default function AdminTable({
  dataMapping,
  data,
  fetchFunction,
  path,
  genderSelect = false,
  gender = 1,
  isSoloSport = false,
  showGenerate = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSoloSportOpen, setIsSoloSportOpen] = useState(false);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [model, setModel] = useState(
    !genderSelect
      ? entryModel
      : !isSoloSport
      ? { ...entryModel, gender: gender }
      : { ...entryModelSoloSport, gender: gender }
  );
  const [faculties, setFaculties] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const app = useContext(FsContext);

  const db = getFirestore(app);

  const matchOptions = matches;
  const groupOptions = groups;
  const typeOptions = types;

  getAuth();

  const onChange = (e, propName) => {
    setModel({
      ...model,
      [propName]:
        propName === "time"
          ? e
          : propName === "initialValue"
          ? e.target.checked
          : e.target.value,
    });
  };

  const submit = async () => {
    console.log(model);
    await addDoc(collection(db, path), model);
    await resetModal();
  };

  const edit = (item) => {
    let model = !isSoloSport
      ? { ...item, time: new Date(item.time.seconds * 1000) }
      : item;
    setSelectedId(item.id);
    delete model.id;
    setModel(model);
    !isSoloSport ? setIsOpen(true) : setIsSoloSportOpen(true);
  };

  const openDelete = (id) => {
    setSelectedId(id);
    setIsConfirmOpen(true);
  };

  const editItem = async () => {
    await setDoc(doc(db, path, selectedId), model);
    await resetModal();
  };

  const deleteItem = async () => {
    await deleteDoc(doc(db, path, selectedId));
    setSelectedId("");
    setIsConfirmOpen(false);
    await fetchFunction();
  };

  const resetModal = async (skipFetching = false) => {
    !isSoloSport ? setIsOpen(false) : setIsSoloSportOpen(false);
    setModel(
      !genderSelect
        ? entryModel
        : !isSoloSport
        ? { ...entryModel, gender: gender }
        : { ...entryModelSoloSport, gender: gender }
    );
    setSelectedId("");
    if (skipFetching) return;
    await fetchFunction();
  };

  const generate = async () => {
    const teams = faculties.split(",");
    const matches = [];

    // Iterate through each team
    for (let i = 0; i < teams.length; i++) {
      // Iterate through remaining teams
      for (let j = i + 1; j < teams.length; j++) {
        // Create match object
        const match = {
          awayName: teams[j],
          awayNum: "-",
          groupNum: 1,
          homeName: teams[i],
          homeNum: "-",
          matchNum: 1,
          time: new Date(),
          entryType: 1,
        };

        // Push match object into matches array
        matches.push(match);
      }
    }

    await Promise.all(
      matches.map(async (match, index) => {
        await addDoc(collection(db, path), match);
      })
    );

    console.log(matches);

    return matches;
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
              {showGenerate && (
                <Button
                  type="ternary"
                  text="Generiraj"
                  onClick={() => setIsGenerateOpen(true)}
                />
              )}
              <Button
                type="ternary"
                text="Kreiraj"
                onClick={() =>
                  !isSoloSport ? setIsOpen(true) : setIsSoloSportOpen(true)
                }
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
            label={`Domaći`}
            placeholder={`Unesite naziv domaćeg tima`}
            value={model.homeName}
            onChange={(e) => onChange(e, "homeName")}
          />
          <Input
            id={`away-name-input`}
            label={`Gostujući`}
            placeholder={`Unesite naziv gostujućeg tima`}
            value={model.awayName}
            onChange={(e) => onChange(e, "awayName")}
          />
          <Input
            id={`home-points-input`}
            label={`Domaći poeni`}
            placeholder={`Unesite poene domaćeg tima`}
            value={model.homeNum}
            onChange={(e) => onChange(e, "homeNum")}
          />
          <Input
            id={`away-points-input`}
            label={`Gostujući poeni`}
            placeholder={`Unesite poene gostujućeg tima`}
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
          <Select
            id={`entry-type-select`}
            label={`Tip unosa utakmice`}
            options={typeOptions}
            value={model.entryType}
            onChange={(e) => onChange(e, "entryType")}
          />
          <div className={`react-datetime-picker__container`}>
            <span>Početak utakmice:</span>
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

      <Modal
        open={isSoloSportOpen}
        onClose={() => {
          resetModal(true);
        }}
        center
      >
        <div className="modal-container">
          <Input
            id={`faculty-input`}
            label={`Fakultet`}
            placeholder={`Unesi naziv fakulteta`}
            value={model.faculty}
            onChange={(e) => onChange(e, "faculty")}
          />
          <Input
            id={`name-input`}
            label={`Sportaš/ica`}
            placeholder={`Unesi ime i prezime sportaša/ice`}
            value={model.name}
            onChange={(e) => onChange(e, "name")}
          />
          <Input
            id={`time-input`}
            label={`Vrijeme`}
            placeholder={`Unesite vrijeme`}
            value={model.time_solo}
            onChange={(e) => onChange(e, "time_solo")}
          />
        </div>
        <div className={`modal-action`}>
          <Button
            text={!selectedId ? "Kreiraj" : "Uredi"}
            onClick={!selectedId ? submit : editItem}
          />
        </div>
      </Modal>

      <Modal
        open={isGenerateOpen}
        onClose={() => {
          setFaculties("");
          setIsGenerateOpen(false);
        }}
        center
      >
        <div className="modal-container">
          <Input
            id={`generate-input`}
            label={`Fakulteti`}
            placeholder={`Unesi nazive fakulteta`}
            value={faculties}
            onChange={(e) => setFaculties(e.target.value)}
          />
        </div>
        <div className={`modal-action`}>
          <Button text={`Generiraj`} onClick={generate} />
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
