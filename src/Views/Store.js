import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Rellax from 'react-rellax'

import Overlay from '../Components/Overlay'

const StyledStore = styled.section`
    position: relative;
    margin: 0 auto;
    max-width: 500px;
    width: 100%;
    height: calc(100vh - 160px);
    overflow-y: auto;
    padding: 20px;

    .interior-ctn {
        position: relative;

        .interior-rellax {
            width: 100%;
            height: 40vh;
        }
    }
`;

const StyledInterior = styled.div`
    overflow: hidden;
    box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.light}, -3px -3px 5px ${({theme}) => theme.colors.shades.dark};
    border-radius: 20px;
    position: relative;
`;

const StyledInteriorImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 20px;
    object-position: 50% 50%;
    box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.light}, -3px -3px 5px ${({theme}) => theme.colors.shades.dark};
`;

const StyledContent = styled.article`
    background: rgba(0,0,0,.15);
    padding: 80px 20px 20px 20px;
    margin-top: 20px;
    border-radius: 20px;
    position: relative;
    box-shadow: inset 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, inset -3px -3px 5px ${({theme}) => theme.colors.shades.light};

    &::before {
        content: "";
        position: absolute;
        top: -90px;
        left: 10px;
        width: 160px;
        height: 75px;
        background: ${({theme}) => theme.colors.purple};
        border-radius: 20px 20px 0 0;
    }
`;

const StyledLogo = styled.img`
    position: absolute;
    top: 0;
    left: 0;
    width: 140px;
    height: 140px;
    object-fit: contain;
    object-position: 50% 50%;
    transform: translate(20px, -80px);
    background: ${({theme}) => theme.colors.white};
    border-radius: 20px;
    padding: 10px;
    box-shadow: inset 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, inset -3px -3px 5px ${({theme}) => theme.colors.shades.light};
`;

const StyledTitle = styled.h4`
    color: white;
    text-shadow: 2px 2px 5px ${({theme}) => theme.colors.shades.dark}, -2px -2px 5px ${({theme}) => theme.colors.shades.light};
`;

const StyledDescription = styled.p`
    color: ${({theme}) => theme.colors.white};
    font-style: oblique;
    font-size: 1.4rem;
    line-height: 1.618em;
    letter-spacing: 1px;
    margin: 40px 0px;
`;

const StyledVoucherTitle = styled.h5`
    text-align: center;
    margin-bottom: 20px;
    color: ${({theme}) => theme.colors.white};
    text-shadow: 2px 2px 5px ${({theme}) => theme.colors.shades.dark}, -2px -2px 5px ${({theme}) => theme.colors.shades.light};
`;

const StyledText = styled.p`
    font-style: oblique;
    color: ${({theme}) => theme.colors.white};;
    font-size: 1.4rem;
    margin-bottom: 30px;
`;

const StyledVoucherItem = styled.div`
    font-size: 1.4rem;
    position: relative;
    width: 100%;
    background: #7e04bc;
    padding: 10px 10px 10px 20px;
    height: 60px;
    border-radius: 100px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, -3px -3px 5px ${({theme}) => theme.colors.shades.light};

    &.inactive {
        filter: brightness(0.2);
    }

    &:last-child {
        margin: 0;
    }
`;

const StyledDivider = styled.div`
    width: calc(100% + 40px);
    height: 1px;
    background:${({theme}) => theme.colors.shades.dark};
    margin-bottom: 40px;
    margin-left: -20px;
`;

const StyledVoucherButton = styled.button`
    color: ${({theme}) => theme.colors.white};
    background: ${({theme}) => theme.colors.shades.dark};
    border: none;
    width: 100px;
    padding: 15px 0;
    border-radius: 30px;
    text-transform: uppercase;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 4px;
    outline: 0;
    box-shadow: inset 2px 2px 5px ${({theme}) => theme.colors.shades.dark}, inset -2px -2px 5px ${({theme}) => theme.colors.shades.light};

    &.clickable {
        color: ${({theme}) => theme.colors.purple};
        background: ${({theme}) => theme.colors.white};
        box-shadow: 2px 2px 5px ${({theme}) => theme.colors.shades.dark}, -2px -2px 5px ${({theme}) => theme.colors.shades.light};
    }
