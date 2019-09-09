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
              <h4 class="title">Add Blog Post</h4>
            </div>
          </md-card-header>

          <md-card-content>
            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Title</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog Title</label>
                  <md-input v-model="title" placeholder="Blog Title"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Date</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog Date</label>
                  <md-input v-model="date" placeholder="22.10.2019"></md-input>
                </md-field>
              </div>
            </div>

            <div class="md-layout">
              <label class="md-layout-item md-size-15 md-form-label">Text</label>
              <div class="md-layout-item">
                <md-field>
                  <label>Blog Text</label>
                  <md-textarea v-model="text" placeholder="Blog here..."></md-textarea>
                </md-field>
              </div>
            </div>

            <div class="md-layout" style="margin-top:30px;">
              <label class="md-layout-item md-size-15 md-form-label">Text</label>
              <div class="md-layout-item">
                  <md-field>
                    <label>Images only</label>
                    <md-file v-model="single" accept="image/*" />
                  </md-field>
              </div>
            </div>

            <div class="md-layout" style="margin-top:50px;">
              <div class="md-layout-item mx-auto md-size-30">
                <md-button class="md-success" type="submit">Add Blog</md-button>
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
  name: "CreateBlog",

  data() {
    return {
      
    };
  },
  methods:{

  }
};
</script>
