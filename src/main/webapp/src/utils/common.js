export const getDataFromObject = (data, key) => {
  if (!data || !key || typeof data !== "object") return false;
  key = key.replace(/\[(\w+)\]/g, ".$1").replace(/^\./, "");
  let keys = key.split(".");

  for (var i = 0, n = keys.length; i < n; ++i) {
    var _key = keys[i];
    if (_key in data && data[_key]) {
      data = data[_key];
    } else {
      return false;
    }
  }
  return data;
};
export const parseURLParams = (url) => {
  const params = {};
  const parser = document.createElement("a");
  parser.href = url;
  const query = parser.search.substring(1);
  const vars = query.split("&");
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
  }
  return params;
};
