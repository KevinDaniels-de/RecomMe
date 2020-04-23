import { useState} from "react";
function useAuth(fbAuth) {
   const signInEmailUser = (email, password) =>
   fbAuth().signInWithEmailAndPassword(email, password);

   return {
      signInEmailUser
    };
}
export default useAuth