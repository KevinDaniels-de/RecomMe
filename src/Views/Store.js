import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Rellax from 'rellax'
import {Link} from 'react-router-dom'
import backButton from "../assets/back.svg";

import Container from '../Components/Container'

function Store({data, recommendations, onClick}) {
    const {id, title, logo, interior, vouchers} = data;

    const StyledStore = styled.section`
        position: relative;

        .back-btn {
            position: fixed;
            top: 0;
            left: 0;
            background: linear-gradient(135deg, rgba(0, 0, 0, 0.4), transparent);
            width: 50px;
            height: 50px;
            padding: 10px;
            z-index: 2;

            img {
                position: relative;
                width: 100%;
            }
        }

        .voucher-ctn {
            background: ${({theme}) => theme.colors.blue};
            color: ${({theme}) => theme.colors.white};
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 10px;
            max-width: 400px;
            width: 100%;
            margin: 0 auto 20px auto;

            b {
                margin-right: 20px;
            }

            div {
                margin-left: auto;
                background: ${({theme}) => theme.colors.royal};
                border-radius: 10px;
                padding: 5px 17px;
                text-transform: uppercase;
                font-size: 1.1rem;
                letter-spacing: 3px;
            }
        }
    `;
    
    const StyledInterior = styled.img`
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 60vh;
        object-fit: cover;
        object-position: 50% 50%;
    `;

    const StyledContent = styled.article`
        position: relative;
        padding: 90px 20px;
        background: white;
        margin-top: 45vh;
        border-radius: 20px 20px 0 0;
        box-shadow: 0 -10px 10px ${({theme}) => theme.colors.shades.dark};

        .logo-ctn {
            position: absolute;
            top: 0;
            left: 40px;
            width: 140px;
            height: 140px;
            padding: 20px;
            border-radius: 100px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateY(-50%);

            img {
                position: relative;
                width: 100%;
            }
        }
    `;

    const StyledTitle = styled.h2`
        margin-bottom: 60px;
    `;

    const StyledVoucherTitle = styled.h6`
        text-align: center;
        color: ${({theme}) => theme.colors.black};

        &.clickable {
            background: ${({theme}) => theme.colors.royal};
        }
    `;

    const StyledRecommButton = styled.button`
        color: ${({theme}) => theme.colors.white};
        background: ${({theme}) => theme.colors.black};
        border: none;
        max-width: 320px;
        width: 100%;
        border-radius: 5px;
        text-transform: uppercase;
        letter-spacing: 5px;
        padding: 20px 40px;
        margin: 50px auto 0 auto;
        display: block;
        box-shadow: 6px 6px 10px ${({theme}) => theme.colors.shades.dark};
        font-size: 1.2rem;

        &.clickable {
            background: ${({theme}) => theme.colors.royal};
        }
    `;

    const [isLoading, setLoading] = useState(true);
    const [recButton, setRecButton] = useState("Recommend");

    const calcTimeDiff = (time) => {
        let countdown = 172800 - (Math.floor(new Date() / 1000) - time)
        return `${Math.floor(countdown/60/60)}:${Math.floor(countdown/60/60)}:${Math.floor(countdown%60%60)}`;
    };

    useEffect(() => {
        const rellax = new Rellax('.rellax', {
            speed: 4,
            center: false,
            wrapper: null,
            round: true,
            vertical: true,
            horizontal: false
        });

        if(recommendations.length > 0) {
            let foundRecom = recommendations.filter(obj => obj.storeId == id);

            if(foundRecom.length > 0) {
                setRecButton(Math.floor(new Date() / 1000) - foundRecom[0].date.seconds < 172800 ? calcTimeDiff(foundRecom[0].date.seconds) : "Redeem");

                setInterval(() => {
                    setRecButton(Math.floor(new Date() / 1000) - foundRecom[0].date.seconds < 172800 ? calcTimeDiff(foundRecom[0].date.seconds) : "Redeem");
                }, 1000);
            }
        }

        setLoading(false);
    });

    const handleClick = () => recButton == "Recommend" ? onClick() : '';

    return (
        <StyledStore>
            <Link className="back-btn" to={'/browse'}>
                <img src={backButton} alt="Back" />
            </Link>

            <StyledInterior className="rellax" src={interior} alt="Interior" />

            <StyledContent>
                <Container className="logo-ctn">
                    <img src={logo} alt="Logo" />
                </Container>

                <StyledTitle>{title}</StyledTitle>

                <StyledVoucherTitle>Vouchers</StyledVoucherTitle>

                {vouchers.map(({lv, title}, i) => 
                    <Container className="voucher-ctn" key={i} size={100}>
                        <b>Lv {lv}</b>
                        <span>{title}</span>
                        <div>Redeem</div>
                    </Container>
                )}

                <StyledRecommButton className={recButton == "Recommend" ? "clickable" : ""} onClick={handleClick}>{recButton}</StyledRecommButton>
            </StyledContent>
        </StyledStore>
    )
}

export default Store;