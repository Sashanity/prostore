import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'
import Rating from './Rating';

const useStyles = makeStyles(() => ({

    image: {
        height: 0,
        paddingTop: '80%'
    }
}
));

const Product = (props) => {
    const { product } = props
    const classes = useStyles();
    return (
        <Box my={3} p={3} >
            <Card className='product'>
                <CardActionArea >
                    <a href={`product/${product._id}`}>
                        <CardMedia className={classes.image} image={product.image} />
                    </a>
                    <CardContent>
                        <a href={`product/${product._id}`}>
                            {/* <CardHeader subheader={product.name} /> */}
                            <Typography >{product.name}</Typography>
                        </a>
                        <Box my={3}>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                        </Box>
                        <Typography variant='h4'>${product.price}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>

    )
}

export default Product
