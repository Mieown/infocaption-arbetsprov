<template>
    <div class="card mx-4 my-4 border-white">
      <div class="row g-0 py-3 px-4 shadow-sm rounded">
        <div class="col-md-3 py-3 px-4">
          <a :href="fullURL"><img :src="thumbnailURL ? mediaUrl + thumbnailURL : missingImage" class="img-fluid" alt="titel-image"></a>
        </div>
        <div class="col-md-9">
          <div class="card-body">
            <h4 class="card-title pb-2"><a :href="fullURL" class="text-decoration-none text-color">{{ name }}</a></h4>
            <p class="card-text pb-1"><a :href="fullURL" class="text-decoration-none text-color">{{ summary }}</a></p>
            <p class="card-text pb-4"><small class="text-muted">{{ publicationDate }}</small></p>
            <a :href="fullURL" class="text-decoration-none text-color link-font">URL<img :src="this.url" alt="email-icon" class="email-img"></a>
            <a title="Send email" v-bind:href="'mailto:' + authorEmail" target="blank" class="text-decoration-none text-color link-font">Email<img :src="this.email" alt="email-icon" class="email-img"></a>
          </div>
        </div>
      </div>
    </div>
</template>


<script>
import email from "../assets/email.png";
import url from "../assets/url.png";

export default {
  props: ['thumbnailURL', 'name', 'summary', 'publicationDate', 'fullURL', 'authorEmail', 'missingImage', 'mediaUrl'],
  data() {
    return{
      email: email,
      url: url
    }
  }
}
</script>


<style scoped>

.text-color {
  color: #000;
}

.link-font {
  background-color: #dddddc34;
  font-size: 0.9rem;
  padding: 0.34rem 0.62rem;
  border-radius: 0.2%;
  margin-right: 1rem;
  /* float: right; */
}

.link-font:hover {
  background-color: #dddddc54;
}

.email-img {
  width: 1.2rem;
  padding-left: 0.4rem;
  padding-bottom: 0.1rem;
}

</style>