`;

const StyledRecommButton = styled.button`
    display: block;
    color: ${({theme}) => theme.colors.white};
    background: ${({theme}) => theme.colors.shades.dark};
    border: none;
    max-width: 230px;
    width: 100%;
    margin: 40px auto;
    cursor: pointer;
    padding: 25px 0;
    border-radius: 30px;
    text-transform: uppercase;
    font-size: 1.3rem;
    font-weight: 700;
    letter-spacing: 7px;
    outline: 0;
    box-shadow: inset 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, inset -3px -3px 5px ${({theme}) => theme.colors.shades.light};

    &.clickable {
        color: ${({theme}) => theme.colors.purple};
        background: ${({theme}) => theme.colors.white};
        box-shadow: 2px 2px 5px ${({theme}) => theme.colors.shades.dark}, -2px -2px 5px ${({theme}) => theme.colors.shades.light};
    }
`;

const Store = ({data, recommendations, onClick, experience, newUpdate}) => {
    const {id, title, description, logo, interior, vouchers} = data;

    const [isOpenOverlay, setOpenOverlay] = useState(false);
    const [overlayCode, setOverlayCode] = useState(null);

    const [btnRecommend, setBtnRecommend] = useState({
        btn: "Recommend",
        clickable: true
    });

    const [btnVouchers, setBtnVouchers] = useState(() => vouchers.map(voucher => voucher = {...voucher, btn: "Redeem", clickable: true}));
    
    const [isBtnChecked, setBtnChecked] = useState(false);

    const calcLevel = exp => {    
        return Math.floor(.75 * Math.sqrt(exp));
    }

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
                const recommendFound = recommendations.filter(obj => obj.storeId === id && !obj.voucherId && Math.floor(new Date() / 1000 - obj.date.seconds) <= duration)[0];                
                
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
                    const voucherFound = recommendations.filter(obj => obj.voucherId === voucher.id && Math.floor(new Date() / 1000 - obj.date.seconds) <= duration);
                    
                    if(voucherFound.length > 0) {                        
                        const {seconds: voucherSeconds} = voucherFound[0].date;

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

    const handleClick = (exp, storeId, voucherId, code, lv) => {
        setBtnChecked(false);
        if(voucherId != null) setOpenOverlay(true);
        if(code != null) setOverlayCode(code);
        onClick(exp, storeId, voucherId, lv);
    };

    return (
        <StyledStore className="store-ctn">
            <StyledInterior className="interior-ctn">
                <Rellax speed={-7} className="interior-rellax" wrapper=".store-ctn">
                    <StyledInteriorImage src={interior} alt="Interior" />
                </Rellax>
            </StyledInterior>
            
            <StyledContent>
                <StyledLogo src={logo} alt="Logo" />

                <StyledTitle>{title}</StyledTitle>

                <StyledDescription>{description}</StyledDescription>

                <StyledRecommButton className={btnRecommend.clickable ? "clickable" : ""} onClick={() => btnRecommend.clickable ? handleClick(10, id) : ''}>{btnRecommend.btn}</StyledRecommButton>

                <StyledDivider />

                <StyledVoucherTitle>Available Vouchers</StyledVoucherTitle>

                <StyledText>
                    Use your current experience and redeem your unlocked vouchers (The costs are equal to the required level).
                </StyledText>

                {btnVouchers.map(({id:voucherId, lv, title, btn, clickable, code}, i) => 
                    <StyledVoucherItem key={i} className={calcLevel(experience) < lv ? "inactive" : ""}>
                        <b>Lv {lv}</b>
                        <span>{title}</span>
                        <StyledVoucherButton className={clickable ? "clickable" : ""} onClick={() => clickable && calcLevel(experience) >= lv ? handleClick(10, id, voucherId, code, lv) : ''}>{btn}</StyledVoucherButton>
                    </StyledVoucherItem>
                )}
            </StyledContent>

            {isOpenOverlay ? <Overlay code={overlayCode} emitOpen={(bool) => setOpenOverlay(bool)} /> : ''}
        </StyledStore>
    )
}

export default Store;