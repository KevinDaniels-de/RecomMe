function useDatabase(fStore) {
    const dbUser = fStore().collection('checkins');
    const dbStore = fStore().collection('stores');
    const dbRecommendations = fStore().collection('recommendations');

    const createNewUser  = newValue => dbUser.doc(newValue.userId).set(newValue);

    const getAllStores = async () => await dbStore.get();

    const createNewRecommendation = (storeId, userId) => dbRecommendations.add({storeId: storeId, userId: userId, date: new Date()});
    const createNewRedeem = (storeId, voucherId, userId) => dbRecommendations.add({storeId: storeId, voucherId: voucherId, userId: userId, date: new Date()});

    const getAllUserStoreRecommendations = (storeId, userId) => dbRecommendations.where("storeId", "==", storeId).where("userId", "==", userId).get();

    const readCheckins = () => dbUser.get();

    const getCurrentUser = id => dbUser.doc(id).get().then(data => data.data());

    const updateCurrentUser = newValue => dbUser.doc(newValue.userId).update(newValue);

    return {createNewUser, readCheckins, getCurrentUser, updateCurrentUser, createNewRecommendation, getAllStores, getAllUserStoreRecommendations}
}

export default useDatabase;