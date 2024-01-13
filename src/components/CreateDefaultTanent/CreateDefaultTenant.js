import React, { useState } from "react";
import "./index.css";
import { instance } from "Fetch";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateDefaultTenant = () => {
  let navigate = useNavigate();
  const [name, setName] = useState("Softel Communications Inc");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: name,
      userName: email,
    };
    try {
      const response = await instance.post("/createdefaulttenant", data);

      console.log("s", response.data);
      if (response.status===200) {
        toast.error(response.data.err_msg);
        navigate("/");
        return;
      } else if(response.status===201) {
        toast.success(response.data.message)
        navigate("/");
      }else if(response.status===500){
        toast.error(response.data.err_msg);
      }
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error("Error sending data:", error);
    }
    console.log({ name, email });
  };

  return (
    <div className="form-container">
      <span className="heading">Create Default Tenant</span>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="name">Default Tenant Name*</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Default Admin/Root User*</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="createBtn">
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default CreateDefaultTenant;
