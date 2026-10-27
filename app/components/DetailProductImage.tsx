import React, { useState } from "react";

interface GalleryItem {
  id: string;
  url: string;
}

interface ThumbnailProps {
  url: string;
  isActive: boolean;
  onSelect: () => void;
  alt: string;
}

interface DetailProductImageProps {
  image: string;
  gallery?: GalleryItem[];
  alt?: string;
}
export const DetailProductImage = ({
  image,
  gallery = [],
  alt = "Product image",
}: DetailProductImageProps) => {
  const [activeImage, setActiveImage] = useState<string>(image);

  return (
    <div className="w-full flex flex-col-reverse lg:flex-row gap-2">
      {/* Thumbnail list */}
      <div className="lg:w-20 w-full flex flex-row justify-start items-center lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
        <Thumbnail
          url={image}
          isActive={activeImage === image}
          onSelect={() => setActiveImage(image)}
          alt={alt}
        />
        {gallery.map((item) => (
          <Thumbnail
            key={item.id}
            url={item.url}
            isActive={activeImage === item.url}
            onSelect={() => setActiveImage(item.url)}
            alt={alt}
          />
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 min-w-0 h-full">
        <div className="w-full h-full aspect-square overflow-hidden rounded-md">
          <img
            src={activeImage}
            alt={alt}
            className="w-full object-center transition-opacity duration-200"
          />
        </div>
      </div>
    </div>
  );
};

const Thumbnail = ({ url, isActive, onSelect, alt }: ThumbnailProps) => (
  <button
    type="button"
    onClick={onSelect}
    className={`shrink-0 w-20 h-20 p-2 border cursor-pointer transition-colors ${
      isActive ? "border-orange-400" : "border-gray-200 hover:border-gray-300"
    }`}
    aria-pressed={isActive}>
    <img src={url} alt={alt} className="w-full h-full object-cover" />
  </button>
);
