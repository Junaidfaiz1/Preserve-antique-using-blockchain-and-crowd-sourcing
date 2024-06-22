import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../Navbar/Navbar.jsx";
import Footer from "../../footer/Footer.jsx";
import './Update.css'
import {
  getAntiqueById,
  getAntiqueCategories,
  updateAntique,
} from "../../../utilities/interact.js";

const UpdatePage = () => {
  const [antiqueData, setAntiqueData] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    imageName: "",
    imageFile: null,
  });
  const [categories, setCategories] = useState([]);
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAntiqueById(id);
        setAntiqueData(data);
      } catch (error) {
        console.error("Error fetching antique data:", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categories = await getAntiqueCategories();
        const uniqueCategories = [...new Set(categories)];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setAntiqueData({ ...antiqueData, category: value });
    setShowNewCategoryInput(value === "newCategory");
  };

  const handleImageClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setAntiqueData({
          ...antiqueData,
          imageFile: file,
          imageName: file.name,
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleNewCategoryChange = (e) => {
    const value = e.target.value;
    setNewCategoryInput(value);
    setAntiqueData({ ...antiqueData, category: value });
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setAntiqueData({ ...antiqueData, description: value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting antique update...");
      const { id, name, category, description, imageName, imageFile } =
        antiqueData;
      // Pass imageFile along with other data to the update function
      await updateAntique(
        id,
        name,
        category,
        description,
        imageName,
        imageFile
      );
      alert("Antique updated successfully!");
      // Add any additional logic or redirection after successful update
    } catch (error) {
      console.error("Error updating antique:", error);
      // Handle error, display message, etc.
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="Update">
        <h3 className="text-center mb-4">Update Antique</h3>

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
              value={antiqueData.name}
              onChange={(e) =>
                setAntiqueData({ ...antiqueData, name: e.target.value })
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
              required
              value={antiqueData.category}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
              <option value="newCategory">Add New Category</option>
            </select>
          </div>
        </div>

        {showNewCategoryInput && (
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="newCategory" className="form-label">
                New Category
              </label>
              <input
                type="text"
                className="form-control"
                id="newCategory"
                value={newCategoryInput}
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
                src={
                  process.env.PUBLIC_URL + "/images/" + antiqueData.imageName
                }
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
              value={antiqueData.description}
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
              Update
            </button>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePage;
