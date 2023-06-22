import React from "react";
import { render, screen } from "@testing-library/react";
import Profile from "@/pages/user/profile";
import "@testing-library/jest-dom";

describe("Profile", () => {
  it("renders the Profile component", () => {
    render(<Profile />);
    const title = screen.getByText("Profile");
    expect(title).toBeInTheDocument();

    const { container } = render(<Profile />);
    // expect(container).toMatchSnapshot();
  });

  it("Should render submit button", async () => {
    render(<Profile />);

    const main = screen.queryByTestId("step-1");
    expect(main).toBeInTheDocument();
    // expect(screen.queryByTestId("step-1")).toBeInTheDocument();
  });
});

//check for submit button
// const button = screen.getByRole("Button", { name: "Update Profile" });
// expect(button).toBeInTheDocument();
// expect(button).not.toBeDisabled();

// expect(screen.queryByTestId("iconbtn")).not.toBeInTheDocument();
// expect(screen.findByText('Update Profile')).toBeInTheDocument()
// expect(screen.getByTestId("iconbtn")).toBeInTheDocument()
// const btn = screen.getByRole("button"); // get the button (pressable)
// fireEvent.click(btn); // click it
