import PropTypes from 'prop-types';

const TimeConverter = timestamp => {
  const a = new Date(timestamp * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const newDate = `${a.getDate()} ${months[a.getMonth()]} ${a.getFullYear()}
  ${a.getHours()}:${a.getMinutes()}:${a.getSeconds()}`;
  return newDate;
};

TimeConverter.propTypes = {
  timestamp: PropTypes.number.isRequired,
};

export default TimeConverter;
