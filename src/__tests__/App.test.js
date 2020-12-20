import pretty from "pretty";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from "../App";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
  console.log.mockClear();
});

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
});

afterAll(() => {
  console.log.mockRestore();
});

describe("", () => {
  it("renders venues data", async () => {
    const fakeUser = [
      {
        id: 1,
        name: "Joni Baez"
      },
      {
        id: 2,
        name: "Joni"
      },
      {
        id: 3,
        name: "Baez"
      }
    ];

    jest.spyOn(global, "fetch").mockImplementation(() => {
      Promise.resolve({
        json: Promise.resolve(fakeUser)
      });
    });

    //   uses the asynchoronus verison act to resolve the venues data

    await act(async () => {
      render(<App />, container);
    });
    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
      `"<div class=\\"MuiContainer-root MuiContainer-fixed MuiContainer-maxWidthSm\\"></div>"`
    );

    // remove the mocke to ensures that tests are completly isolated
    global.fetch.mockRestore();
  });

  it("throws an error", async () => {
    jest.spyOn(global, "fetch").mockRejectedValue("error");

    // Use the asynchronous version of act to apply resolved promises
    await act(async () => {
      render(<App />, container);
    });

    expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
      `"<div class=\\"MuiContainer-root MuiContainer-fixed MuiContainer-maxWidthSm\\"></div>"`
    );

    // remove the mock to ensure tests are completely isolated
    global.fetch.mockRestore();
  });
});
