import style from "./Search.module.scss";

interface SearchProps {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

const Search: React.FC<SearchProps> = ({ value, setValue }) => {
    return (
        <input
            className={style.search}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Поиск.."
        />
    );
};

export default Search;
