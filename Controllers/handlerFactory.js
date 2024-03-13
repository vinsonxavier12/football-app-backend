const CatchAsyncError = require("../utilities/CatchAsyncError");
const APIQueries = require("../utilities/apiQueries");
const AppError = require("../utilities/appError");
const { projectMany, projectOne } = require("../utilities/projectFields");

exports.createOne = (Model, statusCode = 201) =>
  CatchAsyncError(async (req, res, next) => {
    const document = await Model.create(req.body);
    if (!document) return next(new AppError("Cannot create document", 500));
    res.status(statusCode).send(document);
  });

exports.getOne = (Model, projection, populateOptions, postProjectionOptions) =>
  CatchAsyncError(async (req, res, next) => {
    const document = await Model.findById(req.params.id, projection).populate(
      populateOptions
    );
    if (!document) return next(new AppError("No document found", 404));
    if (postProjectionOptions)
      document = projectOne(
        document,
        postProjectionOptions.inclusiveFields,
        postProjectionOptions.exclusiveFields
      );
    res.status(200).send(document);
  });

exports.getAll = (Model, projection, populateOptions, postProjectionOptions) =>
  CatchAsyncError(async (req, res, next) => {
    // Implemented a APIQueries class to do filtering on request query itself
    let apiQueries = new APIQueries(
      Model.find({}, projection),
      req.query
    ).filter();
    // Awaiting APIQueries query to get the document and populating
    let documents = await apiQueries.mongooseQuery.populate(populateOptions);
    if (postProjectionOptions)
      documents = projectMany(
        documents,
        postProjectionOptions.inclusiveFields,
        postProjectionOptions.exclusiveFields
      );
    res.status(200).json({
      results: documents.length,
      data: documents,
    });
  });

exports.updateOne = (Model) =>
  CatchAsyncError(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!document) return next(new AppError("No document found", 404));
    res.status(200).send(document);
  });

exports.deleteOne = (Model) =>
  CatchAsyncError(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);
    if (!document) return next(new AppError("No document found", 404));
    res.status(204).send();
  });
