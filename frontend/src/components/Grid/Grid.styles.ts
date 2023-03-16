import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 5px #ccc;
  border-radius: 5px;
  max-width: 900px;
  margin: 20px auto;
  word-break: break-all;
`

export const THead = styled.thead``

export const Tr = styled.tr``

export const Th = styled.th<{onlyWeb?: boolean}>`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;

  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`

export const TBody = styled.tbody``

export const Td = styled.td<{onlyWeb?: boolean, alignCenter?: boolean}>`
  padding: 15px;
  text-align: ${props => (props.alignCenter ? "center" : "start")};
  width: ${props => props.width ? props.width : "auto"};


  @media (max-width: 500px) {
    ${(props) => props.onlyWeb && "display: none"}
  }
`