import { useContext } from "react";
import { appContext } from "../app";

export default function Info() {
  const { user } = useContext(appContext);

  if (!user) {
    return <p>Please log in to see details</p>
  }

  return (
    <div className="info-container">
      <h2>My User Details</h2>
      <div className="info-card">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name: </strong> {user.firstName} {user.lastName}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Address:</strong> {user.city}, {user.street}, zipcode: {user.zipcode}</p>
      </div>
    </div>
  );
}