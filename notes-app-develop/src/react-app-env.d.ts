/// <reference types="react-scripts" />
declare module '*.css' {
    interface IClassNames {
      [className: string]: string
    }
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.svg';
declare module '*.jpg';


declare module '*.scss' {
    const content: Record<string, string>;
    export default content;
}

  declare module JSX {
    interface IntrinsicElements {
        a: React.HTMLAttributes;
        abbr: React.HTMLAttributes;
        div: React.HTMLAttributes;
        span: React.HTMLAttributes;
   }
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}