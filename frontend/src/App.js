import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import MyBlogs from "./pages/MyBlogs";
import RegisterPage from "./pages/RegisterPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UsersList from "./pages/UsersList";
import FollowingList from "./pages/FollowingList";
import FollowerList from "./pages/FollowerList";
import SingleBlog from "./pages/SingleBlog";
import Header from "./pages/Header";
import {AuthProvider} from "./AuthProvider";
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myBlogs" element={<MyBlogs />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
        <Route path="/blog/:id" element={<SingleBlog />} />
        <Route path="/usersList" element={<UsersList />} />
        <Route path="/followingList" element={<FollowingList />} />
        <Route path="/followerList" element={<FollowerList />} />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
