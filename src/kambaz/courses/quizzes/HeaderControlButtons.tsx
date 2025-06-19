import { IoEllipsisVertical } from "react-icons/io5";
// import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa6";

export default function HeaderControlButtons() {
  return (
    <div className="d-flex align-items-center float-end">
      <p className="wd-rounded-corners-all-around 
            wd-border-thin wd-border-solid 
            wd-padding-moderate mb-0 p-1">
            40% of Total
      </p>
      <FaPlus />
      <IoEllipsisVertical className="fs-4" />
    </div> );}