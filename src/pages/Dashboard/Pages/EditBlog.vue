<template>
<div>
 <form @submit.prevent="onSubmit">
    <div class="md-layout">
      <div
        class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100"
      >
        <md-card>
          <md-card-header class="md-card-header-text md-card-header-green">
            <div class="card-text">
              <h4 class="title">Edit Blog Post</h4>
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Title</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog Title Al</label>
                  <md-input v-model="title" ></md-input>
                </md-field>
              </div>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog Title En</label>
                  <md-input v-model="titleEn" ></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Date</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog Date


                  </label>
                  <md-input v-model="date" ></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Ordering</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog order


                  </label>
                  <md-input v-model="ordering" ></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Is shown on home</label>
              <div class="md-layout-item">
                <md-field>

                  <md-checkbox v-model="isMainHome" ></md-checkbox>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Body</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog text </label>
                  <md-textarea v-model="body" ></md-textarea>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Body EN</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog text EN</label>
                  <md-textarea v-model="bodyEn" ></md-textarea>
                </md-field>
              </div>
            </div>

            <div class="md-layout" style="margin-top:30px;">
              <label class="md-layout-item md-size-15 md-form-label">Home Display Image (color scaled)</label>
              <div class="md-layout-item">
                  <md-field>
                    <input
                      type="file"
                      ref="imgHome"
                      :id="'imgHome'"
                      accept="image/*"
                      @change="handleMainUpload()"
                    />
                  </md-field>
                  <md-button class="md-success" @click="updateHomeDisplay()">Update Home Display</md-button>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Home Display Image</label>
              <div class="md-layout-item">
                <img :src="this.getBlog.filterImg" alt="" style="width:20rem;">
              </div>
            </div>

            <div class="md-layout" style="margin-top:30px;">
              <label class="md-layout-item md-size-15 md-form-label">Blog Display Image</label>
              <div class="md-layout-item">
                  <md-field>
                    <input
                      type="file"
                      ref="imgBlog"
                      :id="'imgBlog'"
                      accept="image/*"
                      @change="handleBlogUpload()"
                    />
                  </md-field>
                  <md-button class="md-success" @click="updateBlogDisplay()">Update Blog Display</md-button>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Blog Display Image</label>
              <div class="md-layout-item">
                <img :src="this.getBlog.img" alt="" style="width:20rem;">
              </div>
            </div>

            <div class="md-layout" style="margin-top:50px;">
              <div class="md-layout-item mx-auto md-size-30">
                <md-button class="md-success" type="submit">Save Blog</md-button>
              </div>
            </div>



          </md-card-content>
        </md-card>
      </div>
    </div>
  </form>
</div>
</template>

<script>
import { GET_BLOG } from "@/store/actions.type";
import { mapGetters } from "vuex";
import { PUT } from "@/store/actions.type";
import { s3, albumBucketName } from "@/common/constants";
import {
  START_LOADING,
  STOP_LOADING,  SET_HOME_IMAGE, SET_BLOG_IMAGE

} from "@/store/mutations.type";

