import { AsyncComponentLoader, defineAsyncComponent, markRaw } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import MkLoading from '@/pages/_loading_.vue';
import MkError from '@/pages/_error_.vue';
import MkTimeline from '@/pages/timeline.vue';
import { $i, iAmModerator } from './account';
import { ui } from '@/config';


const page = (path: string | AsyncComponentLoader<any>, uiName?: string) => defineAsyncComponent({
	loader: typeof path === 'string' ? uiName ? () => import(`./ui/${ui}/pages/${path}.vue`) : () => import(`./pages/${path}.vue`) : path,
	loadingComponent: MkLoading,
	errorComponent: MkError,
});

let indexScrollPos = 0;

const defaultRoutes = [
	
	{ path: '/', name: 'index', component: $i ? MkTimeline : page('welcome') },
	{ path: '/@:acct/:page?', name: 'user', component: page(() => import('./pages/user/index.vue')), props: route => ({ acct: route.params.acct, page: route.params.page || 'index' }) },
	{ path: '/@:user/pages/:page', component: page('page'), props: route => ({ pageName: route.params.page, username: route.params.user }) },
	{ path: '/@:user/pages/:pageName/view-source', component: page(() => import('./pages/page-editor/page-editor.vue')), props: route => ({ initUser: route.params.user, initPageName: route.params.pageName }) },
	{ path: '/settings/:page(.*)?', name: 'settings', component: page(() => import('./pages/settings/index.vue')), props: route => ({ initialPage: route.params.page || null }) },
	{ path: '/reset-password/:token?', component: page('reset-password'), props: route => ({ token: route.params.token }) },
	{ path: '/signup-complete/:code', component: page('signup-complete'), props: route => ({ code: route.params.code }) },
	{ path: '/announcements', component: page('announcements') },
	{ path: '/about', component: page('about') },
	{ path: '/about-speechka', component: page('about-misskey') },
	{ path: '/featured', component: page('featured') },
	{ path: '/theme-editor', component: page('theme-editor') },
	{ path: '/advanced-theme-editor', component: page('advanced-theme-editor') },
	{ path: '/explore', component: page('explore') },
	{ path: '/explore/tags/:tag', props: true, component: page('explore') },
	{ path: '/federation', component: page('federation') },
	{ path: '/emojis', component: page('emojis') },
	{ path: '/search', component: page('search'), props: route => ({ query: route.query.q, channel: route.query.channel }) },
	{ path: '/pages', name: 'pages', component: page('pages') },
	{ path: '/pages/new', component: page(() => import('./pages/page-editor/page-editor.vue')) },
	{ path: '/pages/edit/:pageId', component: page(() => import('./pages/page-editor/page-editor.vue')), props: route => ({ initPageId: route.params.pageId }) },
	{ path: '/gallery', component: page(() => import('./pages/gallery/index.vue')) },
	{ path: '/gallery/new', component: page(() => import('./pages/gallery/edit.vue')) },
	{ path: '/gallery/:postId/edit', component: page(() => import('./pages/gallery/edit.vue')), props: route => ({ postId: route.params.postId }) },
	{ path: '/gallery/:postId', component: page(() => import('./pages/gallery/post.vue')), props: route => ({ postId: route.params.postId }) },
	{ path: '/channels', component: page('channels') },
	{ path: '/channels/new', component: page('channel-editor') },
	{ path: '/channels/:channelId/edit', component: page('channel-editor'), props: true },
	{ path: '/channels/:channelId', component: page('channel'), props: route => ({ channelId: route.params.channelId }) },
	{ path: '/clips/:clipId', component: page('clip'), props: route => ({ clipId: route.params.clipId }) },
	{ path: '/timeline/list/:listId', component: page('user-list-timeline'), props: route => ({ listId: route.params.listId }) },
	{ path: '/timeline/antenna/:antennaId', component: page('antenna-timeline'), props: route => ({ antennaId: route.params.antennaId }) },
	{ path: '/my/notifications', component: page('notifications') },
	{ path: '/my/favorites', component: page('favorites') },
	{ path: '/my/messages', component: page('messages') },
	{ path: '/my/mentions', component: page('mentions') },
	{ path: '/my/messaging', name: 'messaging', component: page(() => import('./pages/messaging/index.vue')) },
	{ path: '/my/messaging/:user', component: page(() => import('./pages/messaging/messaging-room.vue')), props: route => ({ userAcct: route.params.user }) },
	{ path: '/my/messaging/group/:group', component: page(() => import('./pages/messaging/messaging-room.vue')), props: route => ({ groupId: route.params.group }) },
	{ path: '/my/drive', name: 'drive', component: page('drive') },
	{ path: '/my/drive/folder/:folder', component: page('drive') },
	{ path: '/my/follow-requests', component: page('follow-requests') },
	{ path: '/my/lists', component: page(() => import('./pages/my-lists/index.vue')) },
	{ path: '/my/lists/:list', component: page(() => import('./pages/my-lists/list.vue')) },
	{ path: '/my/groups', component: page(() => import('./pages/my-groups/index.vue')) },
	{ path: '/my/groups/:group', component: page(() => import('./pages/my-groups/group.vue')), props: route => ({ groupId: route.params.group }) },
	{ path: '/my/antennas', component: page(() => import('./pages/my-antennas/index.vue')) },
	{ path: '/my/antennas/create', component: page(() => import('./pages/my-antennas/create.vue')) },
	{ path: '/my/antennas/:antennaId', component: page(() => import('./pages/my-antennas/edit.vue')), props: true },
	{ path: '/my/clips', component: page(() => import('./pages/my-clips/index.vue')) },
	{ path: '/scratchpad', component: page('scratchpad') },
	{ path: '/admin/:page(.*)?', component: iAmModerator ? page(() => import('./pages/admin/index.vue')) : page('not-found'), props: route => ({ initialPage: route.params.page || null }) },
	{ path: '/admin', component: iAmModerator ? page(() => import('./pages/admin/index.vue')) : page('not-found') },
	{ path: '/notes/:note', name: 'note', component: page('note'), props: route => ({ noteId: route.params.note }) },
	{ path: '/tags/:tag', component: page('tag'), props: route => ({ tag: route.params.tag }) },
	{ path: '/user-info/:user', component: page('user-info'), props: route => ({ userId: route.params.user }) },
	{ path: '/instance-info/:host', component: page('instance-info'), props: route => ({ host: route.params.host }) },
	{ path: '/mfm-cheat-sheet', component: page('mfm-cheat-sheet') },
	{ path: '/api-console', component: page('api-console') },
	{ path: '/preview', component: page('preview') },
	{ path: '/test', component: page('test') },
	{ path: '/auth/:token', component: page('auth') },
	{ path: '/miauth/:session', component: page('miauth') },
	{ path: '/authorize-follow', component: page('follow') },
	{ path: '/share', component: page('share') },
	{ path: '/:catchAll(.*)', component: page('not-found') }
];

