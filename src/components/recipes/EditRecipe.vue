<template>
  <div>
      <h2>Edit Recipe</h2>
      <div class="add-container">
         <form @submit.prevent="submitHandler">
             <div class="img-input">
                 
                 <div class="img-container">
                    <img v-if="imageUrl" :src="imageUrl" alt="Img">
                </div>
                 <div>
                     <button v-if="!imageUrl" class="img-add-btn" @click="addImg">Add Image</button>
                     <button v-if="imageUrl" class="img-add-btn" @click="deleteImg">Delete Image</button>
                 </div>
             </div>
             <div class="form-label-input">
                 <div class="form-label">
                    <label for="name">Name:</label>
                 </div>
                 <div class="form-input">
                     <input type="text" v-model="name" id="name" placeholder="Name">
                 </div>
             </div>
             <!-- <div class="form-label-input">
                 <div class="form-label">
                    <label for="image-url">Image URL:</label>
                 </div>
                 <div class="form-input">
                     <input type="text" v-model="imageUrl" id="image-url" placeholder="https://....">
                 </div>
             </div> -->
            <div class="form-label-input ingredients">
                <div class="form-label">
                    <label for="add-ingredient">Ingredients and quantity:</label>
                </div>
                <div class="form-input">
                    <input type="text" v-model="ingredient" id="add-ingredient" >
                     <a @click="ingredientHandler" type="button" class="addBtn">&#10010;</a>
                </div>
           
            </div>
            <div class="ingredient-list">
                <ul>
                <li v-for="(ing, i) in ingredients" :key="i">{{ing}} <a @click="deleteIngredient(i)" class="deleteBtn">&#9866;</a></li>
                </ul>
            </div>
            <div class="form-label-input">
                 <div class="form-label">
                    <label for="methods">Methods:</label>
                 </div>
                 <div class="form-textarea">
                     <textarea type="text" v-model="methods" id="methods" ></textarea>
                 </div>
            <template v-if="$v.$error">
                <div class="error-input" v-if="!$v.name.required">the name is required</div>
                <div class="error-input" v-if="!$v.imageUrl.required">the image URL is required</div>
                <div class="error-input" v-if="!$v.methods.required">the methods are required</div>
            </template>
            <div class="error-input" :class="{hiden: noIngredients, show: !noIngredients}" >ingredients are required</div>
             </div>
            <input type="submit" value="Edit Recipe" class="addRecipeBtn">
        </form>
            
      </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {required} from 'vuelidate/lib/validators';
import requester from '../../mixins/requester2';
import addImage from '../../mixins/add-image';


export default {
    mixins: [validationMixin, requester, addImage],
    data() {
        return {
            name: '',
            ingredient: '',
            ingredients:[],
            imageUrl:'',
            methods: '',
            noIngredients: true
        }
    },
    
    validations: {
        name: {required},
        imageUrl: { required },
        methods: { required },
    },
    created() {
        this.loadRecipe()
    },
    methods: {
        ingredientHandler() {
            if (this.ingredient) {
                this.ingredients.push(this.ingredient);
                this.noIngredients = true;
            }
            
            this.ingredient = '';
        },
        deleteIngredient(i) {
            this.ingredients.splice(i, 1);
        },
        submitHandler() {
            this.noIngredients = this.ingredients.length === 0 ? false : true;
            this.$v.$touch()
            if(this.$v.$invalid || this.noIngredients === false) {
                return
            }
            const data = {
                name: this.name,
                imageUrl: this.imageUrl,
                ingredients: this.ingredients,
                methods: this.methods
            }
            let id = this.$route.params.id;
            
            this.put('appdata', `recipes/${id}`, data, 'Kinvey')
            .then(this.serializeData)
            .then(d=>{
                let id = d._id
                this.$router.push({ path: `/details/${id}` }) 
            }).finally(()=>{
                this.name ='';
                this.imageUrl = '';
                this.ingredients = [];
                this.methods = '';
            })


            
            
        },
        loadRecipe() {
            let id = this.$route.params.id
            this.get('appdata', `recipes/${id}`, 'Kinvey')
            .then(this.serializeData)
            .then(d=>{
                
            this.name = d.name;
            this.imageUrl = d.imageUrl;
            this.ingredients = d.ingredients;
            this.methods = d.methods;
            })
        },
        addImg(e) {
            this.uploadImage(e)
        },
        deleteImg(){
            this.imageUrl = '';
        }
        
    }
    
    
}
</script>

<style scoped>
h2 {
    text-align: center;
    font-size: 3em;
    margin: 50px 0;
}
.add-container {
    max-width: 50%;
    margin: auto;
    background-color: rgba(255,204,153, 0.6);
    padding: 20px;
    padding-left: 100px;
    border-radius: 5px;
    box-shadow: 0 0 5px black;
}

.form-label-input {
    padding: 10px 0;
    
}
form input {
    line-height: 2em;
    min-width: 60%;
    border-radius: 3px;
}
form textarea {
    border-radius: 3px;
    min-width: 60%;
    min-height: 7em;

}
form label,
form ul li {
    font-size: 1.5em;
}
form ul li {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-style: italic;
    font-size: 1em;
    list-style-position: inside;
}
.ingredient-list {
    min-height: 100px;
}
.addBtn,
.deleteBtn {
    padding: 2px 5px;
    margin-left: 5px;
    cursor: pointer;
    border: 1px solid black;
    border-radius: 2px;
     font-size: 1em;
    box-shadow: 1px 1px black;
}
.addBtn:hover,
.deleteBtn:hover {
    background-color: rgba(255,204,153, 1);
}
.deleteBtn {
     font-size: 1em;
     padding: 0 5px;
     /* margin-bottom: 2px; */
}

.hiden {
    display: none;
}
.show {
    display: block;
}
.error-input {
    font-style: italic;
}
.img-input {
    display: grid;
    grid-template-columns: 50% 50%;
}
.img-container {
    position: relative;
    max-width: 290px;
    overflow: hidden;
    border-radius: 5px;
}

.img-container::before {
    display: block;
    content: '';
    padding-top: 80%;
    background-color: white;
   
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
.img-add-btn {
    /* display: inline-block; */
    padding: 5px 10px;
    max-width: 70px;
}

@media(max-width: 600px) {
    .add-container {
        max-width: 90%;
        padding-left: 20px;
    }
    form input,
    textarea {
        min-width: 80%;
    }
}
</style>