import React, { useState, useContext } from "react";
import { createPost } from "../services/api";
import { LanguageContext } from "../context/LanguageContext";
import "../styles/App.css";

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const { translate } = useContext(LanguageContext);

  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("caption", caption);
    if (image) formData.append("image", image);

    try {
      await createPost(formData); // Axios request in api.ts
      onClose(); // close modal on success
    } catch (err) {
      console.error(err);
      setError("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={translate("What's on your mind?")}
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <input
          title={translate("Post")}
          type="file"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? translate("Posting...") : translate("Post")}
        </button>
        <button type="button" onClick={onClose}>
          {translate("Cancel")}
        </button>
      </form>
    </div>
  );
};

export default CreatePostModal;