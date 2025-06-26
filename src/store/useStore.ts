import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ProjectStore, FigmaToken, TokenMapping } from '@/types';

const initialState = {
  projectName: '',
  uploadedTokens: [],
  tokenMapping: {},
  isLoading: false,
  error: null,
};

export const useStore = create<ProjectStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      setProjectName: (name: string) =>
        set({ projectName: name }, false, 'setProjectName'),

      setUploadedTokens: (tokens: FigmaToken[]) =>
        set({ uploadedTokens: tokens }, false, 'setUploadedTokens'),

      setTokenMapping: (mapping: TokenMapping) =>
        set({ tokenMapping: mapping }, false, 'setTokenMapping'),

      updateTokenMapping: (tailwindToken: string, figmaToken: string) =>
        set(
          (state) => ({
            tokenMapping: {
              ...state.tokenMapping,
              [tailwindToken]: figmaToken,
            },
          }),
          false,
          'updateTokenMapping'
        ),

      setLoading: (loading: boolean) =>
        set({ isLoading: loading }, false, 'setLoading'),

      setError: (error: string | null) =>
        set({ error }, false, 'setError'),

      resetStore: () =>
        set(initialState, false, 'resetStore'),
    }),
    {
      name: 'autogen-store',
    }
  )
);