<!-- <template>
  <div class="section" data-theme="synthwave">
    <div class="flex h-screen">
      <div class="hero min-h-screen bg-base-200">
        <div class="hero-content flex-col lg:flex-row">
          <img
            src="./assets/002.png"
            class="max-w-sm rounded-lg shadow-2xl"
          />
          <div class="artboard artboard-horizontal phone-3" >
            <h1 class="text-7xl base-content">About me</h1>
            <p class="text-xl font-base-300">
              ชื่อ ยุรนันท์ จันทร์คำ
            </p>
            <p class="text-xl font-base-300">
              ชั้นปีที่: 4
            </p>
            <p class="text-xl font-base-300">
              เพศ: ชาย
            </p>
            <p class="text-xl font-base-300">
              คณะ: ENGT/วิศวกรรมศาสตร์และเทคโนโลยี(Engineering and Technology)
            </p>
            <p class="text-xl font-base-300">
              ภาควิชา: ITEC/เทคโนโลยีสารสนเทศ(Information Technology)
            </p>
            <p class="text-xl font-base-300">
              งานอดิเรก: เล่นเกม ฟังเพลง นอน
            </p>
            <button class="btn btn-primary">Get Started</button> -->
          <!-- </div>
        </div>
      </div>
    </div>
  </div>
  <div class="section" data-theme="valentine">
    <div class="flex h-screen">
      <div class="m-auto">
        
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.section {
  height: 100vh;
}
</style> -->
<!-- <template>
  <div class="container p-3 my-3 border">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product._id">
          <td>{{ product._id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
let products = ref()
onMounted(async () => {
  products.value = await getAllProduct();
  console.log(products);
})

const getAllProduct = async () => {
  let data = [];
  await axios.get('http://localhost:5000/getallproduct').then((response) => {
    data = response.data;
  });
  return data;
}

</script>

<style scoped></style> -->
<template>
  <header>
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li v-for="menu in menuList" :key="menu.name"><RouterLink :to="menu.path" >{{ menu.name }}</RouterLink></li>
          </ul>
        </div>
        <a class="btn btn-ghost normal-case text-xl">daisyUI</a>
      </div>
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1">
          <li v-for="menu in menuList" :key="menu.name"><RouterLink :to="menu.path">{{ menu.name }}</RouterLink></li>
          
        </ul>
      </div>
      <!-- <div class="navbar-end">
        <a class="btn">Button</a>
      </div> -->
    </div>
  </header>
  <div class="container mx-auto">
    <!-- <RouterView/> -->
    <RouterView :key ="router.currentRoute.value.name"/> 
  </div>
</template>

<script setup>
import { RouterView, RouterLink ,useRouter } from 'vue-router';
const router = useRouter()
const menuList = [
  { path:"/", name: "home"},
  { path:"/create", name: "Create"},
  {path: "/chat", name: "Chat"}
]


</script>

<style scoped>

</style>

