// ==================== IMPORTS - UPDATE FOR EACH COURSE ====================
// Change these imports based on the specific course
import Button from "../../../components/ui/button";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";

// COURSE-SPECIFIC ASSETS - Replace these for different courses
import pmp from "../../../assets/pmp.webp"; // Course badge image
import ccnaHero from "../../../assets/CCNAHeroImageAutomation.png"; // Hero banner background
import ccnaFooter from "../../../assets/CCNAFooterImageAutomation.png"; // Footer banner background
import MealIcon from "../../../assets/Meal.svg";
import ReviewIcon from "../../../assets/Review.svg";
import WorkstationIcon from "../../../assets/Workstation.svg";
import MedalIcon from "../../../assets/Medal.svg";
import CourseModules from "../../../components/training/courseModules";
import TrainingTemplateFooter from "../../../components/section/TrainingTemplateFooter";
import EnrollNowButton from "../../../components/ui/EnrollNowButton";

// ==================== COMPONENT NAME ====================
export default function PMP() {
  // ==================== COURSE MODULES ====================
  const modules = [
    {
      title: "1.0 People",
      items: [
        {
          subTitle: "1.1 Manage conflict",
          items: [
            "1.1.1 Interpret the source and stage of the conflict",
            "1.1.2 Analyze the context for the conflict",
            "1.1.3 Evaluate/recommend/reconcile the appropriate conflict resolution solution",
          ],
        },
        {
          subTitle: "1.2 Lead a team",
          items: [
            "1.2.1 Set a clear vision and mission",
            "1.2.2 Support the team's varied experiences",
            "1.2.3 Value servant leadership (e.g., relate the tenets of servant leadership to the team)",
            "1.2.4 Determine an appropriate leadership style (e.g., directive, collaborative)",
            "1.2.5 Inspire, motivate, and influence team members/stakeholders (e.g., team contract, social contract, reward system)",
            "1.2.6 Analyze team members and stakeholders' influence",
            "1.2.7 Distinguish various options to lead various team members and stakeholders",
          ],
        },
        {
          subTitle: "1.3 Support team performance",
          items: [
            "1.3.1 Appraise team member performance against key performance",
            "1.3.2 Support and recognize team member growth and development",
            "1.3.3 Determine appropriate feedback approach",
            "1.3.4 Verify performance improvements",
          ],
        },
        {
          subTitle: "1.4 Empower team members and stakeholders",
          items: [
            "1.4.1 Organize around team strengths",
            "1.4.2 Support team task accountability",
            "1.4.3 Evaluate demonstration of task accountability",
            "1.4.4 Determine and bestow level(s) of decision-making authority",
          ],
        },
        {
          subTitle:
            "1.5 Ensure team members/stakeholders are adequately trained",
          items: [
            "1.5.1 Determine required competencies and elements of training",
            "1.5.2 Determine training options based on training needs",
            "1.5.3 Allocate resources for training",
            "1.5.4 Measure training outcomes",
          ],
        },
        {
          subTitle: "1.6 Build a team",
          items: [
            "1.6.1 Appraise stakeholder skills",
            "1.6.2 Deduce project resource requirements",
            "1.6.3 Continuously assess and refresh team skills to meet project needs",
            "1.6.4 Maintain team and knowledge transfer",
          ],
        },
        {
          subTitle:
            "1.7 Address and remove impediments, obstacles, and blockers for the team",
          items: [
            "1.7.1 Determine critical impediments, obstacles, and blockers for the team",
            "1.7.2 Prioritize critical impediments, obstacles, and blockers for the team",
            "1.7.3 Use network to implement solutions to remove impediments, obstacles, and blockers for the team",
            "1.7.4 Re-assess continually to ensure impediments, obstacles, and blockers for the team are being addressed",
          ],
        },
        {
          subTitle: "1.8 Negotiate project agreements",
          items: [
            "1.8.1 Analyze the bounds of the negotiations for agreement",
            "1.8.2 Assess priorities and ultimate objective(s)",
            "1.8.3 Participate in agreement negotiations",
            "1.8.4 Re-assess continually to ensure impediments, obstacles, and blockers for the team are being addressed",
            "1.8.5 Determine a negotiation strategy",
          ],
        },
        {
          subTitle: "1.9 Collaborate with stakeholders",
          items: [
            "1.9.1 Evaluate engagement needs for stakeholders",
            "1.9.2 Optimize alignment between stakeholder needs, expectations, and project objectives",
            "1.9.3 Build trust and influence stakeholders to accomplish project objectives",
          ],
        },
        {
          subTitle: "1.10 Build shared understanding",
          items: [
            "1.10.1 Break down situation to identify the root cause of a misunderstanding",
            "1.10.2 Survey all necessary parties to reach consensus",
            "1.10.3 Support outcome of party agreement",
            "1.10.4 Investigate potential misunderstandings",
          ],
        },
        {
          subTitle: "1.11 Engage and support virtual teams",
          items: [
            "1.11.1 Examine virtual team member needs (e.g., environment, geography, culture, global, etc.)",
            "1.11.2 Investigate alternatives (e.g., communication tools, colocation) for virtual team member engagement",
            "1.11.3 Implement options for virtual team member engagement",
            "1.11.4 Continually evaluate effectiveness of virtual team member engagement",
          ],
        },
        {
          subTitle: "1.12 Define team ground rules",
          items: [
            "1.12.1 Communicate organizational principles with team and external stakeholders",
            "1.12.2 Establish an environment that fosters adherence to the ground rules",
            "1.12.3 Manage and rectify ground rule violations",
          ],
        },
        {
          subTitle: "1.13 Mentor relevant stakeholders",
          items: [
            "1.13.1 Allocate the time to mentoring",
            "1.13.2 Recognize and act on mentoring opportunities",
          ],
        },
        {
          subTitle:
            "1.14 Promote team performance through the application of emotional intelligence",
          items: [
            "1.14.1 Assess behavior through the lens of emotional indicators",
            "1.14.2 Analyze personality indicators and adjust to the emotional needs of key project stakeholders",
          ],
        },
      ],
    },
    {
      title: "2.0 Process",
      items: [
        {
          subTitle:
            "2.1 Execute project with the urgency required to deliver business value",
          items: [
            "2.1.1 Assess opportunities to deliver value incrementally",
            "2.1.2 Examine the business value throughout the project",
            "2.1.3 Examine and decompose individuals project tasks as necessary to find the minimum viable product",
          ],
        },
        {
          subTitle: "2.2 Manage communications",
          items: [
            "2.2.1 Analyze communication needs of all stakeholders",
            "2.2.2 Determine communication methods, channels, frequency, and level of detail for all stakeholders",
            "2.2.3 Communicate project information and updates effectively",
            "2.2.4 Confirm communication is understood and feedback is received",
          ],
        },
        {
          subTitle: "2.3 Assess and manage risks",
          items: [
            "2.3.1 Determine risk management options",
            "2.3.2 Iteratively assess and prioritize risks",
          ],
        },
        {
          subTitle: "2.4 Engage stakeholders",
          items: [
            "2.4.1 Analyze stakeholders (e.g., power interest grid, influence, impact)",
            "2.4.2 Categorize stakeholders",
            "2.4.3 Engage stakeholders by category",
            "2.4.4 Develop, execute, and validate a strategy for stakeholder engagement",
          ],
        },
        {
          subTitle: "2.5 Plan and manage budget and resources",
          items: [
            "2.5.1 Estimate budgetary needs based on the scope of the project and lessons learned from past projects",
            "2.5.2 Anticipate future budget challenges",
            "2.5.3 Monitor budget variations and work with governance structure to adjust as necessary",
            "2.5.4 Plan and manage resources",
          ],
        },
        {
          subTitle: "2.6 Plan and manage schedule",
          items: [
            "2.6.1 Estimate project tasks (milestones, dependencies, story points)",
            "2.6.2 Utilize benchmarks and historical data",
            "2.6.3 Prepare schedule based on methodology",
            "2.6.4 Measure ongoing progress based on methodology",
            "2.6.5 Modify schedule, as needed, based on methodology",
            "2.6.6 Coordinate with other projects and other operations",
            "2.6.7 Measure quality of products/deliverables",
          ],
        },
        {
          subTitle: "2.7 Plan and manage quality of products/deliverables",
          items: [
            "2.7.1 Determine quality standard for project deliverables",
            "2.7.2 Recommend options for improvement based on quality gaps",
            "2.7.3 Continually survey project deliverable quality",
          ],
        },
        {
          subTitle: "2.8 Plan and manage scope",
          items: [
            "2.8.1 Determine and prioritize requirements",
            "2.8.2 Break down scope (e.g., WBS, backlog)",
            "2.8.3 Monitor and validate scope",
          ],
        },
        {
          subTitle: "2.9 Integrate project planning activities",
          items: [
            "2.9.1 Consolidate the project/phase plans",
            "2.9.2 Assess consolidated project plans for dependencies, gaps, and continued business value",
            "2.9.3 Analyze the data collected",
            "2.9.4 Collect and analyze data to make informed project decisions",
            "2.9.5 Determine critical information requirements",
          ],
        },
        {
          subTitle: "2.10 Manage project changes",
          items: [
            "2.10.1 Anticipate and embrace the need for change (e.g., follow change management practices)",
            "2.10.2 Determine strategy to handle change",
            "2.10.3 Execute change management strategy according to the methodology",
            "2.10.4 Determine if change expense to move the project forward",
          ],
        },
        {
          subTitle: "2.11 Plan and manage procurement",
          items: [
            "2.11.1 Define resource requirements and needs",
            "2.11.2 Communicate resource requirements",
            "2.11.3 Manage suppliers/contracts",
            "2.11.4 Plan and manage procurement strategy",
            "2.11.5 Develop a delivery solution",
          ],
        },
        {
          subTitle: "2.12 Manage project artifacts",
          items: [
            "2.12.1 Determine the requirements (what, when, where, etc.) for managing the project artifacts",
            "2.12.2 Validate that the project information is kept up to date (i.e., version control) and accessible to all stakeholders",
            "2.12.3 Continually assess the effectiveness of the management of the project artifacts",
          ],
        },
        {
          subTitle:
            "2.13 Determine appropriate project methodology/methods and practices",
          items: [
            "2.13.1 Assess project needs, complexity, and magnitude",
            "2.13.2 Recommend project execution strategy (e.g., contracting, finance)",
            "2.13.3 Recommend a project methodology/approach (predictive, agile, hybrid)",
            "2.13.4 Use iterative, incremental practices throughout the project life cycle (e.g., lessons learned, stakeholder engagement, risk)",
          ],
        },
        {
          subTitle: "2.14 Establish project governance structure",
          items: [
            "2.14.1 Determine appropriate governance for a project (e.g., replicate organizational governance)",
            "2.14.2 Define escalation paths and thresholds",
          ],
        },
        {
          subTitle: "2.15 Manage project issues",
          items: [
            "2.15.1 Recognize when a team member is on issue",
            "2.15.2 Attack the issue with the optimal action to achieve project success",
            "2.15.3 Collaborate with relevant stakeholders on the approach to resolve the issues",
          ],
        },
        {
          subTitle: "2.16 Ensure knowledge transfer for project continuity",
          items: [
            "2.16.1 Discuss project responsibilities within team",
            "2.16.2 Outline expectations for working environment",
            "2.16.3 Confirm approach for knowledge transfers",
          ],
        },
        {
          subTitle: "2.17 Plan and manage project/phase closure or transitions",
          items: [
            "2.17.1 Determine criteria to successfully close the project or phase",
            "2.17.2 Validate readiness for transitions (e.g., go-live readiness, hand off phase)",
            "2.17.3 Conclude activities to close out project or phase (e.g., final lessons learned, retrospective, procurement, financials, resources)",
          ],
        },
      ],
    },
    {
      title: "3.0 Business Environment",
      items: [
        {
          subTitle: "3.1 Plan and manage project compliance",
          items: [
            "3.1.1 Confirm compliance requirements (e.g., security, health and safety, regulatory compliance)",
            "3.1.2 Classify compliance categories",
            "3.1.3 Determine potential threats to compliance",
            "3.1.4 Use methods to support compliance",
            "3.1.5 Analyze the consequences of noncompliance",
            "3.1.6 Determine necessary approach and action to address compliance needs (e.g., risk, legal)",
            "3.1.7 Measure the extent to which the project is in compliance",
          ],
        },
        {
          subTitle: "3.2 Evaluate and deliver project benefits and value",
          items: [
            "3.2.1 Investigate that benefits are identified",
            "3.2.2 Document agreement on ownership for ongoing benefit realization",
            "3.2.3 Verify measurement system is in place to track benefits",
            "3.2.4 Evaluate delivery options to demonstrate value",
            "3.2.5 Appraise stakeholders of value gain progress",
          ],
        },
        {
          subTitle:
            "3.3 Evaluate and address external business environment changes for impact on scope",
          items: [
            "3.3.1 Survey changes to external business environment (e.g., regulations, technology, geopolitical, fiscal)",
            "3.3.2 Assess and prioritize impact on project scope/backlog based on changes in external business environment",
            "3.3.3 Recommend options for scope/backlog changes (e.g., schedule, cost changes)",
            "3.3.4 Continually review external business environment for impacts on project scope/backlog",
          ],
        },
        {
          subTitle: "3.4 Support organizational change",
          items: [
            "3.4.1 Assess organizational culture",
            "3.4.2 Evaluate impact of organizational changes to project and determine required actions",
            "3.4.3 Engage stakeholders by category",
            "3.4.4 Evaluate impact of the project to the organization and determine required actions",
          ],
        },
      ],
    },
  ];
  return (
    <main className="flex flex-col h-full mx-[2.063rem] md:mx-16 lg:mx-16 xl:mx-[7.438rem] scroll-mt-18 space-y-10">
      {/* ==================== HERO BANNER ====================*/}
      <section className="relative pl-8 py-18 rounded-2xl shadow-lg flex flex-col gap-3 overflow-hidden min-h-62.5">
        {/* ==================== HERO BANNER - Image ====================*/}
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${ccnaHero})`,
          }}
        />
        {/* Hero Background Image Gradient */}
        <div className="absolute inset-0 bg-linear-to-r from-[#cbddf5] via-[#cbddf5ce] to-transparent"></div>

        {/* ==================== HERO BANNER - Text Content ====================*/}
        <div className="relative z-10 flex flex-col gap-3 pl-1 sm:pl-8">
          {/* Course Category */}
          <h6 className="w-fit px-4 py-2 text-[#1775EE] bg-blue-50 rounded-full">
            Project Management
          </h6>

          {/* ====== Course Title and Description ======*/}
          <div>
            {/* Course title */}
            <h1 className="text-[#1775EE]">
              Project Management Professional
            </h1>

            {/* Course description */}
            <p className="lg:w-[30vw] xl:w-lg text-gray-900">
              The certification from Project Management Institute validates
              professionals’ ability to manage people, processes, and business
              priorities to successfully lead projects across industries.
            </p>
          </div>

          {/* ====== Hero Button ====== */}
          <div className="flex flex-row sm:flex-row gap-2.5 mt-1">
            {/* Enroll Now Button - When clicked, opens a modal */}
            <EnrollNowButton />

            {/* Learn More Button - When clicked will scroll down to proceed on the other sections of the page */}
            <Button
              title="Learn More"
              type="none"
              buttonCustomStyle="bg-transparent text-blue-600 border-2 border-blue-600 hover:bg-white hover:border-white hover:text-blue-600 transition ease-in-out transition-all duration-300 px-6 py-3"
              btnFunc={() => {
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            />
          </div>
        </div>
      </section>

      {/* ==================== CONTENT SECTION - Training Informations/Content ==================== */}
      <div className="flex flex-col lg:flex-row justify-start items-start lg:items-stretch gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE: Contents/Information ==================== */}
        <div className="flex flex-col gap-8">
          {/* ==================== ABOUT SECTION ==================== */}
          <section className="flex flex-col gap-y-3">
            {/* About Section - Title */}
            <h3>
              About This <span className="text-[#1775EE]">Course</span>
            </h3>
            {/* About Section - Description */}
            {/* CHANGE: Course description paragraphs */}
            <p>
              This course prepares learners for the certification from the
              Project Management Institute through guided instruction and
              practical, project-based activities focused on applying standard
              project management practices, managing stakeholders, and aligning
              projects with organizational business goals.
            </p>
            <p>
              The program builds real-world project leadership and
              decision-making skills, supported by references like the A Guide
              to the Project Management Body of Knowledge (PMBOK Guide) and
              other recommended study resources.
            </p>
          </section>

          {/* ==================== WHAT YOU WILL LEARN ====================*/}
          <section className="flex flex-col gap-y-5">
            {/* What You Will Learn Section - Title */}
            <h3>
              What You Will <span className="text-[#1775EE]">Learn</span>
            </h3>

            {/* What You Will Learn Section - List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Project Integration Management Concepts</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Risk and Quality Management Principles</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Agile and Hybrid Methodology Fundamentals</p>
              </div>
              <div className="flex items-center gap-2.5">
                <FaCircleCheck className="text-[#1775EE] shrink-0 w-6 h-6" />
                <p>Communication Management Basics</p>
              </div>
            </div>
          </section>

          {/* ==================== COURSE CONTENT ==================== */}
          <section className="flex flex-col gap-y-5">
            {/* Course Content - Title */}
            <h3>
              Course <span className="text-[#1775EE]">Content</span>
            </h3>

            {/* Course Content - List */}
            <CourseModules modules={modules} />
          </section>
        </div>

        {/* ==================== RIGHT SIDEBAR: Contents/Information ==================== */}
        <aside className="flex flex-col gap-5 lg:w-72 xl:w-80 shrink-0">
          {/* ==================== CERT BADGE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex items-center justify-center h-64">
            {/* Cert Badge - Change/Update Image */}
            <img
              src={pmp}
              alt="PMP Certification Badge"
              className="w-50 h-50 object-contain"
            />
          </div>

          {/* ==================== JOB OPPORTUNITIES ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Job Opportunities - Title */}
            <h5 className="text-[#1775EE] font-bold">Job Opportunities</h5>
            {/* Job Opportunities - List */}
            {[
              "Project Manager",
              "Program Manager",
              "Project Management Consultant",
              "Operations Manager",
            ].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== TARGET LEARNERS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Target Learners - Title */}
            <h5 className="text-[#1775EE] font-bold">Target Learners</h5>
            {/* Target Learners - List */}
            {["Beginners"].map((job) => (
              <p key={job} className="flex gap-2 justify-left items-center">
                <IoIosCheckmarkCircleOutline className="text-[#1775EE] shrink-0 w-6 h-6 mt-0.5" />
                <span className="text-sm">{job}</span>
              </p>
            ))}
          </div>

          {/* ==================== SCHEDULE ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Schedule - Title */}
            <h5 className="text-[#1775EE] font-bold">Schedule</h5>
            {/* Schedule - List */}
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <p className="font-bold">Modality:</p>
                <p>Face to Face/Online</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Duration:</p>
                <p>7 Days</p>
              </div>
              <div className="flex justify-start gap-2">
                <p className="font-bold">Days:</p>
                <p>Monday-Sunday</p>
              </div>
              <div className="flex justify-start gap-2">
                <span className="font-bold">Time:</span>
                <span>10:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

          {/* ==================== INCLUSIONS ====================*/}
          <div className="p-6 rounded-2xl bg-[#EBF5FD] flex flex-col gap-2">
            {/* Inlcusions - Title */}
            <h5 className="text-[#1775EE] font-bold">Inclusions</h5>

            {/* Inclusions - List */}
            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MealIcon} alt="Meal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Lunch & snacks (onsite)</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={ReviewIcon} alt="Review" className="w-4 h-4" />
              </span>
              <p className="text-sm">Reviewers & exercises</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img
                  src={WorkstationIcon}
                  alt="Workstation"
                  className="w-4 h-4"
                />
              </span>
              <p className="text-sm">Workstation per student</p>
            </div>

            <div className="inclusions">
              <span className="inclusions_icons">
                <img src={MedalIcon} alt="Medal" className="w-4 h-4" />
              </span>
              <p className="text-sm">Certificate of Completion</p>
            </div>

            {/* CHANGE: Download link text and URL */}
            <a href="#" className="text-sm font-medium underline mt-2">
              Download the CCNP Exam Basics here
            </a>
          </div>
        </aside>
      </div>

      {/* ==================== CALL TO ACTION BANNER - UPDATE IMAGE ====================*/}
      <TrainingTemplateFooter
        bgImage={ccnaFooter} // CHANGE: Update background image for the footer banner
        description="Advance your networking career and prepare for the CCNP Enterprise exam."
      />
    </main>
  );
}
