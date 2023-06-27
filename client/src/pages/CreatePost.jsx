import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRandomPrompt } from "../utils";
import FormField from "../components/FormField";
import Loader from "../components/Loader";
import "./CreatePost.css"

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generaratingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

 

  const handleChange = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  };

  const handleSurpriseMe = () => {
    const randomPrompt=getRandomPrompt(form.prompt);
    setForm({...form,prompt:randomPrompt})
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:8001/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });

        const data = await response.json();
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` });
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8001/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form }),
        });

        await response.json();
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section>
      <div>
        <h1 className="create-heading">Create</h1>
        <p className="create-sub">
          Create imaginative and stunning AI generated images through DALL-E AI
          and share them with the community
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form">
          <FormField
            LabelName="Your Name"
            type="text"
            name="name"
            placeholder="Abhishek Singh"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            LabelName="Prompt"
            type="text"
            name="prompt"
            placeholder="an armchair in the shape of an avocado'"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="create-img">
            {form.photo ? (
              <img src={form.photo} alt={form.prompt} />
            ) : (
              <img
                src="https://icons.iconarchive.com/icons/praveen/minimal-outline/512/gallery-icon.png"
                alt="preview"
              />
            )}

            {generaratingImg && (
              <div>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div>
          <button type="button" onClick={generateImage} className="btn">
            {generaratingImg ? "Generarating..." : "Generate"}
          </button>
        </div>
        <div>
          <p>You can share the generated image with others in the community</p>
          <button type="submit" className="btn">
            {loading?"Sharing...":"Share"}
          </button>
          </div>
      </form>
    </section>
  );
};

export default CreatePost;
