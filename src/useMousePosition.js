import { useState, useEffect } from "react";

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}


const useMousePosition = (target) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const updateMousePosition = e => {

    const inWidth = e.clientX >= target.x && e.clientX < target.width + target.x
    const inHeight = e.clientY >= target.y && e.clientY < target.height + target.y

    
    // if (inWidth && inHeight) {
      const innerX = e.clientX - target.x
      const innerY = e.clientY - target.y

      const mappedX = map_range(innerX, 0, target.width, 0, 1)
      const mappedY = map_range(innerY, 0, target.height, 0, 1)

      // console.log(mappedX, mappedY)
      
    
      // setMousePosition({ x: innerX, y: innerY });
      setMousePosition({ x: e.clientX, y: e.clientY });
    // }
    
  };

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [target]);

  return mousePosition;
};

export default useMousePosition;
