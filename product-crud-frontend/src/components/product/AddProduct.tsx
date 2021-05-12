import * as React from 'react';
import { Grid, Card, Typography, Button, CardActions, CardContent, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createProduct } from '../../services/product.service';
import { useToasts } from 'react-toast-notifications'

const useStyles = makeStyles({
    root: {
        width: 600,
    },
});

const AddProduct = (props: any) => {

    const classes = useStyles();
    const { addToast } = useToasts();
    const [localState, setLocalState] = React.useState({
        name: '',
        description: ''
    });

    const { name, description } = localState;

    const onSubmit = async () => {
        const product = await createProduct(localState);
        if (product?.success) {
            addToast(product?.message || 'Added successfully', { appearance: 'success', autoDismiss: true })
            setLocalState(prev => ({...prev, name: '', description: ''}));
            props.onAdd(true);
        } else {
            addToast(product?.message || 'Something went wrong', { appearance: 'error', autoDismiss: true });
            props.onAdd(false);
        }
    }

    return (
        <Grid container justify={'center'}>
            <Grid item>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography component={'div'} gutterBottom>
                            <TextField
                                onChange={(e) => setLocalState(prev => ({ ...prev, name: e.target.value }))}
                                value={name}
                                fullWidth
                                id="name"
                                label="Name *"
                                variant="outlined"
                            />
                        </Typography>
                        <Typography component={'div'} gutterBottom>
                            <TextField
                                onChange={(e) => setLocalState(prev => ({ ...prev, description: e.target.value }))}
                                value={description}
                                fullWidth
                                multiline
                                rows={4}
                                id="description"
                                label="Description"
                                variant="outlined"
                            />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button disabled={!name} onClick={onSubmit} fullWidth  color={'primary'} variant={'contained'}>Add</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}
export default AddProduct;