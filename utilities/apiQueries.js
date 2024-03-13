class APIQueries {
  // mongooseQuery is `Model.find()`
  // userRequestQuery if from req.query
  constructor(mongooseQuery, userRequestQuery) {
    this.mongooseQuery = mongooseQuery;
    this.userRequestQuery = userRequestQuery;
  }

  filter() {
    const userRequestQuery = { ...this.userRequestQuery };
    // Excluding these properties from query to filter as of now
    const excludedFields = ["page", "fields", "sort", "limit"];
    excludedFields.forEach((element) => delete userRequestQuery[element]);
    const formattedQuery = JSON.parse(
      JSON.stringify(userRequestQuery).replace(
        /* 
          In url it will be like:
          http://domain.com?price[gt]=1000

          In req.query it will be like:
          req.query = { price: {gt: 1000} }
          Here, we are adding $ operator for mongo syntax
        */
        /\b(gt|gte|lt|lte)\b/g,
        (match) => `$${match}`
      )
    );
    // Changing the mongoose query
    this.mongooseQuery.find(formattedQuery);
    // Returning this to chain multiple resources
    return this;
  }
}

module.exports = APIQueries;
