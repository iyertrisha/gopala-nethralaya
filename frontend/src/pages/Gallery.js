import React, { useEffect, useRef } from "react";

const Gallery = () => {
  const sliderRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const container = containerRef.current;
    const cards = slider.querySelectorAll(".card");
    const ease = 0.08; // Smoother easing
    let currentX = 0;
    let targetX = 0;

    const lerp = (start, end, t) => start * (1 - t) + end * t;

    const getScaleFactor = (position, viewportWidth) => {
      const center = viewportWidth / 2;
      const maxDistance = viewportWidth / 2;
      const distance = Math.abs(position - center);
      const normalizedDistance = Math.min(distance / maxDistance, 1);
      
      // Smoother scale curve
      return Math.max(0.4, 1.2 - (normalizedDistance * 0.8));
    };

    const updateScales = () => {
      const viewportWidth = window.innerWidth;
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const scaleFactor = getScaleFactor(cardCenter, viewportWidth);
        const imgScaleFactor = scaleFactor * 1.05;
        const img = card.querySelector("img");
        
        card.style.transform = `scale(${scaleFactor})`;
        card.style.transition = 'transform 0.1s ease-out';
        img.style.transform = `scale(${imgScaleFactor})`;
      });
    };

    let animationId;
    const update = () => {
      const diff = Math.abs(targetX - currentX);
      if (diff > 0.1) {
        currentX = lerp(currentX, targetX, ease);
        slider.style.transform = `translateX(${currentX}px)`;
        updateScales();
        animationId = requestAnimationFrame(update);
      } else {
        currentX = targetX;
        slider.style.transform = `translateX(${currentX}px)`;
        updateScales();
      }
    };

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress within the container
      const startScroll = containerTop;
      const endScroll = containerTop + containerHeight - windowHeight;
      const scrollProgress = Math.max(0, Math.min(1, (scrollTop - startScroll) / (endScroll - startScroll)));
      
      // Calculate maximum translation needed
      const sliderWidth = slider.scrollWidth;
      const viewportWidth = window.innerWidth;
      const maxTranslate = sliderWidth - viewportWidth;
      
      // Add padding to show first and last images properly
      const padding = viewportWidth * 0.1;
      targetX = -scrollProgress * (maxTranslate + padding) + padding;
      
      // Start animation
      if (!animationId) {
        update();
      }
    };

    // Initial positioning to show first images
    const initializePosition = () => {
      const padding = window.innerWidth * 0.1;
      currentX = padding;
      targetX = padding;
      slider.style.transform = `translateX(${currentX}px)`;
      updateScales();
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateScales);
    
    // Initialize after a short delay to ensure elements are rendered
    setTimeout(initializePosition, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScales);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "400vh" }}
    >
      {/* Pinned Gallery */}
      <div className="sticky top-0 h-screen flex items-center justify-start overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <div ref={sliderRef} className="slider flex gap-6 pl-16">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="card w-72 h-96 flex-shrink-0 rounded-2xl overflow-hidden shadow-xl bg-white transform-gpu"
            >
              <img
                src={`https://picsum.photos/400/500?random=${i + 1}`}
                alt={`Image ${i + 1}`}
                className="w-full h-full object-cover transform-gpu"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;