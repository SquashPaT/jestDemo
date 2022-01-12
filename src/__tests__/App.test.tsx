import { render, screen } from "@testing-library/react";
import App from "../App";

describe("<App />", () => {
  test("check if App has a title and title is contains a specific string", () => {
    const { getByText } = render(<App />);
    const titleValue = getByText(/React Testing with Jest example/i);
    const titleValue2 = screen.getByTestId("app-div");

    expect(titleValue).toBeInTheDocument();
    expect(titleValue).toHaveTextContent("React Testing with Jest example");

    expect(titleValue2).toBeInTheDocument();
    expect(titleValue2).toHaveTextContent("React Testing with Jest example");
  });
});
