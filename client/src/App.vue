<template class="myTemplate">
  <div id="app">

    <h1 class="h1 subtitle has-text-centered">Your Favourite Films right here!</h1>
    <hr class="h1hr"/>
    <film-popup
        v-if="isInfoPopup"
        @closePopup="closePopupInfo"
        @bookFilm="bookFilm"
    >
      <video class="filmImg__popup" height="100%" width="40%" controls :poster=imgUrl>
        <source :src=trailerUrl type="video/mp4">
        Your browser does not support the video tag.
      </video>
      <div class="filmText">
        <p class="filmName" v-text="filmName"></p>
        <hr class="popup-hr">
        <p class="filmDesc__popup" v-text="description"></p>
        <p class="filmDate__popup" v-text="filmDate"></p>
        <hr class="popup-hr">
        <p class="filmDate__popup" v-text="cinemas"></p>
      </div>
    </film-popup>

    <div class="field has-addons">
      <div class="control is-expanded">
        <input class="input" v-model="filmName" type="text" placeholder="Ryan Gosling...."/>
      </div>

      <div class="control">
        <a class="button is-info" @click="findItem(filmName)" :disabled="!filmName">Find</a>
      </div>
    </div>

    <div class="btn-group" style="width:100%">
      <button @click="crimeGenre" style="width:25%">Crime</button>
      <button @click="comedyGenre" style="width:25%">Comedy</button>
      <button @click="familyGenre" style="width:25%">Family</button>
      <button @click="actionGenre" style="width:25%">Action</button>
    </div>

    <div class="notification" v-for="(item) in items" :key="item._id">
      <div class="columns">
        <img :src=item.imgUrl class="filmImg" height="100%" width="40%" alt="filmName">
        <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
          <div class="font-medium">
            <div class="filmName" v-text="item.name"></div>
            <br>
            <p class="filmDesc" v-text="item.description"></p>
          </div>
        </div>
        <div class="column is-narrow">
          <i @click="showInfo(item)" class="material-icons icon">search</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import filmPopup from "../../src/components/film-popup";

export default {
  name: "App",
  components: {
    filmPopup
  },
  data() {
    return {
      items: [],
      description: "",
      filmName: "",
      imgUrl: "",
      isInfoPopup: false,
      filmDate: "",
      genre: "",
      cinemas: "",
      trailerUrl: "",
      bookingUrl: ""
    };
  },
  async mounted() {
    const response = await axios.get("api/bucketListItems/");
    this.items = response.data;
  },
  methods: {

    async findItem(name) {
      const response = await axios.post("api/bucketListItems/" + name);
      if (response.data != {}) {
        this.items = [];
        response.data.forEach(film => {
          this.items.push(film);
        })
      } else {
        this.items.push("Film Not Found!")
      }
    },

    async actionGenre() {
      const response = await axios.post("api/bucketListItems/action");
      if (response.data != {}) {
        this.items = [];
        response.data.forEach(film => {
          this.items.push(film);
        })
      } else {
        this.items.push("Film Not Found!")
      }

    },
    async comedyGenre() {
      const response = await axios.post("api/bucketListItems/comedy");
      if (response.data != {}) {
        this.items = [];
        response.data.forEach(film => {
          this.items.push(film);
        })
      } else {
        this.items.push("Film Not Found!")
      }
    },
    async crimeGenre() {
      const response = await axios.post("api/bucketListItems/crime");
      if (response.data != {}) {
        this.items = [];
        response.data.forEach(film => {
          this.items.push(film);
        })
      } else {
        this.items.push("Film Not Found!")
      }
    },
    async familyGenre() {
      const response = await axios.post("api/bucketListItems/family");
      if (response.data !== {}) {
        this.items = [];
        response.data.forEach(film => {
          this.items.push(film);
        })
      } else {
        this.items.push("Film Not Found!")
      }
    },

    showInfo(item) {
      this.filmName = item.name;
      this.description = item.description;
      this.imgUrl = item.imgUrl;
      this.filmDate = item.filmDate + ", " + item.genre;
      this.cinemas = "Available in " + item.cinemas;
      this.isInfoPopup = true;
      this.trailerUrl = item.trailerUrl;
      this.bookingUrl = item.bookingUrl;
    },

    closePopupInfo() {
      this.isInfoPopup = false;
      this.filmName = null;
    },
  }
};
</script>

<style lang="scss">
#app {
  margin: auto;
  margin-top: 3rem;
  max-width: 700px;
  background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(57, 57, 113, 1) 78%, rgba(101, 157, 189, 1) 100%);
}

.h1 {
  color: white;
  font-weight: bold;
}

html {
  background: black;
}

body {
  background-image: url("https://www.penbaypilot.com/sites/default/files/2020/03/field/image/MaineMovies200%2Bpreviewsm.png");
  background-size: auto;
}

.h1hr {
  border: 2px dotted darkviolet;
  color: darkviolet;
  background: black;
}

.popup-hr {
  border: 1px solid #20678c;
  width: 100%;
  z-index: 10;
  size: 5px;
  background-color: #20678c;
}

.icon {
  cursor: pointer;
}

.filmText {
  display: flex;
  flex-direction: column;
  vertical-align: top;
  align-items: center;
  height: 376px;
}

.notification {
  background: #659DBD;
  box-shadow: 2px 4px #282822;
}

.material-icons {
  font-size: larger;
  font-weight: bold;
  color: #dcdcdc;
}

.filmImg {
  box-shadow: 2px 4px;

  &__popup {
    z-index: 11;
  }
}

.filmName {
  font-weight: bolder;
  font-size: x-large;
  padding-left: 10px;
  color: #FBEEC1;
  text-align: left;
  vertical-align: top;
}

.filmDesc {
  font-size: large;
  font-weight: normal;
  padding-left: 10px;
  color: #FBEEC1;

  &__popup {
    font-size: medium;
    font-weight: normal;
    padding-left: 10px;
    color: #FBEEC1;
  }
}

.filmDate {
  font-size: large;
  font-weight: normal;
  padding-left: 10px;
  color: #818061;

  &__popup {
    font-size: medium;
    font-weight: normal;
    padding-left: 10px;
    color: #FBEEC1;
    text-align: right;
    width: 100%;
    height: 100%;
  }

  .btn-group button {
    background-color: #04AA6D; /* Green background */
    border: 1px solid green; /* Green border */
    color: white; /* White text */
    padding: 10px 24px; /* Some padding */
    cursor: pointer; /* Pointer/hand icon */
    float: left; /* Float the buttons side by side */
    height: 300px;
  }

  .btn-group:after {
    content: "";
    clear: both;
    display: table;
  }

  .btn-group button:not(:last-child) {
    border-right: none;
  }

  .btn-group button:hover {
    background-color: #3e8e41;
  }

}

</style>
