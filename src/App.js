import React from 'react'
import {v4 as uuidv4} from 'uuid'
import styled from 'styled-components'
import theme from './config/theme'
import {ThemeProvider} from 'styled-components'
import {Switch, Route, Redirect, useLocation} from 'react-router-dom'
import userAvatar from "./assets/userAvatar.jpg"
import useAuth from "./services/firebase/useAuth"
import firebase from "firebase/app" // the firbase core lib
import "firebase/auth" // specific products
import firebaseConfig from "./config/firebase" // the firebase config we set up ealier

import GlobalStyles from './config/GlobalStyles'
import Dashboard from './Views/Dashboard'
import Browse from './Views/Browse'
import Store from './Views/Store'
import Radar from './Views/Radar'
import Login from './Views/Login'
import Register from './Views/Register'
import Menu from './Components/Menu'

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

const storeItems = [
    {id:uuidv4(), title:"Subway", logo:"/stores/subway.png", interior:"/stores/interior.jpg", vouchers: [
        {lv:5, title:"Free Upgrade 1", code:uuidv4()},
        {lv:8, title:"Free Upgrade 2", code:uuidv4()},
        {lv:10, title:"Free Upgrade 3", code:uuidv4()},
        {lv:12, title:"Free Upgrade 4", code:uuidv4()},
        {lv:15, title:"Free Upgrade 5", code:uuidv4()}
    ]},
    {id:uuidv4(), title:"Pizza Express", logo:"/stores/pizza-express.png", interior:"/stores/interior.jpg", vouchers: [
        {lv:5, title:"Free Upgrade 1", code:uuidv4()},
        {lv:8, title:"Free Upgrade 2", code:uuidv4()},
        {lv:10, title:"Free Upgrade 3", code:uuidv4()},
        {lv:12, title:"Free Upgrade 4", code:uuidv4()},
        {lv:15, title:"Free Upgrade 5", code:uuidv4()}
    ]},
    {id:uuidv4(), title:"TGI Fridays", logo:"/stores/tgi-fridays.png", interior:"/stores/interior.jpg", vouchers: [
        {lv:5, title:"Free Upgrade 1", code:uuidv4()},
        {lv:8, title:"Free Upgrade 2", code:uuidv4()},
        {lv:10, title:"Free Upgrade 3", code:uuidv4()},
        {lv:12, title:"Free Upgrade 4", code:uuidv4()},
        {lv:15, title:"Free Upgrade 5", code:uuidv4()}
    ]},
    {id:uuidv4(), title:"Nandos", logo:"/stores/nandos.png", interior:"/stores/interior.jpg", vouchers: [
        {lv:5, title:"Free Upgrade 1", code:uuidv4()},
        {lv:8, title:"Free Upgrade 2", code:uuidv4()},
        {lv:10, title:"Free Upgrade 3", code:uuidv4()},
        {lv:12, title:"Free Upgrade 4", code:uuidv4()},
        {lv:15, title:"Free Upgrade 5", code:uuidv4()}
    ]},
    {id:uuidv4(), title:"Burger King", logo:"/stores/burger-king.png", interior:"/stores/interior.jpg", vouchers: [
        {lv:5, title:"Free Upgrade 1", code:uuidv4()},
        {lv:8, title:"Free Upgrade 2", code:uuidv4()},
        {lv:10, title:"Free Upgrade 3", code:uuidv4()},
        {lv:12, title:"Free Upgrade 4", code:uuidv4()},
        {lv:15, title:"Free Upgrade 5", code:uuidv4()}
    ]},
    {id:uuidv4(), title:"Starbucks", logo:"/stores/starbucks.png", interior:"/stores/interior.jpg", vouchers: [
        {lv:5, title:"Free Upgrade 1", code:uuidv4()},
        {lv:8, title:"Free Upgrade 2", code:uuidv4()},
        {lv:10, title:"Free Upgrade 3", code:uuidv4()},
        {lv:12, title:"Free Upgrade 4", code:uuidv4()},
        {lv:15, title:"Free Upgrade 5", code:uuidv4()}
    ]}
];

const checkStore = (match) => {
    let filteredStore = storeItems.filter(item => item.title.toLowerCase().trim().replace(/ /g, "-") === match.params.title)[0];
    return filteredStore ? <Store data={filteredStore} /> : <Redirect to="/dash" />;
};

let initAttemptedRoute = '/dash';

function ProtectedRoute({isLoggedIn, children, ...rest}) {
    initAttemptedRoute  = useLocation().pathname;

    return (
        <Route {...rest}
            render={
                ({match, location}) => 
                    isLoggedIn 
                        ? location.pathname.split("/")[1] === "browse" && location.pathname.split("/").length > 2
                            ? checkStore(match)
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
    if(firebase.apps.length === 0)
        firebase.initializeApp(firebaseConfig);

    const {isAuthenticated, user, signInEmailUser, signInWithProvider, signOut} = useAuth(firebase.auth);

    const handleSignOut = (path) => path === "/logout"
        ? signOut()
        : '';

    const userData = {
        name: user.displayName !== null ? user.displayName : user.email,
        image: userAvatar,
        experience: 414,
        recommendations: 8,
        peopleMet: 134
    };

    return (
        <StyledApp>
            <ThemeProvider theme={theme}>
            <GlobalStyles />
                <Menu isLoggedIn={isAuthenticated} menuItems={menuItems} emitSignOut={handleSignOut} />
                <Switch>
                    <ProtectedRoute isLoggedIn={isAuthenticated} path="/dash">
                        <Dashboard userData={userData} />
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isAuthenticated} path="/browse/:title" />

                    <ProtectedRoute isLoggedIn={isAuthenticated} path="/browse">
                        <Browse storeData={storeItems} />
                    </ProtectedRoute>

                    <ProtectedRoute isLoggedIn={isAuthenticated} path="/radar">
                        <Radar user={userData} />
                    </ProtectedRoute>

                    <RedirectRoute isLoggedIn={isAuthenticated} path="/login">
                        <Login 
                            signInEmailUser={signInEmailUser}
                            signInWithProvider={signInWithProvider}
                        />
                    </RedirectRoute>

                    <RedirectRoute isLoggedIn={isAuthenticated} path="/register">
                        <Register />
                    </RedirectRoute>

                    <Redirect from="/" to="/dash" />
                </Switch>
            </ThemeProvider>
        </StyledApp>
    )
}

export default App;