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
                    <md-input v-model="title"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item">
                  <md-field>
                    <label>Blog Title En</label>
                    <md-input v-model="titleEn"></md-input>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Date</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Blog Date</label>
                    <md-input v-model="date"></md-input>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Ordering</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Blog order</label>
                    <md-input v-model="ordering"></md-input>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Is shown on home</label>
                <div class="md-layout-item">
                  <md-field>
                    <md-checkbox v-model="isMainHome"></md-checkbox>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Contains video?</label>
                <div class="md-layout-item">
                  <md-field>
                    <md-checkbox v-model="containsVideo"></md-checkbox>
                  </md-field>
                </div>
              </div>

              <div class="md-layout" v-if="containsVideo">
                <label class="md-layout-item md-size-15 md-form-label">Video link</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Video link</label>
                    <md-input
                      v-model="videoLink"
                      placeholder="https://www.youtube.com/embed/a-YsVQSK_Uo"
                    ></md-input>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Body</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Blog text</label>
                    <md-textarea v-model="body"></md-textarea>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Body EN</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Blog text EN</label>
                    <md-textarea v-model="bodyEn"></md-textarea>
                  </md-field>
                </div>
              </div>


              <div class="md-layout">
                <div class="md-layout md-layout-item md-size-50" style="margin-top:30px;">
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

                  <label class="md-layout-item md-size-15 md-form-label">Blog Display Image</label>
                  <div class="md-layout-item">
                    <img :src="this.img" alt style="width:20rem;" :key="this.img" />
                  </div>
                </div>
              </div>

              <div class="md-layout">
                <div class="md-layout md-layout-item md-size-50" style="margin-top:30px;">
                  <label class="md-layout-item md-size-15 md-form-label">Blog Display Image2</label>
                  <div class="md-layout-item">
                    <md-field>
                      <input
                        type="file"
                        ref="imgBlog2"
                        :id="'imgBlog2'"
                        accept="image/*"
                        @change="handleBlogUpload2()"
                      />
                    </md-field>
                    <md-button class="md-success" @click="updateBlogDisplay2()">Update Blog Display2</md-button>
                  </div>

                  <label class="md-layout-item md-size-15 md-form-label">Blog Display Image2</label>
                  <div class="md-layout-item">
                    <img :src="this.img2" alt style="width:20rem;" :key="this.img2" />
                  </div>
                </div>
              </div>

              <div class="md-layout">
                <div class="md-layout md-layout-item md-size-50" style="margin-top:30px;">
                  <label class="md-layout-item md-size-15 md-form-label">Blog Display Image3</label>
                  <div class="md-layout-item">
                    <md-field>
                      <input
                        type="file"
                        ref="imgBlog3"
                        :id="'imgBlog3'"
                        accept="image/*"
                        @change="handleBlogUpload3()"
                      />
                    </md-field>
                    <md-button class="md-success" @click="updateBlogDisplay3()">Update Blog Display3</md-button>
                  </div>

                  <label class="md-layout-item md-size-15 md-form-label">Blog Display Image3</label>
                  <div class="md-layout-item">
                    <img :src="this.img3" alt style="width:20rem;" :key="this.img3" />
                  </div>
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
import { PUT } from "@/store/actions.type";
import { s3, albumBucketName } from "@/common/constants";
import {
  START_LOADING,
  STOP_LOADING,
  SET_BLOG_IMAGE,
  SET_BLOG_IMAGE2,
  SET_BLOG_IMAGE3
} from "@/store/mutations.type";

export default {
  name: "CreateBlog",

  data() {
    return {
      title: "",
      titleEn: "",
      date: "",
      body: "",
      bodyEn: "",
      img: "",
      img2: "",
      img3: "",
      ordering: "",
      isMainHome: false,
      containsVideo: false,
      videoLink: "nan"
    };
  },
  methods: {
    handleBlogUpload() {
      let vm = this;
      this.$store.commit(SET_BLOG_IMAGE, { vm });
    },
    handleBlogUpload2() {
      let vm = this;
      this.$store.commit(SET_BLOG_IMAGE2, { vm });
    },
    handleBlogUpload3() {
      let vm = this;
      this.$store.commit(SET_BLOG_IMAGE3, { vm });
    },

    uploadImage(files, imgName) {
      let albumName = "Blogs";
      let albumPhotosKey = encodeURIComponent(albumName) + "//";

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
          const albumBucketName = "Blogs";
          const href = "https://s3.eu-west-1.amazonaws.com/kengamagjike2019/";
          const photoKey = data.Key;
          const photoUrl = href + encodeURIComponent(photoKey);
          eval(`vm.`+`${imgName}`+`=photoUrl`)
        }
      );
    },

    updateBlogDisplay() {
      const files = this.$refs.imgBlog.files;
      this.uploadImage(files, "img")
    },
    updateBlogDisplay2() {
      const files = this.$refs.imgBlog2.files;
      this.uploadImage(files, "img2")
    },
    updateBlogDisplay3() {
      const files = this.$refs.imgBlog3.files;
      this.uploadImage(files, "img3")
    },

    async onSubmit() {
      const TableName = "KM2019-Blog";

      let blog = {
        TableName,
        title: this.title,
        titleEn: this.titleEn,
        date: this.date,
        body: this.body,
        bodyEn: this.bodyEn,
        ordering: this.ordering,
        isMainHome: this.isMainHome,
        img: this.img,
        img2: this.img2,
        img3: this.img3,
        containsVideo: this.containsVideo,
        videoLink: this.videoLink
      };

      console.log("will send: ", blog);
      this.$store.commit(START_LOADING);
      await this.$store.dispatch(PUT, blog);
      this.$store.commit(STOP_LOADING);

      this.$router.push({ name: "Blogs" });
    }
  },
  computed: {},
  async mounted() {}
};
</script>
