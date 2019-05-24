import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from '../commons/Dropdown';
import { download24pxIcon } from '../../utils/images/images';
import '../../assets/styles/exportButton.scss';
import { downloadCSV, fetchDownload } from '../helpers/analytics/downloads/DataCompilers';


const renderDropdownOptions = handleDownload => (
  <div className="dropdown-list">
    <div className="heading">Export Options</div>
    <hr size="1" className="horizontal-line" />
    <input type="button" onClick={handleDownload} key="pdf" value="PDF" />
    <input type="button" onClick={handleDownload} key="jpg" value="JPEG" />
    <input type="button" onClick={handleDownload} key="csv" value="CSV" />
  </div>
);


const ExportButton = ({ data: { analytics, dateValue } }) => {
  const handleDownload = ({ target: { value } }) => {
    const type = value.toLowerCase();
    if (type === 'csv') {
      return downloadCSV(analytics);
    }
    return fetchDownload(type, analytics, dateValue);
  };

  return (
    <Dropdown
      icon={<img
        className="dropbtn-img"
        src={download24pxIcon}
        alt="download icon"
      />}
      content={renderDropdownOptions(handleDownload)}
    />
  );
};

ExportButton.propTypes = {
  data: PropTypes.shape({
    dateValue: PropTypes.shape({
      startDate: PropTypes.string,
      endDate: PropTypes.string,
    }).isRequired,
    analytics: PropTypes.shape({
      analytics: PropTypes.array,
      bookingsCount: PropTypes.array,
    }),
  }).isRequired,
};

ExportButton.defaultProps = {
  analytics: undefined,
};

export default ExportButton;
