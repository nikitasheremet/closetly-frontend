import { ChangeEventHandler, useState } from "react";
import Dropdown from "../../../components/Utility/Input/Dropdown";
import Modal from "../../../components/Utility/Modal";
import styled from "styled-components";

interface TagFiltersPropTypes {
  tags: string[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  selectedTags: string[];
}
const TagFilters = ({ tags, onChange, selectedTags }: TagFiltersPropTypes) => {
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
          <div style={{ height: "200px", width: "200px" }}></div>
        </Modal>
      )}
      {/* <Dropdown value={"Hello"} dropdownData={tags1} onChange={onChange1} /> */}
      {tags.map((tag) => {
        return (
          <div key={tag + Number(tag)}>
            <input
              type="checkbox"
              onChange={onChange}
              checked={selectedTags.includes(tag)}
              id={tag}
              className="tag-checkbox-filter"
              name={tag}
            ></input>
            <label htmlFor={tag}>{tag}</label>
          </div>
        );
      })}
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
