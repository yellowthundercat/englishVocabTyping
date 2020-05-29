function convertObjectToArray(obj) {
  var result = [];
  for(var i in obj)
    result.push([i, obj[i]])
  return result
}

export default convertObjectToArray