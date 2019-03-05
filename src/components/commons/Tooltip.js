import React from 'react';
import Tooltip from 'react-toolbox/lib/tooltip';
import Link from 'react-toolbox/lib/link';

import { helpOutline } from '../../utils/images/images';

import theme from '../../assets/styles/toolTipStyles.scss';

theme.tooltipInner = 'tooltipInner';

const TooltipLink = Tooltip(Link);

/**
 * Reusable Tooltip component
 *
 * @param {string} tip - The words
 *
 * @returns {JSX}
 */
const Tip = tip => (
  <TooltipLink
    theme={theme}
    tooltipPosition="top"
    tooltipShowOnClick
    tooltip={tip}
  >
    <img src={helpOutline} alt="help icon" />
  </TooltipLink>
);

export default Tip;
