import React from 'react'

function ContactFixedIcons() {
    return (
        <div className="fixed-side-icons">
            <ul>
                <li className="icon-phone">
                    <a href="tel:18001210053" title="Call Us" className="fixed-icon-link phone-link">
                        <i className="fa fa-phone icon"/>
                    </a>
                </li>
                <li className="icon-whatsapp">
                    <a href="https://wa.me/919832535353?text=https://www.vedobi.com/%0D%0A%0D%0AI have some questions. Can you help?" target="_blank" title="Chat Now" className="fixed-icon-link whatsapp-link" rel="noopener noreferrer" >
                        <i className="fa fa-whatsapp icon"/>
                    </a>
                </li>
            </ul>
        </div>
    )
}

export default React.memo(ContactFixedIcons);
