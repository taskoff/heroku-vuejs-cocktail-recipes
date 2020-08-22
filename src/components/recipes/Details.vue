<template>
    <div>
        <h2>Details</h2>
        <div class="recipe-details-container">
            <div class="img-container">
                <img :src="imageUrl" :alt="name">
            </div>
            <h3 class="recipe-title">{{name}}</h3>
            <div class="recipe">
                <h3>Ingredients:</h3>
                <ul class="ingredients">
                    <li v-for="(i, idx) in ingredients" :key="idx">{{i}}</li>
                </ul>
                <h3>Methods:</h3>
                <p class="methods">
                {{methods}}
                </p>

            </div>
            <div class="profile-button-container" :class="{hiden: !isAuthor}">
                <p>If you want to edit or remove recipe <router-link to="/profile" class="go-profile-btn" >Go to Profile</router-link> </p>
            </div>

        </div>
    </div>
</template>

<script>
import requester from '../../mixins/requester2' 

export default {
    mixins: [requester],
    data() {
        return {
            imageUrl: '',
            name: '',
            ingredients: [],
            methods: '',
            authorId: ''
        }
    },
    created() {
        this.getRecipeDetails()
    },
    methods: {
        getRecipeDetails() {
            const id = this.$route.params.id;
            this.get('appdata', `recipes/${id}`, 'Kinvey')
            .then(this.serializeData)
            .then(d=>{
               this.imageUrl = d.imageUrl;
               this.name = d.name;
               this.ingredients = d.ingredients;
               this.methods = d.methods;
               this.authorId = d._acl.creator;
            })
        },
        
    },
    computed: {
        isAuthor: function() {return this.authorId === sessionStorage.getItem('userId')}
    }
}
</script>

<style scoped>
h2 {
    text-align: center;
    font-size: 3em;
    margin: 50px 0;
}
h3.recipe-title {
    text-align: center;
    margin: 20px 0;
}
.recipe-details-container {
    max-width: 60%;
    margin: auto;
    background-color: rgba(192,192,192, 0.8);
    /* text-align: center; */
    padding: 20px 10px;
    border-radius: 5px;
}
.img-container {
position: relative;
max-width: 60%;
margin: auto;
overflow: hidden;
border-radius: 5px;
    
}

.img-container::before {
    display: block;
    content: '';
    padding-top: 80%;
   
   
}
.img-container img {
    
    width: 100%;
    height: auto;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* opacity: 0; */
}

ul.ingredients {
    padding: 10px;
    list-style-position: inside;
}
.profile-button-container {
    padding: 20px 0;
    text-align: center;
}
.go-profile-btn {
    padding: 5px 10px;
    background-color: rgba(255,204,153, 1);
    border: none;
    box-shadow: 0 0 5px black;
    cursor: pointer;
    text-decoration: none;
    color: black;
}
.hiden {
    display: none;
}

@media (max-width: 600px) {
    .recipe-details-container {
        max-width: 90%;
    }
}
</style>