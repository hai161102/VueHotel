<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <h1>Hotel Manager</h1>
  </header>

  <nav>
    <!-- Add navigation links as needed -->
    <ul>
      <li><router-link :to="{name: 'home'}">Home</router-link></li>
      <li><router-link :to="{name: 'home'}">Rooms</router-link></li>
      <li><router-link :to="{name: 'home'}">Reservations</router-link></li>
      <li><router-link :to="{name: 'home'}">Guests</router-link></li>
      <!-- Add more navigation links based on your requirements -->
    </ul>
  </nav>

  <main>
    <RouterView />
  </main>
  <footer>
    <p>&copy; 2024 Hotel Manager. All rights reserved.</p>
  </footer>
</template>

<style lang="css">
#app {
  width: 100%;
  font-weight: normal;
  display: flex;
  flex-direction: column;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: #2fc900;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

header {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
}

/* Basic styling for the navigation menu */
nav {
  background-color: #eee;
  padding: 0.5rem;
}

ul {
  list-style-type: none;
  display: flex;
  justify-content: center;
}

li {
  margin: 0 1rem;
}

a {
  text-decoration: none;
  color: #333;
  font-weight: bold;
}

a:hover {
  color: #555;
}

/* Styling for the main content area */
main {
  flex: 1;
  /* This pushes the footer to the bottom */
  padding: 2rem;
}

/* Styling for the footer */
footer {
  text-align: center;
  padding: 1rem;
  background-color: #333;
  color: #fff;
}
</style>
