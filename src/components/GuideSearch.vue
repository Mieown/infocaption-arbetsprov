<template>
  <div class="container-fluid">

    <div class="row justify-content-md-center bg-dark p-5">
      <div class="col-md-8">
      <form @submit.prevent="submitSearch">
        <div class="input-group input-group-lg">
          <input type="text" class="form-control border-white" aria-label="Text input with segmented dropdown button" placeholder="Search" v-model.trim="enteredSearch">
          <button type="submit" class="btn btn-color"><img :src="searchImage" class="search-img" alt="search-image"></button>
          
          <button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split btn-filter" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample"><img :src="filter" class="filter-img" alt="filter-image"></button>
          <div class="collapse col-md-12" id="collapseExample">
            <div class="card card-body p-4">
              <div class="pb-1">Datum - startdatum och slutdatum</div>         
                <Datepicker v-model="date" range :enableTimePicker="false" class="pb-3"></Datepicker>
              <div class="pb-1">Guidetyp</div>
                <select class="form-select" aria-label="Default select example">
                <option selected>Välj en guidetyp</option>
                  <option value="1">Snabbguide</option>
                  <option value="2">Steg-för-steg-guide</option>
                  <option value="3">Textguide</option>
                  <option value="4"> Kunskapstest</option>
                  <option value="5">Översikt</option>
                  <option value="6">Snabbinspelning</option>
                  <option value="7">Push training	</option>
                  <option value="8">Kurs</option>
                  <option value="9">URL</option>
                  <option value="10">Ranking</option>
                  <option value="11">Arbetsflöde</option>
                </select>
              </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="d-flex justify-content-center mt-3">
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="!isLoading && (!posts.results || posts.results.length === 0)">No search results was found. Please try again.</p>
    </div>
  <div class="container-fluid">
    <div class="row justify-content-md-center pt-0 pb-0">
    <div class="col-md-8">
        <card-container
          v-for="p in posts.results"
          :key="p.id"
          :thumbnailURL="p.thumbnailURL"
          :missingImage="this.missingImage"
          :mediaUrl="this.mediaUrl"
          :name="p.name"
          :summary="p.summary"
          :publicationDate="p.publicationDate"
          :fullURL="p.fullURL"
          :authorEmail="p.authorEmail"
        ></card-container>
    </div>
  </div>
</div>

<div class="container-fluid">
  <div class="d-flex justify-content-center mt-0">
    <div class="pagination-container">
      <ul v-if="posts.currentPage < 6" class="pagination">
        <li class="first-page" @click="getPostsForPage(1)">
          <p>First</p>
        </li>
        <li v-for="index in (posts.totalPages >= 9 ? 9 : posts.totalPages)" :key="index" @click="getPostsForPage(index)">
          <p v-if="posts.currentPage == index" class="current-page">{{ index }}</p>
          <p v-else>{{ index }}</p>
        </li>
        <li class="last-page" @click="getPostsForPage(posts.totalPages)">
          <p>Last</p>
        </li>
      </ul>
      <ul v-else-if="(posts.currentPage + 4) <= posts.totalPages" class="pagination">
        <li class="first-page" @click="getPostsForPage(1)">
          <p>First</p>
        </li>
        <li v-for="number in [4,3,2,1]" :key="number" @click="getPostsForPage(posts.currentPage - number)">
          <p>{{ posts.currentPage - number }}</p>
        </li>
        <li class="current-page" @click="getPostsForPage(posts.currentPage)">
          <p>{{ posts.currentPage }}</p>
        </li>
        <li v-for="number in [1,2,3,4]" :key="number" @click="getPostsForPage(posts.currentPage + number)">
          <p>{{ posts.currentPage + number }}</p>
        </li>
        <li class="last-page" @click="getPostsForPage(posts.totalPages)">
          <p>Last</p>
        </li>
      </ul>
      <ul v-else class="pagination">
        <li class="first-page" @click="getPostsForPage(1)">
          <p class="page-first-text">First</p>
        </li>
        <li v-for="number in [8,7,6,5,4,3,2,1,0]" :key="number" @click="getPostsForPage(posts.totalPages - number)">
          <p v-if="posts.totalPages - number == posts.currentPage" class="current-page">{{ posts.currentPage }}</p>
          <p v-else>{{ posts.totalPages - number }}</p>
        </li>
        <li class="last-page" @click="getPostsForPage(posts.totalPages)">
          <p>Last</p>
        </li>
      </ul>
    </div>
  </div>
