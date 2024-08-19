import React, { useRef, useState } from "react";
import ReactCV from "react-cv";
import ReactToPrint from "react-to-print";
import PersonalDataForm from "./components/forms/PersonalDataForm";
import Sidebar from "./components/Sidebar";
import AboutMeForm from "./components/forms/AboutMeForm";
import EducationForm from "./components/forms/EducationForm";
import WorkExperienceForm from "./components/forms/WorkExperienceForm";
import TagListForm from "./components/forms/TagListForm";
import MajorInvolvementsForm from "./components/forms/MajorInvolvementsForm";
import ProjectForm from "./components/forms/ProjectForm";
import Footer from "./components/Footer";

const App = () => {
  const [selectedSection, setSelectedSection] = useState("Personal Data");
  const [CVData, setCVData] = useState({
    personalData: {
      name: "",
      title: "",
      image: "",
      contacts: [],
    },
    sections: [],
    branding: false,
  });

  const resumeRef = useRef();
  const formRef = useRef();

  const handleSaveProfileData = (data) => {
    console.log("Saved Data:", data);

    const contacts = [];
    if (data.email) contacts.push({ type: "email", value: data.email });
    if (data.phone) contacts.push({ type: "phone", value: data.phone });
    if (data.location)
      contacts.push({ type: "location", value: data.location });
    if (data.website) contacts.push({ type: "website", value: data.website });
    if (data.linkedin)
      contacts.push({ type: "linkedin", value: data.linkedin });
    if (data.twitter) contacts.push({ type: "twitter", value: data.twitter });
    if (data.github) contacts.push({ type: "github", value: data.github });

    setCVData((prev) => ({
      ...prev,
      personalData: {
        ...prev.personalData,
        ...data,
        contacts,
      },
    }));
  };

  const handleSaveAboutMe = (data) => {
    console.log(CVData);
    setCVData((prev) => {
      const aboutMeIndex = prev.sections.findIndex(
        (section) => section.title === "About Me"
      );

      console.log(aboutMeIndex);

      if (aboutMeIndex !== -1) {
        const updatedSections = [...prev.sections];
        updatedSections[aboutMeIndex].content = `${data}`;
        return { ...prev, sections: updatedSections };
      } else {
        return {
          ...prev,
          sections: [
            ...prev.sections,
            {
              type: "text",
              title: "About Me",
              content: `${data}`,
              icon: "usertie",
            },
          ],
        };
      }
    });
  };

  const handleSaveEducation = (educationList) => {
    setCVData((prev) => {
      const updatedSections = prev.sections.filter(
        (section) => section.title !== "Education"
      );

      const validEducationItems = educationList.filter((edu) =>
        Object.values(edu).some((field) => field.trim() !== "")
      );

      if (validEducationItems.length > 0) {
        updatedSections.push({
          type: "common-list",
          title: "Education",
          icon: "graduation",
          items: validEducationItems.map((edu) => ({
            title: edu.title,
            authority: edu.authority,
            description: edu.description,
            rightSide: edu.datesBetween,
          })),
        });
      }

      return {
        ...prev,
        sections: updatedSections,
      };
    });
  };

  const handleSaveWorkExperience = (workExperienceList) => {
    console.log(workExperienceList);
    setCVData((prev) => {
      const updatedSections = prev.sections.filter(
        (section) => section.title !== "Experiences"
      );

      const validWorkExperienceItems = workExperienceList.filter((work) => {
        const hasValidTags =
          Array.isArray(work.descriptionTags) &&
          work.descriptionTags.some((tag) => tag.trim() !== "");

        const hasValidFields = Object.entries(work).some(([key, value]) => {
          if (key === "descriptionTags") return hasValidTags;
          return typeof value === "string"
            ? value.trim() !== ""
            : value != null;
        });

        return hasValidFields || hasValidTags;
      });

      if (validWorkExperienceItems.length > 0) {
        updatedSections.push({
          type: "common-list",
          title: "Experiences",
          icon: "archive",
          items: validWorkExperienceItems.map((work) => ({
            title: work.title,
            authority: work.company,
            authorityWebSite: work.companyWebSite,
            description: work.description,
            rightSide: work.datesBetween,
            descriptionTags: work.descriptionTags.some(
              (tag) => tag.trim() !== ""
            )
              ? work.descriptionTags
              : [],
          })),
        });
      }

      return {
        ...prev,
        sections: updatedSections,
      };
    });
  };

  const handleSaveTagList = (sectionData) => {
    setCVData((prev) => {
      const updatedSections = prev.sections.filter(
        (section) => section.title !== sectionData.title
      );

      if (sectionData.items.length > 0) {
        updatedSections.push(sectionData);
      }

      return {
        ...prev,
        sections: updatedSections,
      };
    });
  };

  const handleSaveMajorInvolvements = (involvementList) => {
    setCVData((prev) => {
      const updatedSections = prev.sections.filter(
        (section) => section.title !== "Major Involvements"
      );

      const validInvolvements = involvementList.filter(
        (involvement) => involvement.description.trim() !== ""
      );

      if (validInvolvements.length > 0) {
        updatedSections.push({
          type: "common-list",
          title: "Major Involvements",
          icon: "tasks",
          items: validInvolvements,
        });
      }

      return {
        ...prev,
        sections: updatedSections,
      };
    });
  };

  const handleSaveProject = (projectList) => {
    setCVData((prev) => {
      const updatedSections = prev.sections.filter(
        (section) => section.title !== "Projects"
      );

      const validProjectItems = projectList.filter((project) => {
        const hasValidTags =
          Array.isArray(project.descriptionTags) &&
          project.descriptionTags.some((tag) => tag.trim() !== "");

        const hasValidFields = Object.entries(project).some(([key, value]) => {
          if (key === "descriptionTags") return hasValidTags;
          return typeof value === "string"
            ? value.trim() !== ""
            : value != null;
        });

        return hasValidFields || hasValidTags;
      });

      if (validProjectItems.length > 0) {
        updatedSections.push({
          type: "common-list",
          title: "Projects",
          icon: "tasks",
          items: validProjectItems.map((project) => ({
            title: project.title,
            authority: project.projectLink,
            authorityWebSite: project.projectLink,
            description: project.description,
            rightSide: project.datesBetween,
            descriptionTags: project.descriptionTags.some(
              (tag) => tag.trim() !== ""
            )
              ? project.descriptionTags
              : [],
          })),
        });
      }

      return {
        ...prev,
        sections: updatedSections,
      };
    });
  };

  const handleFormSubmit = () => {
    if (formRef.current && typeof formRef.current.submit === "function") {
      formRef.current.submit();
    }
  };

  const renderSelectedForm = () => {
    switch (selectedSection) {
      case "Personal Data":
        return (
          <PersonalDataForm
            ref={formRef}
            onSave={handleSaveProfileData}
            initialData={CVData.personalData}
          />
        );
      case "About Me":
        return (
          <AboutMeForm
            ref={formRef}
            onSave={handleSaveAboutMe}
            initialData={
              CVData.sections.find((section) => section.title === "About Me")
                ?.content || ""
            }
          />
        );
      case "Education":
        return (
          <EducationForm
            ref={formRef}
            onSave={handleSaveEducation}
            initialData={
              CVData.sections.find((section) => section.title === "Education")
                ?.items
            }
          />
        );
      case "Work Experience":
        return (
          <WorkExperienceForm
            ref={formRef}
            onSave={handleSaveWorkExperience}
            initialData={
              CVData.sections.find((section) => section.title === "Experiences")
                ?.items
            }
          />
        );
      case "Projects":
        return (
          <ProjectForm
            ref={formRef}
            onSave={handleSaveProject}
            initialData={
              CVData.sections.find((section) => section.title === "Projects")
                ?.items
            }
          />
        );
      case "Conference and Certificates":
        return <div>Conference and Certificates Form</div>;
      case "Languages":
        return (
          <TagListForm
            ref={formRef}
            title="Languages"
            icon="language"
            onSave={(data) =>
              handleSaveTagList({
                type: "tag-list",
                title: "Languages",
                icon: "language",
                items: data.items,
              })
            }
            initialData={
              CVData.sections.find((section) => section.title === "Languages")
                ?.items || []
            }
          />
        );
      case "Skills":
        return (
          <TagListForm
            ref={formRef}
            title="Skills Proficiency"
            icon="rocket"
            onSave={(data) =>
              handleSaveTagList({
                type: "tag-list",
                title: "Skills Proficiency",
                icon: "rocket",
                items: data.items,
              })
            }
            initialData={
              CVData.sections.find(
                (section) => section.title === "Skills Proficiency"
              )?.items || []
            }
          />
        );
      case "Major Involvements":
        return (
          <MajorInvolvementsForm
            ref={formRef}
            onSave={handleSaveMajorInvolvements}
            initialData={
              CVData.sections.find(
                (section) => section.title === "Major Involvements"
              )?.items
            }
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-1">
        <Sidebar onSelectSection={setSelectedSection} />

        <div className="flex-1 flex">
          <div className="w-1/3 p-6 bg-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{selectedSection}</h1>
              <button
                onClick={handleFormSubmit}
                className="py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Save
              </button>
            </div>
            {renderSelectedForm()}
          </div>
          <div className="w-2/3 p-6">
            <ReactToPrint
              trigger={() => (
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Download
                </button>
              )}
              content={() => resumeRef.current}
            />
            <div className="mt-6" ref={resumeRef}>
              <ReactCV {...CVData} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
