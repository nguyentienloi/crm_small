<template>
<div class="container-fluid body_login">
<section id="login" v-bind:class="isShake" style="margin-top:10%;">
<div>
	<form>
		<h2>CRM SMALL</h2>
		<div class="info" v-bind:class="good">
			<p>{{ alert.message }}</p>
		</div>
		<span>Tài khoản:</span>
		<input type="text" v-model="account.login" placeholder="Tài khoản" />
		<span>Mật khẩu:</span>
		<input type="password" v-model="account.password" placeholder="Mật khẩu" />
		<button v-on:click="onSubmit">Đăng nhập</button>
	</form>
</div>
</section>
</div>
</template>
<style>
</style>
<script>
export default {
  name: 'login',
  data() {
      return {
        alert: {
			message: ""
		},
		account: {
			login: "",
			password: ""
		},
		shake: false,
		good: ""
    };
	},
	computed: {
		isShake: function(){
			console.log(this.shake);
			if(this.shake == false){
				return 'shake'
			}
			return 'none'
		}
	},
	methods: {
		onSubmit: function(event) {
			if(this.account.login == "123" && this.account.password == "123"){
				localStorage.setItem('token_user', 'jrP3DgFuYGhy8MD3a25Q0SpfjxGAhCYXFysz2u6B');
				setTimeout(function(){localStorage.removeItem('token_user');}, 9 * 120 * 1000);
				this.$router.push({ name: 'listContact' });
			} else {
				this.alert.message = "Đăng nhập thất bại, vui lòng đăng nhập lại.";
			}
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* html, body{
	width:100%;
	height:100%;
	margin:0px;
	font-family: 'Work Sans', sans-serif;
} */

/* body{
    background-image:url('https://img3.thuthuatphanmem.vn/uploads/2019/10/01/anh-background-phong-canh-dep_103234072.jpg');
    background-size: cover;
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color: #fff;
} */
.body_login {
  widows: 100%;
  height:100%;
  background-size: cover;
  display: flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  color: #fff;
}
section{
	background-color: rgba(0, 0, 0, 0.72);
	display:flex;
	flex-direction:column;
	margin-left:auto;
	margin-right:auto;
}

#login {
	width: 25%;
}

form{
	display:flex;
	flex-direction:column;
	padding: 15px; 
}
h2{
	font-family: 'Archivo Black', sans-serif;
	color:#e0dada;
	margin-left:auto;
	margin-right:auto;
}

.info{
	width:100%;
	padding: 1em 5px;
	text-align:center;
	min-height:45px;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
}

.info.error{
	border: 1px solid red;
	background-color: #ff3c41;
	color:red;
}
.info p{
	margin:auto;
	padding:5px;
}
.info.good{
	border:1px solid #416d50;
	background-color: #47cf73;
	color:#416d50;
}

input{
	height:35px;
	padding: 5px 5px;
	margin: 10px 0px;
	background-color:#e0dada;
	border:none;
}
button{
	height:40px;
	padding: 5px 5px;
	margin: 10px 0px;
	font-weight:bold;
	background-color:#be5256;
	border:none;
	color:#e0dada;
	cursor:pointer;
	font-size:16px;
}
button:hover{
	background-color:#711f1b;
}

@-webkit-keyframes shake{
	from, to{
		-webkit-transform: translate3d(0, 0, 0);
		transform:translate3d(0,0,0);
	}
	10%,30%,50%,70%,90%{
		-webkit-transform: translate3d(-10px, 0, 0);
		transform:translate3d(-10px,0,0);
	}
	20%,40%,60%,80%{
		-webkit-transform: translate3d(10px, 0, 0);
		transform:translate(10px,0,0);
	}
}

.shake{
	animation-name: shake;
	animation-duration:1s;
	/*animation-fill-mode: both;*/
}

@media screen and (max-width: 780px) {
	section{
		width:90%;
	}
}
.menu_item {
	display: none;
}
</style>
