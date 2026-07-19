import { useEffect, useRef } from "react";
import { FaArrowUp } from "react-icons/fa";
export default function BackToTopButton() {

    const buttonRef = useRef(null);

    function showBackToTopButton() {
        if (document.body.scrollTop > 70 || document.documentElement.scrollTop > 70) {
            buttonRef.current.style.opacity = 1;
        } else {
            buttonRef.current.style.opacity = 0;
        }
    }
    function handleBackTopTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    useEffect(() => {
        window.addEventListener('scroll', showBackToTopButton);
        return () => window.removeEventListener('scroll', showBackToTopButton);
    },);
    return (
        <>
            <button className="floatingButton" ref={buttonRef} onPointerDown={handleBackTopTop}>
                <FaArrowUp />
            </button>

        </>
    );
}