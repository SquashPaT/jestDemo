import { UrlWithParsedQuery, parse } from "url";
import { IncomingMessage } from "http";

export class Utils {
  public static toUpperCase = (value: string): string => value.toUpperCase();

  public static parseUrl(url: string): UrlWithParsedQuery {
    if (!url) {
      throw new Error("Empty url!");
    }
    return parse(url, true);
  }

  public static getRequestBasePath(req: IncomingMessage): string {
    const url = req.url;
    if (url) {
      const parsedUrl = this.parseUrl(url);
      if (parsedUrl.pathname) {
        return parsedUrl.pathname.split("/")[1];
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  public static async getRequestBody(request: IncomingMessage): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";
      request.on("data", (data: string) => {
        body += data;
      });
      request.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (jsonError) {
          reject(jsonError);
        }
      });
      request.on("error", (error: any) => {
        reject(error);
      });
    });
  }
}

export const round = (value: number | null, decimal = 2) =>
  typeof value === "number" ? value.toFixed(decimal) : "\u00A0";

export const millisToMinutesAndSeconds = (
  millis: number,
  prefixMinutes?: boolean,
  fallBackBelowZero?: string
): string => {
  if (millis <= 0 && fallBackBelowZero !== undefined) {
    return fallBackBelowZero;
  }

  const millisInSeconds = Math.trunc(millis / 1000);
  const negative = Math.sign(millisInSeconds) === -1;
  const millisInSecondsAbs = Math.abs(millisInSeconds);

  const seconds = millisInSecondsAbs % 60;
  const minutes = Math.trunc(millisInSecondsAbs / 60);
  const minuteStr = minutes.toFixed(0).padStart(prefixMinutes ? 2 : 0, "0");
  const secondsStr = seconds.toFixed(0).padStart(2, "0");

  const retVal = (negative ? "-" : "") + minuteStr + ":" + secondsStr;
  return retVal;
};

export const timeToMilliseconds = (value: string): number => {
  let milliseconds = 0;
  const regExp = new RegExp("[:.]");
  if (!value) return milliseconds;

  const values = value.split(regExp);

  // Check character to ensure -0 is covered as well
  const isNegative = values[0].charAt(0) === "-";

  if (values.length === 3) {
    if (value.includes(".")) {
      // MM:SS.mm
      milliseconds += Math.abs(parseInt(values[0], 10)) * 60000; // MM
      milliseconds += parseInt(values[1], 10) * 1000; // SS
      milliseconds += parseInt(values[2], 10) * 10; // MMM
    } else {
      // HH:MM:SS
      milliseconds += Math.abs(parseInt(values[0], 10)) * 3600000; // HH
      milliseconds += parseInt(values[1], 10) * 60000; // MM
      milliseconds += parseInt(values[2], 10) * 1000; // SS
    }
  } else if (values.length === 2) {
    milliseconds += Math.abs(parseInt(values[0], 10)) * 60000; // MM
    milliseconds += parseInt(values[1], 10) * 1000; // SS
  } else if (values.length === 4) {
    // HH:MM:SS.MMM
    milliseconds += Math.abs(parseInt(values[0], 10)) * 3600000; // HH
    milliseconds += parseInt(values[1], 10) * 60000; // MM
    milliseconds += parseInt(values[2], 10) * 1000; // SS
    milliseconds += parseInt(values[3], 10); // MMM
  }

  return isNegative ? milliseconds * -1 : milliseconds;
};
