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
    const [compareIds, setCompareIds] = useState(() => readArray(STORAGE_KEY));

    useEffect(() => {
        writteArray(STORAGE_KEY, compareIds)
    }, [compareIds]);

    function isCompared(id) {
        return compareIds.includes(id);
    }

    function toggleCompare(id) {
        if (compareIds.includes(id)) {
            setCompareIds(compareIds.filter((c) => c !== id));

        } else if (compareIds.length < MAX_COMPARE) {
            setCompareIds([...compareIds, id]);
        }
    }

    function clearCompare() {
        setCompareIds([]);
    }
    const isFull = compareIds.length >= MAX_COMPARE;
    return {
        compareIds,
        isCompared,
        toggleCompare,
        clearCompare,
        isFull
    };
}