import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";

test("renders buttons", () => {
  render(<App />);
  const button1 = screen.getByText(/make request/i);
  expect(button1).toBeInTheDocument();

  const button2 = screen.getByText(/make bad request/i);
  expect(button2).toBeInTheDocument();
});

test("makes and displays request results", async () => {
  render(<App />);
  const button = screen.getByText(/make request/i);

  act(() => {
    fireEvent.click(button);
  });

  expect(await screen.findByTestId("api-response")).toBeInTheDocument();
});

test("makes and displays error when request fails", async () => {
  render(<App />);
  const button = screen.getByText(/make bad request/i);

  act(() => {
    fireEvent.click(button);
  });

  const errorMessage = await screen.findByTestId("error-message");

  expect(errorMessage).toBeInTheDocument();
  expect(errorMessage).toHaveTextContent(/Error:/i);
});
