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
    max-width: 370px;
    width: 100%;
    background: ${({theme}) => theme.colors.blue};
    padding: 20px;
    color: ${({theme}) => theme.colors.white};;
    position: absolute;
    z-index: 1;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    text-align: center;

    .qr-code {
        margin: 30px 0;

        img {
            width: 120px;
            height: 120px;
        }
    }

    button {
        background: ${({theme}) => theme.colors.royal};
        color: white;
        border-radius: 5px;
        border: none;
        padding: 15px 30px;
        text-transform: uppercase;
        letter-spacing: 2px;
        font-size: 1rem;
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