export default {
  name: "EditBlog",

  data() {
    return {
      blogId: "",
      title: "",
      titleEn: "",
      date: "", 
      body: "",
      bodyEn: "",
      img: "",
      filterImg: "",
      ordering: "",
      isMainHome: ""
    };
  },
  methods:{
    async fetchBlog(blogId) {
      const TableName = "KM2019-Blog";
      const id = blogId;
      const params = {
        TableName,
        id
      };
      this.$store.commit(START_LOADING);
      await this.$store.dispatch(GET_BLOG, params);
      this.title = this.getBlog.title;
      this.titleEn = this.getBlog.titleEn;
      this.date = this.getBlog.date;
      this.body = this.getBlog.body;
      this.bodyEn = this.getBlog.bodyEn;
      this.img = this.getBlog.img;
      this.filterImg = this.getBlog.filterImg;
      this.ordering = this.getBlog.ordering;
      this.isMainHome = this.getBlog.isMainHome;
      this.$store.commit(STOP_LOADING);
      window.scrollTo(0,0);
    },
    handleMainUpload() {
      let vm = this;
      this.$store.commit(SET_HOME_IMAGE, { vm });
    },
    handleBlogUpload() {
      let vm = this;
      this.$store.commit(SET_BLOG_IMAGE, { vm });
    },





    updateBlogDisplay(){

      let albumName = "Blogs"
      let albumPhotosKey = encodeURIComponent(albumName) + "//"


      const files = this.$refs.imgBlog.files;

      if (files.length === 0) {
        return console.log("Please choose a file to upload first.");
      }
      const file = files[0];
      const fileName = file.name;

      const photoKey = this.albumPhotosKey + fileName;
      let vm = this;
      s3.upload(
        {
          Key: photoKey,
          Body: file,
          ACL: "public-read"
        },
        function(err, data) {
          if (err) {
            return console.log(
              "There was an error uploading your photo: ",
              err.message
            );
          }
          console.log("Successfully uploaded photo.");
          // vm.fetchAlbum();
          const albumBucketName = "Blogs"
          const href ="https://s3.eu-west-1.amazonaws.com/kengamagjike2019/";
          const photoKey = data.Key;
          const photoUrl = href + encodeURIComponent(photoKey);
          vm.img = photoUrl;
        }
      );





    },
    updateHomeDisplay(){

let albumName = "Blogs"
      let albumPhotosKey = encodeURIComponent(albumName) + "//"


      const files = this.$refs.imgHome.files;

      if (files.length === 0) {
        return console.log("Please choose a file to upload first.");
      }
      const file = files[0];
      const fileName = file.name;

      const photoKey = this.albumPhotosKey + fileName;
      let vm = this;
      s3.upload(
        {
          Key: photoKey,
          Body: file,
          ACL: "public-read"
        },
        function(err, data) {
          if (err) {
            return console.log(
              "There was an error uploading your photo: ",
              err.message
            );
          }
          console.log("Successfully uploaded photo.");
          // vm.fetchAlbum();
          const albumBucketName = "Blogs"
          const href ="https://s3.eu-west-1.amazonaws.com/kengamagjike2019/";
          const photoKey = data.Key;
          const photoUrl = href + encodeURIComponent(photoKey);
          vm.filterImg = photoUrl;
        }
      );



    },


    async onSubmit() {


      const TableName = "KM2019-Blog";


      let blog = {
          TableName,
          id: this.blogId,
          title: this.title,
          titleEn: this.titleEn,
          date: this.date,
          body: this.body,
          bodyEn: this.bodyEn,
          ordering: this.ordering,
          isMainHome: this.isMainHome,
          img: this.getBlog.img,
          filterImg: this.getBlog.filterImg
        };

      if(this.img != this.getBlog.img){
        blog = {
          TableName,
          id: this.blogId,
          title: this.title,
          titleEn: this.titleEn,
          date: this.date,
          body: this.body,
          bodyEn: this.bodyEn,
          ordering: this.ordering,
          isMainHome: this.isMainHome,
          img: this.img,
          filterImg: this.getBlog.filterImg
        };
      }

      if(this.filterImg != this.getBlog.filterImg){
        blog = {
          TableName,
          id: this.blogId,
          title: this.title,
          titleEn: this.titleEn,
          date: this.date,
          body: this.body,
          bodyEn: this.bodyEn,
          ordering: this.ordering,
          isMainHome: this.isMainHome,
          img: this.getBlog.img,
          filterImg: this.filterImg
        };
      }

      if(this.filterImg != this.getBlog.filterImg && this.img != this.getBlog.img){
                blog = {
          TableName,
          id: this.blogId,
          title: this.title,
          titleEn: this.titleEn,
          date: this.date,
          body: this.body,
          bodyEn: this.bodyEn,
          ordering: this.ordering,
          isMainHome: this.isMainHome,
          img: this.img,
          filterImg: this.filterImg
        };
      }



      



      // let blog = {
      //   TableName,
      //   id: this.blogId,
      //   title: this.title,
      //   titleEn: this.titleEn,
      //   date: this.date,
      //   body: this.body,
      //   bodyEn: this.bodyEn,
      //   ordering: this.ordering,
      //   isMainHome: this.isMainHome,
      //   img: this.getBlog.img,
      //   filterImg: this.getBlog.filterImg
      // };


      this.$store.commit(START_LOADING);
      await this.$store.dispatch(PUT, blog);
      this.$store.commit(STOP_LOADING);
      





      this.$router.push({ name: "Blog" });

    }




  },
  computed: {
    ...mapGetters(["getBlog"])
  },
    async mounted() {
      
    await this.fetchBlog(this.$route.params.id);
    this.blogId=this.$route.params.id;


  }
};
</script>
