import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Profile from "@/pages/user/profile";

describe("Profile Page", () => {
  it("renders a profile component", () => {
    render(<Profile />);

    // expect(screen.queryByTestId("multiply")).toBeInTheDocument();

    // expect(screen.queryByTestId("iconbtn")).not.toBeInTheDocument(); // check that the icon is not rendered
    // expect(screen.findByText('Update Profile')).toBeInTheDocument()
    // expect(screen.getByTestId("iconbtn")).toBeInTheDocument()
    // const btn = screen.getByRole("button"); // get the button (pressable)
    // fireEvent.click(btn); // click it

    // expect(screen.getByTestId("iconbtn")).toBeInTheDocument();
  });
  //   const button = screen.queryByTestId("button");

  //   test("Button Rendering", () => {
  //     expect(button).toBeInTheDocument();
  //   });

  //   // Test 2
  //   test("Button Text", () => {
  //     expect(button).toHaveTextContent("Click Me!");
  //   });
});

// test("Dashboard button", () => {
//   expect("ooo").toEqual("ooo");
// });

test("two plus two is four", () => {
  expect(2 + 2).toBe(4);
});

