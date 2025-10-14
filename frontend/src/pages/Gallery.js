import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Gallery = () => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(3);

  const images = [
    "/images/front-but-in-daytime.jpg",
    "/images/sideprofile.jpg",
    "/images/speccc.jpg",
    "/images/the-gang.jpg",
    "/images/surgery-equipment1.jpg",
    "/images/patient0.jpg",
    "/images/operating-room.jpg",
    "/images/operating-room-closeup.jpg",
    "/images/laptop-ahh-machine.jpg",
    "/images/fully-front.jpg",
    "/images/colorful-machine.jpg",
    "/images/big-machine.jpg",
  ];

  // compute items per view relative to screen size
  const updateItemsPerView = () => {
    if (!sliderRef.current) return;
    const containerWidth = sliderRef.current.offsetWidth;
    const cardMinWidth = 400; // bigger cards
    const perView = Math.max(1, Math.floor(containerWidth / cardMinWidth));
    setItemsPerView(perView);
  };

  useEffect(() => {
    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const scrollToIndex = (index) => {
    if (isScrolling) return;

    setIsScrolling(true);
    const slider = sliderRef.current;
    if (!slider) return;

    const itemWidth = slider.children[0]?.offsetWidth || 0;
    const gap = 32; // gap between cards
    const scrollDistance = (itemWidth + gap) * index;

    slider.scrollTo({
      left: scrollDistance,
      behavior: "smooth",
    });

    setCurrentIndex(index);
    setTimeout(() => setIsScrolling(false), 500);
  };

  const scrollLeft = () => {
    const newIndex = Math.max(0, currentIndex - 1);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const maxIndex = Math.max(0, images.length - itemsPerView);
    const newIndex = Math.min(maxIndex, currentIndex + 1);
    scrollToIndex(newIndex);
  };

  const handleScroll = () => {
    if (isScrolling) return;
    const slider = sliderRef.current;
    if (!slider) return;

    const itemWidth = slider.children[0]?.offsetWidth || 0;
    const gap = 32;
    const scrollLeft = slider.scrollLeft;
    const newIndex = Math.round(scrollLeft / (itemWidth + gap));
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
    }
  };

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;
    slider.addEventListener("scroll", handleScroll);
    return () => slider.removeEventListener("scroll", handleScroll);
  }, [currentIndex, isScrolling]);

  const maxIndex = Math.max(0, images.length - itemsPerView);

  return (
    <div className="relative w-full bg-white">
      <div className="relative w-full py-8">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          disabled={currentIndex === 0}
          className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white/90 hover:scale-110 ${
            currentIndex === 0
              ? "opacity-50 cursor-not-allowed"
              : "opacity-80 hover:opacity-100"
          }`}
        >
          <ChevronLeft className="w-6 h-6 text-gray-700" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          disabled={currentIndex >= maxIndex}
          className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/70 backdrop-blur-sm border border-white/50 shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-white/90 hover:scale-110 ${
            currentIndex >= maxIndex
              ? "opacity-50 cursor-not-allowed"
              : "opacity-80 hover:opacity-100"
          }`}
        >
          <ChevronRight className="w-6 h-6 text-gray-700" />
        </button>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="flex gap-8 overflow-x-auto scrollbar-hide scroll-smooth px-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((src, i) => (
            <div
              key={i}
              style={{
                flex: `0 0 ${100 / itemsPerView}%`,
                maxWidth: `${100 / itemsPerView}%`,
              }}
              className="rounded-2xl overflow-hidden shadow-xl bg-white transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <img
                src={src}
                alt={`Hospital Image ${i + 1}`}
                className="w-full h-[28rem] object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "bg-gray-800 scale-125"
                  : "bg-gray-300 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Gallery;
 