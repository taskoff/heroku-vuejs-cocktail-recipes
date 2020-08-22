<template>
  <div class="register-form-view">
    <div class="loader-container" :class="{show: isLoading}">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
    <div class="">
      <h2>Register</h2>
    </div>
    <div class="form-container">
          <form class="reg-form" @submit.prevent="regHandler">
    <div class="form-label-input">
      <label for="email">Email</label>
      <input type="text" id="email" name="email" v-model="email" @blur="$v.email.$touch" placeholder="Email" >
      <template v-if="$v.email.$error">
          <div class="error-input" v-if="!$v.email.required">the email is reqired</div>
          <div class="error-input" v-else-if="!$v.email.email">the email is invalid</div>
      </template>
    </div>
 
    <div class="form-label-input">
      <label for="inputUsername">Username</label>
      <input type="text" id="inputUsername" name="username" v-model="username" @blur="$v.username.$touch" placeholder="Username" >
      <template v-if="$v.username.$error">
          <div class="error-input" v-if="!$v.username.required">the username is reqired</div>
          <div class="error-input" v-else-if="!$v.username.minLength">the username must by min 3 symbols</div>
      </template>
    </div>

    <div class="form-label-input">
      <label for="inputPassword">Password</label>
      <input type="password" id="inputPassword" name="password" v-model="password" @blur="$v.password.$touch" placeholder="Password" >
       <template v-if="$v.password.$error">
          <div class="error-input" v-if="!$v.password.required">the Password is required</div>
          <div class="error-input" v-else-if="!$v.password.minLength">the password must by min 6 symbols</div>
          <div class="error-input" v-else>password must contain only letters end numbers</div>
      </template>
    </div>

    <div class="form-label-input">
       <label for="inputRePassword">Re-Password</label>
      <input type="password" id="inputRePassword" name="rePassword" v-model="rePassword" @blur="$v.rePassword.$touch" placeholder="Re-Password">
       <template v-if="$v.rePassword.$error">
          <div class="error-input" v-if="!$v.rePassword.sameAs">the password not match</div>
      </template>
    </div>
    <div class="reg-btn-container">
         <button type="submit" class="regBtn">Sign Up</button>
    </div>
   

    <div >
      <p class="alreadyUser"> Already have account? Then just
        <router-link to="/login">Sign-In</router-link>!
      </p>
    </div>

  </form>
    </div>

  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {required, email, minLength, sameAs, helpers} from 'vuelidate/lib/validators';
import requester from '../../mixins/requester2';
import service from '../../mixins/test.js';
const passwordCheck = helpers.regex('passwordCheck',/^[a-zA-Z0-9]+$/)
export default {
  mixins: [validationMixin, requester],
  data() {
    return {
      email: '',
      username: '',
      password: '',
      rePassword: '',
      isAuth: null,
      isLoading: false
    }
  },
  validations: {
    email: {required, email},
    username: {required, minLength: minLength(3)},
    password: {required, minLength: minLength(6), passwordCheck},
    rePassword: {sameAs: sameAs('password')}
  },
  methods: {
    regHandler() {
      
       if(this.$v.$invalid) {
         this.$v.$touch()
                return
            }
      const username = this.username;
      const password = this.password;
      const email = this.email;
      
      this.isLoading = true;
      this.post('user','',{username, password, email}, 'Basic')
      .then(e=> {if (!e.ok) {
                console.log(e);
                if (e.status === 409) {
                  alert('This user exist!');
                } else {
                   this.$router.push('*');
                }
               
                throw new Error(e.statusText);
            }
            return e;})
       .then(this.serializeData)
      .then(d=>{
        this.$emit('isAuth', true);
        this.addSessonStorageUserInfo(d);
        service.isLogin = true;
        this.$router.push({path: 'List'});
        })
      .finally(()=>{
          this.isLoading = false
          this.email = '';
          this.username = '';
          this.password = '';
          this.rePassword = '';})
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
.form-container {
  width: 50%;
  margin: auto;
  background-color: rgba(255,204,153, 0.6);
  padding: 40px 30px;
  text-align: right;
  padding-right: 150px;
  border-radius: 5px;
  box-shadow: 0 0 5px black;
}
.form-container form {
  /* text-align: right; */

}
.form-label-input {
  padding: 10px;
}

form input {
  line-height: 2em;
    min-width: 60%;
    
}

form label {
  font-size: 1.3em;
  padding-right: 10px;
}
.reg-btn-container {
  /* text-align: center; */
  padding: 20px 10px;
}
.regBtn {
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.regBtn:hover {
  box-shadow: 0 0 5px black;
}
.error-input {
  font-family: Georgia, 'Times New Roman', Times, serif;
  font-style: italic;
}

.loader-container {
  position: absolute;
  top: 65%;
  left: 50%;
  display: none;
  color: grey;
}
/* .lds-ring div {
  border-color: grey;
} */
.show {
  display: block;
}

@media (max-width: 600px) {
  .form-container {
    width: 90%;
    padding-right: 20px;

  }
  .form-container input {
    min-width: 80%;
  }
  form div {
    text-align: center;
  }
}


</style>