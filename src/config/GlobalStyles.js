import {createGlobalStyle} from 'styled-components'

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: ${({theme}) => theme.typography.font.text};
        font-style: normal;
        font-weight: 700;
        src: local('Crimson Text Bold'), local('CrimsonText-Bold'), url('/fonts/crimson-text-700.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
        font-family: ${({theme}) => theme.typography.font.text};
        font-style: normal;
        font-weight: 400;
        src: local('Crimson Text Regular'), local('CrimsonText-Regular'), url('/fonts/crimson-text-regular.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
        font-family: ${({theme}) => theme.typography.font.headline};
        font-style: normal;
        font-weight: 700;
        src: local('Montserrat Bold'), local('Montserrat-Bold'), url('/fonts/montserrat-700.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
        font-family: ${({theme}) => theme.typography.font.headline};
        font-style: normal;
        font-weight: 900;
        src: local('Montserrat Black'), local('Montserrat-Black'), url('/fonts/montserrat-900.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* latin */
    @font-face {
        font-family: ${({theme}) => theme.typography.font.headline};
        font-style: normal;
        font-weight: 400;
        src: local('Montserrat Regular'), local('Montserrat-Regular'), url('/fonts/montserrat-regular.woff2') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    ::-moz-selection {
        color: white;
        background: #F07D00;
    }
    
    ::selection {
        color: white;
        background: #F07D00;
    }
    
    *::-webkit-scrollbar-track {
        background-color: transparent;
        border: 0;
    }
    
    *::-webkit-scrollbar {
        width: 10px;
        background-color: #fff;
    }
    
    *::-webkit-scrollbar-thumb {
        background-color: #F07D00;
        border-radius: 20px;
    }

    * {
        margin: 0;
        box-sizing: border-box;
    }

    html {
        font-size: 10px;
    }

    body {
        font-family: ${({theme}) => theme.typography.font.text};
        font-size: 1.6rem;
        line-height: 1.618em;
    }
`;

export default GlobalStyles;