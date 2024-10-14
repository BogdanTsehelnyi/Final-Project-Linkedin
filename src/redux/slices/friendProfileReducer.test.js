import friendsProfileReducer, { addFriend, cancelRequest, removeFriend, fetchCarts } from './friendProfileSlice';
import { configureStore } from '@reduxjs/toolkit';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'Test User' }]),  // Мокаємо масив друзів
    })
);

const initialState = {
    friendsData: [],
    loading: false,
    error: null,
    pendingRequests: {},
};

describe('Friends reducer logic', () => {
    const newFriend = { id: 1, name: 'John Doe' };

    // Тест на додавання нового друга
    test('should add new friend and remove from pendingRequests', () => {
        const previousState = {
            friendsData: [],
            loading: false,
            error: null,
            pendingRequests: { 1: true },  // Друг в стані "Pending"
        };

        const expectedState = {
            friendsData: [newFriend],
            loading: false,
            error: null,
            pendingRequests: {},  // Видаляємо зі списку "Pending"
        };

        expect(friendsProfileReducer(previousState, addFriend(newFriend)))
            .toEqual(expectedState);
    });

    // Тест на скасування запиту
    test('should cancel request and remove from pendingRequests', () => {
        const previousState = {
            friendsData: [newFriend],
            loading: false,
            error: null,
            pendingRequests: { 1: true },
        };

        const expectedState = {
            friendsData: [newFriend],  // Залишаємо друга в списку, але видаляємо зі списку запитів
            loading: false,
            error: null,
            pendingRequests: {},
        };

        expect(friendsProfileReducer(previousState, cancelRequest(newFriend)))
            .toEqual(expectedState);
    });

    // Тест на видалення друга
    test('should remove friend by id', () => {
        const previousState = {
            friendsData: [newFriend, { id: 2, name: 'Jane Doe' }],
            loading: false,
            error: null,
            pendingRequests: {},
        };

        const expectedState = {
            friendsData: [{ id: 2, name: 'Jane Doe' }],
            loading: false,
            error: null,
            pendingRequests: {},
        };

        expect(friendsProfileReducer(previousState, removeFriend(1)))
            .toEqual(expectedState);
    });

    // Тест на стан "pending" під час завантаження даних
    test('should set loading to true when fetchCarts is pending', () => {
        const action = { type: fetchCarts.pending.type };
        const state = friendsProfileReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    // Тест на успішне завантаження даних
    test('should set friends data and loading to false when fetchCarts is fulfilled', () => {
        const action = { type: fetchCarts.fulfilled.type, payload: [{ id: 1, name: 'Test Friend' }] };
        const state = friendsProfileReducer(initialState, action);

        expect(state).toEqual({
            friendsData: [{ id: 1, name: 'Test Friend' }],
            loading: false,
            error: null,
            pendingRequests: {},
        });
    });

    // Тест на помилку завантаження даних
    test('should set error message and loading to false when fetchCarts is rejected', () => {
        const action = { 
            type: fetchCarts.rejected.type, 
            error: { message: 'Failed to fetch friends data' } 
        };
        const state = friendsProfileReducer(initialState, action);

        expect(state).toEqual({
            friendsData: [],
            loading: false,
            error: 'Failed to fetch friends data',
            pendingRequests: {},
        });
    });

    // Тест на додавання вже існуючого друга
    test('should not add friend if already exists', () => {
        const previousState = {
            friendsData: [newFriend],
            loading: false,
            error: null,
            pendingRequests: {},
        };

        const state = friendsProfileReducer(previousState, addFriend(newFriend));

        // Перевіряємо, що новий друг не додається
        expect(state.friendsData.length).toBe(1);
        expect(state.friendsData).toEqual([newFriend]);
    });

    // Тест асинхронної функції з мок-функцією fetch
    test('should handle fetchCarts async thunk', async () => {
        const store = configureStore({ reducer: friendsProfileReducer });

        // Викликаємо асинхронний thunk
        await store.dispatch(fetchCarts());

        const state = store.getState();

        // Перевіряємо, що моканий fetch був викликаний з правильним URL
        expect(global.fetch).toHaveBeenCalledWith('/API/anotherProfile.json');

        // Перевіряємо, що дані друзів були успішно збережені в стані
        expect(state.friendsData).toEqual([{ id: 1, name: 'Test User' }]); // Оскільки fetch мокає масив друзів
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });
});
