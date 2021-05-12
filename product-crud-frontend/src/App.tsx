import * as React from 'react';
import AddProduct from './components/product/AddProduct';
import ProductList from './components/product/ProductList'
import { Typography } from '@material-ui/core';
import { ToastProvider } from 'react-toast-notifications'

const App = () => {

    //variable to check add product so that we can fetch latest record, later it will be change by using state management tool such as context api, mobx or redux
    const [hasAddedProduct, setAddedProduct] = React.useState(false);

    const onAdd = (hasAdded: boolean) => {
        setAddedProduct(hasAdded);
    }

    return (
        <ToastProvider>
            <Typography style={{textAlign: "center", color: '#3f51b5' }} component={'div'} >
                <h2> Welcome to Product CRUD APP </h2>
                <AddProduct onAdd={onAdd} />
            </Typography>
            <ProductList hasProductAdded={hasAddedProduct} />
        </ToastProvider>
    )
}
export default App;