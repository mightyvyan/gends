import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Eye, EyeOff, Zap, Sparkles, Palette, Code } from 'lucide-react';
import ReactJson from 'react-json-view';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { StepProgress } from '@/components/StepProgress';
import { useStore } from '@/store/useStore';
import { apiService } from '@/services/api';
import { UI_COMPONENT_TOKENS, UI_COMPONENT_CATEGORIES } from '@/constants/uiComponentTokens';
import { useToast } from '@/hooks/use-toast';

const STEPS = [
  {
    id: 1,
    title: 'Project Setup',
    description: 'Configure your project details',
  },
  {
    id: 2,
    title: 'Token Mapping',
    description: 'Map design tokens to UI components',
  },
  {
    id: 3,
    title: 'Generate System',
    description: 'Create your design system',
  },
];

export const MappingPage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    projectName,
    uploadedTokens,
    tokenMapping,
    updateTokenMapping,
    setError,
  } = useStore();

  const [showJsonView, setShowJsonView] = React.useState(false);
  const [generationProgress, setGenerationProgress] = React.useState(0);

  // Redirect if no tokens uploaded
  React.useEffect(() => {
    if (!projectName || uploadedTokens.length === 0) {
      navigate('/');
    }
  }, [projectName, uploadedTokens, navigate]);

  // Filter color tokens from uploaded tokens
  const colorTokens = React.useMemo(() => {
    return uploadedTokens.filter(token => 
      token.type === 'color' || 
      (typeof token.value === 'string' && (
        token.value.startsWith('#') || 
        token.value.startsWith('rgb') ||
        token.value.startsWith('hsl')
      ))
    );
  }, [uploadedTokens]);

  // Generate project mutation
  const generateProjectMutation = useMutation({
    mutationFn: apiService.generateProject,
    onSuccess: (data) => {
      toast({
        title: "Project Generated Successfully!",
        description: data.message,
      });
      setGenerationProgress(100);
    },
    onError: (error: Error) => {
      setError(error.message);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error.message,
      });
      setGenerationProgress(0);
    },
  });

  // Health check query
  const healthQuery = useQuery({
    queryKey: ['health'],
    queryFn: apiService.healthCheck,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  const handleTokenMapping = React.useCallback((uiComponentId: string, designToken: string) => {
    updateTokenMapping(uiComponentId, designToken);
  }, [updateTokenMapping]);

  const handleGenerateProject = React.useCallback(async () => {
    if (!projectName) {
      setError('Project name is required');
      return;
    }

    const mappedTokens = Object.keys(tokenMapping).length;
    if (mappedTokens === 0) {
      toast({
        variant: "destructive",
        title: "No Token Mappings",
        description: "Please map at least one UI component to a design token before generating.",
      });
      return;
    }

    setGenerationProgress(10);
    
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 20;
      });
    }, 500);

    try {
      await generateProjectMutation.mutateAsync({
        projectName,
        mapping: tokenMapping,
      });
    } finally {
      clearInterval(progressInterval);
    }
  }, [projectName, tokenMapping, generateProjectMutation, toast, setError]);

  const mappingProgress = React.useMemo(() => {
    const mapped = Object.keys(tokenMapping).length;
    const total = UI_COMPONENT_TOKENS.length;
    return Math.round((mapped / total) * 100);
  }, [tokenMapping]);

  const getTokenPreview = (tokenValue: string) => {
    if (typeof tokenValue === 'string' && (tokenValue.startsWith('#') || tokenValue.startsWith('rgb') || tokenValue.startsWith('hsl'))) {
      return (
        <div 
          className="w-6 h-6 rounded-lg border border-slate-600 shadow-sm" 
          style={{ backgroundColor: tokenValue }}
          title={tokenValue}
        />
      );
    }
    return <div className="w-6 h-6 rounded-lg border border-dashed border-slate-600" />;
  };

  if (!projectName || uploadedTokens.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Step Progress */}
          <StepProgress currentStep={2} steps={STEPS} className="mb-12" />

          {/* Header */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Setup</span>
              </Button>
              <Separator orientation="vertical" className="h-8 bg-slate-700" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {projectName}
                </h1>
                <p className="text-slate-400 text-lg">
                  Map your design tokens to UI component states
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500/30 text-blue-300">
                <Palette className="h-4 w-4 mr-2" />
                {colorTokens.length} Color Tokens
              </Badge>
              <Button
                variant="outline"
                onClick={() => setShowJsonView(!showJsonView)}
                className="flex items-center space-x-2 border-slate-600 hover:border-slate-500 hover:bg-slate-800/50"
              >
                {showJsonView ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                <span>{showJsonView ? 'Hide' : 'Show'} JSON</span>
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Token Mapping Section */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Card */}
              <Card className="glass-dark border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-xl">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-slate-200">Mapping Progress</span>
                    </div>
                    <span className="text-lg font-normal text-slate-400">{mappingProgress}% Complete</span>
                  </CardTitle>
                  <div className="mt-4">
                    <Progress 
                      value={mappingProgress} 
                      className="h-3 bg-slate-800"
                    />
                  </div>
                </CardHeader>
              </Card>

              {/* Mapping Table */}
              <Card className="glass-dark border-slate-700/50">
                <CardHeader>
                  <CardTitle className="text-2xl text-slate-200">UI Component Token Mapping</CardTitle>
                  <CardDescription className="text-slate-400 text-lg">
                    Map UI component states to your design tokens for consistent styling
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-8">
                      {UI_COMPONENT_CATEGORIES.map((category) => {
                        const categoryTokens = UI_COMPONENT_TOKENS.filter(token => token.category === category);
                        
                        return (
                          <div key={category} className="space-y-4">
                            <div className="flex items-center space-x-3">
                              <div className="h-px bg-gradient-to-r from-slate-600 to-transparent flex-1" />
                              <h4 className="font-semibold text-lg uppercase tracking-wide text-slate-300 px-4">
                                {category}
                              </h4>
                              <div className="h-px bg-gradient-to-l from-slate-600 to-transparent flex-1" />
                            </div>
                            <div className="grid gap-4">
                              {categoryTokens.map((uiToken) => (
                                <div
                                  key={uiToken.id}
                                  className="flex items-center justify-between p-4 border border-slate-700/50 rounded-xl bg-slate-800/30 hover:bg-slate-800/50 hover:border-slate-600/50 transition-all duration-300"
                                >
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-center space-x-3">
                                      <h5 className="font-semibold text-slate-200">{uiToken.name}</h5>
                                      {uiToken.defaultValue && (
                                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                          Default: {uiToken.defaultValue}
                                        </Badge>
                                      )}
                                    </div>
                                    <p className="text-sm text-slate-400">{uiToken.description}</p>
                                    {uiToken.examples && (
                                      <div className="flex flex-wrap gap-2">
                                        {uiToken.examples.map((example, idx) => (
                                          <span key={idx} className="text-xs bg-slate-800/50 px-2 py-1 rounded text-slate-500">
                                            {example}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                  
                                  <div className="flex items-center space-x-4 ml-6">
                                    {tokenMapping[uiToken.id] && (
                                      <div className="flex items-center space-x-3 bg-slate-800/50 px-3 py-2 rounded-lg">
                                        {getTokenPreview(
                                          colorTokens.find(t => t.name === tokenMapping[uiToken.id])?.value || ''
                                        )}
                                        <span className="text-sm text-slate-400 font-mono">
                                          {tokenMapping[uiToken.id]}
                                        </span>
                                      </div>
                                    )}
                                    
                                    <Select
                                      value={tokenMapping[uiToken.id] || ''}
                                      onValueChange={(value) => handleTokenMapping(uiToken.id, value)}
                                    >
                                      <SelectTrigger className="w-[280px] bg-slate-800/50 border-slate-600 hover:border-slate-500">
                                        <SelectValue placeholder="Select design token..." />
                                      </SelectTrigger>
                                      <SelectContent className="bg-slate-800 border-slate-700 max-h-[300px]">
                                        {colorTokens.map((token) => (
                                          <SelectItem key={token.name} value={token.name} className="hover:bg-slate-700">
                                            <div className="flex items-center space-x-3">
                                              {getTokenPreview(token.value)}
                                              <div className="flex flex-col">
                                                <span className="font-mono text-sm">{token.name}</span>
                                                <span className="text-xs text-slate-500">{token.value}</span>
                                              </div>
                                            </div>
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Status Card */}
              <Card className="glass-dark border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-lg">
                    <div className={`w-4 h-4 rounded-full ${
                      healthQuery.isSuccess ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50' : 'bg-red-500 shadow-lg shadow-red-500/50'
                    }`} />
                    <span className="text-slate-200">Backend Status</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">
                    {healthQuery.isSuccess ? 'Connected and ready to generate' : 'Backend service unavailable'}
                  </p>
                </CardContent>
              </Card>

              {/* Generate Project Card */}
              <Card className="glass-dark border-slate-700/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-xl">
                    <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-slate-200">Generate Project</span>
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Create your design system with the mapped tokens
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {generationProgress > 0 && generationProgress < 100 && (
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-slate-400">
                        <span>Generating your design system...</span>
                        <span>{Math.round(generationProgress)}%</span>
                      </div>
                      <Progress value={generationProgress} className="h-2 bg-slate-800" />
                    </div>
                  )}
                  
                  <Button
                    onClick={handleGenerateProject}
                    disabled={generateProjectMutation.isPending || !healthQuery.isSuccess}
                    className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                    size="lg"
                  >
                    {generateProjectMutation.isPending ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Generating...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Download className="h-5 w-5" />
                        <span>Generate Design System</span>
                      </div>
                    )}
                  </Button>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Components mapped:</span>
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                      {Object.keys(tokenMapping).length} / {UI_COMPONENT_TOKENS.length}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* JSON Preview */}
              {showJsonView && (
                <Card className="glass-dark border-slate-700/50">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-200 flex items-center space-x-2">
                      <Code className="h-5 w-5" />
                      <span>Design Tokens</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px]">
                      <div className="bg-slate-900/50 rounded-lg p-4">
                        <ReactJson
                          src={uploadedTokens}
                          theme="monokai"
                          collapsed={2}
                          displayDataTypes={false}
                          displayObjectSize={false}
                          enableClipboard={false}
                          name={false}
                          style={{ 
                            fontSize: '12px',
                            backgroundColor: 'transparent'
                          }}
                        />
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};