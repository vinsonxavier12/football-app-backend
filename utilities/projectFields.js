exports.projectOne = (document, inclusiveFields, exclusiveFields) => {
  if (!inclusiveFields && !exclusiveFields) return document;
  document = document.toJSON();
  let result = {};
  if (inclusiveFields) {
    inclusiveFields.forEach((element) => {
      if (document.hasOwnProperty(element)) result[element] = document[element];
    });
  }
  if (exclusiveFields && !inclusiveFields) {
    result = document;
    exclusiveFields.forEach((element) => {
      if (document.hasOwnProperty(element)) delete result[element];
    });
  }
  return result;
};

exports.projectMany = (documents, inclusiveFields, exclusiveFields) => {
  if (!inclusiveFields && !exclusiveFields) return documents;
  documents = documents.map((document) => document.toJSON());
  let result = [];
  documents.forEach((document) => {
    let resultObj = {};
    if (inclusiveFields) {
      inclusiveFields.forEach((element) => {
        if (document.hasOwnProperty(element))
          resultObj[element] = document[element];
      });
    }
    if (exclusiveFields && !inclusiveFields) {
      resultObj = document;
      exclusiveFields.forEach((element) => {
        if (document.hasOwnProperty(element)) delete resultObj[element];
      });
    }
    result.push(resultObj);
  });
  return result;
};
