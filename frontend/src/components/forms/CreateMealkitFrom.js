import React, { useState } from "react";
import { createMealkit } from "../api/mealkitApi";

const CreateMealkitForm = () => {
  const [form, setForm] = useState({
    mname: "",
    mprice: 0,
    recipe: "",
    category: "KOREAN",
  });
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMealkit(form, files);
      setMessage("Mealkit created successfully!");
    } catch (err) {
      setMessage(`Error: ${err.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="mname" value={form.mname} onChange={handleChange} />
      </label>
      <label>
        Price:
        <input type="number" name="mprice" value={form.mprice} onChange={handleChange} />
      </label>
      <label>
        Recipe:
        <textarea name="recipe" value={form.recipe} onChange={handleChange}></textarea>
      </label>
      <label>
        Category:
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="KOREAN">Korean</option>
          <option value="CHINESE">Chinese</option>
          <option value="WESTERN">Western</option>
          <option value="JAPANESE">Japanese</option>
          <option value="OTHER">Other</option>
        </select>
      </label>
      <label>
        Images:
        <input type="file" multiple onChange={handleFileChange} />
      </label>
      <button type="submit">Create Mealkit</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default CreateMealkitForm;
