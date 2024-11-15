import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useDispatch, useSelector } from "react-redux";
import SideBar from "./SideBar";
import MetaData from "../layouts/MetaData";
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import toast from "react-hot-toast";
import { clearErrors, createProduct } from "../../actions/productActions";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { Button } from "@mui/material";

const NewProduct = () => {
  const dispatch = useDispatch();
  const { error, success, loading } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]); // New state for videos
  const navigate = useNavigate();

  const categories = [
    "Laptop", "Footwear", "Bottom", "Tops", "Electronics", "Camera",
    "SmartPhones", "Cars", "Shoes", "Watch", "women", "men",
  ];

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("stock", stock);
    myForm.set("category", category);

    // Append image files to the form data (as actual file objects, not base64)
    images.forEach((image) => myForm.append("images", image));

    // Append video files to the form data (as actual file objects, not base64)
    videos.forEach((video) => myForm.append("videos", video));
    for (const [key, value] of myForm.entries()) {
      console.log(`${key}:`, value);
    }
    dispatch(createProduct(myForm));  
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files); // Create an array of file objects
    setImages(files); // Append to existing array of file objects
  };
  
  const createProductVideosChange = (e) => {
    const files = Array.from(e.target.files); // Create an array of file objects
    setVideos(files); // Append to existing array of file objects
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="flex mt-16 sm:mt-20 h-[125vh] bg-[#DDDDDD]">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>
            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <DescriptionIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                cols={30}
                rows={1}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <AccountTreeIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
            <div id="createProductFormFile">
              <input
                type="file"
                name="images"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
              <input
                type="file"
                name="videos"
                accept="video/*"
                onChange={createProductVideosChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {images.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt="Product Preview" />
              ))}
            </div>

            <div id="createProductFormVideo">
              {videos.map((video, index) => (
                <video key={index} controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
