<script setup lang="ts">
import highlightjs from 'highlight.js';
import debounce from 'lodash/debounce';
import { marked } from 'marked';
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { TimelinePost } from '../posts';
import { usePosts } from '../stores/posts';

const props = defineProps<{
    post: TimelinePost
}>()

const title = ref(props.post.title)

const content = ref(props.post.markdown)

const contentEditable = ref<HTMLDivElement>()

const html = ref('')

const posts = usePosts()

const router = useRouter()

function parseHtml (markdown: string) {
    marked.parse(markdown, {
        gfm: true,
        breaks: true,
        highlight: (code) => {
            return highlightjs.highlightAuto(code).value
        }
    }, (err, parseResult) => {
        html.value = parseResult
    })
}

watch(content, debounce((newContent) => {
        parseHtml(newContent)
    }, 500), 
    {
        immediate: true
    }
)

onMounted(() => {
    if (!contentEditable.value) throw Error('contentEditable is unudifince')
    contentEditable.value.innerText = content.value
})


function handleInput() {
    if (!contentEditable.value) throw Error('contentEditable is unudifince')
    content.value = contentEditable.value?.innerText
}

async function handleClick() {
    const newPost: TimelinePost = {
        ...props.post,
        title: title.value,
        markdown: content.value,
        html: html.value
    }

    console.log(11111);
    

    await posts.createPost(newPost)

    router.push('/')
}
</script>
<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input" v-model="title">
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div class="box" contenteditable ref="contentEditable" @input="handleInput()"></div>
        </div>
        <div class="column">
            <div v-html="html"></div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <button class="button is-primary is-pulled-right" @click="handleClick()">Save Post</button>
        </div>
    </div>
</template>