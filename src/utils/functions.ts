export const convertUnixUTCForDate = (unixTimestamp: number) => {
  const milliseconds = unixTimestamp * 1000;
  const dateObject = new Date(milliseconds);
  return dateObject.toLocaleString();
};
