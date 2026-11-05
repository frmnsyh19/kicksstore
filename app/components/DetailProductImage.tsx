import React, { useState } from "react";

interface GalleryProps {
  id: string;
  url: string;
}

export const DetailProductImage = ({
  image,
  gallery,
}: {
  image: string;
  gallery: GalleryProps[];
}) => {
  const [varian, setVarian] = useState<string>(gallery[0]?.url ?? "");

  return (
    <div className="w-full h-full flex flex-col-reverse lg:flex-row">
      <div className="w-full border border-gray-300 p-2 flex gap-2 lg:gap-4 flex-row lg:flex-col lg:w-24">
        {/* <div
            onClick={() => setVarian(image)}
            className={`w-full shadow border ${image === varian ? "border-lime-400" : "border-gray-300"}`}>
            <img src={imag} className="object-cover" alt="" />
          </div> */}
        {gallery.map((items) => (
          <div
            key={items.id}
            onClick={() => setVarian(items.url)}
            className={`lg:w-full w-17 h-17 shadow  ${items.url === varian ? "border-2 border-lime-400" : "border border-gray-300"}`}>
            <img
              src={items.url}
              className="object-cover w-full h-full"
              alt=""
            />
          </div>
        ))}
      </div>
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={varian}
          alt=""
          className="max-w-full max-h-full object-contain"
        />
      </div>
    </div>
  );
};
