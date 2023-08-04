import React, { Component } from 'react';
import { Badge, Col, ListGroup, Row} from 'react-bootstrap';
import { numberWithCommas } from '../utils/utils';
import TotalBayar from './TotalBayar';
import ModalKeranjang from './ModalKeranjang';

export default class Hasil extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: '',
        }
    }

    handleShow(menuKeranjang) {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang
        })
    }

    handleClose(){
        this.setState({
            showModal: false
        })
    }
    
    render() {
        const { keranjang } = this.props;

        return (
            <Col md={3} className="mt-2">
                <h4>
                    <strong>Hasil</strong>
                </h4>
                <hr />
                {keranjang.length !== 0 ? (
                    <ListGroup variant="flush">
                        {keranjang.map((menuKeranjang) => (
                            <ListGroup.Item key={menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)}>
                                <Row>
                                    <Col xs={2}>
                                        <h4>
                                            <Badge pill bg="secondary">
                                                {menuKeranjang.jumlah}
                                            </Badge>
                                        </h4>
                                    </Col>
                                    <Col>
                                        <h6>{menuKeranjang.produk.nama}</h6>
                                        <p>Rp. {numberWithCommas(menuKeranjang.produk.harga)}</p>
                                    </Col>
                                    <Col>
                                        <strong className='float-right'>Rp. {numberWithCommas(menuKeranjang.total_harga)}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                        <ModalKeranjang handleClose={this.handleClose} {...this.state}/>
                    </ListGroup>
                ) : (
                    <p>Keranjang kosong</p>
                )}
                <TotalBayar keranjang={keranjang} {...this.props} />
            </Col>
        );
    }
}
