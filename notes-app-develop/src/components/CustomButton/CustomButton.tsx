import { ReactNode } from "react";
import style from "./CustomButton.module.scss";

interface ICustomButtonProps {
    color?: string;
    children: ReactNode;
    onClick?: () => void;
    type?: "submit" | "reset" | "button" | undefined;
}

const CustomButton: React.FC<ICustomButtonProps> = ({ color = "#5191D0", children, onClick, type }) => {
    // const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <button style={{ backgroundColor: color }} className={style.button} onClick={onClick} type={type}>
            {children}
        </button>
    );
};

export default CustomButton;
