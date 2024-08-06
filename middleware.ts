import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import RoomQ, { IHttpRequest, IHttpResponse } from "roomq";

const ROOM_ID = process.env.ROOM_ID!;
const ROOM_SECRET = process.env.ROOM_SECRET!;
const ROOMQ_TICKET_ISSUER = process.env.ROOMQ_TICKET_ISSUER!;

const roomq = new RoomQ(ROOM_ID, ROOM_SECRET, ROOMQ_TICKET_ISSUER);

export async function middleware(request: NextRequest) {
  const returnURL = request.nextUrl.href;
  const sessionId = null;
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const result = await roomq.validate(
    {
      getHttpRequest: function (): IHttpRequest {
        var httpRequest = {
          getUserAgent: function () {
            return this.getHeader("user-agent");
          },
          getHeader: function (headerName: string) {
            var headerValue = request.headers.get(headerName);

            if (!headerValue) return "";
            return headerValue;
          },
          getAbsoluteUri: function () {
            return request.url;
          },
          getUserHostAddress: function () {
            return request.ip || "";
          },
          getCookieValue: function (cookieKey: string) {
            return request.cookies.get(cookieKey)?.value || null;
          },
          getQueryValue: function (key: string) {
            return request.nextUrl.searchParams.get(key);
          },
        };
        return httpRequest;
      },
      getHttpResponse: function () {
        var httpResponse = {
          setCookie: function (
            cookieName: string,
            cookieValue: string,
            domain: string,
            expiration: Date,
          ) {
            var expirationDate = new Date(expiration.getTime());
            console.log("hi", cookieName, cookieValue, domain, expirationDate);
            response.cookies.set(cookieName, cookieValue, {
              expires: expirationDate,
              path: "/",
              domain: domain,
              secure: false,
              httpOnly: false,
            });
          },
        };
        return httpResponse;
      },
    },
    returnURL,
    sessionId,
    "en",
  );
  if (result.needRedirect()) {
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate, max-age=0",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "Fri, 01 Jan 1990 00:00:00 GMT");

    const headers = new Headers(response.headers);
    headers.set("Location", result.getRedirectURL()!);

    return new Response(null, {
      status: 302,
      headers,
    });
  }
  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/test"],
  runtime: "nodejs",
};
