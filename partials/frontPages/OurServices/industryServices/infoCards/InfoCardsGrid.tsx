import { BsBadgeAd } from "react-icons/bs";
import { InfoCardRight } from "./InfoCardRight";
import { FaUsers, FaFileAlt } from "react-icons/fa";
import { MdOutlineSocialDistance } from "react-icons/md";
import { FaHireAHelper, FaUsersGear, FaUsersViewfinder } from "react-icons/fa6";
import { RxAccessibility } from "react-icons/rx";
import { LeftInfoCard } from "./LeftInfoCard";


export const InfoCardsGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-20 mx-auto max-w-7xl  md:!py-20 !py-10">
      <InfoCardRight
        number="01"
        title="Access to a Curated Talent Pool"
        icon={<RxAccessibility />}
        variant="red"
      />
      <InfoCardRight
        number="02"
        title="Hire Qualified Candidates"
        icon={<FaHireAHelper />}
        variant="yellow"
      />
      <InfoCardRight
        number="03"
        title="Enhance Social Presence"
        icon={<FaUsersViewfinder />}
        variant="blue"
      />
      <InfoCardRight
        number="04"
        title="Advertise Jobs for Free"
        icon={<BsBadgeAd />}
        variant="red"
      />
      <LeftInfoCard number="05"
        title="Fill Workforce Gaps Fast"
        icon={<FaUsersGear />}
        variant="blue" />
        <LeftInfoCard number="06"
        title="Strengthen ties with Educational Institutions"
        icon={<FaUsersGear />}
        variant="red" />
         <LeftInfoCard number="07"
        title="Increase Brand Reach"
        icon={<FaUsersGear />}
        variant="yellow" />
         <LeftInfoCard number="08"
        title="Shortlist talent before your competitors for free"
        icon={<FaUsersGear />}
        variant="blue" />
      
    </div>
  );
}
