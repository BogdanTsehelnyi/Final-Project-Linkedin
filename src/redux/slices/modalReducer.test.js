import moduleChangeProfile, { handleOpenProfileModal, handleCloseProfileModal, handleOpenInfoModal, handleCloseInfoModal } from './modal';

describe('Modal reducer logic', () => {
    test('should toggle Profile Modal to open', () => {
        const initialValue = {
            openProfileModal: false,
            openInfoModal: false,
        };

        expect(moduleChangeProfile(initialValue, handleOpenProfileModal()))
            .toEqual({
                openProfileModal: true,
                openInfoModal: false,
            });
    });
    test('should toggle Profile Modal to close', () => {
        const initialValue = {
            openProfileModal: true,
            openInfoModal: false,
        };

        expect(moduleChangeProfile(initialValue, handleCloseProfileModal()))
            .toEqual({
                openProfileModal: false,
                openInfoModal: false,
            });
    });
    test('should toggle Info Modal to open', () => {
        const initialValue = {
            openProfileModal: false,
            openInfoModal: false,
        };

        expect(moduleChangeProfile(initialValue, handleOpenInfoModal()))
            .toEqual({
                openProfileModal: false,
                openInfoModal: true,
            });
    });
    test('should toggle Info Modal to close', () => {
        const initialValue = {
            openProfileModal: false,
            openInfoModal: true,
        };

        expect(moduleChangeProfile(initialValue, handleCloseInfoModal()))
            .toEqual({
                openProfileModal: false,
                openInfoModal: false,
            });
    });
});
