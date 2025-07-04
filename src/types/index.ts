export interface FigmaToken {
  name: string;
  value: string;
  type: string;
  description?: string;
}

export interface TokenMapping {
  [tailwindToken: string]: string; // figma token name
}

export interface ProjectStore {
  projectName: string;
  uploadedTokens: FigmaToken[];
  tokenMapping: TokenMapping;
  fontImportUrl: string;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setProjectName: (name: string) => void;
  setUploadedTokens: (tokens: FigmaToken[]) => void;
  setTokenMapping: (mapping: TokenMapping) => void;
  updateTokenMapping: (tailwindToken: string, figmaToken: string) => void;
  setFontImportUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetStore: () => void;
}

export interface GenerateProjectRequest {
  projectName: string;
  mapping: TokenMapping;
  fontImportUrl?: string;
  tokens: FigmaToken[];
}

export interface GenerateProjectResponse {
  success: boolean;
  message: string;
  projectPath?: string;
}