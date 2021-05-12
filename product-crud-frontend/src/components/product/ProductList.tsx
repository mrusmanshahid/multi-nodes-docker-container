import * as React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import SearchBar from "material-ui-search-bar";
import { getAllProducts, deleteProduct, searchProducts } from '../../services/product.service';
import Alert from './../alert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useToasts } from 'react-toast-notifications';
import EditProduct from './EditProduct';

const useStyles = makeStyles({
    icon: {
        cursor: 'pointer',
    },
});

const ProductList = (props: any) => {

    const { hasProductAdded } = props;
    const [localState, setLocalState] = React.useState({
        products: [],
        showAlert: false,
        selectedProduct: null,
        isFetchData: true,
        showEdit: false,
        query: ''
    });
    const { products, showAlert, selectedProduct, isFetchData, showEdit, query } = localState;
    const classes = useStyles();
    const { addToast } = useToasts();

    React.useEffect(() => {
        isFetchData && getProducts();
    }, [isFetchData]);
    
    React.useEffect(() => {
        setLocalState(prevState => ({...prevState, isFetchData: hasProductAdded}));
    }, [hasProductAdded]);

    const getProducts = async () => { //getting all products from service
        const updatedProducts = await getAllProducts();
        (updatedProducts?.count > 0) && setLocalState(prevState => ({...prevState, products: updatedProducts?.data, isFetchData: false}));
    }

    const handleDeleteProduct = async () => { //delete product by using service
        const deletedProduct = await deleteProduct(selectedProduct?._id);
        if (deletedProduct?.success) {
            addToast(deletedProduct?.message || 'Deleted successfully', { appearance: 'success', autoDismiss: true });
            setLocalState(prevState => ({...prevState, isFetchData: true}));
        } else {
            addToast(deletedProduct?.message || 'Something went wrong while deleting product', { appearance: 'error', autoDismiss: true })
        }
    }

    const handleCloseAlert = (isDelete: boolean) => {
        setLocalState(prev => ({...prev, showAlert: !showAlert}));
        //check if delete click then delete product
        if (isDelete) handleDeleteProduct();
    }

    const handleCloseEditDialog = (isUpdated: boolean) => {
        isUpdated && setLocalState(prev => ({...prev, isFetchData: true}));
        setLocalState(prev => ({...prev, showEdit: false}));
    }

    const searchProduct = async () => {
        console.log(query);
        setLocalState(prevState => ({...prevState, isFetchData: false}));
        const filteredProducts = await searchProducts(query);
        console.log(filteredProducts);
        filteredProducts?.products && 
        setLocalState(prevState => ({...prevState, products: filteredProducts?.products, isFetchData: false}));
    }

    return (
        <Typography component={'div'}>
            <SearchBar
                value={query}
                onChange={(newValue) => setLocalState(prevState => ({...prevState, query: newValue}))}
                onRequestSearch={() => searchProduct()}
            />
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell >{row.description}</TableCell>
                            <TableCell  >
                                <EditIcon 
                                onClick={() => setLocalState(prev => ({...prev, selectedProduct: row, showEdit: !showEdit}))}
                                className={classes.icon} color={'primary'} />
                                <DeleteIcon 
                                    onClick={() => setLocalState(prev => ({...prev, showAlert: !showAlert, selectedProduct: row}))} 
                                    className={classes.icon} 
                                    color={'primary'} 
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        {
            showAlert && 
            <Alert onCloseAlert={handleCloseAlert} title={'Alert'} content={'Do you want to delete this product?'} />
        }
        {
            showEdit &&
            <EditProduct product={selectedProduct} onCloseDialog={handleCloseEditDialog} />
        }
        </Typography>
    )
}
export default ProductList;