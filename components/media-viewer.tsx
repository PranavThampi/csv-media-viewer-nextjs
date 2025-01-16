import React from "react";
import { useState, useEffect } from "react";
import { fetchMediaType } from "@/app/actions";
import Image from "next/image";

const MediaViewer: React.FC<{ mediaUrl: string }> = ({ mediaUrl }) => {
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMediaType = async () => {
      try {
        const type = await fetchMediaType(mediaUrl);
        console.log(`type: ${type}`);
        setMediaType(type);
        setError(null);
      } catch (error) {
        console.error("Error fetching media type:", error);
        setError("Error fetching media type");
      }
    };

    getMediaType();
  }, [mediaUrl]);

  if (error) {
    return (
      <>
        <Image
          src="./no-image.svg"
          alt="no image"
          fill
          className="object-contain h-full w-full"
        />
        <div>{error}</div>
      </>
    );
  }

  if (!mediaType) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {mediaType === "image" ? (
        // <img src={mediaUrl} alt="Media content" style={{ maxWidth: "100%" }} />
        <Image
          src={mediaUrl}
          alt="Media content"
          fill
          className="object-contain"
        />
      ) : (
        <video controls style={{ maxWidth: "100%" }}>
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
};

export default MediaViewer;
