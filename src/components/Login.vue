<template>
<div class="login-box">
  <div class="login-logo">
    <a href="/">登入管理後台</a>
  </div>
  <!-- /.login-logo -->
  <div class="login-box-body">
    <p class="login-box-msg">請輸入帳號及密碼</p>
    <form method="post">
      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="信箱" v-model="email">
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="密碼" v-model="password">
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="button" class="btn btn-primary btn-block btn-flat" @click="signin()">登入</button>
        </div>
        <!-- /.col -->
      </div>
    </form>
    <!-- /.social-auth-links -->
  </div>
  <!-- /.login-box-body -->
</div>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      postResults: [],
      email: '',
      password: ''
    }
  },
  mounted: function () {
    // console.log(this.$store.state.userName)
  },
  methods: {
    signin: function () {
      let email = this.email
      let password = this.password
      let apiurl = this.$store.state.apiurl

      this.$http.post(apiurl + '/adminAuthenticate', {
        email: email,
        password: password
      }).then(function (res) {
        console.log(res.body)
        // store.dispatch('SET_NAME', res.body.name)
        // store.dispatch('SET_TOKEN', res.body.token)
        let data = {
          userId: res.body.id,
          userName: res.body.name,
          userEmail: res.body.email,
          token: res.body.token
        }
        // console.log(data)
        this.$store.dispatch('LOGIN', data)

        this.$router.push('/Dashboard')
      }, function () {
        console.log('failed')
      })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
