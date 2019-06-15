const obj = {a: 1, b: 2, c:3};
const { a, b, c } = obj;

const obj1 = { a, b, c };
// const obj2 = { ...{a: 1, b: 2, c:3} };

const arr = [...[1,2,3]];

const name = 'abc';

const person = {
  name: 'def',
  [name]: 'xxx'
};

function add(a = 1, b = 2) {
  return a + b;
}

const handler = {
  onClick: function () {
    setTimeout(() => {
      console.log(this);
    })
  }
}

const set = new Set();

function test() {
  const testinner = () => {
    return arguments.callee(1);
  }

  testinner();
}


