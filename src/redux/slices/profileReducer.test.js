import profileReducer, { setProfileData } from './profileSlice';
import { fetchProfile } from './profileSlice';
import { configureStore } from '@reduxjs/toolkit';

// Моки для глобальних об'єктів
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ name: 'Test User' }),
    })
);

// Ініціальний стан
const initialState = {
    profileData: {},
    loading: false,
    error: null,
};

describe('Profile reducer logic', () => {
    test('should set profile data', () => {
        const previousState = { 
            profileData: { name: 'Old Name', age: 30 }, 
            loading: false, 
            error: null 
        };

        const newProfileData = { name: 'New Name' };

        const expectedState = {
            profileData: { name: 'New Name', age: 30 }, // Об'єднуємо нові та старі дані
            loading: false,
            error: null,
        };

        expect(profileReducer(previousState, setProfileData(newProfileData)))
            .toEqual(expectedState);
    });

    test('should set loading to true when fetchProfile is pending', () => {
        const action = { type: fetchProfile.pending.type };
        const state = profileReducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            loading: true,
            error: null,
        });
    });

    test('should set profile data and loading to false when fetchProfile is fulfilled', () => {
        const action = { type: fetchProfile.fulfilled.type, payload: { name: 'Test User' } };
        const state = profileReducer(initialState, action);

        expect(state).toEqual({
            profileData: { name: 'Test User' },
            loading: false,
            error: null,
        });
    });

    test('should set error message and loading to false when fetchProfile is rejected', () => {
        const action = { 
            type: fetchProfile.rejected.type, 
            error: { message: 'Failed to fetch profile data' } 
        };
        const state = profileReducer(initialState, action);

        expect(state).toEqual({
            profileData: {},
            loading: false,
            error: 'Failed to fetch profile data',
        });
    });
    test('should handle fetchProfile async thunk', async () => {
        const store = configureStore({ reducer: profileReducer });

        // Виклик асинхронного thunk
        await store.dispatch(fetchProfile());

        const state = store.getState();
        
        // Перевіряємо, що моканий fetch був викликаний
        expect(global.fetch).toHaveBeenCalledWith('/API/profile.json');
        
        // Перевіряємо, що профільні дані були успішно збережені в стані
        expect(state.profileData).toEqual({ name: 'Test User' });
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });
});
