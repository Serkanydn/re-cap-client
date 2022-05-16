import { useState } from "react";
import calendar from "../../assets/admin/icon/calendar.png"
import chart_fill from "../../assets/admin/icon/chart_fill.png"
import logo from "../../assets/admin/icon/logo.png"
import control from "../../assets/admin/icon/control.png"
import car from "../../assets/admin/icon/car.png"
import color from "../../assets/admin/icon/color.png"
import brand from "../../assets/admin/icon/brand.png"
import { Link } from "react-router-dom";

const images = { logo, control, chart_fill,car,color,brand }

const App = () => {
    const [open, setOpen] = useState(true);
    const Menus = [
        { title: "Anasayfa", src: images.chart_fill, path: "/admin" },
        { title: "Araçlar", src: images.car, path: "/admin/car/list" },
        { title: "Renkler", src: images.color, gap: true, path: "/admin/color/list" },
        { title: "Markalar ", src: images.brand, path: "/admin/brand/list" },
    ];


    const [isActive, setActive] = useState(0)

    return (
        <div className="flex ">
            <div
                className={` ${open ? "w-72" : "w-20 "
                    } bg-dark-purple min-h-screen p-5  pt-8 relative duration-300`}
            >
                <img
                    src={images.control}
                    className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
           border-2 rounded-full  ${!open && "rotate-180"}`}
                    onClick={() => setOpen(!open)}
                />
                <div className="flex gap-x-4 items-center">
                    <img
                        src={images.logo}
                        className={`cursor-pointer duration-500 ${open && "rotate-[360deg]"
                            }`}
                    />
                    <h1
                        className={`text-white origin-left font-medium text-xl duration-200 ${!open && "scale-0"
                            }`}
                    >
                        Designer
                    </h1>
                </div>
                <ul className="pt-6">
                    {Menus.map((Menu, index) => (
                        <Link
                            to={Menu.path}
                            key={index}
                            onClick={() => setActive(index)}
                            className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${index === isActive && "bg-light-white"
                                } `}
                        >
                            <img src={Menu.src} />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                {Menu.title}
                            </span>
                        </Link>
                    ))}
                </ul>
            </div>

        </div>
    );
};
export default App;