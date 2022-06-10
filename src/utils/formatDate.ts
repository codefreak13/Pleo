import moment from 'moment';

export const formatByMonthAndYear = (date: string | Date) =>
  moment(date).format('MMM YYYY');

export const formatByDayMonthAndYear = (date: string | Date) =>
  moment(date).format('dddd DD MMM');

export const formatByTime = (date: string | Date) =>
  moment(date).format('hh:mm:ss a');
