import React, { useState, useEffect } from "react";
import Navbar from "../../Navbar/Navbar.jsx";
import Footer from "../../footer/Footer.jsx";
import './Upload.css'

import {
  uploadAntique,
  getAntiqueCategories,
} from "../../../utilities/interact.js";

const UploadPage = () => {
  const [formData, setFormData] = useState({
    antiqueName: "",
    selectedCategory: "",
    showNewCategoryInput: false,
    newCategoryInput: "",
    imageFile: null,
    imageName: "sample.png",
    description: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch antique categories when the component mounts
    async function fetchCategories() {
      try {
        const fetchedCategories = await getAntiqueCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Error fetching antique categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      selectedCategory: value,
      showNewCategoryInput: value === "newCategory",
    }));
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          imageName: file.name, // Only set the image name without the path
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNewCategoryChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, newCategoryInput: value }));
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, description: value }));
  };

  const handleSubmit = async () => {
    const {
      antiqueName,
      selectedCategory,
      newCategoryInput,
      description,
      imageName,
    } = formData;

    console.log("Antique Name:", antiqueName);
    console.log("Category:", selectedCategory);
    console.log("Description:", description);

    console.log(" Image:", imageName);

    if (!antiqueName || !selectedCategory || !description || !imageName) {
      alert("Please fill in all required fields.");
      return;
    }

    const category =
      selectedCategory === "newCategory" ? newCategoryInput : selectedCategory;

    try {
      // Store antique data without interacting with the blockchain
      await uploadAntique({
        antiqueName,
        category,
        description,
        imageName,
      });

      console.log("Antique data stored successfully!");

      // Reset form data after successful upload
      setFormData({
        antiqueName: "",
        selectedCategory: "",
        showNewCategoryInput: false,
        newCategoryInput: "",
        imageFile: null,
        imageName: "sample.png",
        description: "",
      });

      alert("Antique data stored successfully!");
    } catch (error) {
      console.error("Error storing antique data:", error);
      alert("Error storing antique data. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="Upload">
        <h3 className="text-center mb-4">Upload Antique</h3>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="antiqueName" className="form-label">
              Antique Name
            </label>
            <input
              type="text"
              className="form-control"
              id="antiqueName"
              required
              value={formData.antiqueName}
              onChange={(e) =>
                setFormData({ ...formData, antiqueName: e.target.value })
              }
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              className="form-select"
              id="category"
              onChange={handleCategoryChange}
              value={formData.selectedCategory}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {[...new Set(categories)].map(
                (
                  category // Filter out duplicates
                ) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
              <option value="newCategory">Add New Category</option>
            </select>
          </div>
        </div>

        {formData.showNewCategoryInput && (
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="newCategory" className="form-label">
                New Category
              </label>
              <input
                type="text"
                className="form-control"
                id="newCategory"
                placeholder="Enter New Category"
                value={formData.newCategoryInput}
                onChange={handleNewCategoryChange}
              />
            </div>
          </div>
        )}

        <div className="row mb-3">
          <div className="col-12 col-md-5">
            <label htmlFor="image" className="form-label">
              Upload Image
            </label>
            <div onClick={handleImageClick} style={{ cursor: "pointer" }}>
              <input
                type="file"
                className="mb-1 visually-hidden"
                id="imageInput"
                accept="image/*"
                onChange={handleImageChange}
              />
              <img
                src={process.env.PUBLIC_URL + "/images/" + formData.imageName}
                className="form-control img-display"
                style={{ height: "16rem" }}
                alt="Imge"
              />
            </div>
          </div>
          <div className="col-12 col-md-7 mt-3 mt-md-0">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="4"
              style={{ height: "16rem" }}
              value={formData.description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
        </div>

        <div className="row">
          <div className="col-12 text-center">
            <button
              type="button"
              className="btn btn-dark mb-5 w-100"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default UploadPage;
