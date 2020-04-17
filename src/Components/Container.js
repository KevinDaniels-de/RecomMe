import styled from "styled-components";

const Container = styled.section`
    width: ${props => props.size}%;
    border-radius: 15px;
    background: linear-gradient(145deg, ${({theme}) => theme.colors.blue.dark}, ${({theme}) => theme.colors.blue.light});
    box-shadow:  11px 11px 20px ${({theme}) => theme.colors.blue.dark}, 
                -11px -11px 20px ${({theme}) => theme.colors.blue.light};
    margin-bottom: 20px;
`;

export default Container;