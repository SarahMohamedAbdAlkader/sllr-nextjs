import { useEffect, useState } from "react";
import { injectIntl } from "react-intl";

import { LOCALE } from "../../constants/intl-wrapper";

const BRPoweredBySllr = ({ intl }) => {
  const [poweredBySllr, setPoweredBySllr] = useState(
    "powered-by-sllr-active-en"
  );

  const onMouseEnter = () => {
    setPoweredBySllr(
      intl.locale === LOCALE.EN
        ? "powered-by-sllr-active-en"
        : "powered-by-sllr-active-ar"
    );
  };

  const onMouseLeave = () => {
    setPoweredBySllr(
      intl.locale === LOCALE.EN ? "powered-by-sllr-en" : "powered-by-sllr-ar"
    );
  };

  useEffect(() => {
    setPoweredBySllr(
      intl.locale === LOCALE.EN ? "powered-by-sllr-en" : "powered-by-sllr-ar"
    );
  }, [intl.locale]);

  return (
    //   <Image
    //   // src={`assets/images/${poweredBySllr}.svg`}
    //   width={500}
    //   height={500}
    //   alt="Picture of the author"
    // />

    <img
      alt="sllr"
      src={`/assets/images/${poweredBySllr}.svg`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={() =>
        window.open("https://sllr.co", "_blank", "noopener,noreferrer")
      }
    />
  );
};

export default injectIntl(BRPoweredBySllr);
