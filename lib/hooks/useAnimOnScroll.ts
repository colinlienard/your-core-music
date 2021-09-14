import { MutableRefObject, useEffect, useState } from "react";
  
const useAnimOnScroll = (target: MutableRefObject<Element | null>) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ratio = 0;
    const threshold = 0.2;

    useEffect(() => {
        if(target.current) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if(entry.intersectionRatio > ratio) {
                        setIsIntersecting(true);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                root: null,
                rootMargin: "0px",
                threshold
            });
            observer.observe(target.current);
        }
    }, [target.current])

    return isIntersecting;
}

export default useAnimOnScroll;