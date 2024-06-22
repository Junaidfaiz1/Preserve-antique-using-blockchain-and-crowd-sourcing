import Home from "../Home/Home";
export default function Auth({ children }) {
  let token = window.localStorage.getItem("token");

  if (token) {
    var user = JSON.parse(token);
  } else {
    return <Home />;
  }

  return user && children;
}
