import { compose } from 'redux';
import BasicLayout from './layouts/BasicLayout';

// export const pageWithoutLayout = compose(
//   withData,
//   withAuth,
//   withIntl,
//   withAnalytics,
//   withStyle,
// );

export default compose(
  BasicLayout,
);