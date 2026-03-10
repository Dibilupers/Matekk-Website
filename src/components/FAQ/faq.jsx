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
        "Yes. MGKK Information Communication Technology Services is a premier ICT training center that offers a comprehensive range of training programs designed to equip individuals and organizations with the knowledge and skills required to thrive in today's digital world. Training is available both face to face and online.",
    },
    {
      question: "What training formats are available?",
      answer:
        "MGKK offers flexible training formats to accommodate different learning needs, including face-to-face and online sessions. We also provide corporate training solutions such as customized training programs tailored to organizational needs, as well as short-term workshops and seminars on emerging technologies.",
    },
    {
      question: "Does MGKK offer cybersecurity services and training?",
      answer:
        "Yes. MGKK provides comprehensive cybersecurity services including Vulnerability Assessment and Penetration Testing (VAPT) as part of its ICT consultancy offerings. On the training side, we offer in-depth courses covering cybersecurity principles, ethical hacking, and risk management for both individuals and organizations.",
    },
    {
      question: "What certifications are covered in the training programs?",
      answer:
        "MGKK's training programs cover a wide range of globally recognized certifications, including Cisco (CCNA, CCNP), CompTIA, Palo Alto Networks, Juniper, Huawei, Fortinet, Microsoft Azure, AWS, and ITIL4. Programming, cloud computing, and SMART environment automation courses are also available.",
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
