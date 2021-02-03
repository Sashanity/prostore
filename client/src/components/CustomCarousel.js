import React, { useEffect } from 'react'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { getTopProducts } from '../actions/productActions'
import AlertMessage from './AlertMessage'
import { CardMedia, Grid, GridList, GridListTile, Paper } from '@material-ui/core'
import Progress from './Progress'
import { useStyles } from '../styles'
import { Link } from 'react-router-dom'

function CarouselItem(props) {
    const classes = useStyles()

    return (
        <Paper style={{ backgroundColor: '#282828' }} >
            <Link to={`/product/${props.product._id}`} >
                <div align='center'>
                    <h2>{props.product.name}</h2>
                    <GridList cellHeight={250} cols={3} spacing={0}>
                        <GridListTile cols={1}>
                            <img src={props.product.image} alt={props.product.name} />
                        </GridListTile>
                        <GridListTile cols={1}>
                            <img src={props.product.image} alt={props.product.name} />
                        </GridListTile>
                        <GridListTile cols={1}>
                            <img src={props.product.image} alt={props.product.name} />
                        </GridListTile>
                    </GridList>
                    <h3>${props.product.price}</h3>
                </div>
            </Link>
        </Paper>
    )
}
const CustomCarousel = () => {

    const productTop = useSelector(state => state.productTop)
    const { products, loading, error } = productTop

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(getTopProducts())

    }, [dispatch])
    return loading
        ? <Progress />
        : error
            ? <AlertMessage sev='error'>{error}</AlertMessage>
            : (
                <Carousel className='header'>
                    {products.map((product) => (
                        <CarouselItem key={product._id} product={product}></CarouselItem>
                    ))}

                </Carousel>
            )
}

export default CustomCarousel