</div>

</template>


<script>
  import missingImage from "../assets/missingimage.png";
  import searchImage from "../assets/searchimg.png";
  import circleimg from "../assets/circleimg.svg";
  import filter from "../assets/filter.png";
  import CardContainer from './CardContainer.vue';
  import Datepicker from 'vue3-date-time-picker';
  import 'vue3-date-time-picker/dist/main.css'


  export default {
    components: {
    CardContainer,
    Datepicker
    },
    data() {
      return {
        posts: [],
        isLoading: false,
        isSearched: false,
        baseUrl: 'https://support.infocaption.com/API/lucene/guidesearch',
        mediaUrl: 'https://support.infocaption.com/',
        missingImage: missingImage,
        searchImage: searchImage,
        circleimg: circleimg,
        filter: filter,
        enteredSearch:'',
        date: null
      }
    },
  methods: {
    getPosts() {
      this.isLoading = true

      fetch(this.baseUrl)
        .then(response => response.json())
        .then(data => {
          this.posts = data
          console.log(data);
          this.isLoading = false
        })
    },
    getPostsForPage(pageNumber) {
      this.isLoading = true

      fetch(this.baseUrl + '?page=' + pageNumber + (this.isSearched ? '&searchQuery=' + this.enteredSearch : ''))
        .then(response => response.json())
        .then(data => {
          this.posts = data
          this.isLoading = false
        })
    },
    submitSearch(enteredSearch){
      enteredSearch = this.enteredSearch;
      this.isLoading = true
      this.isSearched = true

      fetch(this.baseUrl + '?searchQuery=' + enteredSearch)
        .then(response => response.json())
        .then(data => {
          this.posts = this.filterData(data)
          this.isLoading = false
        });
    },
    filterData(data) {
      let filteredArray = [];

      if(this.date != null) {
        const fromDate = this.date[0]
        const toDate = this.date[1]

        for(let i = 0; i < data.results.length; i++) {
          let currentResult = data.results[i]

          if(currentResult.publicationDate != null && currentResult.publicationDate != '') {
            if(new Date(currentResult.publicationDate) >= fromDate && new Date(currentResult.publicationDate) <= toDate) {
              filteredArray.push(currentResult)

            }
          }
        }
        data.results = filteredArray
        return data
      }
      else {
        return data
      }
    }
  },
  mounted() {
    this.getPosts()
  }
}
</script>


<style scoped>

.search-img {
  width: 0.95rem;
  padding-bottom: 0.22rem;
}

.btn-color {
  background-color: #fff;
}

.btn-filter {
  width: 3.1rem;
}

.filter-img{
    position: absolute;
    width: 0.89rem;
    right: 1.1rem;
    top: 1.01rem;
}

.pagination-container {
  display: inline-block;
}

.pagination {
  list-style-type: none;
}

.pagination li:not(.first-page, .last-page) {
  padding: 0.8rem;
  cursor: pointer;
  margin: 0.25rem;
  background-image: url(../assets/circleimgfirst.svg);
  max-height: 2.9rem;
  background-size: inherit;
  background-repeat: no-repeat;
  background-position: center;
  font-size: 0.85rem;
}
.pagination li:hover:not(.first-page, .last-page) {
  background-image: url(../assets/circleimg.svg);
}

.first-page,
.last-page {
  padding: 0.85rem 0.7rem;
  cursor: pointer;
}

.current-page {
  color: #fff;
}

.dropdown-toggle::after{
  visibility: hidden;
}

</style>