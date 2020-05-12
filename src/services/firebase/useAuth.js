import {useState} from "react"

function useAuth(fbAuth) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [isLoading, setLoading] = useState(true);

    const googleProvider = new fbAuth.GoogleAuthProvider();
    const facebookProvider = new fbAuth.FacebookAuthProvider();

    fbAuth().onAuthStateChanged(fbUser => {
        if(fbUser) {                   
            setIsAuthenticated(true);
            setUser(fbUser);
            setLoading(false);
            return;
        }

        setIsAuthenticated(false);
        setLoading(false);
    });

    const signInEmailUser = (email, password) => fbAuth().signInWithEmailAndPassword(email, password);

    const createEmailUser = (email, password, username) => 
        fbAuth().createUserWithEmailAndPassword(email, password)
            .then(userData => userData.user.updateProfile({displayName: username}));

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

    return {
        signInEmailUser,
        signInWithProvider,
        isAuthenticated,
        user,
        signOut,
        createEmailUser,
        isLoading,
        setLoading
    };
}

export default useAuth