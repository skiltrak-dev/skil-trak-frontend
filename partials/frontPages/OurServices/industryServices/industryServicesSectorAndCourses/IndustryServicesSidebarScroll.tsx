import { useRef, useState, useEffect } from "react";
import { IndustryServicesSidebarCard } from "./IndustryServicesSidebarCard";
import { IoIosArrowDropup, IoIosArrowDropdown } from "react-icons/io";
import { Typography } from "@components";

export const IndustryServicesSidebarScroll: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const cards = [
    { title: "Community Services", description: "Empowering communities through practical care and support." },
    {
      title: "Individual Support",
      description:
        "Supporting individuals through personalised care and assistance to people who are ageing, living with disability",
      image: "https://picsum.photos/seed/picsum/200/300",
    },
    { title: "Business", description: "Applying administrative and communication skills in real workplace settings." },
  ];

  const totalCards = cards.length;

  const scrollToIndex = (index: number) => {
    const container = containerRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
      setActiveIndex(index);
    }
  };

  const goPrev = () => activeIndex > 0 && scrollToIndex(activeIndex - 1);
  const goNext = () => activeIndex < totalCards - 1 && scrollToIndex(activeIndex + 1);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const updateScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const newTrackHeight = track.clientHeight;

      // Thumb height proportional to visible area
      const newThumbHeight = Math.max((clientHeight / scrollHeight) * newTrackHeight, 30);

      // Thumb position proportional to scrollTop
      const maxThumbTop = newTrackHeight - newThumbHeight;
      const newThumbTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop;

      setTrackHeight(newTrackHeight);
      setThumbHeight(newThumbHeight);
      setThumbTop(isNaN(newThumbTop) ? 0 : newThumbTop);

      // Active index detection
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;
      Array.from(container.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.top + childRect.height / 2;
        const distance = Math.abs(childCenter - containerCenter);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });
      setActiveIndex(closestIndex);
    };

    updateScroll();
    container.addEventListener("scroll", updateScroll);
    window.addEventListener("resize", updateScroll);

    return () => {
      container.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  return (
   <div style={{
            backgroundImage: 'url(/images/site/services/rto-services/sector-and-courses-bg.png)'
        }}>
   
   <div className="max-w-7xl mx-auto md:my-20 my-10">
    
    <div className="flex items-center gap-x-16 justify-center mb-5">
        <div className="">
            <svg xmlns="http://www.w3.org/2000/svg" width="49" height="33" viewBox="0 0 49 33" fill="none">
                <line x1="11.3493" y1="0.729977" x2="2.40116" y2="31.752" stroke="#F9B847" stroke-width="5"/>
                <line x1="28.9052" y1="0.855908" x2="19.4153" y2="31.7165" stroke="#F9B847" stroke-width="5"/>
                <line x1="45.8083" y1="0.692867" x2="36.8601" y2="31.7148" stroke="#F9B847" stroke-width="5"/>
            </svg>
        </div>
        <Typography variant="h2">Sectors & Courses</Typography>
    </div>
        <div className="flex items-center gap-12  px-4 bg-no-repeat bg-cover" >
        {/* Gradient Scrollbar */}
        <div className="flex flex-col items-center flex-shrink-0  py-4 rounded-full" style={{background: 'linear-gradient(180deg, rgba(247, 166, 25, 0.92) 0%, rgba(247, 166, 25, 0.92) 100%)'}}>
            <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="rounded-full bg-white"
            aria-label="Previous card"
            >
            <IoIosArrowDropup size={30} />
            </button>

            <div ref={trackRef} className="w-12 h-[280px] relative my-2 rounded-full overflow-hidden">
            <div
                className="absolute left-1/2 -translate-x-1/2 w-5 bg-[#044866]/60 rounded-full transition-all duration-150 ease-out"
                style={{ height: `${thumbHeight}px`, top: `${thumbTop}px` }}
            />
            </div>

            <button
            onClick={goNext}
            disabled={activeIndex === totalCards - 1}
            className="rounded-full bg-white"
            aria-label="Next card"
            >
            <IoIosArrowDropdown size={30} />
            </button>
        </div>

        {/* Cards */}
        <div
            ref={containerRef}
            className="flex flex-col gap-6 px-10 py-5 max-h-[350px] remove-scrollbar overflow-y-auto scroll-smooth snap-y snap-mandatory scrollbar-hide"
        >
            {cards.map((card, index) => (
            <div key={index} className="snap-center">
                <IndustryServicesSidebarCard
                title={card.title}
                description={card.description}
                image={card.image}
                active={activeIndex === index}
                />
            </div>
            ))}
        </div>
        </div>
   </div>
   </div>
  );
};
