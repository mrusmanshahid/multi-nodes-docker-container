import * as React from 'react';
import {
    Dialog, DialogTitle, DialogContent, Typography, TextField,
    DialogActions, Button
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import {updateProduct} from './../../services/product.service';
import { useToasts } from 'react-toast-notifications'

const EditProduct = (props: any) => {

    const { onCloseDialog, product } = props;
    const [openDialog, setOpenDialog] = React.useState(true);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const { addToast } = useToasts();

    React.useEffect(() => {
        if (product) {
            setName(product?.name);
            setDescription(product?.description);
        }
    }, [product]);

    const handleDiscard = () => { // handle discard case when user clicks on Discard button
        setOpenDialog(false);
        onCloseDialog(false);
    }

    const handleSubmit = async () => { //handle submit and update product through service
        const updatedProduct = await updateProduct({
            _id: product?._id,
            name: name,
            description: description
        });
        if (updatedProduct?.success) {
            addToast(updatedProduct?.message || 'Updated successfully', { appearance: 'success', autoDismiss: true });
            setOpenDialog(false);
            onCloseDialog(true);
        } else {
            addToast(updatedProduct?.message || 'Something went wrong while updating product', { appearance: 'error', autoDismiss: true })
        }
    }

    return (
        <Dialog
            disableBackdropClick={true}
            open={openDialog}
            onClose={handleDiscard}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={'md'}
            fullWidth
        >
            <DialogTitle id="alert-dialog-title">
                <EditIcon /> Edit Product
            </DialogTitle>
            <DialogContent>
            <Typography component={'div'} color="textSecondary" gutterBottom>
                            <TextField
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                fullWidth
                                id="name"
                                label="Name *"
                                variant="outlined"
                            />
                        </Typography>
                        <Typography component={'div'} color="textSecondary" gutterBottom>
                            <TextField
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                fullWidth
                                multiline
                                rows={4}
                                id="description"
                                label="Description"
                                variant="outlined"
                            />
                        </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscard} color="primary">
            Discard
          </Button>
          <Button disabled={!name} onClick={handleSubmit} color="primary" autoFocus>
            Save
          </Button>
        </DialogActions>
        </Dialog>
    )
}
export default EditProduct;