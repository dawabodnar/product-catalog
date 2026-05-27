import {
    readArray,
    writteArray
} from '../utils/storage';
import {
    useState,
    useEffect
} from 'react';

const STORAGE_KEY = 'product-catalog:favorites';

export function useFavorites() {
    const [favoriteIds, setFavoriteIds] = useState(() => readArray(STORAGE_KEY));

    useEffect(() => {
        writteArray(STORAGE_KEY, favoriteIds);
    }, [favoriteIds]);

    function isFavorite(id) {
        return favoriteIds.includes(id);
    }

    function toggleFavorite(id) {
        if (favoriteIds.includes(id)) {
            setFavoriteIds(favoriteIds.filter((f) => f !== id));

        } else {
            setFavoriteIds([...favoriteIds, id]);
        }
    }

    function clearFavorites() {
        setFavoriteIds([]);
    }
    return {
        favoriteIds,
        isFavorite,
        toggleFavorite,
        clearFavorites
    };

}