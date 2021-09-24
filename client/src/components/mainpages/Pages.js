import React, { useContext } from 'react'
import {Switch, Route} from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import Login from './auth/Login'
import Register from './auth/Register'
import Cart from './cart/Cart'
import Categories from './categories/Categories'
import CreateProduct from './createProduct/CreateProduct'
import DetailProduct from './detailProduct/DetailProduct'
import OrderDetails from './history/OrderDetails'
import OrderHistory from './history/OrderHistory'
import Products from './products/Products'
import NotFound from './utils/not_found/NotFound'

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin

    return (
        <Switch>
            <Route exact path='/' component={Products} />
            <Route exact path='/detail/:id' component={DetailProduct} />
            <Route exact path='/login' component={isLogged ? NotFound : Login} />
            <Route exact path='/register' component={isLogged ? NotFound : Register} />

            <Route exact path='/category' component={isAdmin ? Categories : NotFound} />
            <Route exact path='/create_product' component={isAdmin ? CreateProduct : NotFound} />
            <Route exact path='/edit_product/:id' component={isAdmin ? CreateProduct : NotFound} />

            <Route exact path='/history' component={isLogged ? OrderHistory : NotFound} />
            <Route exact path='/history/:id' component={isLogged ? OrderDetails : NotFound} />
            <Route exact path='/cart' component={Cart} />

            
            <Route exact path='*' component={NotFound} />
        </Switch>
    )
}

export default Pages
