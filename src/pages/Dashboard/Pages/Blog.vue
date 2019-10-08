<template>
<div>

    <div class="md-layout">
      <div class="md-layout-item" style="margin-bottom:5rem;">
        <md-button class="md-success" @click="addBlog()">Add new blog post...</md-button>
      </div>
    </div>


  <div class="md-layout">


<!-- soon replace below div with 


      <div
        v-for="(driver, index) in this.driversData"
        :key="driver.id"


 -->
    <div
      class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"    v-for="blog in this.blogs" :key="blog.id">
      <product-card header-animation="true">
        <img class="img" slot="imageHeader" :src="blog.img" style="height: 20rem;
    object-fit: cover;" />
        <md-icon slot="fixed-button">build</md-icon>
        <template slot="first-button">
          <md-icon>art_track</md-icon>
          <md-tooltip md-direction="bottom">View</md-tooltip>
        </template>
        <template slot="second-button">
          <md-icon>edit</md-icon>
          <md-tooltip md-direction="bottom">Edit</md-tooltip>
        </template>
        <template slot="third-button">
          <md-icon>close</md-icon>
          <md-tooltip md-direction="bottom">Remove</md-tooltip>
        </template>
        <h4 slot="title" class="title">
          <a href="#pablo">{{blog.title}}</a>
          <br>
          <a href="#pablo">{{blog.titleEn}}</a>
        </h4>
        <div slot="description" class="card-description">
          {{blog.body.substring(0, 80)}}
          <br>
          {{blog.bodyEn.substring(0, 80)}}
        </div>
        <template slot="footer">
          <div class="price">
            <h4>{{blog.date}}</h4>
          </div>
          <div class="stats">
            <h4 class="category" v-if="blog.isMainHome">
              <strong>Duket ne home page</strong>
            </h4>
          </div>
        </template>
      </product-card>
    </div>

  </div>


  </div>
</template>

<script>


import { LIST_BLOGS } from "@/store/actions.type";
import { mapGetters } from "vuex";


import {
  ProductCard,
} from "@/components";

export default {
  name: "Blog",
  components: {
    ProductCard,
  },
  data() {
    return {
      blogs: [],

    };
  },
  methods:{
    addBlog(){
      this.$router.push({ name: "CreateBlog" });
    },
    goToBlog(blog) {
      // this.$router.push({ name: blog.title });
      this.$router.push({
        name: "SingleBlog",
        params: { title: blog.title, id: blog.id}
      });
    },
    async fetchBlogs() {
      const TableName = "KM2019-Blog";
      const Limit = "100";
      const params = {
        TableName,
        Limit
      };
      await this.$store.dispatch(LIST_BLOGS, params);

      for (let blog of this.getBlogs) {
          this.blogs.push(blog);
      }
      this.blogs.sort((a, b) => b.ordering - a.ordering)

    }
  },
    async mounted() {
    await this.fetchBlogs();
  },
    computed: {
    ...mapGetters(["getBlogs"])
  }
};
</script>
