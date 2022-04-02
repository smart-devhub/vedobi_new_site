import React from 'react';
import { useDispatch } from 'react-redux';
import { setOpenAdModal } from '../../redux/products/products_actions';
import Cookies from 'js-cookie'


const PsudoTopbar = () => {

    const dispatch = useDispatch();

    // useEffect(() => {
    //     let mounted = true;
    //     if (mounted) {
    //         window.addEventListener("beforeunload", function (ev) {
    //             dispatch(setOpenAdModal(true));
    //             ev.preventDefault();
    //             ev.returnValue = '';
    //             return null;
    //         });
    //         window.addEventListener("onunload", function (ev) {
    //             dispatch(setOpenAdModal(true));
    //             ev.preventDefault();
    //             ev.returnValue = '';
    //             return null;
    //         });
    //     }

    //     return () => {
    //         mounted = false;
    //         window.removeEventListener("beforeunload", (ev) => { });
    //     }
    // }, [dispatch]);


    const handleMouseOver = () => {
        const popup = Cookies.get('vedobi-popup');
        if (!popup) {
            let now = new Date();
            let time = now.getTime();
            time += 60 * 60 * 1000;
            now.setTime(time);
            Cookies.set('vedobi-popup', "true", { expires: now })
            dispatch(setOpenAdModal(true));
        }
    }
    return (
        <div onMouseOver={handleMouseOver} style={{ position: 'fixed', top: 0, left: 0, height: 3, width: '100%', zIndex: 999 }}></div>
    );

}

export default PsudoTopbar;