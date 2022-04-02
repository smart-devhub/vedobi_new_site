import React from 'react';

const Topbar= ()=>{
    // const dispatch = useDispatch();

     return ( 
            <div className="topbar">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="topbar__bar">
                                <div className="topbar__bar__left">
                                    <p><i className="pe-7s-mail"></i> <a href="mailto:care@vedobi.com">care@vedobi.com</a></p>
                                </div>
                                <div className="topbar__bar__right">
                                <p><i className="pe-7s-headphones"></i> <a href="tel:18001210053">1800-121-0053</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
         );
}
 
export default Topbar; 