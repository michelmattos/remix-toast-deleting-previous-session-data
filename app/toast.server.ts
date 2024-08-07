import { createToastUtilsWithCustomSession } from "remix-toast";
import * as session from "~/session.server";

export const {
  getToast,
  redirectWithToast,
  redirectWithSuccess,
  redirectWithError,
  redirectWithInfo,
  redirectWithWarning,
  jsonWithSuccess,
  jsonWithError,
  jsonWithInfo,
  jsonWithWarning,
} = createToastUtilsWithCustomSession(session);
