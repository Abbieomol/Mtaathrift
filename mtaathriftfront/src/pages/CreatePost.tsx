import React, { useState, useContext, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createPost } from "../services/api";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/App.css";


function getErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    return err.response?.data?.detail || "Request failed";
  }

  if (err instanceof Error) {
    return err.message;
  }

  return "An unknown error occurred";
}

const CreatePost: React.FC = () => {
  const { translate } = useContext(LanguageContext);

  const [caption, setCaption] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handlePost = async () => {
    setLoading(true);
    setError("");

    if (!caption && !imageFile) {
      setError(translate("Please add a caption or select an image."));
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await createPost(formData);

      setCaption("");
      setImageFile(null);

      navigate("/dashboard");
    } catch (err: unknown) {
      console.error(err);
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="create-post-form">
      <h2>{translate("Create Post")}</h2>

      {error && <p className="error">{error}</p>}

      <textarea
        placeholder={translate("What's on your mind?")}
        rows={4}
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="post-textarea"
      />

      <input
        title={translate("Upload Post")}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="post-file-input"
      />

      <button
        onClick={handlePost}
        className="post-submit-btn"
        disabled={loading}
      >
        {loading ? translate("Posting...") : translate("Post")}
      </button>

      <button onClick={handleBack} className="back-dashboard-btn">
        {translate("Back to Dashboard")}
      </button>
    </div>
  );
};

export default CreatePost;