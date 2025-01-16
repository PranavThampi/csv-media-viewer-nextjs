"use server";
import axios from "axios";

export const fetchMediaType = async (
  url: string
): Promise<"image" | "video"> => {
  try {
    const response = await axios.get(url);
    const contentType = response.headers["content-type"];
    if (contentType?.startsWith("image")) {
      return "image";
    } else if (contentType?.startsWith("video")) {
      return "video";
    } else {
      throw new Error("Unsupported media type");
    }
  } catch (error) {
    console.error("Error fetching media type:", error);
    throw new Error("Error fetching media type");
  }
};
