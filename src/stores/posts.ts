import { defineStore } from 'pinia'
import {Post, today, thisWeek, thisMonth, TimelinePost} from '../posts'
import { Period } from '../constants'
import { DateTime } from 'luxon'
// ref number, string
// computed
// reactive {}, Map, Set

interface PostsState {
    ids: string[];
    all: Map<string, Post>;
    selectedPeriod: Period
}

function delay() {
    return new Promise<void> (res => setTimeout(res, 1000))
}

export const usePosts = defineStore('posts', {
    state: (): PostsState => ({
        ids: [today.id, thisWeek.id, thisMonth.id],
        all: new Map([
            [today.id, today],
            [thisWeek.id, thisWeek],
            [thisMonth.id, thisMonth]
        ]),
        selectedPeriod: 'Today'
    }),

    actions: {
        setSelectedPeriod (period: Period) {
            this.selectedPeriod = period
        },

        async fetchPosts() {
            const res = await window.fetch('http://localhost:8000/posts')
            const data = (await res.json()) as Post[]
            await delay()

            let ids: string[] = []
            let all = new Map<string, Post>()
            for (const post of data) {
                ids.push(post.id)
                all.set(post.id, post)
            }

            this.ids = ids
            this.all = all
        }
    },

    getters: {
        filteredPosts: (state): TimelinePost[] => {
            return state.ids
            .map(id => {
                const post = state.all.get(id)
        
                if(!post) {
                    throw 'Parameter is not a number!'
                }
        
                return {
                    ...post,
                    created: DateTime.fromISO(post.created)
                }
            })
            .filter(post => {
                if ( state.selectedPeriod === 'Today') {
                    return post.created >= DateTime.now().minus({day: 1})
                }
        
                if (state.selectedPeriod === 'This Week') {
                    return post.created >= DateTime.now().minus({week: 1})
                }
                return post
            })
        }
    }
})
