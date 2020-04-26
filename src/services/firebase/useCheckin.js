import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useAuth(fStore) {
  const ref = fStore().collection('checkins');

  const createCheckin  = checkin => ref.add(checkin);

  const readCheckins = () => ref.get();

  const getCurrentUser = (id) => ref.where("userId", "==", id).get();

  return {createCheckin, readCheckins, getCurrentUser}

}
export default useAuth;