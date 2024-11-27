import CustomButton from "@components/CustomButton/CustomButton";
import { NoteType } from "@global/types";
import { useState } from "react";
import style from "./CreateNote.module.scss";

type CreateNoteProps = {
    createNewNote: (newNote: NoteType) => void;
    notes: NoteType[];
};

const CreateNote = ({ createNewNote, notes }: CreateNoteProps) => {
    const [noteTitle, setNoteTitle] = useState<string>("");
    const [noteText, setNoteText] = useState<string>("");
    const [noteColor, setNoteColor] = useState<string>("#f6c36c");

    const createNewNoteFunc = (newNoteItem: NoteType) => {
        const titles = notes.map((el) => el.title.trim());

        if (newNoteItem.title.trim() === "") {
            alert("Заполните название заметки");
            return;
        }
        if (titles.includes(newNoteItem.title.trim())) {
            alert("Запись с таким названием уже есть!");
            return;
        }
        setNoteTitle("");
        setNoteText("");
        createNewNote(newNoteItem);
    };

    return (
        <div className={style.form}>
            <div>
                <input
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="Название заметки"
                />
            </div>
            <div>
                <input value={noteText} onChange={(e) => setNoteText(e.target.value)} placeholder="Текст заметки" />
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                <ColorPicker currentColor={noteColor} setCurrentColor={setNoteColor} />
                <CustomButton onClick={() => createNewNoteFunc({ title: noteTitle, text: noteText, color: noteColor })}>
                    Добавить
                </CustomButton>
            </div>
        </div>
    );
};

type ColorPickerProps = {
    currentColor: string;
    setCurrentColor: React.Dispatch<React.SetStateAction<string>>;
};

const ColorPicker = ({ currentColor, setCurrentColor }: ColorPickerProps) => {
    const colors = ["#f6c36c", "#f6966d", "#00cdf6", "#79fbd6"] as const;

    return (
        <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
            {colors.map((color) => {
                return (
                    <div
                        key={color}
                        onClick={() => setCurrentColor(color)}
                        style={{
                            background: color,
                            borderRadius: "50%",
                            width: "40px",
                            height: "40px",
                            border: currentColor === color ? "5px solid #285245" : "",
                        }}
                    ></div>
                );
            })}
        </div>
    );
};

export default CreateNote;
