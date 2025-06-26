import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Upload, Zap, Palette, Code, Download, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CSSTokenInput } from '@/components/CSSTokenInput';
import { StepProgress } from '@/components/StepProgress';
import { useStore } from '@/store/useStore';
import { FigmaToken } from '@/types';

const STEPS = [
  {
    id: 1,
    title: 'Project Setup',
    description: 'Configure your project details',
  },
  {
    id: 2,
    title: 'Token Mapping',
    description: 'Map design tokens to components',
  },
  {
    id: 3,
    title: 'Generate System',
    description: 'Create your design system',
  },
];

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const {
    projectName,
    setProjectName,
    setUploadedTokens,
    fontImportUrl,
    setFontImportUrl,
    isLoading,
    setLoading,
    setError,
  } = useStore();

  const [localProjectName, setLocalProjectName] = React.useState(projectName);
  const [localFontImportUrl, setLocalFontImportUrl] = React.useState(fontImportUrl);
  const [tokensUploaded, setTokensUploaded] = React.useState(false);

  const handleTokensParsed = React.useCallback((tokens: FigmaToken[]) => {
    setLoading(true);
    setError(null);
    
    try {
      setUploadedTokens(tokens);
      setTokensUploaded(tokens.length > 0);
      if (tokens.length > 0) {
        console.log(`Successfully parsed ${tokens.length} tokens`);
      }
    } catch (error) {
      setError('Failed to process tokens');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [setUploadedTokens, setLoading, setError]);

  const handleContinue = React.useCallback(() => {
    if (!localProjectName.trim()) {
      setError('Please enter a project name');
      return;
    }
    
    if (!tokensUploaded) {
      setError('Please paste your CSS custom properties first');
      return;
    }

    setProjectName(localProjectName.trim());
    setFontImportUrl(localFontImportUrl.trim());
    navigate('/mapping');
  }, [localProjectName, localFontImportUrl, tokensUploaded, setProjectName, setFontImportUrl, navigate, setError]);

  const canContinue = localProjectName.trim() && tokensUploaded && !isLoading;

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Step Progress */}
          <StepProgress currentStep={1} steps={STEPS} className="mb-16" />

          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
                <div className="relative p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full">
                  <Sparkles className="h-16 w-16 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              GenDS
            </h1>
            <p className="text-2xl text-slate-300 mb-4 font-light">
              Transform your design tokens into production-ready design systems
            </p>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Focus on core components: Buttons, Text Inputs, and Radio buttons with intelligent token mapping
            </p>
          </div>

          {/* Main Form Card */}
          <Card className="glass-dark border-slate-700/50 shadow-2xl mb-16">
            <CardHeader className="text-center pb-8">
              <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Project Configuration
                </span>
              </CardTitle>
              <CardDescription className="text-slate-400 text-lg">
                Set up your project with design tokens and typography
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-10 p-8">
              {/* Project Name Input */}
              <div className="space-y-4">
                <Label htmlFor="projectName" className="text-lg font-semibold text-slate-200">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  type="text"
                  placeholder="Enter your project name..."
                  value={localProjectName}
                  onChange={(e) => setLocalProjectName(e.target.value)}
                  className="h-14 text-lg bg-slate-800/50 border-slate-600 focus:border-blue-500 focus:ring-blue-500/20 text-slate-100 placeholder:text-slate-500"
                  disabled={isLoading}
                />
                <p className="text-slate-400">
                  This will be used as the name for your generated design system
                </p>
              </div>

              {/* Font Import URL */}
              <div className="space-y-4">
                <Label htmlFor="fontImportUrl" className="text-lg font-semibold text-slate-200 flex items-center space-x-2">
                  <Type className="h-5 w-5 text-purple-400" />
                  <span>Google Fonts Import URL</span>
                </Label>
                <Input
                  id="fontImportUrl"
                  type="url"
                  placeholder="@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');"
                  value={localFontImportUrl}
                  onChange={(e) => setLocalFontImportUrl(e.target.value)}
                  className="h-14 text-lg bg-slate-800/50 border-slate-600 focus:border-purple-500 focus:ring-purple-500/20 text-slate-100 placeholder:text-slate-500 font-mono"
                  disabled={isLoading}
                />
                <p className="text-slate-400">
                  Optional: Add a Google Fonts @import URL to include custom typography in your design system
                </p>
              </div>

              {/* CSS Token Input */}
              <CSSTokenInput onTokensParsed={handleTokensParsed} isLoading={isLoading} />

              {/* Continue Button */}
              <Button
                onClick={handleContinue}
                disabled={!canContinue}
                className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing tokens...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Continue to Token Mapping</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="glass border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Code className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-200">Buttons</h3>
                <p className="text-slate-400 leading-relaxed">
                  Primary, secondary, and link button variants with hover and disabled states
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Type className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-200">Text Inputs</h3>
                <p className="text-slate-400 leading-relaxed">
                  Styled input fields with focus states, borders, and placeholder text
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-slate-700/50 hover:border-emerald-500/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-200">Radio Buttons</h3>
                <p className="text-slate-400 leading-relaxed">
                  Custom radio button components with selection and hover states
                </p>
              </CardContent>
            </Card>

            <Card className="glass border-slate-700/50 hover:border-pink-500/50 transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                  <div className="relative w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Download className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-slate-200">Export Ready</h3>
                <p className="text-slate-400 leading-relaxed">
                  Production-ready code with TypeScript support and documentation
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};