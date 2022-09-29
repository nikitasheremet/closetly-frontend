import styled from "styled-components";

interface Props {
  title: string;
  subtitle: string;
}

export default function MidPageTitleAndSubtitle({
  title,
  subtitle,
  ...props
}: Props) {
  return (
    <SignInTitleDiv {...props}>
      <SignInTitle>{title}</SignInTitle>
      <SignInSubtitle>{subtitle}</SignInSubtitle>
    </SignInTitleDiv>
  );
}

const SignInTitle = styled.h1`
  margin: 20px 0 10px 0;
`;

const SignInSubtitle = styled.p`
  margin: 0;
  color: #a8a6a7;
`;

const SignInTitleDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30% 0 25% 0;
`;
