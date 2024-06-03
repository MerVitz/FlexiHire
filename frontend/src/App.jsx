// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Comment from './components/comment';
import Footer from './components/footer';
import Listings from './components/listings';
import Navbar from './components/navbar';
import SignIn from './components/signin';
import SignUp from './components/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUpLayout />} />
        <Route path="/signin" element={<SignInLayout />} />
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

function MainLayout() {
  return (
    <>
      <Navbar />
      <Listings />
      <Comment />
      <Footer />
    </>
  );
}

function SignUpLayout() {
  return (
    <>
      <Navbar />
      <SignUp />
      <Footer />
    </>
  );
}

function SignInLayout() {
  return (
    <>
      <Navbar />
      <SignIn />
      <Footer />
    </>
  );
}

export default App;
