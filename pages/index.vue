<template>
  <div>
    <h1>Welcome to the application</h1>
    <button @click="login">Login with Microsoft Entra ID</button>
  </div>
</template>

<script>
export default {
  name: "index",
  middleware: [], // Don't apply the auth middleware to the login page
  methods: {
    login() {
      window.location.href = '/api/auth/login';
    }
  }
};
</script>

<style scoped>
/* Add your custom styles for the button */
button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
