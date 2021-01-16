import React from 'react'
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, makeStyles, Typography } from '@material-ui/core'

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
        <Box my={3} p={3}>
            <Card>
                <CardActionArea >
                    <a href={`product/${product._id}`}>
                        <CardMedia className={classes.image} image={product.image} />
                    </a>
                    <CardContent>
                        <a href={`product/${product._id}`}>
                            <CardHeader subheader={product.name} />
                        </a>
                        <Box my={3}><Typography>{product.rating} from {product.numReviews}</Typography></Box>
                        <Typography variant='h4'>${product.price}</Typography>

                    </CardContent>

                </CardActionArea>
            </Card>
        </Box>

    )
}

export default Product
