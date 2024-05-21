import { reactive, readonly } from "vue";
import { createStore } from 'vuex'
import axios from 'axios';
import setAuthHeader from './utils';
import { Api } from './helpers';
import Erreur from './services/error'


const initialState = reactive({
    isModalActive: false,
    scrollTop: 0,
    modalData: null,
});

export const setModalActive = function (isActive) {
    // Keep scrollTop
    if (isActive) {
        const scrollTop = document.documentElement.scrollTop;

        initialState.scrollTop = scrollTop;
    }

    initialState.isModalActive = isActive;
};

export const setModalData = function (data) {
    initialState.modalData = data;
};

export const state = readonly(initialState);

if (process.client) {

    let user = localStorage.getItem('user');
    if (!user) {
        user = {
            id: -1,
            token: '',
        };
    } else {
        try {
            user = JSON.parse(user);
            axios.defaults.headers.common['Authorization'] = user.token;
        } catch (ex) {
            user = {
                id: -1,
                token: '',
            };
        }
    }

}



const mainStore = defineStore("main", {
    state: () => ({
        status: '',
        user: user,
        sections: {
            id: '',
            titre: '',
            filtre: '',
            videos: []
        },
        userInfos: {
            id: '',
            token: '',
        },
        videos: {
            id: '',
            fileName: '',
            title: '',
            description: '',
            duration: '',
            years: '',
            size: '',
            url: '',
            image: '',
            imagepaysage: '',
            created: '',
            modified: '',
            artist: '',
            album: '',
            genres: [],
            likedUsers: [],
            playlists: [],
            comments: [],
            isEnable: true,
        },

        image: {
            id: '',
            name: '',
            size: '',
            url: ''
        },

        categories: {
            description: '',
            id: '',
            name: '',
            images: '',
            videos: []
        },

        tags: {
            id: '',
            name: ''
        },

        getstreams: {
            id: '',
            description: '',
            titre: '',
            images: [],
        },

        planifications: {
            id: '',
            startDate: '',
            endDate: '',
            programme: {
                image: {
                    url: ''
                }
            },
            channels: [],
            progress: '',
        },

        programmes: {
            id: '',
            description: '',
            duree: '',
            image: {},
            imageplateau: {},
            nom: '',
            live: '',
            isLive: '',
            sections: [],
            videocouverture: {},
        },
    }),
    
    mutations: {
        setStatus: function (state, Status) {
            state.status = Status
        },

        logUser: function (state, user) {
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user));
            }
            state.user = user;
        },

        userInfos: function (state, userInfos) {
            state.userInfos = userInfos
        },
        videos: function (state, videos) {
            state.videos = videos
        },
        sections: function (state, sections) {
            state.sections = sections
        },
        programmes: function (state, programmes) {
            state.programmes = programmes
        },
        categories: function (state, categories) {
            state.categories = categories
        },
        tags: function (state, tags) {
            state.tags = tags
        },
        getstreams: function (state, getstreams) {
            state.getstreams = getstreams
        },
        planifications: function (state, planifications) {
            state.planifications = planifications
        },
        images: function (state, images) {
            state.image = images
        },

        logout: function (state) {
            state.user = {
                id: -1,
                token: '',
            }
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user')
                localStorage.removeItem('jwtToken')
            }
        }
    },
    actions: {

        // ************ACTION LOGIN****************

        loginToEmail: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                Api.postwithouttoken('/authentication/api/auth/signin-email', userInfos)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                        // console.log(user.token)
                    })
                    .catch(function (error) {
                        commit('setStatus', 'Email ou Mot de passe invalide');
                        reject(error);
                    })
            });
        },


        loginToPhone: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                Api.postwithouttoken('/authentication/api/auth/signin-phone', userInfos)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('setStatus', 'Téléphone ou Mot de passe invalide');
                        reject(error);
                    })
            });
        },


        loginToUsername: ({ commit }, userInfos) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                Api.postwithouttoken('/authentication/api/auth/signin-username', userInfos)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                        // setAuthHeader(response.data.token)
                    })
                    .catch(function (error) {
                        commit('setStatus', 'Username ou mot de passe invalide');
                        reject(error);
                    })
            });
        },

        // ************ACTION LOGIN****************

        // logout:({commit}, userInfos) =>{
        //     return new Promise((resolve, reject) => {
        //         commit;
        //         axios.post('http://localhost:8080/authentication/api/auth/signout',userInfos)
        //         .then(function (response) {
        //             resolve(response);
        //         }).catch(function(error) {
        //             reject(error);
        //         })
        //     });
        // },

        // ************ACTION CREATE ACOUNT****************

        createAcountByEmail: ({ commit }, userInfos) => {
            return new Promise((resolve, reject) => {
                commit;
                Api.postwithouttoken('/authentication/api/auth/signup-email', userInfos)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                    }).catch(function (error) {
                        commit('setStatus', 'Username ou adresse mail déjà utilisé');
                        reject(error);
                    })
            });
        },


        createAcountByPhone: ({ commit }, userInfos) => {
            return new Promise((resolve, reject) => {
                commit;
                Api.postwithouttoken('/authentication/api/auth/signup-phone', userInfos)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response);
                    }).catch(function (error) {
                        commit('setStatus', 'Username ou numéro de téléphone déjà utilisé');
                        reject(error);
                    })
            });
        },


        confirmRegister: ({ commit }, userToken) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                Api.postwithouttoken('/authentication/api/auth/user/enable-token', userToken)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('setStatus', 'Code invalide');
                        reject(error);
                    })
            });
        },

        confirmPasswordPhone: ({ commit }, userToken) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                Api.postwithouttoken('/authentication/api/auth/user/new-password/phone-number', userToken)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('setStatus', 'Code invalide');
                        reject(error);
                    })
            });
        },

        confirmUpdatePhone: ({ commit }, userToken) => {
            commit('setStatus', 'loading');
            return new Promise((resolve, reject) => {
                Api.postwithouttoken('/authentication/api/auth/user/update-phone/enable-phone', userToken)
                    .then(function (response) {
                        commit('setStatus', '');
                        commit('logUser', response.data);
                        resolve(response)
                    })
                    .catch(function (error) {
                        commit('setStatus', 'Code invalide');
                        reject(error);
                    })
            });
        },


        // ************ACTION GET VIDEOS****************

        get_videos: ({ commit }) => {
            Api.getwithouttoken('/streamvod/api/videos/all')
                .then(function (response) {
                    commit('videos', response.data.content);
                }).catch(function (err) {
                    Erreur.gestionErreur(err.message)

                })
        },

        get_getstreams: ({ commit }) => {
            Api.getwithouttoken('/streamvod/api/invite/guest-screen/all')
                .then(function (response) {
                    commit('getstreams', response.data.content);
                }).catch(function (err) {
                    Erreur.gestionErreur(err.message)

                })
        },

        get_categories: ({ commit }) => {
            Api.getwithouttoken('/streamvod/api/categories/all')
                .then(function (response) {
                    commit('categories', response.data.content);
                }).catch(function (err) {
                    Erreur.gestionErreur(err.message)

                })
        },

        get_tags: ({ commit }) => {
            Api.getwithouttoken('/streamvod/api/tags/all')
                .then(function (response) {
                    commit('tags', response.data.content);
                }).catch(function (err) {
                    Erreur.gestionErreur(err.message)

                })
        },



        get_categorie_videos: ({ commit }, id_categorie) => {
            Api.getwithouttoken('/streamvod/api/videos/' + id_categorie + '/videos')
                .then(function (response) {
                    commit('videos', response.data.content);
                }).catch(function (err) {
                    Erreur.gestionErreur(err.message)

                })
        },


        get_sections: ({ commit }) => {

            Api.getwithouttoken('/streamvod/api/section/all-test')
                .then(function (response) {
                    commit('sections', response.data.content);
                }).catch(function (err) {
                    Erreur.gestionErreur(err.message)
                })
        },

        get_programmes: ({ commit }) => {

            Api.getwithouttoken('/streamvod/api/programme/all')
                .then(function (response) {
                    commit('programmes', response.data.content);
                }).catch(function (err) {
                    Erreur.gestionErreur(err.message)
                })
        },

        get_planifications: ({ commit }) => {
            Api.getwithouttoken('/streamvod/api/planification/all')
                .then(function (response) {
                    commit('planifications', response.data.content);
                }).catch(function (err) {
                    Erreur.gestionErreur(err.message)
                })
        },

    },
})

export default mainStore;




