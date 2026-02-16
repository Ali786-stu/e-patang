import { useEffect } from "react";

export default function Preloader({ onComplete }) {
    useEffect(() => {
        // Trigger site reveal immediately
        onComplete();
    }, [onComplete]);

    return null;
}
