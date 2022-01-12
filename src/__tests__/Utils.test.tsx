import { IncomingMessage } from "http";
import { millisToMinutesAndSeconds, timeToMilliseconds, Utils } from "../utils";

describe("Utils test suite", () => {
  beforeEach(() => {
    console.log("before each");
  });

  beforeAll(() => {
    console.log("before all");
  });

  test("first test", () => {
    const result = Utils.toUpperCase("abc");
    expect(result).toBe("ABC");
  });

  test("getRequestPath valid request", () => {
    const request = {
      url: "http://localhost:3000/login",
    } as IncomingMessage;
    const resultPath = Utils.getRequestBasePath(request);
    expect(resultPath).toBe("login");
  });

  test("getRequestPath with no path name", () => {
    const request = {
      url: "http://localhost:3000/",
    } as IncomingMessage;
    const resultPath = Utils.getRequestBasePath(request);
    expect(resultPath).toBeFalsy();
  });

  test("getRequestPath with no path name", () => {
    const request = {
      url: "",
    } as IncomingMessage;
    const resultPath = Utils.getRequestBasePath(request);
    expect(resultPath).toBeFalsy();
  });
});

describe("Time-Format-Test: millisToMinutesAndSeconds", () => {
  test("Test if millisToMinutesAndSeconds with 10ms is correct ", () => {
    const val = 10;
    const result = millisToMinutesAndSeconds(val);
    expect(result).toMatch(/^0:00$/);
  });
  test("Test if millisToMinutesAndSeconds with 100ms is correct ", () => {
    const val = 100;
    const result = millisToMinutesAndSeconds(val);
    expect(result).toMatch(/^0:00$/);
  });
  test("Test if millisToMinutesAndSeconds with 1000ms is correct ", () => {
    const val = 1000;
    const result = millisToMinutesAndSeconds(val);
    expect(result).toMatch(/^0:01$/);
  });

  test("Test if millisToMinutesAndSeconds with 100ms is correct ", () => {
    const val = 100;
    const result = millisToMinutesAndSeconds(val, true);
    expect(result).toMatch(/^00:00$/);
  });
  test("Test if millisToMinutesAndSeconds with 61000ms is correct ", () => {
    const val = 1 * 60 * 1000 + 1 * 1000;
    const result = millisToMinutesAndSeconds(val, true);
    expect(result).toMatch(/^01:01$/);
  });
  test("Test if millisToMinutesAndSeconds with 2699999ms is correct ", () => {
    const val = 44 * 60 * 1000 + 59 * 1000 + 999;
    const result = millisToMinutesAndSeconds(val, true);
    expect(result).toMatch(/^44:59$/);
  });
  test("Test if millisToMinutesAndSeconds with -61111ms is correct ", () => {
    const val = -1 * (1 * 60 * 1000 + 1 * 1000 + 110);
    const result = millisToMinutesAndSeconds(val, true);
    expect(result).toMatch(/^-01:01$/);
  });
});

describe("Time-Format-Test: timeToMilliseconds", () => {
  test("10ms is correct ", () => {
    const val = "0:00.01";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(10);
  });
  test("100ms is correct ", () => {
    const val = "0:00.10";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(100);
  });
  test("1000ms is correct ", () => {
    const val = "0:01.00";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(1000);
  });
  test("10000ms is correct ", () => {
    const val = "0:10.00";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(10000);
  });
  test("Test if millisToMinutesAndSeconds with 60000ms is correct ", () => {
    const val = "1:00.00";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(60000);
  });
  test("61000ms is correct ", () => {
    const val = "1:01.00";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(1 * 60 * 1000 + 1 * 1000);
  });
  test("61100ms is correct ", () => {
    const val = "1:01.10";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(1 * 60 * 1000 + 1 * 1000 + 100);
  });
  test("61110ms is correct ", () => {
    const val = "1:01.11";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(1 * 60 * 1000 + 1 * 1000 + 110);
  });
  test("61111ms is correct ", () => {
    const val = "1:01.11";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(1 * 60 * 1000 + 1 * 1000 + 110);
  });
  test("10ms is correct ", () => {
    const val = "00:00.01";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(10);
  });
  test("-61111ms is correct ", () => {
    const val = "100:00.00";
    const result = timeToMilliseconds(val);
    expect(result).toStrictEqual(100 * 60 * 1000);
  });
});
