import { NoteType } from "@global/types";
import style from "./Note.module.scss";

type NoteProps = {
    note: NoteType;
    removeNote: (noteTitle: string) => void;
};

const Note = ({ note, removeNote }: NoteProps) => {
    return (
        <div className={style.note} style={{ background: note.color }}>
            <div className={style.title}>{note.title}</div>
            <div
                className={style.remove}
                onClick={() => {
                    removeNote(note.title);
                }}
            >
                X
            </div>
            <div className={style.text}>{note.text}</div>
        </div>
    );
};

export default Note;
