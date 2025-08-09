import { useEffect, useState } from "react";

export function useKeyPress(targetKeys, withModifier = false) {
    const [keyPressed, setKeyPressed] = useState (false);
    const keys = Array.isArray(targetKeys) ? targetKeys : [targetKeys];

    useEffect (() => {
        const downHandler = ({key, ctrlKey, metaKey}) => {
            if(keys.includes(key) && (!withModifier || ctrlKey || metaKey)) {
                setKeyPressed(true);
            }
        };

        const upHandler = ({key}) => {
            if (keys.includes(key)) {
                setKeyPressed(false)
            }
        };

        window.addEventListener('keydown', downHandler);
        window.addEventListener('keyup', upHandler);

        return ()=> {
            window.removeEventListener('keydown', downHandler);
            window.removeEventListener('keyup', upHandler);
        };
    }, [keys, withModifier]);

    return keyPressed;
}