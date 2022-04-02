import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenUpsellModal } from '../../redux/products/products_actions';
import Product from './Product';

const UpsellModal = () => {
    const { openUpsellModal, upsellProducts, parentUpsellId } = useSelector((state) => state.products); 

    
    const dispatch = useDispatch();
    
    const handleClose = () => {
        dispatch(setOpenUpsellModal(false, [],''));
    }
    return (
        <Modal show={openUpsellModal} onHide={handleClose} backdrop="static" 
            keyboard={false}>
            <Modal.Header closeButton>
                <Modal.Title>Add items</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="shop-grid">
                    <div className="container">
                        <div className="row text-centered">
                            {

                                upsellProducts?.map((product) => {
                                    return (
                                        <div key={product.pid}
                                            className="col-lg-4 col-md-4 col-sm-6 col-6"
                                        >
                                            <Product product={product} isUpsellProduct={true} parentUpsellId={parentUpsellId} />
                                        </div>
                                    );
                                })
                            }
                        </div></div></div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default UpsellModal


