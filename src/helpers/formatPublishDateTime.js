const formatPublishDateTime = (publishDate) => {
  const year = publishDate.slice(0, 4);
  const month = publishDate.slice(4, 6);
  const day = publishDate.slice(6, 8);
  const hour = publishDate.slice(8, 10);
  const minute = publishDate.slice(10, 12);
  const second = publishDate.slice(12, 14);
  return `${day}/${month}/${year} | ${hour}:${minute}:${second}`;
};

export default formatPublishDateTime;
