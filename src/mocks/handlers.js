import { rest } from "msw";
import definitions from "./definitions.json";
import { getHttpOperationsFromSpec } from "@stoplight/prism-cli/dist/operations";
import * as Prism from "@stoplight/prism-http";
import pino from "pino";

// Undocumented: logger is reguired for Prism
const logger = pino();
logger.success = logger.debug;

const prism = Prism.createInstance(
  {
    mock: { dynamic: true },
    validateRequest: false,
    checkSecurity: true,
    validateResponse: true,
    errors: true,
  },
  { logger }
);

const openApiHandler = async (req, res, ctx) => {
  const operations = await getHttpOperationsFromSpec(definitions);

  const result = await prism.request(
    {
      method: "get",
      url: {
        path: req.url.pathname,
      },
    },
    operations
  )();

  if (result.left) {
    const response = result.left;
    return res(
      ctx.status(response.status),
      ctx.json({
        status: result.status,
        detail: result.detail,
      })
    );
  }

  if (result.right) {
    const response = result.right.output;
    return res((res) => {
      res.status = response.statusCode;
      for (const [header, value] of Object.entries(response.headers)) {
        res.headers.set(header, value);
      }
      res.body = JSON.stringify(response.body);
      return res;
    });
  }

  return res(
    ctx.status(500),
    ctx.json({
      status: 500,
      detail: "Error while handling request",
    })
  );
};

const backendUrl = "http://api.dev/*";

export const handlers = [
  rest.get(backendUrl, openApiHandler),
  rest.post(backendUrl, openApiHandler),
  rest.delete(backendUrl, openApiHandler),
  rest.patch(backendUrl, openApiHandler),
  rest.put(backendUrl, openApiHandler),
];
