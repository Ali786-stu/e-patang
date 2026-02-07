import React, { useState, useEffect } from 'react';

const Typewriter = ({ text }) => {
    const [currentText, setCurrentText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    useEffect(() => {
        let timer;

        if (isDeleting) {
            timer = setTimeout(() => {
                setCurrentText(prev => prev.slice(0, -1));
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setCurrentText(text.substring(0, currentIndex + 1));
                setCurrentIndex(prev => prev + 1);
            }, typingSpeed);
        }

        if (!isDeleting && currentText === text) {
            clearTimeout(timer);
            timer = setTimeout(() => setIsDeleting(true), pauseTime);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setCurrentIndex(0);
            setLoopNum(loopNum + 1);
        }

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentIndex, text, loopNum]);

    // Split words to apply styling
    const words = currentText.split(' ');

    return (
        <span>
            {words.map((word, i) => {
                // Simple check for key words to color
                const isHighlight = word.includes("Success") || word.includes("Minds");
                return (
                    <span key={i} className={`${isHighlight ? "text-[#44D79E]" : "text-inherit"} inline-block mr-2 md:mr-3`}>
                        {word}
                    </span>
                );
            })}
            <span className="animate-pulse text-[#44D79E]">|</span>
        </span>
    );
};

export default Typewriter;
