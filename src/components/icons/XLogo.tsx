import { LucideProps } from "lucide-react";

export const XLogo = (props: LucideProps) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path d="M4 4l11.733 16H20L8.267 4Z" />
            <path d="M4 20l6.768-6.768M13.232 10.768 20 4" />
        </svg>
    );
};
