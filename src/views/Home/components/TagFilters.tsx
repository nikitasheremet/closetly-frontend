import { ChangeEventHandler, useState } from "react";
import Dropdown from "../../../components/Utility/Input/Dropdown";
import Modal from "../../../components/Utility/Modal";
import styled from "styled-components";

interface TagFiltersPropTypes {
  tags: string[];
  removeTag: Function;
  addTag: Function;
  selectedTags: string[];
}
const TagFilters = ({
  tags,
  addTag,
  removeTag,
  selectedTags,
}: TagFiltersPropTypes) => {
  const [isTagSelectionModalOpen, setIsTagSelectionModalOpen] = useState(false);
  let tags1 = ["option1", "option2", "option3"];
  const onChange1 = (event) => {
    console.log("inside TagFilters", event);
  };
  return (
    <>
      <SortButton
        onClick={() => {
          setIsTagSelectionModalOpen(!isTagSelectionModalOpen);
        }}
      >
        <span className="material-symbols-outlined">sort</span>
      </SortButton>
      {isTagSelectionModalOpen && (
        <Modal
          clickToClose={() =>
            setIsTagSelectionModalOpen(!isTagSelectionModalOpen)
          }
        >
          <div style={{ height: "200px", width: "200px" }}>
            <div>
              Showing images with the following tags:
              {selectedTags.map((tag) => (
                <p onClick={() => removeTag(tag)}>{tag}</p>
              ))}
            </div>
            <hr />
            <div>Available Tags to filter on:</div>
            {tags
              .filter((tag) => {
                return !selectedTags.find((tagToFind) => tag === tagToFind);
              })
              .map((tag) => (
                <p onClick={() => addTag(tag)}>{tag}</p>
              ))}
          </div>
        </Modal>
      )}
      {/* <Dropdown value={"Hello"} dropdownData={tags1} onChange={onChange1} /> */}
    </>
  );
};

export default TagFilters;

const SortButton = styled.button`
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
  margin: 0;
  box-sizing: border-box;
`;
