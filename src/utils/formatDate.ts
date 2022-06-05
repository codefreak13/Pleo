import moment from 'moment';

export const dateA = (date: Date) => moment(date).format('MMM YYYY');

export const dateB = (date: Date | string) =>
  moment(date).format('dddd DD MMM');
