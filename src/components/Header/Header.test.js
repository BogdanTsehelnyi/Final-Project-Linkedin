import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./index";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import userEvent from "@testing-library/user-event"
import Home from "../../pages/Home";

describe("Header render", () => {
  test("should input on header page", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const searchInput = screen.getByTestId("input-search");

    expect(searchInput).toBeInTheDocument();
  });

  test("should find and click NavLink, then change route", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );
    const homeLink = screen.getByRole("link", { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toBeEnabled();

    userEvent.click(homeLink);

    const homePage = screen.getByText("Home Page");
    expect(homePage).toBeInTheDocument();
  });
});
