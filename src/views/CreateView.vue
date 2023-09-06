<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios';
import { useRouter } from 'vue-router'
let name = ref(''), price = ref(0), routerName = ref(''), _id = ref(''), btn = ref('Create');
const router = useRouter()
const API_PATH = import.meta.env.VITE_API_PATH;
onMounted(() => {
    routerName.value = router.currentRoute.value.name;
    _id.value = router.currentRoute.value.params?.id;
    console.log("routerName", routerName.value);
    console.log("_id", _id.value);
    if (routerName.value == "edit") {
        btn.value = "Update";
        initEdit();
    }
});
const initEdit = async () => {
    const { data } = await axios.get(`${API_PATH}/getproduct/${_id.value}`);
    console.log(data);
    name.value = data.data.name;
    price.value = data.data.price;
}
const submit = async () => {
    const req = {
        name:name.value, price:price.value
    };
    if (routerName.value == "create") {
        await axios.post(
            `${API_PATH}/create`,
            req
        ).then((response) => {
            name.value = '';
            price.value = '';          
        });
    } else if (routerName.value == "edit") {
        await axios.post(
            `${API_PATH}/update/${_id.value}`,
            req
        ).then((response) => {
            router.push({name : 'home', replace: true});
            alert(response.status);
        });
    }
   
}

</script>

<template >
    <div class="flex flex-col w-full">
        <div class="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
            <input type="text" placeholder="name" class="input input-bordered w-full max-w-xs" v-model="name" />
            <input type="text" placeholder="price" class="input input-bordered w-full max-w-xs" v-model="price" />
            <button class="btn btn-success" v-on:click="submit()">{{ btn }}</button>

        </div>


    </div>
</template>

<style scoped></style>