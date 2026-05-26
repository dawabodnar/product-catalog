import {
    useState,
    useEffect
} from "react";
import {
    readArray,
    writteArray
} from '../utils/storage';

const STORAGE_KEY = 'product-catalog:compare';
export const MAX_COMPARE = 3;

export function useCompare() {
    const [compareId, setCompareId] = useState(() => readArray(STORAGE_KEY));

    useEffect(() => {
        writteArray(STORAGE_KEY, compareId)
    }, [compareId]);

    function isCompare(id) {
        return compareId.includes(id);
    }

    function toggleCompare(id) {
        if (compareId.includes(id)) {
            setCompareId(compareId.filter((c) => c !== id));

        } else if (compareId.length < MAX_COMPARE) {
            setCompareId([...compareId, id]);
        }
    }

    function clearCompare() {
        setCompareId([]);
    }
    const isFull = compareId.length >= MAX_COMPARE;
    return {
        compareId,
        isCompare,
        toggleCompare,
        clearCompare,
        isFull
    };
}