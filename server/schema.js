const { buildSchema } = require("graphql");

// json格式字符串
const rawData = [
  {
    appkey: "test1",
    json: JSON.stringify({ to: 1, from: 2 }),
  },
  {
    appkey: "test2",
    json: JSON.stringify({ to: 111, from: 222 }),
  },
];

class Person {
  constructor(name = "Charming") {
    this.name = name;
  }
  name() {
    return this.name;
  }
  age() {
    return this.name.length;
  }
  sex() {
    return Math.random() > 0.5;
  }
}

const schema = buildSchema(`
  type Person {
    name: String
    age: Int
    sex: Boolean
  }

  type Json {
    to: String,
    from: String
  }

  type DataJson {
    appkey: String,
    json: Json
  }
  # 定义input类型
  input FilterInput {
    key: String,
    value: String,
    operator: String,
  }

  type Query {
    hello(name: String): String,
    person(name: String): Person,
    dataJsons(filters: [FilterInput]): [DataJson]
  }
`);

const rootValue = {
  hello: ({ name }) => {
    return `Hello world ${name}!`;
  },
  person: ({ name }) => {
    return new Person(name);
  },
  dataJsons: ({ filters = [] }) => {
    return rawData.reduce((result, d) => {
      const item = JSON.parse(JSON.stringify(d));
      const json = (item.json = JSON.parse(item.json));
      let match = filters.every((f) => {
        switch (f.operator) {
          case "=":
            return json[f.key] == f.value;
          case ">":
            return json[f.key] > f.value;
          case "<":
            return json[f.key] < f.value;
        }
      });
      if (match) {
        result.push(item);
      }
      return result;
    }, []);
  },
};

module.exports = {
  rootValue,
  schema,
};
