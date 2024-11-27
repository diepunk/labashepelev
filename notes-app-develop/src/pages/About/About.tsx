import style from "./About.module.scss";

const About = () => {
    return (
        <div className={style.about}>
            <h1>Одностраничное приложение заметок</h1>

            <h2>Технологии разработки:</h2>
            <ul>
                <li>Язык программирования TypeScript</li>
                <li>Библиотека React</li>
                <li>Препроцессор SCSS</li>
                <li>CSS modules</li>
                <li>LocalStorage для хранения заметок</li>
                <li>React-router</li>
            </ul>
        </div>
    );
};

export default About;
