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
                <h4 class="title">Create Jury</h4>
              </div>
            </md-card-header>

            <md-card-content>
              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Emer</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Emri i jurise</label>
                    <md-input v-model="firstName" placeholder="Daft Punk"></md-input>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Mbiemer</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Mbiemri i jurise</label>
                    <md-input v-model="lastName" placeholder="Daft Punk"></md-input>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Bio</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Bio</label>
                    <md-textarea v-model="bio" placeholder="Bio"></md-textarea>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Bio En</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Bio En</label>
                    <md-textarea v-model="bioEng" placeholder="Bio"></md-textarea>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <label class="md-layout-item md-size-15 md-form-label">Order</label>
                <div class="md-layout-item">
                  <md-field>
                    <label>Order</label>
                    <md-input v-model="ordering" placeholder="55"></md-input>
                  </md-field>
                </div>
              </div>

              <div class="md-layout">
                <div class="md-layout md-layout-item md-size-50" style="margin-top:30px;">
                  <label class="md-layout-item md-size-15 md-form-label">Hover Picture</label>
                  <div class="md-layout-item">
                    <md-field>
                      <input type="file" ref="hoverref" :id="'imgHome'" accept="image/*" />
                    </md-field>
                    <md-button
                      class="md-success"
                      @click="updateHoverPicture()"
                    >Update Hover Picture</md-button>
                  </div>

                  <label class="md-layout-item md-size-15 md-form-label">Hover</label>
                  <div class="md-layout-item">
                    <img
                      :src="this.hoverImg"
                      alt
                      style="width:20rem;"
                      :key="this.hoverImg"
                    />
                  </div>
                </div>

                <div class="md-layout md-layout-item md-size-50" style="margin-top:30px;">
                  <label class="md-layout-item md-size-15 md-form-label">Profile Picture</label>
                  <div class="md-layout-item">
                    <md-field>
                      <input type="file" ref="profileref" :id="'imgBlog'" accept="image/*" />
                    </md-field>
                    <md-button
                      class="md-success"
                      @click="updateProfilePicture()"
                    >Update Profile Picture</md-button>
                  </div>

                  <label class="md-layout-item md-size-15 md-form-label">Profile</label>
                  <div class="md-layout-item">
                    <img :src="this.profileImg" alt style="width:20rem;" :key="this.profileImg" />
                  </div>
                </div>
              </div>

              <div class="md-layout" style="margin-top:50px;">
                <div class="md-layout-item mx-auto md-size-30">
                  <md-button class="md-success" type="submit">Save Jury</md-button>
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
import { mapGetters } from "vuex";
import { PUT } from "@/store/actions.type";
import { s3, albumBucketName } from "@/common/constants";
import { START_LOADING, STOP_LOADING } from "@/store/mutations.type";

export default {
  name: "CreateJury",

  data() {
    return {
      juryId: "",
      firstName: "",
      lastName: "",
      bio: "",
      bioEng: "",
      profileImg: "",
      hoverImg: "",
      ordering: ""
    };
  },
  methods: {
    updateProfilePicture() {
      let albumName = "Jurys";
      let albumPhotosKey = encodeURIComponent(albumName) + "//";

      const files = this.$refs.profileref.files;

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
          const albumBucketName = "Jurys";
          const href = "https://s3.eu-west-1.amazonaws.com/kengamagjike2019/";
          const photoKey = data.Key;
          const photoUrl = href + encodeURIComponent(photoKey);
          vm.profileImg = photoUrl;
        }
      );
    },
    updateHoverPicture() {
      let albumName = "Jurys";
      let albumPhotosKey = encodeURIComponent(albumName) + "//";

      const files = this.$refs.hoverref.files;

      if (files.length === 0) {
        return console.log("Please choose a file to upload first.");
      }
      const file = files[0];
      const fileName = file.name;

      const photoKey = albumPhotosKey + fileName;
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
          const albumBucketName = "Jurys";
          const href = "https://s3.eu-west-1.amazonaws.com/kengamagjike2019/";
          const photoKey = data.Key;
          const photoUrl = href + encodeURIComponent(photoKey);
          vm.hoverImg = photoUrl;
        }
      );
    },

    async onSubmit() {
      const TableName = "KM2019-Jury";

      let jury = {
        TableName,
        firstName: this.firstName,
        lastName: this.lastName,
        bio: this.bio,
        bioEng: this.bioEng,
        ordering: this.ordering,
        img: this.profileImg,
        hoverImg: this.hoverImg
      };

      this.$store.commit(START_LOADING);
      await this.$store.dispatch(PUT, jury);
      this.$store.commit(STOP_LOADING);

      this.$router.push({ name: "Jurys" });
    }
  },
  computed: {}
};
</script>