const chatRoutes = [
	{ path: '/timeline', component: page('timeline', 'chat'), props: route => ({ src: 'home' }) },
	{ path: '/timeline/home', component: page('timeline', 'chat'), props: route => ({ src: 'home' }) },
	{ path: '/timeline/local', component: page('timeline', 'chat'), props: route => ({ src: 'local' }) },
	{ path: '/timeline/social', component: page('timeline', 'chat'), props: route => ({ src: 'social' }) },
	{ path: '/timeline/global', component: page('timeline', 'chat'), props: route => ({ src: 'global' }) },
	{ path: '/channels/:channelId', component: page('channel', 'chat'), props: route => ({ channelId: route.params.channelId }) },
];

function margeRoutes(routes: any[]) {
	const result = defaultRoutes;
	for (const route of routes) {
		const found = result.findIndex(x => x.path === route.path);
		if (found > -1) {
			result[found] = route;
		} else {
			result.unshift(route);
		}
	}
	return result;
}

export const router = createRouter({
	history: createWebHistory(),
	routes: margeRoutes(ui === 'chat' ? chatRoutes : []),
	
	scrollBehavior(to) {
		window._scroll = () => { 
			if (to.name === 'index') {
				window.scroll({ top: indexScrollPos, behavior: 'instant' });
				const i = window.setInterval(() => {
					window.scroll({ top: indexScrollPos, behavior: 'instant' });
				}, 10);
				window.setTimeout(() => {
					window.clearInterval(i);
				}, 500);
			} else {
				window.scroll({ top: 0, behavior: 'instant' });
			}
		};
	}
});

router.afterEach((to, from) => {
	if (from.name === 'index') {
		indexScrollPos = window.scrollY;
	}
});

export function resolve(path: string) {
	const resolved = router.resolve(path);
	const route = resolved.matched[0];
	return {
		component: markRaw(route.components.default),
		
		props: route.props?.default ? route.props.default(resolved) : resolved.params
	};
}
