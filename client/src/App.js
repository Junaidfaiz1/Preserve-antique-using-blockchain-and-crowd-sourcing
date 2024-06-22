import "./App.css";
import React from "react";
import Navbar from "./component/Navbar/Navbar.jsx";
import LogIn from "./component/Login/LogIn.jsx";
import SignUp from "./component/SignUp/SignUp";
import ContactUs from "./component/ContactUs/ContactUs";
import Upload from "./component/adminPannel/Upload/Upload.jsx";
import AboutUs from "./component/About Us/AboutUs";
import Footer from "./component/footer/Footer";
import Home from "./component/Home/Home.jsx";
import Poster from "./component/Poster/Poster.jsx";
import VideoPage from "./component/ShowVideo/ShowVideo.jsx";
import DetailPage from "./component/DetailPage/DetailPage.jsx";
import AdminPanel from "./component/adminPannel/admin list/Admin.jsx";
import Update from "./component/adminPannel/Update/Update.jsx";
import Antique from "./component/adminPannel/Antique/Antique.jsx";
import AntiqueListByCategories from "./component/Antique List/AntiqueList.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Audience from "./component/adminPannel/crowd sourcing/audience.jsx";
import Compaign from "./component/adminPannel/compaign/Compaign.jsx";
import ShowCompaigns from "./component/adminPannel/Show Compaign/ShowCompaign.jsx"; 
import Users from "./component/adminPannel/Users/Users.jsx"
import Campaigns from "./component/Compaigns/Compaigns.jsx";
import TweetComposer from "./component/adminPannel/crowd sourcing/TweetComposer.jsx";
import List from "./component/adminPannel/crowd sourcing/List.jsx";
import { MetmaskContextProvider } from "./context";
import Auth from "./component/Auth/index.jsx";
import Search from "./component/Search/Search.jsx";
function App() {
  const originalConsoleError = console.error;
  console.error = (...args) => {
    if (
      typeof args[0] === "string" &&
      args[0].startsWith("Warning: Encountered two children with the same key")
    ) {
      return;
    }
    originalConsoleError.apply(console, args);
  };
  console.error = originalConsoleError;

  return (
    <MetmaskContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/Poster" element={<Poster />} />
          <Route path="/VideoPage/:id" element={<VideoPage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/Search/:id" element={<Search />} />
          <Route
            path="/Upload"
            element={
              <Auth>
                <Upload />
              </Auth>
            }
          />
          <Route
            path="/PostTweet"
            element={
              <Auth>
                <TweetComposer />
              </Auth>
            }
          />
          <Route
            path="/tweets/:hashtag"
            element={
              <Auth>
                <List />
              </Auth>
            }
          />
          <Route
            path="/DetailPage/:id/:categoryName"
            element={<DetailPage />}
          />
          <Route path="/Campaigns" element={<Campaigns />} />
          <Route
            path="/Admin"
            element={
              <Auth>
                <AdminPanel />
              </Auth>
            }
          />
          <Route
            path="/update/:id"
            element={
              <Auth>
                <Update />
              </Auth>
            }
          />
          <Route path="/AntiqueList" element={<Antique />} />
          <Route
            path="/Users"
            element={
              <Auth>
                <Users />
              </Auth>
            }
          />
          <Route
            path="/Audience"
            element={
              <Auth>
                <Audience />
              </Auth>
            }
          />
          <Route
            path="/Campaign"
            element={
              <Auth>
                <Compaign />
              </Auth>
            }
          />
          <Route
            path="/ShowCompaign"
            element={
              <Auth>
                <ShowCompaigns />
              </Auth>
            }
          />

          <Route
            path="/AntiqueListByCategories/:name"
            element={<AntiqueListByCategories />}
          />
          <Route path="/Footer" element={<Footer />} />
        </Routes>
      </BrowserRouter>
    </MetmaskContextProvider>
  );
}

export default App;
