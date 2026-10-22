import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TourTabId } from '@/content/home';
import type { Edition } from '@/lib/schemas';

export interface UiState {
  mobileNavOpen: boolean;
  activeTourTab: TourTabId;
  preselectedEdition: Edition;
}

export const initialUiState: UiState = {
  mobileNavOpen: false,
  activeTourTab: 'sales',
  preselectedEdition: 'enterprise',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState: initialUiState,
  reducers: {
    setMobileNavOpen(state, action: PayloadAction<boolean>) {
      state.mobileNavOpen = action.payload;
    },
    setActiveTourTab(state, action: PayloadAction<TourTabId>) {
      state.activeTourTab = action.payload;
    },
    setPreselectedEdition(state, action: PayloadAction<Edition>) {
      state.preselectedEdition = action.payload;
    },
  },
});

export const { setMobileNavOpen, setActiveTourTab, setPreselectedEdition } = uiSlice.actions;
