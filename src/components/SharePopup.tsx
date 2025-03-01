import { Button } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const SharePopup: React.FC<{
  shareLink: string;
  isOpen: boolean;
  onClose: () => void;
}> = ({ shareLink, isOpen, onClose }) => {
  const [imageUrl, setImageUrl] = useState("");

  const getRandomImage = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const imageResponse = await response.json();
    setImageUrl(imageResponse.message);
  };

  useEffect(() => {
    if (isOpen) {
      getRandomImage();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h4>Share this Invite</h4>
        {imageUrl ? (
          <img
            className="share-img"
            src={imageUrl}
            width={"200px"}
            height={"200px"}
            style={{
              objectFit: "cover",
              border: "2px solid black",
            }}
            alt="dynamic_img"
          />
        ) : (
          <div style={{ width: 200, height: 200 }}></div>
        )}
        <p>
          <a
            style={{ textDecoration: "none" }}
            href={shareLink}
            target="_blank"
          >
            Click here to play!
          </a>
        </p>

        <Button color={"jade"} onClick={onClose} className="close-button">
          Close
        </Button>
      </div>
    </div>
  );
};

export default SharePopup;
