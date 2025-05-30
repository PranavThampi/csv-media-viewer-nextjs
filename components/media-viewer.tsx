import React from "react";
import { useState, useEffect } from "react";
import { fetchMediaType } from "@/app/actions";
import Image from "next/image";
import { Rings } from "react-loader-spinner";
import { mediaTypeValues } from "@/lib/utils";

const MediaViewer: React.FC<{
  mediaUrl: string;
  providedMediaType: mediaTypeValues;
}> = ({ mediaUrl, providedMediaType }) => {
  const [mediaType, setMediaType] = useState<mediaTypeValues>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (providedMediaType) {
      setMediaType(providedMediaType);
      setLoading(false);
      setError(null);
      return;
    }

    const getMediaType = async () => {
      try {
        const type = await fetchMediaType(mediaUrl);
        console.log(`type: ${type}`);
        setMediaType(type);
        setError(null);
      } catch (error) {
        console.error("Error fetching media type:", error);
        setError("Error fetching media type");
      } finally {
        setLoading(false); // Set loading to false after fetching media type
      }
    };

    getMediaType();
  }, [mediaUrl, providedMediaType]);

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

  if (loading) {
    // return <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />; // Show loading spinner while fetching media
    return (
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#000000"
        ariaLabel="rings-loading"
        radius="10"
        wrapperStyle={{}}
        wrapperClass="flex justify-center items-center h-full"
      />
    );
  }

  return (
    <>
      {mediaType === "image" ? (
        // <img src={mediaUrl} alt="Media content" style={{ maxWidth: "100%" }} />
        <Image
          src={mediaUrl}
          key={mediaUrl}
          alt="Media content"
          fill
          className="object-contain"
        />
      ) : (
        <video
          controls
          key={mediaUrl}
          style={{ maxWidth: "100%", maxHeight: "100%" }}
          autoPlay
        >
          <source src={mediaUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </>
  );
};

export default MediaViewer;
