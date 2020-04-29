import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useAuth(fStore) {
    const ref = fStore().collection('checkins');

    const createCheckin  = checkin => ref.doc(checkin.userId).set(checkin);

    const readCheckins = () => ref.get();

    const getCurrentUser = id => ref.doc(id).get().then(data => data.data());

    const updateCurrentUser = newValue => ref.doc(newValue.userId).update(newValue);

    return {createCheckin, readCheckins, getCurrentUser, updateCurrentUser}
}
export default useAuth;