import React, { useEffect, useState, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { getFollowStatus, toggleFollow } from "../services/api";

interface FollowButtonProps {
  targetemail: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ targetemail }) => {
  const { translate } = useContext(LanguageContext);
  const [isFollowing, setIsFollowing] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const data = await getFollowStatus(targetemail);
        setIsFollowing(data.is_following);
      } catch (err) {
        console.error(err);
        setError("Failed to load follow status");
      } finally {
        setLoading(false);
      }
    };
    fetchStatus();
  }, [targetemail]);

  const handleToggleFollow = async () => {
    try {
      const data = await toggleFollow(targetemail);
      setIsFollowing(data.is_following);
    } catch (err) {
      console.error(err);
      setError("Action failed");
    }
  };

  if (loading) return null;
  if (error) return <p className="error">{error}</p>;

  return (
    <button
      className={`follow-btn ${isFollowing ? "unfollow" : "follow"}`}
      onClick={handleToggleFollow}
    >
      {isFollowing ? translate("Unfollow") : translate("Follow")}
    </button>
  );
};

export default FollowButton;
