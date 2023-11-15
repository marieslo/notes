import moment from 'moment';

export default function getFormattedDate () {
  return moment().format('MMMM Do, YYYY, h:mm a');
};