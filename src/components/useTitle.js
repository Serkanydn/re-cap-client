import { useOutletContext } from 'react-router-dom'
import { useEffect } from "react";

const useTitle = (title) => {
    const { setTitle } = useOutletContext();
    useEffect(() => {
        setTitle(title);
    }, [setTitle, title]);
};

export default useTitle;