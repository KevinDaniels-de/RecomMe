import {createGlobalStyle} from 'styled-components'

import LatoRegular from '../assets/fonts/lato-regular.woff2'
import Lato700 from '../assets/fonts/lato-regular.woff2'
import OswaldRegular from '../assets/fonts/oswald-regular.woff2'
import Oswald700 from '../assets/fonts/oswald-700.woff2'

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 700;
        src: local('Lato Bold'), local('Lato-Bold'), url('${Lato700}') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        src: local('Lato Regular'), local('Lato-Regular'), url('${LatoRegular}') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        src: url('${Oswald700}') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    @font-face {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 400;
        src: url('${OswaldRegular}') format('woff2');
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    ::-moz-selection {
        color: ${({theme}) => theme.colors.white};
        background: ${({theme}) => theme.colors.black};
    }
    
    ::selection {
        color: ${({theme}) => theme.colors.white};
        background: ${({theme}) => theme.colors.black};
    }
    
    *::-webkit-scrollbar-track {
        background-color: transparent;
        border: 0;
    }
    
    *::-webkit-scrollbar {
        width: 10px;
        background-color: ${({theme}) => theme.colors.black};
    }
    
    *::-webkit-scrollbar-thumb {
        background-color: ${({theme}) => theme.colors.blue};
        border-radius: 0;
    }

    * {
        margin: 0;
        box-sizing: border-box;
    }

    html {
        font-size: ${({theme}) => theme.typography.baseSize};
    }

    body {
        font-family: ${({theme}) => theme.typography.font.text};
        font-size: 1.6rem;
        line-height: 1.618em;
        color: ${({theme}) => theme.colors.black};
        background: ${({theme}) => theme.colors.white};
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: ${({theme}) => theme.typography.font.headline};
        line-height: 100%;
        margin-bottom: 20px;
    }

    h1 {
        font-size: ${({theme}) => theme.typography.h1};
    }
    
    h2 {
        font-size: ${({theme}) => theme.typography.h2};
    }

    h3 {
        font-size: ${({theme}) => theme.typography.h3};
    }

    h4 {
        font-size: ${({theme}) => theme.typography.h4};
    }

    h5 {
        font-size: ${({theme}) => theme.typography.h5};
    }

    h6 {
        font-size: ${({theme}) => theme.typography.h6};
    }

`;

export default GlobalStyles;