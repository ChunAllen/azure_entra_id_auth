<template>
  <div v-if="userProfile">
    <h1>Welcome to Dashboard</h1>
    <p>Name: {{ userProfile.name }}</p>
    <p>Email: {{ userProfile.username }}</p>
    <p>Account ID: {{ userProfile.id }}</p>
     <button @click="logout">Logout</button>
  </div>
  <div v-else>
    <h1>User not found</h1>
  </div>
</template>

<script>
import { useCookie } from "#app";

export default {
  name: "Dashboard",
  data() {
    return {
      userProfile: null,
    }
  },
  created() {
    try {
      const userProfileCookie = useCookie("user_profile");
      
      if (userProfileCookie.value) {
        // Ensure it's correctly parsed
        this.userProfile = typeof userProfileCookie.value === "string"
          ? JSON.parse(userProfileCookie.value)
          : userProfileCookie.value; // In case it's already an object

        console.log("User profile from cookie:", this.userProfile);
      }
    } catch (error) {
      console.error("Error reading cookie:", error);
    }
  },
  methods: {
    logout() {
      const userProfileCookie = useCookie("user_profile");
      userProfileCookie.value = null; // Clear cookie
      navigateTo("/"); // Redirect
    }
  }
};
</script>
