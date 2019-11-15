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
        class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-33"
        v-for="blog in this.blogs"
        :key="blog.id"
      >
          <product-card header-animation="true">
            <img
              class="img"
              slot="imageHeader"
              :src="blog.img"
              style="height: 20rem; object-fit: cover;"
            />
            <md-icon slot="fixed-button">build</md-icon>
            <!-- <template slot="first-button">
              <div @click="goToBlog(blog)">
                <md-icon>art_track</md-icon>
                <md-tooltip md-direction="bottom">View</md-tooltip>
              </div>
            </template>-->
            <template slot="second-button">
              <div @click="goToBlog(blog)">
                <md-icon>edit</md-icon>
                <md-tooltip md-direction="bottom">Edit</md-tooltip>
              </div>
            </template>
            <template slot="third-button">
              <div @click="askDeleteBlog(blog)">
                <md-icon>close</md-icon>
                <md-tooltip md-direction="bottom">Remove</md-tooltip>
              </div>
            </template>
            <h4 slot="title" class="title">
              <a href="#" @click="goToBlog(blog)">{{blog.title}}</a>
              <br />
              <a href="#" @click="goToBlog(blog)">{{blog.titleEn}}</a>
            </h4>
            <div slot="description" class="card-description">
              {{blog.body.substring(0, 80)}}
              <br />
              {{blog.bodyEn.substring(0, 80)}}
            </div>
            <template slot="footer">
              <div class="price">
                <h4>{{blog.date}}</h4>
              </div>
              <div class="price">
                <h4>{{blog.ordering}}</h4>
              </div>
              <div class="stats">
                <h4 class="category" v-if="blog.isMainHome">
                  <strong>Visible on home page</strong>
                </h4>
              </div>
            </template>
          </product-card>
        
      </div>
    </div>
  </div>
</template>

<script>
import { LIST_BLOG, DELETE } from "@/store/actions.type";
import { mapGetters } from "vuex";

import { ProductCard } from "@/components";

export default {
  name: "Blogs",
  components: {
    ProductCard
  },
  data() {
    return {
      blogs: [],
      isDeleting: false
    };
  },
  methods: {
    askDeleteBlog(blog) {
      let isSure = confirm("Are you sure you want to delete this blog?")
      if (isSure) {
        // delete blog
        this.deleteBlog(blog)
      }
    },
    async deleteBlog(blog) {
      this.isDeleting = true;
      const TableName = "KM2019-Blog";
      const payload = {
        TableName,
        id: blog.id
      };
      await this.$store.dispatch(DELETE, payload);
      this.isDeleting = false;
      await this.fetchBlogs();
    },
    addBlog() {
      this.$router.push({ name: "CreateBlog" });
    },
    goToBlog(blog) {
      this.$router.push({
        name: "EditBlog",
        params: { title: blog.title, id: blog.id }
      });
    },
    async fetchBlogs() {
      this.blogs = []
      const TableName = "KM2019-Blog";
      const Limit = "100";
      const params = {
        TableName,
        Limit
      };
      await this.$store.dispatch(LIST_BLOG, params);

      for (let blog of this.getBlogs) {
        this.blogs.push(blog);
      }
      this.blogs.sort((a, b) => b.ordering - a.ordering);
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
