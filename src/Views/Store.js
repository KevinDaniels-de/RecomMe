import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Rellax from 'react-rellax'
import {Link} from 'react-router-dom'
import backButton from "../assets/back.svg";

import Overlay from '../Components/Overlay'
import Container from '../Components/Container'


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

    .interior {
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 60vh;
    }
`;

const StyledInterior = styled.img`
    width: 100%;
    height: 100%;
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
    color: ${({theme}) => theme.colors.royal};
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

const StyledVoucherButton = styled.button`
    color: ${({theme}) => theme.colors.white};
    background: ${({theme}) => theme.colors.black};
    border: none;
    max-width: 100px;
    width: 100%;
    border-radius: 5px;
    text-transform: uppercase;
    letter-spacing: 5px;
    padding: 15px;
    margin-left: auto;
    display: block;
    box-shadow: 6px 6px 10px ${({theme}) => theme.colors.shades.dark};
    font-size: 1rem;

    &.clickable {
        background: ${({theme}) => theme.colors.royal};
    }
`;

function Store({data, recommendations, onClick}) {
    const {id, title, logo, interior, vouchers} = data;

    const [isOpenOverlay, setOpenOverlay] = useState(false);
    const [overlayCode, setOverlayCode] = useState(null);

    const [btnRecommend, setBtnRecommend] = useState({
        btn: "Recommend",
        clickable: true
    });

    const [btnVouchers, setBtnVouchers] = useState(() => {
        let voucherArr = [];
        vouchers.map(voucher => voucherArr.push({...voucher, btn: "Redeem", clickable: true}));
        return voucherArr;
    });
    
    const [isBtnChecked, setBtnChecked] = useState(false);

    const calcTimeDiff = (timeSeconds, duration) => {
        const countdown = duration - (Math.floor(new Date() / 1000 - timeSeconds));
        const calcTime = {
            hours: countdown/60/60 < 10 ? `0${Math.floor(countdown/60/60)}` : Math.floor(countdown/60/60),
            minutes: countdown/60%60 < 10 ? `0${Math.floor(countdown/60%60)}` : Math.floor(countdown/60%60),
            seconds: countdown%60%60 < 10 ? `0${Math.floor(countdown%60%60)}` : Math.floor(countdown%60%60)
        };

        return `${calcTime.hours}:${calcTime.minutes}:${calcTime.seconds}`;
    };

    useEffect(() => {
        if(!isBtnChecked && recommendations.length > 0) {
            // Duration in Seconds (for debug) Normal: 172800
            const duration = 172800;

            const changeBtnRecommend = () => {
                let newBtnRecommend = {...btnRecommend};
                const recommendFound = recommendations.filter(obj => obj.storeId === id && !obj.voucherId && Math.floor(new Date() / 1000 - obj.date.seconds) <= 172800)[0];                
                
                if(recommendFound != null) {
                    const {seconds: recommendSeconds} = recommendFound.date;
                    const countdownTime = new Date() / 1000 - recommendSeconds;
                    
                    if(countdownTime < duration) {
                        newBtnRecommend.btn = calcTimeDiff(recommendSeconds, duration);
                        newBtnRecommend.clickable = false;
                    }

                    else {
                        newBtnRecommend.btn = "Recommend";
                        newBtnRecommend.clickable = true;
                    }

                    setBtnRecommend(newBtnRecommend);
                }
            };

            const changeBtnVouchers = () => {
                let newBtnVouchers = btnVouchers;

                newBtnVouchers.map(voucher => {
                    const voucherFound = recommendations.filter(obj => obj.voucherId === voucher.id && Math.floor(new Date() / 1000 - obj.date.seconds) <= duration)[0];
                                        
                    if(voucherFound != null) {
                        const {seconds: voucherSeconds} = voucherFound.date;

                        const countdownTime = new Date() / 1000 - voucherSeconds;

                        if(countdownTime < duration) {
                            voucher.btn = calcTimeDiff(voucherSeconds, duration);
                            voucher.clickable = false;
                        }
                        
                        else {
                            voucher.btn = "Redeem";
                            voucher.clickable = true;
                        }
                    }
                });

                setBtnVouchers(newBtnVouchers);
            };

            changeBtnVouchers();
            changeBtnRecommend();

            setInterval(() => {
                changeBtnVouchers();
                changeBtnRecommend();
            }, 1000);

            setBtnChecked(true);
        }
    }, [recommendations]);

    const handleClick = (exp, storeId, voucherId, code) => {
        setBtnChecked(false);
        if(voucherId != null) setOpenOverlay(true);
        if(code != null) setOverlayCode(code);
        onClick(exp, storeId, voucherId);
    };

    return (
        <StyledStore>
            <Link className="back-btn" to={'/browse'}>
                <img src={backButton} alt="Back" />
            </Link>

            <Rellax speed={4} className="interior">
                <StyledInterior src={interior} alt="Interior" />
            </Rellax>
            
            <StyledContent>
                <Container className="logo-ctn">
                    <img src={logo} alt="Logo" />
                </Container>

                <StyledTitle>{title}</StyledTitle>

                <StyledVoucherTitle>Vouchers</StyledVoucherTitle>

                {btnVouchers.map(({id:voucherId, lv, title, btn, clickable, code}, i) => 
                    <Container className="voucher-ctn" key={i} size={100}>
                        <b>Lv {lv}</b>
                        <span>{title}</span>
                        <StyledVoucherButton className={clickable ? "clickable" : ""} onClick={() => clickable ? handleClick(10, id, voucherId, code) : ''}>{btn}</StyledVoucherButton>
                    </Container>
                )}

                <StyledRecommButton className={btnRecommend.clickable ? "clickable" : ""} onClick={() => btnRecommend.clickable ? handleClick(20, id) : ''}>{btnRecommend.btn}</StyledRecommButton>
            </StyledContent>

            {isOpenOverlay ? <Overlay code={overlayCode} emitOpen={(bool) => setOpenOverlay(bool)} /> : ''}
        </StyledStore>
    )
}

export default Store;