import { useState } from "react";
import arrowUp from "../../assets/arrow_up.svg";
import arrowDown from "../../assets/arrow_down.svg";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What services does MGKK offer?",
      answer:
        "MGKK provides ICT consultancy and engineering solutions, including network and security infrastructure, data centers, cybersecurity, software and web development, cloud computing, SMART environment automation, and auxiliary systems.",
    },
    {
      question: "Does MGKK provide ICT training?",
      answer:
        "Lorem",
    },
    {
      question:
        "What training formats are available?",
      answer:
        "Lorem",
    },
    {
      question: "Does MGKK offer cybersecurity services and training?",
      answer:
        "Lorem",
    },
    {
      question: "What certifications are covered in the training programs?",
      answer:
        "Lorem",
    },
  ];

  return (
    <div className="flex flex-col space-y-6 ">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className={`h-fit rounded-2xl w-full transition-all duration-300
              ${isOpen ? "bg-linear-to-b from-[#5192E6] to-[#1775EE] p-6 md:p-8" : "bg-transparent p-0"}
            `}
          >
            <div className="flex justify-between items-center space-x-5 w-full lg:w-full">
              <h5
                className={`transition-colors duration-300 w-[87%] md:w-[85%] lg:w-[85%] xl:w-full 2xl:w-[85%]
                  ${isOpen ? "text-white" : "text-black"}
                `}
              >
                {faq.question}
              </h5>

              <button onClick={() => setOpenIndex(isOpen ? null : index)}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center
  ${isOpen ? "bg-[#EBF5FD]" : "bg-[#1775EE]"}
`}
                >
                  <img
                    src={isOpen ? arrowUp : arrowDown}
                    alt={isOpen ? "Minimize" : "Expand"}
                    className="w-10 h-10"
                  />
                </div>
              </button>
            </div>

            <div
              className={` w-full md:w-[90%] lg:w-[90%] xl:w-full 2xl:w-[90%] overflow-hidden transition-all duration-300
                ${isOpen ? "max-h-48 opacity-100 mt-4" : "max-h-0 opacity-0"}
              `}
            >
              <p className="text-white">{faq.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
