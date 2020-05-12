import React, {useState, useEffect} from 'react'
import {v4 as uuidv4} from 'uuid'
import styled from 'styled-components'
import theme from './config/theme'
import {ThemeProvider} from 'styled-components'
import {Switch, Route, Redirect, useLocation} from 'react-router-dom'
import userAvatarPlaceholder from "./assets/avatar-placeholder.png"
import useAuth from "./services/firebase/useAuth"
import firebase from "firebase/app" // the firbase core lib
import "firebase/auth" // specific products
import firebaseConfig from "./config/firebase" // the firebase config we set up ealier
import "firebase/firestore"
import useDatabase from "./services/firebase/useDatabase"

import GlobalStyles from './config/GlobalStyles'
import Dashboard from './Views/Dashboard'
import Browse from './Views/Browse'
import Store from './Views/Store'
import Radar from './Views/Radar'
import Login from './Views/Login'
import Register from './Views/Register'
import Menu from './Components/Menu'
import Loader from './Components/Loader'

const StyledApp = styled.div`
    background: ${theme.colors.blue.full};
    padding-bottom: 85px;
    min-height: 100vh;

    ${theme.mediaQueries.tablet} {}

    ${theme.mediaQueries.desktop} {
        padding-bottom: 0;
        padding-left: 250px;
    }
`;

const menuItems = [
    {id:uuidv4(), title:"Dash", path:"/dash", svg:"M6 26h16V6H6v20zm0 16h16V30H6v12zm20 0h16V22H26v20zm0-36v12h16V6H26z"},
    {id:uuidv4(), title:"Browse", path:"/browse", svg:"M40 8H8v4h32V8zm2 20v-4l-2-10H8L6 24v4h2v12h20V28h8v12h4V28h2zm-18 8H12v-8h12v8z"},
    {id:uuidv4(), title:"Radar", path:"/radar", svg:"M38.14 9.86l-2.82 2.82C38.2 15.58 40 19.58 40 24c0 8.84-7.16 16-16 16S8 32.84 8 24c0-8.16 6.1-14.88 14-15.86v4.04c-5.68.96-10 5.88-10 11.82 0 6.62 5.38 12 12 12s12-5.38 12-12c0-3.32-1.34-6.32-3.52-8.48l-2.82 2.82C31.1 19.8 32 21.8 32 24c0 4.42-3.58 8-8 8s-8-3.58-8-8c0-3.72 2.56-6.82 6-7.72v4.28c-1.2.7-2 1.96-2 3.44 0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.48-.8-2.76-2-3.44V4h-2C12.96 4 4 12.96 4 24s8.96 20 20 20 20-8.96 20-20c0-5.52-2.24-10.52-5.86-14.14z"},
    {id:uuidv4(), title:"Logout", path:"/logout", svg:"M29.17 16L24 21.17 18.83 16 16 18.83 21.17 24 16 29.17 18.83 32 24 26.83 29.17 32 32 29.17 26.83 24 32 18.83 29.17 16zM24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.82 0-16-7.18-16-16S15.18 8 24 8s16 7.18 16 16-7.18 16-16 16z"}
];

let initAttemptedRoute = '/dash';

function ProtectedRoute({isLoggedIn, children, userData, stores, changeExperience, ...rest}) {
    const {createNewRecommendation, getAllUserStoreRecommendations} = useDatabase(firebase.firestore);

    const [storeRecommendations, setStoreRecommendations] = useState([]);

    const handleStoreRecommendations = (exp, storeId, voucherId, userId) => {
        changeExperience(userData.experience + exp);
        createNewRecommendation(storeId, voucherId, userId)
            .then(() => updateUserRecommendations(storeId, userId));
    };

    const updateUserRecommendations = (storeId, userId) => {                
        getAllUserStoreRecommendations(storeId, userId)
            .then(promise => {
                let allStoreRecommendations = [];

                promise.forEach(entry => {
                    allStoreRecommendations.push(entry.data());
                });

                if(promise.size !== 0)
                    setStoreRecommendations([...allStoreRecommendations]);
            });
    };

    const checkStore = filteredStore => {        
        if(storeRecommendations.length === 0)
            updateUserRecommendations(filteredStore.id, userData.userId);

        return filteredStore ? <Store data={filteredStore} recommendations={storeRecommendations.filter(storeRec => storeRec.storeId === filteredStore.id)} onClick={(exp, storeId, voucherId) => handleStoreRecommendations(exp, storeId, voucherId, userData.userId)} /> : <Redirect to="/dash" />;
    };

    initAttemptedRoute  = useLocation().pathname;

    return (
        <Route {...rest}
            render={
                ({match, location}) => 
                    isLoggedIn 
                        ? location.pathname.split("/")[1] === "browse" && location.pathname.split("/").length > 2
                            ? checkStore(stores.filter(item => item.title.toLowerCase().trim().replace(/ /g, "-") === match.params.title)[0])
                            : children
                        : <Redirect to={{pathname: "/login", state: {from: location}}} />
            }
        />
    )
}

function RedirectRoute({isLoggedIn, children, ...rest}) {
    return (
        <Route {...rest}
            render={
                ({location}) => !isLoggedIn 
                    ? children 
                    : <Redirect to={{pathname: initAttemptedRoute, state: {from: location}}} />
            }
        />
    )
}

