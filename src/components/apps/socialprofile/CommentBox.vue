<script setup>
import {ref, shallowRef} from 'vue';
import {usePostsStore} from '@/stores/apps/posts';
import uniqueId from 'lodash/uniqueId';

// icons
import {MoreOutlined, LikeOutlined} from '@ant-design/icons-vue';

const store = usePostsStore();
const props = defineProps({
  comments: Object || Array,
  postId: String
});
const replyValue = ref('');
const items = shallowRef([{title: 'Edit'}, {title: 'Delete'}]);
const onSubmit = async (id, commentid, reply) => {
  const replyId = uniqueId('#REPLY_');
  const newReply = {
    id: replyId,
    profile: {
      id: uniqueId('#REPLY_'),
      avatar: props.comments?.profile.avatar,
      name: props.comments?.profile.name,
      time: 'now'
    },
    data: {
      comment: typeof reply === 'string' ? reply : (reply?.data?.comment ?? ''),
      likes: {
        like: false,
        value: 0
      },
      replies: []
    }
  };
  store.addReply(id, commentid, newReply);
  replyValue.value = '';
};
const showReplyBox = ref(false);
const toggleReplybox = () => {
  return (showReplyBox.value = !showReplyBox.value);
};
</script>

<template>
  <v-card variant="flat" elevation="0" class="bg-gray100 mb-3 pa-5">
    <div class="d-flex ga-4 align-center">
      <img :src="comments?.profile.avatar" width="30" alt="avatar" class="rounded-md" />
      <div class="d-block d-sm-flex align-center ga-4">
        <h5 class="text-subtitle-1 mb-0">{{ comments?.profile.name }}</h5>
        <span class="text-subtitle-2 opacity-50">
          <v-badge dot color="secondary" size="small" inline> </v-badge>
          {{ comments?.profile.time }}
        </span>
      </div>
      <v-menu>
        <template #activator="{props}">
          <v-btn icon size="small" variant="text" color="secondary" class="ms-auto" rounded v-bind="props"><MoreOutlined /></v-btn>
        </template>

        <v-list elevation="24" density="compact" class="py-0">
          <v-list-item v-for="(item, index) in items" :key="index" :value="index">
            <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div class="py-3 text-body-1">
      {{ comments?.data.comment }}
    </div>
    <!---Like and comment count-->
    <div class="my-1 d-flex ga-4">
      <v-btn color="primary" variant="text" size="small">
        <template #prepend>
          <LikeOutlined :style="{fontSize: '14px'}" />
        </template>
        {{ comments?.data && comments?.data.likes && comments?.data.likes.value }} Like
      </v-btn>
      <v-btn color="secondary" variant="text" size="small" prepend-icon="$reply" @click="toggleReplybox"> Reply </v-btn>
    </div>
  </v-card>

  <div v-if="comments?.data.replies" class="ms-10">
    <div v-for="reply in comments?.data.replies" :key="reply.name">
      <v-card variant="flat" elevation="0" class="bg-gray100 mb-3 pa-5">
        <div class="d-flex ga-4 align-center">
          <img :src="reply.profile.avatar" width="30" class="rounded-md" alt="avatar" />
          <div class="d-block d-sm-flex align-center ga-4">
            <h5 class="text-subtitle-1 mb-0">{{ reply.profile.name }}</h5>
            <span class="text-subtitle-2 opacity-50">
              <v-badge dot color="secondary" size="small" inline> </v-badge>
              {{ reply.profile.time }}
            </span>
          </div>
          <v-menu>
            <template #activator="{props}">
              <v-btn icon size="small" rounded variant="text" color="secondary" class="ms-auto" v-bind="props"><MoreOutlined /></v-btn>
            </template>

            <v-list elevation="24" density="compact" class="py-0">
              <v-list-item v-for="(item, index) in items" :key="index" :value="index">
                <v-list-item-title class="text-h6">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <div class="py-3 text-body-1">
          {{ reply.data.comment }}
        </div>
        <!---Like and comment count-->
        <div class="my-1 d-flex ga-4">
          <v-btn color="primary" variant="text" size="small">
            <template #prepend>
              <LikeOutlined :style="{fontSize: '14px'}" />
            </template>
            {{ reply.data && reply.data.likes && reply.data.likes.value }} Like
          </v-btn>
          <v-btn color="secondary" variant="text" size="small" prepend-icon="$reply" @click="toggleReplybox"> Reply </v-btn>
        </div>
      </v-card>
    </div>
  </div>
  <div class="d-block d-sm-flex ga-4 align-center mb-5 ms-10" v-if="showReplyBox">
    <img :src="comments?.profile.avatar" width="40" class="flex-shrink-0 d-none d-sm-block rounded-md" alt="avatar" />
    <v-text-field variant="outlined" single-line color="primary" v-model="replyValue" placeholder="Write Reply" hide-details></v-text-field>
    <v-btn
      color="secondary"
      class="mt-3 mt-sm-0"
      variant="flat"
      size="large"
      @click="postId && comments && comments.id && onSubmit(postId, comments.id, replyValue)"
    >
      Reply
    </v-btn>
  </div>
</template>
