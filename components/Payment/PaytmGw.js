import React, { Component } from 'react';
import CONFIG from '../Payment/paytm-merchant-config';
import { CheckoutProvider, Checkout } from 'paytm-blink-checkout-react';
import InjectedCheckout from './injected-checkout';

const USE_EXISTING_CHECKOUT_INSTANCE = 'Use existing checkout instance : ';

class PaytmGw extends Component {
  constructor(props) {
    super(props);

    this.state = {
      config: this.appendHandler(CONFIG),
      checkoutJsInstance: null,
      showCheckOut: false
    };
  }

  appendHandler(config) {
    const newConfig = { ...config };
    newConfig.handler = {
      notifyMerchant: this.props.notifyMerchantHandler,
      transactionStatus: this.props.paytmPaymentResult,
    }

    return newConfig;
  }
 
  getCheckoutJsObj() {
    if (window && window.Paytm && window.Paytm.CheckoutJS) {
      return window.Paytm.CheckoutJS;
    }
    else {
      console.error(USE_EXISTING_CHECKOUT_INSTANCE + 'Checkout instance not found!');
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.showCheckOut !== this.props.showCheckOut) {
      if (this.props.showCheckOut) {
        const newConfig = { ...this.state.config };
        newConfig.data = this.props.userData;
        newConfig.payMode = {
          labels: {
            "UPI": "Bhim UPI"
          },
          filter: {
            "include": ["UPI"]
          },
          order: [
            "UPI",
            "CARD",
            "NB",
          ],
        }

        this.setState({
          config: newConfig,
          showCheckOut:true,
        })
      } else {
        // this.setState({
        //   showCheckOut:false
        // })
      }
    }
  }

  componentDidMount() {
    if (window && window.Paytm && window.Paytm.CheckoutJS) {
      const checkoutJsInstance = this.getCheckoutJsObj();

      this.setState({
        checkoutJsInstance
      });
    }

  }


  render() {
    const { config, showCheckOut } = this.state;

    return (
      <div>
        <CheckoutProvider config={config}
          openInPopup={true}
          env="PRODUCTION">
          <InjectedCheckout showCheckOut={this.props.showCheckOut} />
          {showCheckOut && <Checkout />}
        </CheckoutProvider>
      </div>
    );
  }
}

export default PaytmGw;