import Header from "@components/Header/Header";
import SidebarMenu from "@components/SidebarMenu/SidebarMenu";
import About from "@pages/About/About";
import Landing from "@pages/Landing/Landing";
import NotesPage from "@pages/NotesPage/NotesPage";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const App = () => {
    const [theme, setTheme] = useState<"day" | "night">((sessionStorage.getItem("theme") as "day" | "night") || "day");

    document.body.style.backgroundColor = theme === "day" ? "#f8f4f4" : "#22272e";
    document.body.style.color = theme === "day" ? "#22272e" : "#f8f4f4";

    useEffect(() => {
        setTimeout(() => {
            const links = document.getElementsByTagName("a");
            for (let i = 0; i < links.length; i++) {
                links[i].style.color = theme === "day" ? "#22272e" : "#f8f4f4";
            }
        }, 10);
    }, [theme, localStorage.length]);

    return (
        <div className="app">
            <Header theme={theme} setTheme={setTheme} />
            <SidebarMenu />

            <main>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/:noteId" element={<NotesPage />} />
                </Routes>
            </main>
        </div>
    );
};

export default App;
