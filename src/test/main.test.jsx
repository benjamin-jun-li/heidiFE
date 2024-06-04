import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "@/pages/home";

describe("App", () => {
  it("renders the App component", () => {
    render(<Home />);
    expect(screen.getByText("Home")).toBeInTheDocument();
  })
});