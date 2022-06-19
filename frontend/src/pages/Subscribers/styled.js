import styled from "styled-components";

export const SubscriberContainer = styled.div`
  margin-top: 20px;

  div.sub-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    padding: 5px 10px 5px 5px;
    transition: all 0.1s ease-in-out;
  }

  div.sub-container:hover {
    background: #eeeeee;
    transform: scale(1.01);
  }

  div + div {
    border-top: 1px solid #eeeeee;
  }

  div.sub-container > div {
    display: flex;
    align-items: center;
    justify-content: around;
    width: 25%;
  }

  div.sub-container > div > .link {
    margin-left: 10px;
    transition: all 0.1s ease-in;
  }

  div.sub-container > div > .link:hover {
    font-weight: bold;
    text-decoration: underline;
  }

  hr {
    color: #eeeeee;
  }
`;
