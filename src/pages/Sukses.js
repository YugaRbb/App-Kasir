import axios from 'axios';
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { API_URL } from '../utils/constants';

export default class Sukses extends Component {
    componentDidMount() {
        axios
            .get(API_URL + 'keranjang')
            .then((res) => {
                const keranjang = res.data;
                keranjang.map(function(item){
                    return axios
                        .delete(API_URL+"keranjang/"+item.id)
                        .then((res) => console.log(res))
                        .catch((error) => console.log(error))
                })
            })
    }
    render() {
        return (
            <div className='mt-4 text-center'>
                <img src="assets/images/sukses.png" width="500" />
                <h2>Sukses!!</h2>
                <p>Terimakasih Sudah Memesan :)</p>
                <a href='/'>
                <Button variant="primary">
                    kembali
                </Button>
                </a>
            </div>
        )
    }
}
