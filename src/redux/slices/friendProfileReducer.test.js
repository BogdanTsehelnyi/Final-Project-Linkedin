import friendsProfileReducer, {
  addFriend,
  cancelRequest,
  removeFriend,
  fetchCarts,
} from "./profileRecommendationSlice";
import { configureStore } from "@reduxjs/toolkit";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: "Test User" }]), // Мокаем массив друзей
  })
);

const initialState = {
  friendsData: [],
  allProfiles: [],
  loading: false,
  error: null,
  pendingRequests: {},
};

describe("Friends reducer logic", () => {
  const newFriend = { id: 1, name: "John Doe" };

  // Тест на добавление нового друга
  test("should add new friend and remove from pendingRequests", () => {
    const previousState = {
      friendsData: [],
      loading: false,
      error: null,
      pendingRequests: { 1: true }, // Друг в состоянии "Pending"
    };

    const expectedState = {
      friendsData: [{ ...newFriend, isFriend: true }],
      loading: false,
      error: null,
      pendingRequests: {}, // Удаляем из списка "Pending"
    };

    expect(friendsProfileReducer(previousState, addFriend(newFriend))).toEqual(expectedState);
  });

  // Тест на отмену запроса
  test("should cancel request and remove from pendingRequests", () => {
    const previousState = {
      friendsData: [newFriend],
      loading: false,
      error: null,
      pendingRequests: { 1: true },
    };

    const expectedState = {
      friendsData: [newFriend], // Оставляем друга в списке, но удаляем из списка запросов
      loading: false,
      error: null,
      pendingRequests: {},
    };

    expect(friendsProfileReducer(previousState, cancelRequest(newFriend))).toEqual(expectedState);
  });

  // Тест на удаление друга
  test("should remove friend by id", () => {
    const previousState = {
      friendsData: [newFriend, { id: 2, name: "Jane Doe" }],
      loading: false,
      error: null,
      pendingRequests: {},
    };

    const expectedState = {
      friendsData: [{ id: 2, name: "Jane Doe" }],
      loading: false,
      error: null,
      pendingRequests: {},
    };

    expect(friendsProfileReducer(previousState, removeFriend(1))).toEqual(expectedState);
  });

  // Тест на состояние "pending" во время загрузки данных
  test("should set loading to true when fetchCarts is pending", () => {
    const action = { type: fetchCarts.pending.type };
    const state = friendsProfileReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
    });
  });

  // Тест на успешную загрузку данных
  test("should set allProfiles data and loading to false when fetchCarts is fulfilled", () => {
    const action = { type: fetchCarts.fulfilled.type, payload: [{ id: 1, name: "Test Friend" }] };
    const state = friendsProfileReducer(initialState, action);

    expect(state).toEqual({
      allProfiles: [{ id: 1, name: "Test Friend" }],
      friendsData: [],
      loading: false,
      error: null,
      pendingRequests: {},
    });
  });

  // Тест на ошибку загрузки данных
  test("should set error message and loading to false when fetchCarts is rejected", () => {
    const action = {
      type: fetchCarts.rejected.type,
      error: { message: "Failed to fetch friends data" },
    };
    const state = friendsProfileReducer(initialState, action);

    expect(state).toEqual({
      allProfiles: [],
      friendsData: [],
      loading: false,
      error: "Failed to fetch friends data",
      pendingRequests: {},
    });
  });

  // Тест на добавление уже существующего друга
  test("should not add friend if already exists", () => {
    const previousState = {
      friendsData: [newFriend],
      loading: false,
      error: null,
      pendingRequests: {},
    };

    const state = friendsProfileReducer(previousState, addFriend(newFriend));

    // Проверяем, что новый друг не добавляется
    expect(state.friendsData.length).toBe(1);
    expect(state.friendsData).toEqual([newFriend]);
  });

  // Тест асинхронной функции с мок-функцией fetch
  test("should handle fetchCarts async thunk", async () => {
    const store = configureStore({ reducer: friendsProfileReducer });

    // Вызываем асинхронный thunk
    await store.dispatch(fetchCarts());

    const state = store.getState();

    // Проверяем, что моканный fetch был вызван с правильным URL
    expect(global.fetch).toHaveBeenCalledWith("/API/anotherProfile.json");

    // Проверяем, что данные друзей были успешно сохранены в состоянии
    expect(state.allProfiles).toEqual([{ id: 1, name: "Test User" }]); // Поскольку fetch мокаем массив друзей
    expect(state.loading).toBe(false);
    expect(state.error).toBe(null);
  });
});
