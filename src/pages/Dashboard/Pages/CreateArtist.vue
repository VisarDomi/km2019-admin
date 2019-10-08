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
              <h4 class="title">Add Artist</h4>
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Emer</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Emri i artistit</label>
                  <md-input v-model="title" placeholder="Daft Punk"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Titull</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Titulli i kenges</label>
                  <md-input v-model="date" placeholder="Loose yourself to dance"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Titull EN</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Titulli i kenges EN</label>
                  <md-input v-model="date" placeholder="Loose yourself to dance"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Bio</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Bio</label>
                  <md-input v-model="text" placeholder="Bio"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Bio En</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Bio En</label>
                  <md-input v-model="text" placeholder="Bio"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Link</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Youtube link</label>
                  <md-input v-model="text" placeholder="https://youtube.com/w?=2sdflkj3034m"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Order</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Order</label>
                  <md-input v-model="text" placeholder="55"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Week</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Week</label>
                  <md-input v-model="text" placeholder="8"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Is current week? </label>
              <div class="md-layout-item">
                <md-field>

                  <md-checkbox v-model="isMainHome" ></md-checkbox>
                </md-field>
              </div>
            </div>


            <div class="md-layout" style="margin-top:30px;">
              <label class="md-layout-item md-size-15 md-form-label">Image</label>
              <div class="md-layout-item">
                  <md-field>
                    <label>Images only</label>
                    <md-file v-model="single" accept="image/*" />
                  </md-field>
              </div>
            </div>

            <div class="md-layout" style="margin-top:30px;">
              <label class="md-layout-item md-size-15 md-form-label">Background Image</label>
              <div class="md-layout-item">
                  <md-field>
                    <label>Images only</label>
                    <md-file v-model="single" accept="image/*" />
                  </md-field>
              </div>
            </div>


            <div class="md-layout" style="margin-top:50px;">
              <div class="md-layout-item mx-auto md-size-30">
                <md-button class="md-success" type="submit">Add Artist</md-button>
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


export default {
  name: "CreateArtist",

  data() {
    return {

    };
  },
  methods:{

  }
};
</script>
