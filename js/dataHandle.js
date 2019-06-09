if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
  };
}

//去除重复项
String.prototype.rmDup = function () {
	let res = [];
	this.split(",").forEach((item) => {
		if (!res.includes(item)) {
			res.push(item);
		}
	});
	return res.join(",");
};

String.prototype.count = function () {
	let arr = [];
	if (this != "") {
		arr = this.rmDup().split(",");
	}
	return arr.length;
};

String.prototype.ins = function (targets) {
	if (typeof targets === "string") {
		let a = targets.rmDup().split(","),
				b = this.rmDup().split(","),
				res = [];
		a.forEach((c) => {
			if (b.includes(c)) {
				res.push(c);
			}
		});
		return res.join(",");
	}	else {
    throw new Error("targets must be String");
  }
};

String.prototype.containsAny = function (list) {
	if (typeof list === "string") {
		return this.ins(list).count() > 0;
	}  else {
    throw new Error("targets must be String");
  }
};

String.prototype.containsAll= function (list) {
	if (typeof list === "string") {
		return this.ins(list).count() === list.count();
	}  else {
    throw new Error("targets must be String");
  }
};

String.prototype.remove = function (targets) {
	if (typeof targets === "string") {
		let arr = this.rmDup().split(","), list = targets.rmDup().split(",");
	  list.forEach((item) => {
	    if (arr.includes(item)) {
	      arr.splice(arr.indexOf(item), 1);
	    }
	  });
	  return arr.join(",");
	}  else {
    throw new Error("targets must be String");
  }
};

String.prototype.add = function (list) {
	if (typeof list === "string") {
		let arr = this.split(",");
		list.split(",").forEach((item) => {
			if (!arr.includes(item)) {
				arr.push(item);
			}
		});
		return arr.join(",");
	}  else {
    throw new Error("targets must be String");
  }
};

Object.prototype.equal = function (obj) {

    if (!obj) return false;

    if (!$.fn.isObject(obj) || $.fn.isArray(obj) || $.fn.isArray(this)) return false;

    for (var key in this) {

      if (this.hasOwnProperty(key) !== obj.hasOwnProperty(key)) {

        return false;

      } else if (typeof this[key] !== typeof obj[key]) {

        return false;

      }

    }

    for (var prop in obj) {

      if (this.hasOwnProperty(prop) !== obj.hasOwnProperty(prop)) {

        return false;

      } else if (typeof this[prop] !== typeof obj[prop]) {

        return false;

      }

      //If the property is inherited, do not check any more (it must be equal if both objects inherit it)
      //都是Object原型属性时，两者必然相等
      if (!this.hasOwnProperty(prop)) continue;

      if ($.fn.isArray(this[prop]) && $.fn.isArray(obj[prop])) {

        if (!this[prop].equal(obj[prop])) return false;

      } else if ($.fn.isObject(this[prop]) && $.fn.isObject(obj[prop])) {

        if (!this[prop].equal(obj[prop])) return false;

      } else {

        if (this[prop] !== obj[prop]) return false;

      }

    }

    return true;
  }

  Array.prototype.equal = function (arr) {

    if (!arr) return false;

    if (!$.fn.isArray(arr)) return false;
    
    if (this.length !== arr.length) return false;

    this.forEach(function (item, index) {

      if ($.fn.isArray(item) && $.fn.isArray(arr[index])) {

        if (!item.equal(arr[index])) return false;

      } else if ($.fn.isObject(item) && $.fn.isObject(arr[index])) {

        if (!item.equal(arr[index])) return false;

      } else {

        if (item !== arr[index]) return false;

      }
      
    });

    return true;
  }

  Object.defineProperty(Array.prototype, "equal", { enumerable: false });
  Object.defineProperty(Object.prototype, "equal", { enumerable: false });

//getData from JSON by string like "select * where id=1" or "select id,username where id=1andusername=aaa"
Array.prototype.SQL = function (sql) {
  if (typeof sql === "string") {
    let arr = sql.split(" where "),
        targets = arr[0].split("select ")[1],
        cKey, cValue, flag = 0,
        result = [], obj = {};
    if (arr.length > 1) {
      let conditions = arr[1];
      this.forEach((data) => {
        if (conditions.indexOf("and") > -1) {
          conditionList = conditions.split(" and ");
          flag = 0;
          conditionList.forEach((condition) => {
            cKey = condition.split("=")[0].trim();
            cValue = condition.split("=")[1].trim();
            if (data[cKey] === cValue) {
              flag++;
            }
          });
          if (flag === conditionList.length) {
            if (targets.trim() === "*") {
              result.push(data);
            } else {
              targetList = targets.split(",");
              obj = {};
              targetList.forEach((target) => {
                for (let key in data) {
                  if (key === target.trim()) {
                    obj[key] = data[key];
                    break;
                  }
                }
              });
              result.push(obj);
            }
          }
        } else if (conditions.indexOf("or") > -1) {
          conditionList = conditions.split(" or ");
          flag = 0;
          for (let condition of conditionList) {
            cKey = condition.split("=")[0].trim();
            cValue = condition.split("=")[1].trim();
            if (data[cKey] === cValue) {
              flag++;
              break;
            }
          }
          if (flag > 0) {
            if (targets.trim() === "*") {
              result.push(data);
            } else {
              targetList = targets.split(",");
              obj = {};
              targetList.forEach((target) => {
                for (let key in data) {
                  if (key === target.trim()) {
                    obj[key] = data[key];
                    break;
                  }
                }
              });
              result.push(obj);
            }
          }
        } else {
          cKey = conditions.split("=")[0].trim();
          cValue = conditions.split("=")[1].trim();
          if (data[cKey] === cValue) {
            if (targets.trim() === "*") {
              result.push(data);
            } else {
              targetList = targets.split(",");
              obj = {};
              targetList.forEach((target) => {
                for (let key in data) {
                  if (key === target.trim()) {
                    obj[key] = data[key];
                    break;
                  }
                }
              });
              result.push(obj);
            }
          }
        }
      });
    } else if (arr.length === 1) {// no condition
      this.forEach((data) => {
        if (targets.trim() === "*") {
          result.push(data);
        } else {
          targetList = targets.split(",");
          obj = {};
          targetList.forEach((target) => {
            for (let key in data) {
              if (key === target.trim()) {
                obj[key] = data[key];
                break;
              }
            }
          });
          result.push(obj);
        }
      });
    }

    return result;
  }  else {
    throw new Error("targets must be String");
  }
};