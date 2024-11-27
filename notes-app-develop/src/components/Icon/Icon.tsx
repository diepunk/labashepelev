import { useState } from "react";
import style from "./Icon.module.scss";

interface IconProps {
    iconPath: any;
    size?: number;
    color?: string;
    hoverColor?: string;
}

const Icon: React.FC<IconProps> = ({ iconPath, size = 20, color = "#000000", hoverColor = "#000000" }) => {
    const [isHover, setIsHover] = useState<boolean>(false);

    return (
        <svg
            className={style.icon}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill={isHover ? hoverColor : color}
            xmlns="http://www.w3.org/2000/svg"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
        >
            {iconPath}
        </svg>
    );
};

export default Icon;
