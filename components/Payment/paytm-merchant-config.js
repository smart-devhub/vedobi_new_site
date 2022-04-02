import logo from '../../assets/images/logo/logo.webp'
const CONFIG = {
    style: {
        bodyBackgroundColor: "#fafafb",
        bodyColor: "",
        themeBackgroundColor: "#dfa231",
        themeColor: "#ffffff",
        headerBackgroundColor: "#284055",
        headerColor: "#ffffff",
        errorColor: "",
        successColor: "",
        card: {
            padding: "",
            backgroundColor: ""
        }
    },
    jsFile: "",
    data: {
        orderId: "dfdff",
        amount: "23",
        token: "dffdfdf23232323",
        tokenType: "TXN_TOKEN", 
        userDetail: {
            mobileNumber: "",
            name: ""
        }
    },
    merchant: {
        mid: "WPvYTg74087913640653",
        name: "Vedobi India",
        logo: {logo},
        redirect: false,
    },
    mapClientMessage: {},
    labels: {},
    payMode: {
        labels: {
            "UPI":"Bhim UPI"
        },
        filter: {
            "include":["UPI"]
        },
        order: [
            "UPI",
            "CARD",
            "NB",
        ],
    },
    flow: "DEFAULT"
};

export default CONFIG;

// WPvYTg74087913640653