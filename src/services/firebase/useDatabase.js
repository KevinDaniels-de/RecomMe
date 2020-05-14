function useDatabase(fStore) {
    const dbUser = fStore().collection('users');
    const dbStore = fStore().collection('stores');
    const dbRecommendations = fStore().collection('recommendations');

    const createNewUser  = newValue => dbUser.doc(newValue.userId).set(newValue);

    const getAllStores = async () => dbStore.get();

    const getAllRangeUsers = (latitude) => dbUser.where("lat", ">=", latitude - .05).where("lat", "<=", latitude + .05).get();

    const createNewRecommendation = (storeId, voucherId, userId) => voucherId != null
        ? dbRecommendations.add({storeId: storeId, voucherId: voucherId, userId: userId, date: new Date()})
        : dbRecommendations.add({storeId: storeId, userId: userId, date: new Date()});

    // const getAllUserStoreRecommendations = (storeId, userId) => dbRecommendations.where("storeId", "==", storeId).where("userId", "==", userId).get();
    const getAllUserStoreRecommendations = (storeId, userId) => dbRecommendations.where("userId", "==", userId).get();

    const getCurrentUser = id => dbUser.doc(id).get().then(data => data.data());

    const updateCurrentUser = newValue => dbUser.doc(newValue.userId).update(newValue);

    return {getAllRangeUsers, createNewUser, getCurrentUser, updateCurrentUser, createNewRecommendation, getAllStores, getAllUserStoreRecommendations}
}

export default useDatabase;