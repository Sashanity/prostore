import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from '@material-ui/core'

import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab';

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
                    <Link to={`product/${product._id}`}>
                        <CardMedia className={classes.image} image={product.image} />
                    </Link>
                    <CardContent>
                        <Link to={`product/${product._id}`}>
                            {/* <CardHeader subheader={product.name} /> */}
                            <Typography >{product.name}</Typography>
                        </Link>
                        <Box my={3}>
                            <Rating value={product.rating} />
                            <p>{product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'}</p>
                        </Box>
                        <Typography variant='h4'>${product.price}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>

    )
}

export default Product
