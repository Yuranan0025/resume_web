<script setup>
import { onMounted, ref, watch, onUpdated } from 'vue';
import {
    app,
    auth,
    database,
    ref as refDb,
    set,
    push,
    onValue,
    remove,
    child,
    get
} from '../firebaseConfig'
// import { remove } from '@firebase/database';
let chat = ref("");
let histories = ref([]);
let historyKey = ref([]);
const studentId = "123456789";
const bottomEl = ref(null);
const db = refDb(database, 'all_chat/');

const onSend = () => {
    if (chat.value != '' && historyKey.value != '') {
        push(refDb(database, `all_chat/${historyKey.value}`), {
            "user": studentId,
            "message": chat.value,
            "dataTime": new Date().toISOString()
        });
        chat.value = "";
    }
}
onValue(db, (snapshot) => {
    const data = snapshot.val() ?? [];
    histories.value = data;
});
onUpdated(histories, (newHistories, oldHistories) => {
    bottomEl.value.scrollIntoview({ behavier: 'smooth' });
});

const onDeleteGroup = (data) => {
    remove(refDb(database, `all_chat/${data}`))
}

const selectGroup = (key) => {
    historyKey.value = key;
}
let groupChatName = ref("");
const createGroup = () => {
    if (groupChatName.value != '') {
        get(child(db, `${groupChatName.value}`)).then((snapshot) => {
            if (snapshot.exists()) {
                alert("Cannot Crate GroupChat")
            } else {
                push(refDb(database, `all_chat/${groupChatName.value}`), {
                    "user": studentId,
                    "message": '',
                    "dataTime": new Date().toISOString()
                });
                groupChatName.value = "";
            }

        }).catch((err) => {
            console.error(err);
        })



    }
}

</script>

<template>
    <div class="flex gap-4">
        <div class="bg-transparent h-[90vh] w-[30%]">
            <div class="overflow-y-scroll w-full h-[90%]">
                <div class="card card-side bg-base-100 shadow-xl w-full mb-4" style="cursor: pointer;"
                    v-for="(group, index) in histories" :key="index" data-theme="cupcake" @click="selectGroup(index)">
                    <div class="card-body">
                        <form method="dialog">
                            <button class="btn btn-circle btn-outline" @click="onDeleteGroup(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </form>

                        <h2 class="card-title">{{ index }}</h2>
                        <p>{{ group[Object.keys(group)[Object.keys(group).length - 1]]?.message }}</p>
                    </div>
                </div>
            </div>
            <div class="w-full h-[10%] pt-4">
                <button class="btn w-full h-full" data-theme="cupcake" onclick="my_modal_1.showModal()">Add Group</button>
                <dialog id="my_modal_1" class="modal">
                    <div class="modal-box">
                        <div class="from-control w-full">
                            <label class="label">
                                <span class="label-text">Group Name</span>
                            </label>
                            <input v-model="groupChatName" type="text" placeholder="type-here"
                                class="input input-bodred w-full" />
                        </div>
                        <div class="modal-action">
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn btn-success" @click="createGroup()">Save</button>
                                <button class="btn btn-error">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
        <div class="bg-transparent h-[90vh] w-[70%]">
            <div class="overflow-y-scroll h-[90%] p-5 card" data-theme="cupcake">
                <div v-for="(history, index) in histories[historyKey]"
                    :class="`chat ${history.user == studentId ? 'chat-end' : 'chat-start'}`" :key="index">
                    <div class="chat-header">
                        {{ history.user }}
                        <time class="text-xs opacity-50">{{ history.dataTime }}</time>
                    </div>
                    <div class="chat-bubble">{{ history.message }}</div>
                </div>
                <div ref="bottomEl"></div>
            </div>

            <div class="flex h-[10%] gap-4 ">
                <input v-on:keyup.enter="onSend" v-model="chat" type="text" placeholder="Type Message"
                    class="input input-bordered input-primary w-[80%]" />
                <button @click="onSend" class="btn btn-primary w-[20%]">Send</button>
            </div>
        </div>
    </div>
</template>
<style scoped></style>