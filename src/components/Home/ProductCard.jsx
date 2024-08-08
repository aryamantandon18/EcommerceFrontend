import { Rating } from '@mui/material';
import React from 'react'
import {Link} from "react-router-dom";


export const ProductCard = React.memo(({ product }) => {
    const options={
        value: product.rating,
        readOnly: true,
        precision: 0.5,
    }
    return(
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images && product.images[0].url} alt={product.name}/>
            <p>{product.name}</p>
      <div>
        <Rating {...options} />
        <span className="productCardSpan">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
      {/* <button style={{fontStyle:"oblique", border:"1px solid black"}}> Buy Now</button> */}
        </Link>
    )
  });