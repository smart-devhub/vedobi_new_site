import React from 'react';
import { injectCheckout } from 'paytm-blink-checkout-react';

function InjectedCheckout(props) {
    const checkoutJsInstance = props.checkoutJsInstance;

    if(!props.showCheckOut){
        if(checkoutJsInstance){
            checkoutJsInstance.close();
        }
    }
   
    return (<div>
        <b></b>
    </div>);
}

export default injectCheckout(InjectedCheckout);