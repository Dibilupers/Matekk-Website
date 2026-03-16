import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CourseModules({ modules }) {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (index) =>
    setOpenSection(openSection === index ? null : index);

  return (
    <div className="flex flex-col gap-3">
      {modules.map((module, index) => (
        <div key={index} className="rounded-xl overflow-hidden border border-gray-200">
          <div
            onClick={() => toggleSection(index)}
            className={`w-full px-6 py-4 flex items-center justify-between transition-all duration-300 cursor-pointer ${
              openSection === index
                ? "bg-[#1775EE] text-white font-semibold"
                : "bg-[#EBF5FD] hover:bg-blue-50 font-normal"
            }`}
          >
            <span className="text-left">{module.title}</span>
            {openSection === index
              ? <ChevronUp className="w-5 h-5 shrink-0" />
              : <ChevronDown className="w-5 h-5 shrink-0" />}
          </div>

          <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
            openSection === index && module.items.length > 0
              ? "max-h-1000 opacity-100"
              : "max-h-0 opacity-0"
          }`}>
            <ul className="flex flex-col gap-2 px-6 py-4 bg-[#EFF6FF]">
              {module.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm text-gray-700">
                  {typeof item === "string" ? item : (
                    <div>
                      <p className="font-medium">{item.subTitle}</p>
                      <ul className="ml-4 mt-1 flex flex-col gap-1">
                        {item.items.map((subItem, subIndex) => (
                          <li key={subIndex} className="text-sm">{subItem}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}