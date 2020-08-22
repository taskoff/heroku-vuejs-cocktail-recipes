<template>
  <div class="profile-view">
      <h2>Profile</h2>

        <div class="user-info-container">
            <div class="img-container">
                <img src="https://i.ibb.co/ChgXx2p/user.png" alt="user_img">
            </div>

            <div class="user-info">
                <p class="user-name">Username: <span class="username">{{username}}</span></p>
                <p class="user-email">Email:<span class="email">{{email}}</span></p>
            </div>
            <h3>My recipes:</h3>
            <div class="recipes" >
                <template v-if="recipes">
                <ul>
                    <li v-for="r in recipes" :key="r._id">{{r.name}} <button :class="{hiden: !showBtn}" @click="editRecipe(r)">Edit</button> <button :class="{hiden: !showBtn}" @click="deleteRecipe(r)">Delete</button> </li>
                </ul>
                </template>
                <template v-else>
                    <p>Loading....</p>
                </template>
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
            username: sessionStorage.getItem('username'),
            email: sessionStorage.getItem('email'),
            recipes: null,
            showBtn: true
        }
    },
    created() {
        this.getRecipes()
    },
    methods: {
        getRecipes() {
            this.get('appdata', `recipes?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`, 'Kinvey')
                    .then(this.serializeData)
                    .then(d=>{
                    if (d.length>0) {
                        this.recipes = d;
                    } else {
                        this.showBtn = false;
                        this.recipes = [{name:'There is no recipes'}]
                    }
                    })
        },
        editRecipe(r) {
            this.$router.push(`edit/${r._id}`);
        },
        deleteRecipe(r) {
            this.del('appdata', `recipes/${r._id}`, 'Kinvey').then(d=>{
                console.log(d);
                this.getRecipes()})
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
img {
    width: 150px;
    height: auto;
}

.user-info-container {
    width: 50%;
  margin: auto;
  background-color: rgba(255,204,153, 0.6);
  padding: 40px 30px;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 0 5px black;
  font-size: 1.5em;
}
.user-info {
    text-align: left;
    padding: 20px 20px;
}
.user-info p {
    padding: 10px 0;
}
.email,
.username {
    margin-left: 10px;
    font-weight: 500;
    font-family: Georgia, 'Times New Roman', Times, serif;
   
}
.recipes {
    text-align: left;
    padding: 10px 30px;
    
}
.recipes ul li button {
    padding: 5px 20px;
     border-radius: 2px;
    cursor: pointer;
    margin-left: 10px;
    border: none;
    box-shadow: 0 0 2px black;
}
.recipes ul li button:hover {
    background-color: rgba(255,128,0, 0.8);
    border: none;
}
.recipes ul li {
    margin-bottom: 10px;
}
.hiden {
    display: none;
}

@media (max-width: 600px) {
    .user-info-container {
        width: 90%;
    }
}
</style>