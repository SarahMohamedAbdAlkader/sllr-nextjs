import { useIntl } from 'react-intl';

import BRPoweredBySllr from '../BRPoweredBySllr/BRPoweredBySllr';

// import './Footer.css';

const Footer = ({ businessInfo }) => {
  const uploadedVat = businessInfo?.businessLegalInfo?.vatId;
  const storeName = businessInfo?.storeInfo?.storeName;

  const intl = useIntl();

  return (
    <footer className="br-footer">
      <div className="">
        <BRPoweredBySllr />
        {(storeName || uploadedVat) && (
          <span className={`br-footer__vat-id ${intl.locale}`}>
            {!!uploadedVat
              ? intl.formatMessage(
                  { id: 'footer.vat_id' },
                  {
                    vatId: uploadedVat
                  }
                )
              : `© ${new Date().getFullYear()}, ${storeName}`}
          </span>
        )}
      </div>
    </footer>
  );
};

export default Footer;
