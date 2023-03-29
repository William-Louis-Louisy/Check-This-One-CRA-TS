import React, { useEffect, useRef, useState } from "react";

function LazyImage({ src, alt, ...props }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = src;
            img.onload = () => setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px 0px" }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    const imgCurrent = imgRef.current;
    return () => {
      if (imgCurrent) {
        observer.unobserve(imgCurrent);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={isLoaded ? src : ""}
      alt={alt}
      {...props}
      style={{ ...props.style, opacity: isLoaded ? 1 : 0 }}
    />
  );
}

export default LazyImage;
