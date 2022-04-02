import React from 'react'
import DTDC from '../../assets/images/courier-partners/dtdc.webp'
import BlueDart from '../../assets/images/courier-partners/blue-dart.webp'
import Fedex from '../../assets/images/courier-partners/fedex.webp'
import Xpressbees from '../../assets/images/courier-partners/xpressbee.webp'
import Delhivery from '../../assets/images/courier-partners/delhivery.webp'
import Ecart from '../../assets/images/courier-partners/e-cart.webp'
import Title from '../Title/Title'

function CourierPartners() {
    return (
        <>
            <section className="courier-partner py-2 mt-2 bg-white">
                <div className="container">
                    <Title title="Our Courier Partners" />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="courier-partner-inner">
                                <ul className="partner-list">
                                    <li className="partner-list-item">
                                        <img src={DTDC} className="img-fluid" loading="lazy" height="60" width="160" alt="Courier Partner" />
                                    </li>
                                    <li className="partner-list-item">
                                        <img src={BlueDart} className="img-fluid" loading="lazy" height="60" width="160" alt="Courier Partner" />
                                    </li>
                                    <li className="partner-list-item">
                                        <img src={Fedex} className="img-fluid" loading="lazy" height="60" width="160" alt="Courier Partner" />
                                    </li>
                                    <li className="partner-list-item">
                                        <img src={Xpressbees} className="img-fluid" loading="lazy" height="60" width="160" alt="Courier Partner" />
                                    </li>
                                    <li className="partner-list-item">
                                        <img src={Delhivery} className="img-fluid" loading="lazy" height="60" width="160" alt="Courier Partner" />
                                    </li>
                                    <li className="partner-list-item">
                                        <img src={Ecart} className="img-fluid" loading="lazy" height="60" width="160" alt="Courier Partner" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default React.memo(CourierPartners)
