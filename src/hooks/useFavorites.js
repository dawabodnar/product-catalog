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
    const [favoriteId, setFavoriteId] = useState(() => readArray(STORAGE_KEY));

    useEffect(() => {
        writteArray(STORAGE_KEY, favoriteId);
    }, [favoriteId]);

    function isFavorite(id) {
        return favoriteId.includes(id);
    }

    function toggleFavorite(id) {
        if (favoriteId.includes(id)) {
            setFavoriteId(favoriteId.filter((f) => f !== id));

        } else {
            setFavoriteId([...favoriteId, id]);
        }
    }

    function clearFavorites() {
        setFavoriteId([]);
    }
    return {
        favoriteId,
        isFavorite,
        toggleFavorite,
        clearFavorites
    };

}