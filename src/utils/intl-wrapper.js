import { createIntl, createIntlCache, RawIntlProvider } from "react-intl";
import { LOCALE } from "../constants/intl-wrapper";

const messagesInFrench = {
  myMessage: "Aujourd'hui, nous sommes le {ts, date, ::yyyyMMdd}",
};

export const cache = createIntlCache();

export let intl = createIntl(
  { locale: LOCALE.EN, messages: messagesInFrench },
  cache
);

const IntlWrapper = ({ children }) => {
  return <RawIntlProvider value={intl}>{children}</RawIntlProvider>;
};
export default IntlWrapper;
