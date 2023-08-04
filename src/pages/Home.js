import React, { Component } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Hasil, ListCategories, Menus } from '../components';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import swal from 'sweetalert';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menus: [],
      selectedCategory: 'Minuman',
      keranjang: [],
      loading: true // Add loading state
    };
  }

  componentDidMount() {
    this.fetchMenus(this.state.selectedCategory);
    this.fetchCartItems();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.keranjang !== prevState.keranjang) {
      this.fetchCartItems();
    }
  }

  fetchMenus(selectedCategory) {
    axios
      .get(API_URL + 'produk?category.nama=' + selectedCategory)
      .then((res) => {
        const menus = res.data;
        this.setState({ menus, loading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
        // Show an error message to the user
        swal('Error', 'Failed to fetch menus. Please try again later.', 'error');
      });
  }

  fetchCartItems() {
    axios
      .get(API_URL + 'keranjang')
      .then((res) => {
        const keranjang = res.data;
        this.setState({ keranjang });
      })
      .catch((error) => {
        console.error(error);
        // Show an error message to the user
        swal('Error', 'Failed to fetch cart items. Please try again later.', 'error');
      });
  }

  changeCategory = (value) => {
    this.setState({
      selectedCategory: value,
      menus: [],
      loading: true // Set loading state while fetching new menus
    });
    this.fetchMenus(value);
  };

  masukKeranjang = (value) => {
    axios
      .get(API_URL + 'keranjang?produk.id=' + value.id)
      .then((res) => {
        const existingCartItem = res.data[0];

        if (!existingCartItem) {
          const newCartItem = {
            jumlah: 1,
            total_harga: value.harga,
            produk: value
          };

          axios
            .post(API_URL + 'keranjang', newCartItem)
            .then(() => {
              swal({
                title: 'Sukses Masuk Keranjang!',
                text: value.nama + ' SUKSES Masuk Keranjang!',
                icon: 'success',
                button: false,
                timer: 1500
              });
            })
            .catch((error) => {
              console.error(error);
              swal('Error', 'Failed to add item to cart. Please try again later.', 'error');
            });
        } else {
          const updatedCartItem = {
            jumlah: existingCartItem.jumlah + 1,
            total_harga: existingCartItem.total_harga + value.harga,
            produk: value
          };

          axios
            .put(API_URL + 'keranjang/' + existingCartItem.id, updatedCartItem)
            .then(() => {
              swal({
                title: 'Sukses Masuk Keranjang!',
                text: value.nama + ' SUKSES Masuk Keranjang!',
                icon: 'success',
                button: false,
                timer: 1500
              });
            })
            .catch((error) => {
              console.error(error);
              swal('Error', 'Failed to update cart item. Please try again later.', 'error');
            });
        }
      })
      .catch((error) => {
        console.error(error);
        swal('Error', 'Failed to add item to cart. Please try again later.', 'error');
      });
  };

  render() {
    const { menus, selectedCategory, keranjang, loading } = this.state;
    return (
      <div className='mt-3'>
        <Container fluid>
          <Row>
            <ListCategories changeCategory={this.changeCategory} selectedCategory={selectedCategory} />
            <Col>
              <h4>
                <strong>Daftar Produk</strong>
              </h4>
              <hr />
              <Row>
                {loading ? (
                  <p>Loading...</p> // Add a loading indicator
                ) : (
                  menus &&
                  menus.map((menu) => (
                    <Menus key={menu.id} menu={menu} masukKeranjang={this.masukKeranjang} />
                  ))
                )}
              </Row>
            </Col>
            <Hasil keranjang={keranjang} {...this.props} />
          </Row>
        </Container>
      </div>
    );
  }
}