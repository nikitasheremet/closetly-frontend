import { ChangeEventHandler } from "react";
import Dropdown from "../../../components/Utility/Input/Dropdown";

interface TagFiltersPropTypes {
  tags: string[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  selectedTags: string[];
}
const TagFilters = ({ tags, onChange, selectedTags }: TagFiltersPropTypes) => {
  let tags1 = ["option1", "option2", "option3"];
  const onChange1 = (event) => {
    console.log("inside TagFilters", event);
  };
  return (
    <>
      <Dropdown value={"Hello"} dropdownData={tags1} onChange={onChange1} />
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
