const getType = (js) => {
  if (Array.isArray(js)) {
    return "array";
  }
  if (typeof js === "object") {
    return "object";
  }
  if (typeof js == "string") {
    return "string";
  }
  if (typeof js === "number") {
    return "number";
  }
  if (typeof js === "boolean") {
    return "boolean";
  }
  throw new Error("unknown type " + typeof js);
};

// assume array is consistent items and not mixed item types
const getItemType = (array) => {
  return createType(array[0]);
};

const getProperties = (obj) => {
  const propsObj = { ...obj };
  const entries = Object.entries(obj);
  entries.forEach(([k, v]) => {
    propsObj[k] = createType(v);
  });
  return propsObj;
};

const createType = (js) => {
  const type = getType(js);
  if (type === "array" && js.length && js[0].length) {
    return { type, items: createType(js[0]) };
  }
  if (type === "object") {
    return { type, properties: getProperties(js) };
  }
  return { type };
};

const createSchema = (js) => {
  const schema = createType(js);
  if (schema.type === "array" && js.length) {
    schema.items = getItemType(js);
  }
  return schema;
};

module.exports = (js) => {
  const schema = createSchema(js);
  return { schema };
};
