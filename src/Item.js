import React from 'react'
import './App.css'
import image from './image.jpg'
const Item = (props)=>{
    return(
       
        <a href = 'http://placecorgi.com/' target = '_blank' className='item'>
            <img src = {props.image? props.image : image} alt = '' className='image'/>
            <h3>{props.name}</h3>
            <h4 >{props.address}</h4>
            <h5>Ratings: {props.ratings}</h5>
            </a>
    )
}

export default Item