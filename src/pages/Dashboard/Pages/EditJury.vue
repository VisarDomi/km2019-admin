<template>
  <div>
    <form @submit.prevent="onSubmit">
      <div class="md-layout">
        <div
          class="md-layout-item md-xlarge-size-100 md-large-size-100 md-medium-size-100 md-small-size-100"
        >
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
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { GET_JURY } from "@/store/actions.type";
import { mapGetters } from "vuex";
import { PUT } from "@/store/actions.type";
import { s3, albumBucketName } from "@/common/constants";
import { START_LOADING, STOP_LOADING } from "@/store/mutations.type";

export default {
  name: "EditJury",

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
    async fetchJury(juryId) {
      const TableName = "KM2019-Jury";
      const id = juryId;
      const params = {
        TableName,
        id
      };
      this.$store.commit(START_LOADING);
      await this.$store.dispatch(GET_JURY, params);
      this.firstName = this.getJury.firstName;
      this.lastName = this.getJury.lastName;
      this.bio = this.getJury.bio;
      this.bioEng = this.getJury.bioEng;
      this.profileImg = this.getJury.img;
      this.hoverImg = this.getJury.hoverImg;
      this.ordering = this.getJury.ordering;

      this.$store.commit(STOP_LOADING);
    },

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
      let hoverImage = this.getJury.hoverImg;
      let profileImage = this.getJury.img;

      if (this.profileImg != this.getJury.img) {
        profileImage = this.profileImg;
      }

      if (this.hoverImg != this.getJury.hoverImg) {
        hoverImage = this.hoverImg;
      }

      let jury = {
        TableName,
        id: this.juryId,
        firstName: this.firstName,
        lastName: this.lastName,
        bio: this.bio,
        bioEng: this.bioEng,
        ordering: this.ordering,
        isCurrentWeek: this.isCurrentWeek,
        img: profileImage,
        hoverImg: hoverImage
      };

      this.$store.commit(START_LOADING);
      console.log("sending: ", jury);
      await this.$store.dispatch(PUT, jury);
      this.$store.commit(STOP_LOADING);

      this.$router.push({ name: "Jurys" });
    }
  },
  computed: {
    ...mapGetters(["getJury"])
  },
  async mounted() {
    await this.fetchJury(this.$route.params.id);
    this.juryId = this.$route.params.id;
  }
};
</script>
