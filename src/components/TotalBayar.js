import React, { Component } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import { withRouter } from "react-router-dom";



class TotalBayar extends Component {
    submitTotalBayar = (totalBayar) => {
        const pesanans = {
            total_bayar: totalBayar,
            menus: this.props.keranjang
        };

        axios.post(API_URL + 'pesanan', pesanans)
            .then((res) => {
                this.props.history.push('/sukses');
                window.location.reload();
                
            })
            .catch((error) => {
                console.error(error);
            });
    };

    render() {
        const totalBayar = this.props.keranjang.reduce((result, item) => {
            return result + item.total_harga;
        }, 0);

        return (
            <div className='fixed-bottom'>
                <Row>
                    <Col md={{ span: 3, offset: 9 }} className='px-4'>
                        <h5>
                            Total Harga:{" "}
                            <strong className='float-right mr-2'>
                                Rp. {numberWithCommas(totalBayar)}
                            </strong>
                        </h5>
                        <div className='d-grid gap-2'>
                            <Button variant='primary' className='mt-2 mr-2 mb-2' size='lg'
                                onClick={() => this.submitTotalBayar(totalBayar)}>
                                <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default withRouter(TotalBayar);