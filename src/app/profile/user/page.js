"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

export async function currentUser() {
  const result = await axios
    .get("/api/current")
    .then((response) => response.data);
  return result;
}

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const tempUser = await currentUser();
        setUser(tempUser);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Error loading user data.</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <img src={user.profileURL} alt={`${user.name}'s profile`} className="profile-image" />
        <div className="user-details">
          <h1 className="user-name">{user.name}</h1>
          <p className="user-email">{user.email}</p>
          <p className="user-about">{user.about}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
