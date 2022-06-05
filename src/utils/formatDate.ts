import moment from 'moment';

export const dateA = (date: string) => moment(date).format('MMM YYYY');

export const dateB = (date: string | string) =>
  moment(date).format('dddd DD MMM');
