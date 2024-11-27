import CustomButton from "@components/CustomButton/CustomButton";
import { useEffect } from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import MenuLink from "./MenuLink/MenuLink";
import style from "./SidebarMenu.module.scss";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

const SidebarMenu = () => {
    const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsCreateCategoryOpen(true);
    };

    const closeModal = () => {
        setIsCreateCategoryOpen(false);
    };

    useEffect(() => {
        if (!isCreateCategoryOpen) {
            setNewCategoryTitle("");
        }
    }, [isCreateCategoryOpen]);

    const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
    const [categories, setCategories] = useState<string[]>([]);

    const createCategory = (categoryTitle: string) => {
        if (localStorage.getItem(categoryTitle.trim())) {
            alert("Такая категория уже существует!");
            return;
        }
        if (categoryTitle.trim() === "") {
            alert("Нельзя задать пустое название категории!");
            return;
        }
        const newCategory = {
            id: uuid(),
            title: categoryTitle,
            data: [],
        };
        localStorage.setItem(categoryTitle, JSON.stringify(newCategory));
        setCategories((prev) => [...prev, newCategory.title]);
        closeModal();
    };

    useEffect(() => {
        const keys = Object.keys(localStorage);
        setCategories(keys);
    }, []);

    const validateIsCategory = (data: string | null): boolean => {
        if (!data) {
            return false;
        }
        const potentialCategory = JSON.parse(data);

        if (Object.keys(potentialCategory).includes("id")) {
            return true;
        }
        return false;
    };

    const navigate = useNavigate();

    const removeCategory = (categoreToRemove: string) => {
        const updatedCategories = categories.filter((categEl) => categEl !== categoreToRemove);
        localStorage.removeItem(categoreToRemove);
        navigate("/");
        setCategories(updatedCategories);
    };

    return (
        <nav className={style.menu}>
            <MenuLink title="Домашняя страница" path="" />
            <MenuLink title="О нас" path="/about" />

            <div className={style.menuList}>
                {categories.map((category) => {
                    if (
                        validateIsCategory(localStorage.getItem(category)) &&
                        typeof localStorage.getItem(category) === "string"
                    ) {
                        const categ = JSON.parse(localStorage.getItem(category) || "");
                        return (
                            <MenuLink
                                key={categ.id}
                                title={categ.title}
                                path={categ.id}
                                removeCategory={() => removeCategory(category)}
                            />
                        );
                    }
                    return null;
                })}
            </div>

            <div className={style.addCategory} onClick={openModal}>
                + Новая категория
            </div>

            <Popup
                open={isCreateCategoryOpen}
                onClose={closeModal}
                modal
                overlayStyle={{
                    background: "rgba(0, 0, 0, 0.5)",
                }}
                contentStyle={{ background: "#fff" }}
            >
                <div className={style.popup}>
                    <h1>Укажите название новой категории</h1>
                    <input
                        value={newCategoryTitle}
                        placeholder="название категории"
                        onChange={(e) => setNewCategoryTitle(e.target.value)}
                    />
                    <CustomButton onClick={() => createCategory(newCategoryTitle.trim())}> Создать </CustomButton>
                </div>
            </Popup>
        </nav>
    );
};

export default SidebarMenu;
