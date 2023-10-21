import {Commit, createStore} from 'vuex'

export default createStore({
    state: {
        authenticated: false,
        user: null,
        token: null,
    },
    mutations: {
        SET_AUTH: (state, { authenticated, user, token }) => {
            state.authenticated = authenticated;
            state.user = user;
            state.token = token;
        },
        LOGOUT: (state) => {
            state.authenticated = false;
            state.user = null;
            state.token = null;
        },
    },
    actions: {
        setAuth: ({ commit }, { authenticated, user, token }) => {
            commit('SET_AUTH', { authenticated, user, token });
        },
        logout: ({ commit }) => {
            commit('LOGOUT');
        },
    },
    modules: {}
});


// export default createStore({
//     state: {
//       authenticated: false,
//       is_director: false,
//       is_teacher: false,
//       is_student: false,
//       token: null,
//     },
//     mutations: {
//       SET_AUTH: (state, { authenticated, is_director, is_teacher, is_student, token }) => {
//         state.authenticated = authenticated;
//         state.is_director = is_director;
//         state.is_teacher = is_teacher;
//         state.is_student = is_student;
//         state.token = token;
//       },
//     },
//     actions: {
//       setAuth: ({ commit }, { authenticated, is_director, is_teacher, is_student, token }) => {
//         commit('SET_AUTH', { authenticated, is_director, is_teacher, is_student, token });
//       },
//     },
//     modules: {},
//   });