<template>
    <div class="list-vew-container">
        <h2>All Recipes</h2>
        <div class="loader-container" :class="{show: isLoading}">
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
        <div class="all-recipes-container">
            <div class="recipe-container" v-for="r in recipes" :key="r._id">
                <div class="img-container">
                    <img  :src="r.imageUrl" alt="Img">
                </div>
                <div class="recipe-title">
                    <h3>{{r.name}}</h3>
                </div>
                <div class="details-btn-container">
                    <router-link :to="r | editLink">Details</router-link>
                </div>
            </div>
        
        </div>
       
    </div>
  

</template>

<script>
import requester from '../../mixins/requester2' 

export default {
name: 'List',
mixins: [requester],

data() {
    return {
        imageUrl: '',
        name: '',
        recipes: null,
        isLoading: false
    }
},
created() {
    this.getList()
},
methods: {
    getList() {
        this.isLoading = true;
        this.get('appdata', 'recipes', 'Kinvey')
       .then(this.serializeData)
       .then(d=>{
             this.recipes = d;
         }).finally(()=>{this.isLoading = false})
    }
},
filters: {
    editLink(r) {
        return `/details/${r._id}`
    }
}

}
</script>

<style scoped>
@import '../../shared-css/loader.css';

h2 {
    text-align: center;
    font-size: 3em;
    margin: 50px 0;
}
/* .all-recipes-container {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
} */
.all-recipes-container {
    display: grid;
    grid-template-columns: repeat(4, auto);
}
.recipe-container {
    /* max-width: 25%; */
    background-color: rgba(192,192,192, 0.8);
    padding: 20px 20px;
    border-radius: 5px;
    text-align: center;
    box-shadow: 0 0 5px black;
    margin: 8px 10px;
}
.recipe-container:hover {
    /* background-color: rgba(192,192,192, 1); */
    box-shadow: 0 0 10px black;

}
.img-container {
position: relative;
/* min-width: 290px; */

overflow: hidden;
border-radius: 5px;
    
}

.img-container::before {
    display: block;
    content: '';
    padding-top: 70%;
   
   
}
.img-container img {
    width: 80%;
    height: auto;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* opacity: 0; */
}
.recipe-title {
    padding: 20px 0;
}
.details-btn-container a {
    text-decoration: none;
    padding: 5px 30px;
    /* background-color: grey; */
    background-color: rgba(255,204,153, 1);
    /* border: 1px solid black; */
    border-radius: 2px;
    box-shadow: 0 0 2px black;
    /* color: rgba(102,0,255, 1); */
}
.details-btn-container a:hover {
    background-color: rgba(255,128,0, 1);
}
.loader-container {
  position: absolute;
  top: 50%;
  left: 50%;
  display: none;
}
.show {
  display: block;
}

@media (max-width: 600px) {
   .all-recipes-container {
       display: block;
   } 
}

</style>>

