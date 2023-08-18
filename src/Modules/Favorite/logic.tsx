import { useFavorites } from '../../Graphql/queries/favorite.query';

export default function useFavoriteLogic() {
    const { data: favoritesData, loading: loadingFavorite }= useFavorites();

    return {
        favoritesData,
        loadingFavorite
    };
}
