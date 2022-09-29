import { ChangeEventHandler } from "react";
import styled from "styled-components";

interface UserInputInterface {
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  value: string | number;
  name: string;
  type?: "email" | "text" | "number" | "password";
  label?: string;
  required: boolean;
  [key: string]: any;
}

const UserInput = ({
  onChange,
  placeholder,
  value,
  name,
  type = "text",
  label,
  required,
  ...otherProps
}: UserInputInterface) => {
  return (
    <>
      {label && (
        <UserInputLabel className="cui-label" htmlFor={label}>
          {label}
        </UserInputLabel>
      )}
      <Input
        className={"cui-input"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        name={name}
        type={type}
        id={label}
        required={required}
        {...otherProps}
      />
    </>
  );
};

const Input = styled.input`
  height: 30px;
  border-radius: 10px;
  border: 1px solid black;
  padding: 3px 10px 3px 10px;
`;

const UserInputLabel = styled.label`
  padding-bottom: 5px;
  font-size: 1em;
`;

export default UserInput;
