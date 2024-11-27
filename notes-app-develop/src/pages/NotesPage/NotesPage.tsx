import CreateNote from "@components/CreateNote/CreateNote";
import Search from "@components/Search/Search";
import { useEffect, useMemo, useState } from "react";
import style from "./NotesPage.module.scss";
import { NoteType } from "@global/types";
import Note from "@components/Note/Note";
import { useParams } from "react-router-dom";

const NotesPage = () => {
    const [searchValue, setSearchValue] = useState<string>("");

    const [notes, setNotes] = useState<NoteType[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    const createNewNote = (newNote: NoteType) => {
        setNotes((prev) => [...prev, newNote]);
        return;
    };

    const param = useParams();

    useEffect(() => {
        console.log("categories", categories);

        categories.map((cartegory) => {
            const item = JSON.parse(localStorage.getItem(cartegory) || "");
            // console.log("item", item);
            // console.log("Object.keys(item)", Object.keys(item));

            if (Object.keys(item).includes("id")) {
                console.log("item.id ", item.id);
                console.log("param ", param.noteId);

                if (item.id === param.noteId) {
                    console.log("notes", notes);
                    const updatedObj = {
                        title: cartegory,
                        id: param.noteId,
                        data: notes,
                    };
                    localStorage.setItem(cartegory, JSON.stringify(updatedObj));
                    // setNotes(item.data);
                }
            }
        });
    }, [notes]);

    useEffect(() => {
        const keys = Object.keys(localStorage);
        setCategories(keys);
    }, []);
    // }, [Object.keys(localStorage)]);

    useEffect(() => {
        categories.map((category) => {
            if (localStorage.getItem(category)) {
                const item = JSON.parse(localStorage.getItem(category) || "");
                if (Object.keys(item).includes("id")) {
                    if (item.id === param.noteId) {
                        setNotes(item.data);
                    }
                }
            }
        });
    }, [param, categories]);

    const filteredNotes: NoteType[] = useMemo(() => {
        return notes.filter((el) => el.title.toLowerCase().includes(searchValue.toLowerCase().trim()));
    }, [notes, searchValue, categories]);

    const removeNote = (noteTitle: string) => {
        const updatedNotes = notes.filter((noteElement) => noteElement.title !== noteTitle);
        setNotes(updatedNotes);
    };

    return (
        <div className={style.page}>
            <div className={style.header}>
                <CreateNote createNewNote={createNewNote} notes={notes} />
                <Search value={searchValue} setValue={setSearchValue} />
            </div>

            <div className={style.list}>
                {filteredNotes?.map((note) => {
                    return <Note note={note} removeNote={removeNote} />;
                })}
            </div>
        </div>
    );
};

export default NotesPage;
