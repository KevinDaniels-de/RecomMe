import {useState} from "react"

function useAuth(fbAuth) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const googleProvider = new fbAuth.GoogleAuthProvider();
    const facebookProvider = new fbAuth.FacebookAuthProvider();

    const signInEmailUser = (email, password) => fbAuth().signInWithEmailAndPassword(email, password);

    const createEmailUser = (email, password, username) => 
        fbAuth().createUserWithEmailAndPassword(email, password)
            .then(userData => 
                userData.user.updateProfile({displayName: username})
            );

    const signOut = () => fbAuth().signOut();

    const signInWithProvider = provider => {
        switch (provider) {
            case "google":
                fbAuth().signInWithRedirect(googleProvider);
                break;

            case "facebook":
                fbAuth().signInWithRedirect(facebookProvider);
                break;

            default:
                throw new Error("unsupported provider");
        }
    };

    fbAuth().onAuthStateChanged(fbUser => {
        if(fbUser) {                        
            setIsAuthenticated(true);
            setUser(fbUser);
            return;
        }

        setIsAuthenticated(false);
    });

    return {
        signInEmailUser,
        signInWithProvider,
        isAuthenticated,
        user,
        signOut,
        createEmailUser
    };
}

export default useAuth