function App() {
    if(firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);

    const {isAuthenticated, user, signInEmailUser, signInWithProvider, signOut, createEmailUser, isLoading, setLoading} = useAuth(firebase.auth);
    const {getAllRangeUsers, createNewUser, getCurrentUser, updateCurrentUser, getAllStores} = useDatabase(firebase.firestore);

    const [userData, setUserData] = useState({userId: "", name: "", image: "", experience: 0, recommendations: 0, peopleMet: 0, lat:0, long:0});
    const [stores, setStores] = useState([]);
    const [isMounted, setMounted] = useState(false);
    const [rangeUsers, setRangeUsers] = useState([]);    

    useEffect(() => {        
        if(!isMounted && isAuthenticated) {
            navigator.geolocation.watchPosition(
                pos => {
                    // console.log(userData);
                    if(parseFloat(pos.coords.latitude) !== userData.lat || parseFloat(pos.coords.longitude) !== userData.long) {
                        let coordUserData = userData;
                        coordUserData.lat = parseFloat(pos.coords.latitude);
                        coordUserData.long = parseFloat(pos.coords.longitude);

                        setUserData(coordUserData);
                        updateCurrentUser(userData, userData.userId);

                        // Radius
                        // lat: 0.003
                        // long: 0.08
                    }
                },
                err => console.log(err)
            );
            
            getAllStores()
                .then(promise => {
                    let storeArr = [];
            
                    promise.forEach(store => {
                        storeArr.push(store.data());
                    });
            
                    setStores(storeArr);

                    getAllRangeUsers(userData.lat)
                        .then(promise => {
                            let userArr = [];

                            promise.forEach(user => // Ca 10km Radius
                                user.data().userId !== userData.userId 
                                && user.data().long >= userData.long - .05
                                && user.data().long <= userData.long + .05
                                    ? userArr.push({...user.data(), show: true, x: -40, y: -40}) 
                                    : ''
                            );

                            setRangeUsers(userArr);
                        })
                        .then(() => {
                            setLoading(false);
                            setMounted(true);
                        });
                });
        }
    }, [userData]);

    const changeExperience = newEXP => {
        let updatedUserData = userData;
        updatedUserData.experience = newEXP;
        setUserData(updatedUserData);
        updateCurrentUser(updatedUserData, updatedUserData.docId);
    };

    const handleSignOut = path => path === "/logout"
        ? signOut()
        : '';

    const handleCreateEmailUser = (email, password, username, image) => {
        const reader = new FileReader();

        reader.readAsDataURL(image[0]);

        reader.onload = async() => {
            setUserData({
                userId: "",
                name: username,
                image: reader.result ? reader.result : userAvatarPlaceholder,
                experience: 0,
                recommendations: 0,
                peopleMet: 0,
                lat: 0, 
                long: 0
            });
    
            createEmailUser(email, password, username);
        };
    };    

    useEffect(() => {        
        if(user.uid != null) {            
            getCurrentUser(user.uid).then(searchedUser => {                       
                // No User found -> Create New                
                if(searchedUser == null) {                    
                    let newUserData = {
                        userId: user.uid,
                        name: user.displayName ? user.displayName : userData.name,
                        image: user.photoURL ? user.photoURL : userData.image,
                        experience: 0,
                        recommendations: 0,
                        peopleMet: 0,
                        lat: 0, 
                        long: 0
                    };

                    setUserData(newUserData);
                    createNewUser(newUserData);
                }

                // User found - Get Data
                else
                    setUserData({
                        userId: searchedUser.userId,
                        name: searchedUser.name,
                        image: searchedUser.image,
                        experience: searchedUser.experience,
                        recommendations: searchedUser.recommendations,
                        peopleMet: searchedUser.peopleMet,
                        lat: parseFloat(searchedUser.lat),
                        long: parseFloat(searchedUser.long)
                    });
            });
        }
    }, [user]);

    return (isLoading 
        ? <Loader /> 
        : <StyledApp>
            <ThemeProvider theme={theme}>
            <GlobalStyles />
                <Menu isLoggedIn={isAuthenticated} menuItems={menuItems} emitSignOut={handleSignOut} />
                <Switch>
                    <RedirectRoute isLoggedIn={isAuthenticated} path="/login">
                        <Login 
                            signInEmailUser={signInEmailUser}
                            signInWithProvider={signInWithProvider}
                        />
                    </RedirectRoute>

                    <RedirectRoute isLoggedIn={isAuthenticated} path="/register">
                        <Register createEmailUser={handleCreateEmailUser} />
                    </RedirectRoute>

                    <ProtectedRoute isLoggedIn={isAuthenticated} path="/dash">
                        <Dashboard userData={userData} multiplicator={1} />
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isAuthenticated} path="/browse/:title" userData={userData} stores={stores} changeExperience={changeExperience}/>

                    <ProtectedRoute isLoggedIn={isAuthenticated} path="/browse">
                        <Browse stores={stores} />
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isAuthenticated} path="/radar">
                        <Radar user={userData} rangeUsers={rangeUsers} multiplicator={1} changeExperience={changeExperience} />
                    </ProtectedRoute>

                    <Redirect from="/" to="/dash" />
                </Switch>
            </ThemeProvider>
        </StyledApp>
    )
}

export default App;