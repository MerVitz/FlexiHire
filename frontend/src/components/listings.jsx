// eslint-disable-next-line no-unused-vars
import React from 'react';
import './styles/listings.css';

function Listings() {
  return (
    <>
      <div className="listings-container">
        <h2>Featured Products</h2>
        <ul>
          <li>
            <img src="../assets/skateboard.jpg" alt="Skateboard" />
            <div>
              <h3>Skate Board</h3>
              <p><span>Type:</span> Sample Type</p>
              <p><span>Description:</span> Sample Description</p>
              <p><span>Price per day:</span> $Sample Price</p>
              <p><span className="accent">Available:</span> Yes/No</p>
            </div>
          </li>
          {/* Repeat the above block for more equipment items */}
        </ul>
      </div>
    </>
  );
}

export default Listings;
