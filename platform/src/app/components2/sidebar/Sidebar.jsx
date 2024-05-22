import { useDashboardContext } from "../Provider";
import css from "../style.module.css";
import Link from "next/link";
const style = {
  mobileOrientation: {
    start: "left-0",
    end: "right-0",
  },
  container: "pb-32 lg:pb-6",
  close: "hidden lg:block lg:w-[380px] lg:z-auto",
  open: "w-10/12 absolute z-40 sm:w-5/12 lg:w-24",
  default: "overflow-y-auto top-0 lg:relative",
};

export function Sidebar(props) {
  const { sidebarOpen } = useDashboardContext();
  return (
    <aside
      className={`${style.default} 
        ${style.mobileOrientation[props.mobileOrientation]} 
        ${sidebarOpen ? style.open : style.close} ${css.scrollbar}`}
    >
      <Link href="/">
        <div className="h-screen w-full border-r-2 border-[#212121] ">
          <img
            className="flex items-center justify-center m-auto rounded-[50%] py-[50px] "
            height={100}
            width={100}
            src="/logo.png"
            
          />
        </div>
      </Link>
    </aside>
  );
}
