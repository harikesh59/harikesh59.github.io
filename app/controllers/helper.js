module.exports = {
  validateForEmptyData: (data) => {
    Object.keys(data).forEach((key) => {
      if(!data[key]) return new Error(`${key} not found`);
    });
    return null;
  }
}
