<template>
  <div>
    <div>
      <p>带参数: name: <input v-model="name" /></p>
      <button @click="getHello">send</button>
      <p>hello: {{ hello }}</p>
    </div>

    <div>
      <p>条件查询</p>
      to: <input v-model="to" />
      <button @click="getDataJsons">send</button>
      <p>{{ dataJsons }}</p>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      name: "",
      hello: "",
      dataJsons: "",
      to: ""
    };
  },
  methods: {
    // 带参数
    getHello() {
      this.$apollo.addSmartQuery("hello", {
        query: gql`
          query($name: String) {
            hello(name: $name)
          }
        `,
        variables: {
          name: this.name
        }
      });
    },
    getDataJsons() {
      this.$apollo.addSmartQuery("dataJsons", {
        query: gql`
          query($filters: [FilterInput]) {
            dataJsons(filters: $filters) {
              appkey
              json {
                to
              }
            }
          }
        `,
        variables: {
          filters: [
            {
              key: "to",
              value: this.to,
              operator: "="
            }
          ]
        }
      });
    }
  }
};
</script>
