import { render, queryByTestId } from "@testing-library/react";
import Map from "./Map";

test("If map is available", () => {
  const { container } = render(<Map />);
  expect(queryByTestId(container, "map")).toBeDefined();
});
