<template>
<div class="site-content">
 <div class="start-page-container">
     <p class="start-message">You can see all cocktail recipes</p>
     <div class="arrow-container">
          <p class="arrow">&#8681;</p>
     </div>
    
     <div class="start-button">
         <router-link to="/list">HERE</router-link>
     </div>
    
 </div>
 
</div>
 
</template>

<script>
export default {
    name: 'Home',
        
}
</script>

<style scoped>
.site-content {
    display: flex;
    justify-content: center;
}

.start-page-container {
    text-align: center;
    padding-top: 70px;
    /* position: relative; */
}
.start-message {
    font-size: 3.5em;
    font-weight: bold;
    text-shadow: 3px 1px black;
    color: rgba(128, 125, 128, 1);
    /* color: grey; */
}
.start-button {
    margin-top: 100px;
}
.start-button a {
    display: block;
    color: white;;
    text-decoration: none;
    font-size: 1.5em;
    font-weight: bold;
    max-width: 40%;
    margin: auto;
    background-color: rgba(128, 125, 128, 0.8);
    box-shadow: 3px 3px black;
    border-radius: 5px;
    padding: 20px 0;
}
.start-button a:hover {
    background-color: rgba(255,128,0, 0.8);
    /* color: black; */
    box-shadow: 5px 5px black;
}
.arrow-container {
    position: relative;
}
.arrow {
    color: rgba(128, 128, 128, 1);
    text-shadow: 3px 3px black;
    font-size: 5em;
     animation: arrow 1s infinite 0.5s ease-in-out;
    
}
@keyframes arrow {
    0% {
      transform: translateY(0);
      
    }
   
    100% {
       transform: translateY(70px);
    } 
}


</style>