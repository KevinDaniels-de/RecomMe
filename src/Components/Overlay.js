import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import qrcode from 'qrcode-generator'

const StyledOverlayContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
`;

const StyledOverlayBackground = styled.div`
    background: rgba(0,0,0,.6);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const StyledOverlayContent = styled.div`
    max-width: 350px;
    width: 100%;
    background: ${({theme}) => theme.colors.purple};
    padding: 20px;
    color: ${({theme}) => theme.colors.white};;
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    text-align: center;

    h5 {
        text-shadow: 2px 2px 5px ${({theme}) => theme.colors.shades.dark}, -2px -2px 5px ${({theme}) => theme.colors.shades.light};
    }

    .qr-code {
        margin: 30px 0;

        img {
            width: 120px;
            height: 120px;
            background: rgba(0,0,0,.5);
            padding: 10px;
            border-radius: 20px;
            box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, -3px -3px 5px ${({theme}) => theme.colors.shades.light},
                        inset 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, inset -3px -3px 5px ${({theme}) => theme.colors.shades.light};
        }
    }

    button {
        background: ${({theme}) => theme.colors.white};
        color: ${({theme}) => theme.colors.purple};
        font-weight: 700;
        border: none;
        padding: 20px 35px;
        border-radius: 70px;
        text-transform: uppercase;
        letter-spacing: 4px;
        font-size: 1.2rem;
        box-shadow: 3px 3px 5px ${({theme}) => theme.colors.shades.dark}, -3px -3px 5px ${({theme}) => theme.colors.shades.light}
    }
`;

function Overlay({code, emitOpen}) {
    const [qrCode, setQrCode] = useState(false);

    useEffect(() => {
        if(code != null && !qrCode) {
            let qr = qrcode(0, 'M');
            qr.addData(code);
            qr.make();
            setQrCode(qr.createImgTag());
        }
    }, []);

    const handleClick = () => {
        emitOpen(false);
    };

    return (
        <StyledOverlayContainer>
            <StyledOverlayBackground onClick={() => handleClick()} />
            <StyledOverlayContent>
                <h5>Please present the voucher at the cash desk</h5>
                <div className="qr-code" dangerouslySetInnerHTML={{__html: qrCode}} />
                <button onClick={() => handleClick()}>Close Voucher</button>
            </StyledOverlayContent>
        </StyledOverlayContainer>
    );
}

export default Overlay;