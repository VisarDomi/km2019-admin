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
              <h4 class="title">Edit Artist</h4>
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Emer</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Emri i artistit</label>
                  <md-input v-model="name" placeholder="Daft Punk"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Titull</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Titulli i kenges</label>
                  <md-input v-model="song" placeholder="Loose yourself to dance"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Titull EN</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Titulli i kenges EN</label>
                  <md-input v-model="songEng" placeholder="Loose yourself to dance"></md-input>
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
              <label class="md-layout-item md-size-15 md-form-label">Link</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Youtube link</label>
                  <md-input v-model="video" ></md-input>
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
              <label class="md-layout-item md-size-15 md-form-label">Week</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Week</label>
                  <md-input v-model="week" placeholder="8"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Is current week? </label>
              <div class="md-layout-item">
                <md-field>

                  <md-checkbox v-model="isCurrentWeek" ></md-checkbox>
                </md-field>
              </div>
            </div>


        <div class="md-layout">
            <div class="md-layout md-layout-item md-size-50" style="margin-top:30px;">
              <label class="md-layout-item md-size-15 md-form-label">Background Picture</label>
              <div class="md-layout-item">
                  <md-field>
                    <input
                      type="file"
                      ref="backgroundref"
                      :id="'imgHome'"
                      accept="image/*"
                    />
                  </md-field>
                  <md-button class="md-success" @click="updateBackgroundPicture()">Update Background Picture</md-button>
              </div>

              <label class="md-layout-item md-size-15 md-form-label">Background</label>
              <div class="md-layout-item">
                <img :src="this.backgroundImg" alt="" style="width:20rem;" :key="this.backgroundImg">
              </div>
            </div>

            <div class="md-layout md-layout-item md-size-50" style="margin-top:30px;">
              <label class="md-layout-item md-size-15 md-form-label">Profile Picture</label>
              <div class="md-layout-item">
                  <md-field>
                    <input
                      type="file"
                      ref="profileref"
                      :id="'imgBlog'"
                      accept="image/*"
                    />
                  </md-field>
                  <md-button class="md-success" @click="updateProfilePicture()">Update Profile Picture</md-button>
              </div>

              <label class="md-layout-item md-size-15 md-form-label">Profile</label>
              <div class="md-layout-item">
                <img :src="this.profileImg" alt="" style="width:20rem;" :key="this.profileImg">
              </div>
            </div>
          </div>


            <div class="md-layout" style="margin-top:50px;">
              <div class="md-layout-item mx-auto md-size-30">
                <md-button class="md-success" type="submit">Save Artist</md-button>
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

import { GET_ARTIST } from "@/store/actions.type";
import { mapGetters } from "vuex";
import { PUT } from "@/store/actions.type";
import { s3, albumBucketName } from "@/common/constants";
import {
  START_LOADING,
  STOP_LOADING

} from "@/store/mutations.type";

export default {
  name: "EditArtist",

  data() {
    return {
      artistId: "",
      name: "",
      song: "",
      songEng: "", 
      video: "",
      week: "",
      bio: "",
      bioEng: "",
      profileImg: "",
      backgroundImg: "",
      ordering: "",
      isCurrentWeek: ""
    };
  },
  methods:{
    async fetchArtist(artistId) {
      const TableName = "KM2019-Artist";
      const id = artistId;
      const params = {
        TableName,
        id
      };
      this.$store.commit(START_LOADING);
      await this.$store.dispatch(GET_ARTIST, params);
      this.name = this.getArtist.name;
      this.song = this.getArtist.song;
      this.songEng = this.getArtist.songEng;
      this.video = this.getArtist.video;
      this.week = this.getArtist.week;
      this.bio = this.getArtist.bio;
      this.bioEng = this.getArtist.bioEng;
      this.profileImg = this.getArtist.img;
      this.backgroundImg = this.getArtist.bgImg;
      this.ordering = this.getArtist.ordering;
      this.isCurrentWeek = this.getArtist.isCurrentWeek;

      this.$store.commit(STOP_LOADING);

    },


    updateProfilePicture(){

      let albumName = "Artists"
      let albumPhotosKey = encodeURIComponent(albumName) + "//"


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
          const albumBucketName = "Artists"
          const href ="https://s3.eu-west-1.amazonaws.com/kengamagjike2019/";
          const photoKey = data.Key;
          const photoUrl = href + encodeURIComponent(photoKey);
          vm.profileImg = photoUrl;
        }
      );





    },
    updateBackgroundPicture(){

    let albumName = "Artists"
      let albumPhotosKey = encodeURIComponent(albumName) + "//"


      const files = this.$refs.backgroundref.files;

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
          const albumBucketName = "Artists"
          const href ="https://s3.eu-west-1.amazonaws.com/kengamagjike2019/";
          const photoKey = data.Key;
          const photoUrl = href + encodeURIComponent(photoKey);
          vm.backgroundImg = photoUrl;
        }
      );



    },


    async onSubmit() {


      const TableName = "KM2019-Artist";
      let backgroundImage = this.getArtist.bgImg;
      let profileImage = this.getArtist.img;

      if(this.profileImg != this.getArtist.img){
        profileImage = this.profileImg;
      }

      if(this.backgroundImg != this.getArtist.bgImg){
        backgroundImage = this.backgroundImg;
      }

      let artist = {
          TableName,
          id: this.artistId,
          name: this.name,
          song: this.song,
          songEng: this.songEng,
          video: this.video,
          week: this.week,
          bio: this.bio,
          bioEng: this.bioEng,
          ordering: this.ordering,
          isCurrentWeek: this.isCurrentWeek,
          img: profileImage,
          bgImg: backgroundImage
        };


      this.$store.commit(START_LOADING);
      console.log("sending: ", artist)
      await this.$store.dispatch(PUT, artist);
      this.$store.commit(STOP_LOADING);

      this.$router.push({ name: "Artists" });

    },


  },
  computed: {
      ...mapGetters(["getArtist"])
        },
      async mounted() {
        
      await this.fetchArtist(this.$route.params.id);
      this.artistId=this.$route.params.id;
  
  
    }
};
</script>
