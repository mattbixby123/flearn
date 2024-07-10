// src/services/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      headers.set('Content-Type', 'application/json');
      return headers
    },
  }),
  endpoints: (builder) => ({
    // Auth endpoints
    me: builder.query({
      query: () => 'auth/me',
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: 'auth/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Deck endpoints
    // createDeck: builder.mutation({
    //   query: (deckData) => ({
    //     url: '/decks',
    //     method: 'POST',
    //     body: deckData,
    //   }),
    // }),
    // getDecks: builder.query({
    //   query: () => '/decks',
    // }),
    // getDeck: builder.query({
    //   query: (deckId) => `/decks/${deckId}`,
    // }),
    // updateDeck: builder.mutation({
    //   query: ({ deckId, ...deckData }) => ({
    //     url: `/decks/${deckId}`,
    //     method: 'PUT',
    //     body: deckData,
    //   }),
    // }),
    // deleteDeck: builder.mutation({
    //   query: (deckId) => ({
    //     url: `/decks/${deckId}`,
    //     method: 'DELETE',
    //   }),
    // }),

    // Card endpoints
    // createCard: builder.mutation({
    //   query: ({ deckId, ...cardData }) => ({
    //     url: `/decks/${deckId}/cards`,
    //     method: 'POST',
    //     body: cardData,
    //   }),
    // }),
    // getCards: builder.query({
    //   query: (deckId) => `/decks/${deckId}/cards`,
    // }),
    // updateCard: builder.mutation({
    //   query: ({ deckId, cardId, ...cardData }) => ({
    //     url: `/decks/${deckId}/cards/${cardId}`,
    //     method: 'PUT',
    //     body: cardData,
    //   }),
    // }),
    // deleteCard: builder.mutation({
    //   query: ({ deckId, cardId }) => ({
    //     url: `/decks/${deckId}/cards/${cardId}`,
    //     method: 'DELETE',
    //   }),
    // }),

    // Study session endpoints
    // createStudySession: builder.mutation({
    //   query: ({ deckId, ...sessionData }) => ({
    //     url: `/decks/${deckId}/study-sessions`,
    //     method: 'POST',
    //     body: sessionData,
    //   }),
    // }),
    // getStudySessions: builder.query({
    //   query: (deckId) => `/decks/${deckId}/study-sessions`,
    // }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useMeQuery,
  // useCreateDeckMutation,
  // useGetDecksQuery,
  // useGetDeckQuery,
  // useUpdateDeckMutation,
  // useDeleteDeckMutation,
  // useCreateCardMutation,
  // useGetCardsQuery,
  // useUpdateCardMutation,
  // useDeleteCardMutation,
  // useCreateStudySessionMutation,
  // useGetStudySessionsQuery,
} = api