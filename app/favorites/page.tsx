import getCurrentUser from "../actions/getCurrentUser";
import getFavorites from "../actions/getFavorites";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import FavoriteClient from "./FavoriteClient";

const Favorites = async () => {

    const listings = await getFavorites();
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
        return (
        
            <ClientOnly>
                <EmptyState
                    title=" No favorites found"
                    subtitle="Looks like you have no favorites listings"
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <FavoriteClient
                listings= {listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
    
}

export default Favorites; 